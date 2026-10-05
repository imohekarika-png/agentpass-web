// app/components/AiTutorWidget.tsx
'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Bot, X, Send, Sparkles, User } from 'lucide-react';

interface AiTutorWidgetProps {
  locale?: 'zh-HK' | 'en';
}

export default function AiTutorWidget({ locale = 'zh-HK' }: AiTutorWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  // Explicitly point to /api/tutor
  const { messages, status, sendMessage } = (useChat as any)({
    api: '/api/tutor',
    body: { locale },
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  const isZh = locale === 'zh-HK';

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');

    await sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: userText }],
    });
  };

  const renderMessageContent = (m: any) => {
    if (typeof m.content === 'string' && m.content) return m.content;
    if (Array.isArray(m.parts)) {
      return m.parts
        .filter((p: any) => p.type === 'text')
        .map((p: any) => p.text)
        .join('');
    }
    return '';
  };

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
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-700 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

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

            {messages.map((m: any) => (
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
                  className={`rounded-xl px-3.5 py-2 max-w-[80%] text-xs leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  {renderMessageContent(m)}
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
          </div>

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