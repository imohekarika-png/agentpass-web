// app/signup/page.tsx
'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { UserPlus, Mail, Lock, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

function SignupContent() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams ? searchParams.get('redirect') : null;
  const targetUrl = redirectParam ? decodeURIComponent(redirectParam) : '/pricing?registered=true';

  const { setSession } = useAuth();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

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

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://www.agentpass.hk');
    const callbackRedirect = `${siteUrl}/auth/callback?redirect=${encodeURIComponent(targetUrl)}`;

    try {
      // 1. Register with Supabase Auth with redirect to auth callback
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: cleanEmail.split('@')[0],
          },
          emailRedirectTo: callbackRedirect,
        },
      });

      if (authError || !authData?.user) {
        throw new Error(authError?.message || 'Registration failed.');
      }

      // 2. If email confirmation is enabled, display the confirmation screen
      if (authData.user && !authData.session) {
        setIsSubmitting(false);
        setIsEmailSent(true);
        return;
      }

      // 3. Fallback: If email confirmation is disabled, log in immediately
      const user = authData.user;
      const newSessionId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      setSession(cleanEmail, 'FREE_PREVIEW', newSessionId);

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
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{isZh ? '免費註冊帳號' : 'Create Free Account'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isZh ? '開通備考帳戶' : 'Get Started with AgentPass'}
          </h1>
          <p className="text-xs text-slate-400">
            {isZh ? '建立帳號以保存您的作答進度與解鎖考卷' : 'Create your account to track questions and progress'}
          </p>

          {redirectParam && !isEmailSent && (
            <div className="mt-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
              {redirectParam.includes('pricing')
                ? (isZh ? '註冊後確認電郵即可直接完成方案升級' : 'You will be redirected back to upgrade after email confirmation')
                : (isZh ? '請先註冊以存取您的個人儀表板' : 'Please register to access your dashboard')}
            </div>
          )}
        </div>

        {/* Confirmation Screen with Upsell Teaser */}
        {isEmailSent ? (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-3xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
              <Mail className="h-8 w-8 text-indigo-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">
                {isZh ? '請查收確認電郵' : 'Check Your Email to Activate'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isZh ? '我們已發送確認信件至：' : 'A verification link has been sent to:'}
              </p>
              <div className="inline-block px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-amber-400">
                {email}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {isZh 
                  ? '點擊電郵中的「確認帳號」連結，系統將自動為您啟用帳號並跳轉至方案升級頁面。'
                  : 'Click the link inside the email to activate your account and select your PRO upgrade plan.'}
              </p>
            </div>

            {/* Upsell Teaser Box */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-left space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Zap className="h-4 w-4 shrink-0" />
                <span>{isZh ? '下一步：開通 PRO 權限' : 'Next Step: Unlock Full PRO Pass'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isZh
                  ? '確認電郵後即可一鍵解鎖 130 題核心考卷、IRIS 土地查冊雙個案庫及艾賓浩斯 1-3-7-16-35 錯題自動複習排程。'
                  : 'Once confirmed, you will be redirected to activate full EAQE & SQE mock exams, IRIS land search case dossiers, and statutory review schedules.'}
              </p>
              <div className="pt-1 flex items-center gap-2 text-[10px] text-emerald-400 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isZh ? '考季保證：未及格免費展期' : 'Exam pass guarantee included'}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition block text-center"
              >
                {isZh ? '已完成確認？前往登入' : 'Already confirmed? Sign In'}
              </Link>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <>
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
                  <span>{isZh ? '建立帳號中...' : 'Creating Account...'}</span>
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
          </>
        )}

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