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
          query: userText,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const botReply = data.reply || data.answer || data.text || (isZh ? '回覆完成。' : 'Response completed.');

      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: botReply } : m))
      );
    } catch (err) {
      console.error('AI Tutor Fetch Error:', err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: isZh ? '連線失敗，請再試一次。' : 'Connection error. Please try again.' }
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
          className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3.5 text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-700 hover:scale-105 cursor-pointer font-bold"
        >
          <Sparkles className="h-5 w-5 text-amber-300" />
          <span className="text-sm tracking-wide">
            {isZh ? 'AI 導師提問' : 'Ask AI Tutor'}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="flex h-[560px] w-[360px] flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 sm:w-[420px] overflow-hidden">
          {/* RULE 1: Navbar ALWAYS solid blue (bg-blue-600) & Branding text in white (text-white) across ALL themes */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3.5 border-b border-blue-700">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/20 text-white shadow-xs">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">AgentPass™ AI Tutor</h3>
                <p className="text-[11px] text-blue-100 font-semibold">
                  {isZh ? 'EAQE / SQE 條例導師' : 'EAQE / SQE Assistant'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleLocale}
                title={isZh ? '切換語言' : 'Switch Language'}
                className="flex items-center gap-1 rounded-xl border border-blue-400/40 bg-blue-700/50 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-blue-700 transition cursor-pointer shadow-2xs"
              >
                <Globe className="h-3 w-3 text-blue-200" />
                <span>{isZh ? 'EN' : '繁'}</span>
              </button>

              {messages.length > 0 && (
                <button
                  onClick={clearHistory}
                  title={isZh ? '清除紀錄' : 'Clear History'}
                  className="rounded-xl p-1.5 text-blue-200 hover:bg-blue-700 hover:text-white transition cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-blue-200 hover:bg-blue-700 hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* RULE 3: Text window body background ALWAYS white (bg-white) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-white">
            {messages.length === 0 && (
              <div className="flex h-full flex-col justify-center space-y-4">
                <div className="text-center text-slate-500">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 mx-auto mb-2">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                  {/* RULE 3: Dark grey text (text-slate-800) */}
                  <p className="text-xs font-bold text-slate-800 mb-1">
                    {isZh ? '歡迎！我是您的 EAQE / SQE 考試導師' : 'Welcome! I am your EAQE / SQE Exam Tutor'}
                  </p>
                  <p className="text-xs max-w-[270px] mx-auto text-slate-600">
                    {isZh
                      ? '您可以點擊熱門考點提問，或直接輸入任何《地產代理條例》(第511章) 疑難：'
                      : 'Click a suggested topic below or type any Cap. 511 exam question:'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-blue-700">
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>{isZh ? '熱門試題速問' : 'Suggested Exam Topics'}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {suggestedPrompts.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => submitQuestion(item.query)}
                        disabled={isLoading}
                        className="w-full text-left rounded-2xl bg-slate-50 border border-slate-200/80 p-3 text-xs text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-900 transition-all flex items-center justify-between group cursor-pointer shadow-2xs font-medium"
                      >
                        <span>{item.label}</span>
                        <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">
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
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white mt-0.5 shadow-2xs">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[85%] text-xs leading-relaxed shadow-2xs transition-all ${
                    m.role === 'user'
                      // User message: Solid blue bubble with white text
                      ? 'bg-blue-600 text-white rounded-br-none font-medium'
                      // RULE 3: Assistant message: Light grey card with dark grey text (text-slate-800)
                      : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-none font-normal'
                  }`}
                >
                  {m.role === 'user' ? (
                    <div className="whitespace-pre-wrap font-semibold tracking-wide text-white">{m.content}</div>
                  ) : (
                    <div className="prose prose-xs max-w-none text-slate-800 leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                {m.role === 'user' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white mt-0.5 shadow-2xs">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold italic px-2">
                <Bot className="h-4 w-4 animate-spin text-blue-600" />
                {isZh ? '導師思考中...' : 'Tutor is thinking...'}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* RULE 2 & 4: Footer ALWAYS blue (bg-blue-600) and Send CTA ALWAYS blue (bg-blue-600 / bg-white button) */}
          <form onSubmit={handleFormSubmit} className="border-t border-blue-700 p-3 bg-blue-600">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isZh
                    ? '輸入問題 (例：何謂雙重代理？)'
                    : 'Ask a question (e.g., What is dual agency?)'
                }
                className="flex-1 rounded-2xl bg-white px-4 py-2.5 text-xs text-slate-800 border border-blue-200 focus:border-white focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 font-medium shadow-inner"
              />
              {/* RULE 4: Send CTA button */}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-blue-600 disabled:opacity-50 hover:bg-blue-50 transition-colors cursor-pointer shadow-sm font-bold"
              >
                <Send className="h-4 w-4 text-blue-600" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}