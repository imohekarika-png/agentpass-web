// app/forgot-password/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import { Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.agentpass.hk';

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${siteUrl}/reset-password`,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || (isZh ? '發送重設郵件失敗，請稍後再試。' : 'Failed to send reset email.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{isZh ? '密碼重設' : 'Password Recovery'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isZh ? '忘記密碼？' : 'Reset Your Password'}
          </h1>
          <p className="text-xs text-slate-400">
            {isZh ? '輸入您的註冊電郵，我們將發送密碼重設連結。' : 'Enter your registered email to receive a password reset link.'}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">{isZh ? '重設連結已發送' : 'Check Your Inbox'}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isZh ? `重設密碼連結已發送至 ${email}，請於 15 分鐘內查收。` : `A recovery link has been sent to ${email}.`}
            </p>
            <div className="pt-2">
              <Link href="/login" className="inline-block px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition">
                {isZh ? '返回登入' : 'Back to Sign In'}
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 text-center">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-indigo-400" />
                <span>{isZh ? '註冊電郵地址' : 'Email Address'}</span>
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{isZh ? '發送中...' : 'Sending...'}</span>
              ) : (
                <>
                  <span>{isZh ? '發送重設郵件' : 'Send Reset Link'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2 border-t border-slate-800">
              <Link href="/login" className="text-xs text-slate-400 hover:text-slate-200 transition">
                {isZh ? '想起密碼？返回登入' : 'Remember your password? Sign In'}
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}