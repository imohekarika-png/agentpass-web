// app/signup/page.tsx
'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth, UserTier } from '@/app/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { UserPlus, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

function SignupContent() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams ? searchParams.get('redirect') : null;
  const targetUrl = redirectParam ? decodeURIComponent(redirectParam) : '/dashboard';

  const { setSession } = useAuth();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();

    if (password !== confirmPassword) {
      setIsSubmitting(false);
      setErrorMessage(isZh ? '兩次輸入的密碼不一致。' : 'Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setIsSubmitting(false);
      setErrorMessage(isZh ? '密碼長度至少需 6 個字元。' : 'Password must be at least 6 characters.');
      return;
    }

    try {
      // 1. Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: cleanEmail.split('@')[0],
          },
        },
      });

      if (authError || !authData?.user) {
        throw new Error(authError?.message || 'Registration failed.');
      }

      const user = authData.user;

      // 2. Generate initial Session ID
      const newSessionId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      // 3. Register active session locally
      setSession(cleanEmail, 'FREE_PREVIEW', newSessionId);

      // 4. Ensure profile row exists in database with this active_session_id
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: cleanEmail,
          tier: 'FREE_PREVIEW',
          active_session_id: newSessionId,
          last_active_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

      // 5. Navigate to preserved funnel destination
      setTimeout(() => {
        setIsSubmitting(false);
        router.push(targetUrl);
        router.refresh();
      }, 250);

    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(
        err.message || (isZh ? '註冊失敗，請稍後再試。' : 'Registration failed. Please try again.')
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{isZh ? '免費註冊帳號' : 'Create Free Account'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isZh ? '開通備考帳戶' : 'Get Started with AgentPass'}
          </h1>
          <p className="text-xs text-slate-400">
            {isZh ? '建立帳號以保存您的作答進度與解鎖全套考卷' : 'Create your account to track questions and progress'}
          </p>

          {redirectParam && (
            <div className="mt-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
              {isZh ? '註冊後將自動返回您剛才選擇的方案' : 'You will be redirected back to complete your plan selection'}
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
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
              <span>{isZh ? '設置密碼' : 'Password'}</span>
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

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
              <span>{isZh ? '確認密碼' : 'Confirm Password'}</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              <span>{isZh ? '註冊中...' : 'Creating Account...'}</span>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>{isZh ? '立即免費註冊' : 'Create Free Account'}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            {isZh ? '已有 AgentPass 帳號？' : 'Already have an account?'}{' '}
            <Link
              href={`/login${redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ''}`}
              className="font-bold text-indigo-400 hover:text-indigo-300 transition"
            >
              {isZh ? '直接登入' : 'Sign In'}
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs">
        Loading Sign Up...
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}