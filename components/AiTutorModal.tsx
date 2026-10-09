// components/AiTutorModal.tsx
'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';

interface AiTutorModalProps {
  questionId?: string;
  question?: any;
  userChoice?: string;
  language?: 'ZH' | 'EN';
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AiTutorModal({
  questionId,
  question,
  userChoice,
  language: propLanguage,
}: AiTutorModalProps = {}) {
  const { language, locale } = useLanguage();
  const currentLang = (propLanguage || language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');

  // Dual-language conversation history
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; textZh: string; textEn: string }>>([
    {
      sender: 'bot',
      textZh: '你好！我是你的 EAA 考證 AI 導師。你可以問我關於 Cap. 511、Cap. 7 租務條例、土地查冊四抽屜 (P-O-I-M) 或任何考官陷阱！',
      textEn: 'Hello! I am your EAA Exam AI Tutor. Ask me anything about Cap. 511, Cap. 7 Tenancy, Land Search P-O-I-M, or Exam Traps!'
    }
  ]);

  const handleSend = () => {
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setInputMsg('');

    setMessages((prev) => [
      ...prev,
      { sender: 'user', textZh: userText, textEn: userText }
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          textZh: `針對你的提問「${userText}」：在 EAA 考試中，請特別注意法定期限與披露責任。例如欠租沒收寬限期為 15 天，而牌照續期窗口為屆滿前 3 個月至 1 個月。`,
          textEn: `Regarding your question "${userText}": In EAA exams, pay special attention to statutory timeframes and disclosure duties. For example, unpaid rent forfeiture requires 15 days default, and licence renewal window is 3 months to 1 month prior to expiry.`
        }
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-xs font-bold text-white shadow-2xl hover:scale-105 transition cursor-pointer border border-indigo-400/30"
        >
          <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
          <span>{isZh ? '諮詢 AI 導師' : 'Ask AI Tutor'}</span>
        </button>
      ) : (
        <div className="w-[350px] sm:w-[400px] h-[500px] rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col overflow-hidden text-slate-100">
          
          {/* Header */}
          <div className="p-4 bg-indigo-950/80 border-b border-indigo-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center">
                <Bot className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">
                  {isZh ? 'EAA 專精 AI 智能導師' : 'EAA Expert AI Tutor'}
                </h3>
                <p className="text-[10px] text-indigo-300/80">
                  {isZh ? '24/7 法規與答題陷阱解答' : '24/7 Legal & Exam Trap Guidance'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/50 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  {isZh ? msg.textZh : msg.textEn}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 flex gap-2 overflow-x-auto text-[10px]">
            <button
              onClick={() => setInputMsg(isZh ? '什麼是 15 天沒收權？' : 'What is 15-day forfeiture?')}
              className="px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700 whitespace-nowrap hover:bg-slate-700 transition"
            >
              {isZh ? '💡 15天沒收權' : '💡 15-Day Forfeiture'}
            </button>
            <button
              onClick={() => setInputMsg(isZh ? '什麼是 NEG-CHG-CONF？' : 'What is NEG-CHG-CONF?')}
              className="px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700 whitespace-nowrap hover:bg-slate-700 transition"
            >
              {isZh ? '💡 NEG-CHG-CONF' : '💡 NEG-CHG-CONF'}
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isZh ? '輸入問題 (例如：Form 3 職責)...' : 'Ask a question (e.g. Form 3 duties)...'}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-xl text-white transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}