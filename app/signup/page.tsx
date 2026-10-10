// app/signup/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Award
} from 'lucide-react';

export default function SignUpPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [examType, setExamType] = useState<'EAQE' | 'SQE'>('EAQE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage(isZh ? '請填寫所有必填欄位。' : 'Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage(isZh ? '密碼長度必須至少為 6 個字符。' : 'Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('agentpass_user', JSON.stringify({
        name: fullName,
        email,
        examType,
        joinedDate: new Date().toISOString()
      }));
    }

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{isZh ? '免費註冊 AgentPass 帳號' : 'Create Your Free Account'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isZh ? '建立學員帳號' : 'Get Started Free'}
          </h1>
          <p className="text-xs text-slate-400">
            {isZh ? '同步雲端溫習進度與 1-3-7-16-35 模擬測驗紀錄' : 'Sync study progress and practice test history across devices'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 text-center">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Target Exam Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-indigo-400" />
              <span>{isZh ? '目標考試類別' : 'Target Exam Type'}</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setExamType('EAQE')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center justify-center ${
                  examType === 'EAQE'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                地產代理 (EAQE)
              </button>
              <button
                type="button"
                onClick={() => setExamType('SQE')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center justify-center ${
                  examType === 'SQE'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                營業員 (SQE)
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-indigo-400" />
              <span>{isZh ? '姓名 / 稱呼' : 'Full Name'}</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isZh ? '例如：張小明' : 'e.g. Alex Chan'}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:border-indigo-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-indigo-400" />
              <span>{isZh ? '電郵地址' : 'Email Address'}</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.chan@example.com"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:border-indigo-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-indigo-400" />
              <span>{isZh ? '設定密碼' : 'Create Password'}</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:border-indigo-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Value Highlights */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>{isZh ? '解鎖 20 大主題講義與 38 大考官陷阱冊' : 'Unlock 20 topic blocks and 38 master exam traps'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>{isZh ? '自動開啟 1-3-7-16-35 間隔重複溫習階梯' : 'Enable 1-3-7-16-35 Ebbinghaus spaced repetition ladder'}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>{isZh ? '帳號建立中...' : 'Creating Account...'}</span>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>{isZh ? '建立免費帳號' : 'Create Free Account'}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            {isZh ? '已經擁有 AgentPass 帳號？' : 'Already have an account?'}{' '}
            <Link
              href="/login"
              className="font-bold text-indigo-400 hover:text-indigo-300 transition"
            >
              {isZh ? '立即登入' : 'Sign In'}
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}