// app/components/AiTutorWidget.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, X, Send, Sparkles, User, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AiTutorWidgetProps {
  locale?: 'zh-HK' | 'en';
}

const STORAGE_KEY = 'agentpass_tutor_messages_v1';

export default function AiTutorWidget({ locale = 'zh-HK' }: AiTutorWidgetProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isZh = locale === 'zh-HK';

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

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
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
        throw new Error('Failed to fetch AI stream');
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
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-white shadow-lg transition-all hover:bg-indigo-700 hover:scale-105"
        >
          <Sparkles className="h-5 w-5 text-yellow-300" />
          <span className="text-sm font-semibold">
            {isZh ? 'AI 導師提問' : 'Ask AI Tutor'}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="flex h-[520px] w-[360px] flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-slate-800 px-4 py-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">AgentPass™ AI Tutor</h3>
                <p className="text-xs text-slate-400">
                  {isZh ? 'EAQE / SQE 條例導師' : 'EAQE / SQE Ordinance Assistant'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
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
              <div className="flex h-full flex-col items-center justify-center text-center text-slate-400">
                <Bot className="h-10 w-10 text-indigo-400 mb-2 opacity-80" />
                <p className="text-xs max-w-[220px]">
                  {isZh
                    ? '歡迎！您可以詢問《地產代理條例》(第511章)、EAA 監管指引或模擬試題。'
                    : 'Welcome! Ask questions regarding Cap. 511 Ordinance, EAA guidelines, or exam preparation.'}
                </p>
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
                    <div className="prose prose-invert prose-xs max-w-none text-slate-200 prose-p:my-1.5 prose-ul:my-1.5 prose-ul:list-disc prose-ul:pl-4 prose-ol:my-1.5 prose-ol:list-decimal prose-ol:pl-4 prose-li:my-0.5 prose-headings:text-indigo-300 prose-headings:font-bold prose-headings:text-sm prose-strong:text-amber-300 prose-strong:font-semibold prose-table:border-collapse prose-td:border prose-td:border-slate-700 prose-td:p-1.5 prose-th:border prose-th:border-slate-700 prose-th:p-1.5 prose-th:bg-slate-800">
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