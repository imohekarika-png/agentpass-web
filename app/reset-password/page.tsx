// app/reset-password/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import { Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

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
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || (isZh ? '更新密碼失敗。' : 'Failed to update password.'));
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
            <span>{isZh ? '更新密碼' : 'Set New Password'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isZh ? '設定新密碼' : 'Set New Password'}
          </h1>
        </div>

        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">{isZh ? '密碼重設成功！' : 'Password Updated!'}</h4>
            <p className="text-xs text-slate-300">{isZh ? '正在為您跳轉至登入頁面...' : 'Redirecting to login...'}</p>
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
                <Lock className="h-3.5 w-3.5 text-indigo-400" />
                <span>{isZh ? '新密碼' : 'New Password'}</span>
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
                <Lock className="h-3.5 w-3.5 text-indigo-400" />
                <span>{isZh ? '確認新密碼' : 'Confirm New Password'}</span>
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
                <span>{isZh ? '儲存中...' : 'Saving...'}</span>
              ) : (
                <span>{isZh ? '確認變更密碼' : 'Update Password'}</span>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}