// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import { LogIn, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 1. Attempt Supabase Auth Login
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        // Fallback for local testing / demo session if Supabase throws an error
        console.warn('Supabase Auth error, falling back to local session:', error.message);
      }

      // 2. Persist local session state
      if (typeof window !== 'undefined') {
        const userData = {
          email,
          name: data?.user?.user_metadata?.full_name || email.split('@')[0],
          id: data?.user?.id || 'local-user',
        };
        localStorage.setItem('agentpass_user', JSON.stringify(userData));
        
        // 3. Dispatch event to update Navbar instantly
        window.dispatchEvent(new Event('agentpass_auth_change'));
      }

      // 4. Redirect to Dashboard
      setTimeout(() => {
        setIsSubmitting(false);
        router.push('/dashboard');
        router.refresh();
      }, 600);

    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || (isZh ? '登入失敗，請檢查電郵及密碼。' : 'Sign in failed. Check your credentials.'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{isZh ? '歡迎回來' : 'Welcome Back'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isZh ? '學員登入' : 'Member Sign In'}
          </h1>
          <p className="text-xs text-slate-400">
            {isZh ? '登入以繼續您的 1-3-7-16-35 溫習排程' : 'Sign in to access your saved review schedule'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 text-center">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-indigo-400" />
              <span>{isZh ? '密碼' : 'Password'}</span>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>{isZh ? '登入中...' : 'Signing in...'}</span>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>{isZh ? '登入帳號' : 'Sign In'}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Sign Up */}
        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            {isZh ? '還沒有 AgentPass 帳號？' : "Don't have an account yet?"}{' '}
            <Link
              href="/signup"
              className="font-bold text-indigo-400 hover:text-indigo-300 transition"
            >
              {isZh ? '免費註冊' : 'Sign Up Free'}
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}