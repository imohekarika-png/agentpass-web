// components/PricingWelcomeBanner.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { CheckCircle2, Sparkles, ArrowDown, X, ShieldCheck, Zap } from 'lucide-react';

function BannerContent() {
  const searchParams = useSearchParams();
  const isRegisteredParam = searchParams ? searchParams.get('registered') === 'true' : false;
  const targetTier = searchParams ? searchParams.get('tier') : null;

  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const { userEmail, isPaidUser } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner only if the user arrives from confirmation and is not already PRO
    if (isRegisteredParam && !isPaidUser) {
      const dismissed = sessionStorage.getItem('agentpass_pricing_banner_dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }
  }, [isRegisteredParam, isPaidUser]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('agentpass_pricing_banner_dismissed', 'true');
    }
  };

  const scrollToPlans = () => {
    // If a specific tier was targeted, scroll and highlight that card
    if (targetTier) {
      const targetEl = document.getElementById(`plan-${targetTier.toLowerCase()}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.classList.add('ring-2', 'ring-amber-400');
        setTimeout(() => targetEl.classList.remove('ring-2', 'ring-amber-400'), 2500);
        return;
      }
    }

    // Default scroll to the main pricing container
    const plansSection = document.getElementById('pricing-cards') || document.querySelector('[data-section="pricing"]');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: 400, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-full mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950/70 border border-emerald-500/40 p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  <span>{isZh ? '電郵確認成功' : 'Email Verified'}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <Zap className="h-3 w-3 text-amber-400" />
                  <span>{isZh ? '新學員開通禮遇' : 'Welcome Pass'}</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                {isZh
                  ? '歡迎加入 AgentPass！備考帳戶已成功啟用'
                  : 'Welcome to AgentPass! Your account is active'}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                {isZh ? (
                  <>
                    已為您綁定免費預覽權限（電郵：<span className="font-mono text-amber-300 font-bold">{userEmail}</span>）。立即選擇適合您的專業備考方案，解鎖全真考卷、IRIS 土地查冊雙個案庫及及格保證。
                  </>
                ) : (
                  <>
                    Free preview pass linked to <span className="font-mono text-amber-300 font-bold">{userEmail}</span>. Select your licensing pass below to unlock full mock exam papers, IRIS case dossiers, and our exam pass guarantee.
                  </>
                )}
              </p>

              <div className="pt-1 flex items-center gap-3 text-[11px] text-emerald-400 font-semibold flex-wrap">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{isZh ? '考季及格展期保證' : 'Exam Pass Guarantee'}</span>
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span>{isZh ? 'Stripe 256 位元加密即時開通' : 'Instant Activation via Stripe'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end shrink-0 pt-2 md:pt-0">
            <button
              type="button"
              onClick={scrollToPlans}
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <span>{isZh ? '選取升級方案' : 'Select Upgrade Plan'}</span>
              <ArrowDown className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close banner"
              className="p-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingWelcomeBanner() {
  return (
    <Suspense fallback={null}>
      <BannerContent />
    </Suspense>
  );
}