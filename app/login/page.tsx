// app/login/page.tsx
'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth, UserTier } from '@/app/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { LogIn, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

function LoginContent() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ 
        email: cleanEmail, 
        password 
      });

      if (authError || !authData?.user) {
        throw new Error(authError?.message || 'Invalid email or password.');
      }

      const user = authData.user;

      // 2. Generate a distinct, cryptographically unique session token
      const newSessionId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      // 3. Register locally FIRST so incoming Realtime broadcasts recognize this session
      setSession(cleanEmail, 'FREE_PREVIEW', newSessionId);

      // 4. Update the database active_session_id
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({
          active_session_id: newSessionId,
          last_active_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select('tier')
        .single();

      let resolvedTier: UserTier = 'FREE_PREVIEW';

      if (updateError || !updatedProfile) {
        // Fallback insert if profile row is missing
        const { data: insertedProfile } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: cleanEmail,
            tier: 'FREE_PREVIEW',
            active_session_id: newSessionId,
            last_active_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select('tier')
          .single();

        if (insertedProfile?.tier) {
          resolvedTier = insertedProfile.tier as UserTier;
        }
      } else {
        resolvedTier = (updatedProfile.tier as UserTier) || 'FREE_PREVIEW';
      }

      // 5. Update tier in state
      setSession(cleanEmail, resolvedTier, newSessionId);

      // 6. Navigate to destination
      setTimeout(() => {
        setIsSubmitting(false);
        router.push(targetUrl);
        router.refresh();
      }, 200);

    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(
        err.message || (isZh ? '登入失敗，請檢查電郵及密碼。' : 'Sign in failed. Check your credentials.')
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{isZh ? '歡迎回來' : 'Welcome Back'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isZh ? '學員登入' : 'Member Sign In'}
          </h1>
          <p className="text-xs text-slate-400">
            {isZh ? '登入以存取您的 1-3-7-16-35 溫習排程與 PRO 權限' : 'Sign in to access your review schedules and PRO features'}
          </p>

          {redirectParam && (
            <div className="mt-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
              {isZh ? '登入後將自動返回您剛才選擇的方案' : 'You will be redirected back to complete your upgrade after sign in'}
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 text-center">
            {errorMessage}
          </div>
        )}

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

        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            {isZh ? '還沒有 AgentPass 帳號？' : "Don't have an account yet?"}{' '}
            <Link
              href={`/signup${redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ''}`}
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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs">
        Loading Sign In...
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}