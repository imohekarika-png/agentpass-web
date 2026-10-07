// app/components/AiTutorWidget.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '@/app/context/LanguageContext';
import { Bot, X, Send, Sparkles, User, Trash2, HelpCircle, Globe } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'agentpass_tutor_messages_v1';

const QUICK_PROMPTS = {
  'zh-HK': [
    { label: '何謂雙重代理 (Dual Agency)？', query: '請解釋根據《地產代理條例》(第511章)，何謂雙重代理？代理有何法定披露責任？' },
    { label: 'Form 1 至 Form 6 表格用途', query: '請整理及比較地產代理法定表格 (Form 1 至 Form 6) 的主要用途及適用交易類別。' },
    { label: '營業員與地產代理牌照區別', query: '請問營業員牌照 (Salesperson\'s Licence) 與地產代理牌照 (Estate Agent\'s Licence) 有何權限區別？' },
    { label: '出價傳達與誠實義務', query: '若買家提出口頭出價，地產代理是否有責任向業主傳達？EAA 指引如何規定？' },
  ],
  en: [
    { label: 'What is Dual Agency under Cap. 511?', query: 'Explain Dual Agency under the Estate Agents Ordinance (Cap. 511) and the mandatory disclosure requirements.' },
    { label: 'Summary of Statutory Forms 1 to 6', query: 'Provide a breakdown comparing Statutory Prescribed Forms (Form 1 to Form 6) used in residential transactions.' },
    { label: 'Salesperson vs. Agent Licence', query: 'What are the key scope differences between a Salesperson\'s Licence and an Estate Agent\'s Licence?' },
    { label: 'Duty to Convey Verbal Offers', query: 'Is an estate agent legally required to convey a verbal offer from a prospective purchaser to the vendor under EAA guidelines?' },
  ],
};

export default function AiTutorWidget() {
  const { locale, toggleLocale } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isZh = locale === 'zh-HK';
  const suggestedPrompts = isZh ? QUICK_PROMPTS['zh-HK'] : QUICK_PROMPTS.en;

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.error('Failed to save chat history:', err);
    }
  }, [messages, mounted]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const submitQuestion = useCallback(async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    setInput('');

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          locale,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to fetch AI response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const textToken = JSON.parse(line.slice(2));
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + textToken } : m
                )
              );
            } catch {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + line.slice(2) } : m
                )
              );
            }
          } else if (line.trim() && !line.startsWith('{')) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: m.content + line } : m
              )
            );
          }
        }
      }
    } catch (err) {
      console.error('Streaming error:', err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: isZh ? '發生錯誤，請重試。' : 'An error occurred. Please try again.' }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, locale, messages, isZh]);

  useEffect(() => {
    const handleCustomAsk = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt: string }>;
      if (customEvent.detail?.prompt) {
        setIsOpen(true);
        submitQuestion(customEvent.detail.prompt);
      }
    };

    window.addEventListener('agentpass:ask-tutor', handleCustomAsk);
    return () => window.removeEventListener('agentpass:ask-tutor', handleCustomAsk);
  }, [submitQuestion]);

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuestion(input);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-white shadow-lg transition-all hover:bg-indigo-700 hover:scale-105 cursor-pointer"
        >
          <Sparkles className="h-5 w-5 text-yellow-300" />
          <span className="text-sm font-semibold">
            {isZh ? 'AI 導師提問' : 'Ask AI Tutor'}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="flex h-[540px] w-[360px] flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl sm:w-[420px]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-slate-800 px-4 py-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">AgentPass™ AI Tutor</h3>
                <p className="text-xs text-slate-400">
                  {isZh ? 'EAQE / SQE 條例導師' : 'EAQE / SQE Assistant'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language Switcher Button in Header */}
              <button
                onClick={toggleLocale}
                title={isZh ? '切換語言' : 'Switch Language'}
                className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] font-semibold text-slate-300 hover:border-indigo-500 transition"
              >
                <Globe className="h-3 w-3 text-indigo-400" />
                <span>{isZh ? 'EN' : '繁'}</span>
              </button>

              {messages.length > 0 && (
                <button
                  onClick={clearHistory}
                  title={isZh ? '清除紀錄' : 'Clear History'}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-700 hover:text-rose-400 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-700 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.length === 0 && (
              <div className="flex h-full flex-col justify-center space-y-4">
                <div className="text-center text-slate-400">
                  <Bot className="h-10 w-10 text-indigo-400 mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-semibold text-slate-300 mb-1">
                    {isZh ? '歡迎！我是您的 EAQE / SQE 考試導師' : 'Welcome! I am your EAQE / SQE Exam Tutor'}
                  </p>
                  <p className="text-xs max-w-[260px] mx-auto text-slate-400">
                    {isZh
                      ? '您可以點擊熱門考點提問，或直接輸入任何《地產代理條例》(第511章) 疑難：'
                      : 'Click a suggested topic below or type any Cap. 511 exam question:'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-400">
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>{isZh ? '熱門試題速問' : 'Suggested Exam Topics'}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {suggestedPrompts.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => submitQuestion(item.query)}
                        disabled={isLoading}
                        className="w-full text-left rounded-xl bg-slate-800/80 border border-slate-700/80 p-2.5 text-xs text-slate-300 hover:bg-indigo-950/40 hover:border-indigo-500/50 hover:text-indigo-200 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role !== 'user' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`rounded-xl px-3.5 py-2 max-w-[85%] text-xs leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  {m.role === 'user' ? (
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  ) : (
                    <div className="prose prose-invert prose-xs max-w-none text-slate-200">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                {m.role === 'user' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700">
                    <User className="h-4 w-4 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <Bot className="h-4 w-4 animate-spin text-indigo-400" />
                {isZh ? '導師思考中...' : 'Tutor is thinking...'}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleFormSubmit} className="border-t border-slate-700 p-3 bg-slate-850">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isZh
                    ? '輸入問題 (例：何謂雙重代理？)'
                    : 'Ask a question (e.g., What is dual agency?)'
                }
                className="flex-1 rounded-xl bg-slate-800 px-3.5 py-2 text-xs text-white border border-slate-700 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white disabled:opacity-50 hover:bg-indigo-700 transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}