// app/pricing/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Zap,
  HelpCircle,
  LogIn,
} from 'lucide-react';

type BillingInterval = 'monthly' | '3_monthly' | 'one_time';
type PaidTier = 'SQE_PRO' | 'EAQE_PRO' | 'ALL_ACCESS_PRO';

export default function PricingPage() {
  const router = useRouter();
  const { language, locale } = useLanguage();
  const { userEmail, userTier } = useAuth() as any;

  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const isLoggedIn = Boolean(userEmail && userEmail !== 'guest@agentpass.hk');

  const [billingInterval, setBillingInterval] = useState<BillingInterval>('3_monthly');
  const [loadingTier, setLoadingTier] = useState<PaidTier | null>(null);

  const TIERS = [
    {
      id: 'SQE_PRO' as const,
      track: 'SQE' as const,
      nameZh: '營業員資格考試 (細牌 SQE)',
      nameEn: 'Salesperson License (SQE PRO)',
      subtitleZh: '專為地產代理營業員牌照考生量身打造',
      subtitleEn: 'Engineered specifically for Salesperson candidates',
      badge: null,
      priceMonthly: 198,
      price3Monthly: 480,
      priceOneTime: 500,
      featuresZh: [
        '全真 60 題標準考場 (Part I 50 題 + Part II 10 題查冊個案)',
        '完整 130 題核心條例練習庫與常規陷阱剖析',
        '精讀法規速記閃卡 (Active Recall 閃卡引擎)',
        'EAA 官方 60% 及格線雷達診斷報告',
        '手機 / 平板 / 電腦跨裝置隨時同步',
      ],
      featuresEn: [
        'Full 60-Question Official Mock Exam (Part I 50 Qs + Part II 10 Qs)',
        'Full 130-Question statutory practice bank with trap explanations',
        'Legal active recall flashcards with statutory citations',
        'Official 60% passing mark diagnostic performance radar',
        'Cross-device mobile, tablet, and desktop syncing',
      ],
    },
    {
      id: 'EAQE_PRO' as const,
      track: 'EAQE' as const,
      nameZh: '地產代理資格考試 (大牌 EAQE)',
      nameEn: 'Full Estate Agent (EAQE PRO)',
      subtitleZh: '考生首選 • 涵蓋大牌所有深度商業查冊與經理法規',
      subtitleEn: 'Most Popular • Complete Full Agent master exam suite',
      badge: isZh ? '考生首選 • 推薦' : 'MOST POPULAR',
      isPopular: true,
      priceMonthly: 288,
      price3Monthly: 688,
      priceOneTime: 710,
      featuresZh: [
        '全真 100 題完整標準考卷 (Part I 80 題 + Part II 20 題查冊個案)',
        'IRIS 土地查冊雙個案庫 (Smart Mansion 遺產 / Central Tower 公司查冊)',
        '完整 130 題核心題庫與《建築物條例》《大廈管理條例》深度解析',
        '大牌經理控制、浮動押記、未決訴訟 (Lis Pendens) 深度精解',
        '艾賓浩斯 SRS 錯題自動複習排程',
        '3 小時官方嚴格倒數模擬計時器',
      ],
      featuresEn: [
        'Full 100-Question Master Mock Exam (Part I 80 Qs + Part II 20 Qs)',
        'Full IRIS Land Search Dossiers (Probate, Removal Orders, Floating Charges)',
        'Full 130-Question bank including Cap. 123 & Cap. 344 analysis',
        'Senior manager controls, negative pledges & corporate searches',
        'Automated Leitner/SRS spaced repetition mistake queue',
        'Official 3-hour exam countdown simulation mode',
      ],
    },
    {
      id: 'ALL_ACCESS_PRO' as const,
      track: 'EAQE' as const,
      nameZh: '雙牌全通保證班 (ALL-ACCESS)',
      nameEn: 'Dual-Track Master Pass (ALL-ACCESS)',
      subtitleZh: '同時解鎖 EAQE 大牌 + SQE 細牌雙考場與 AI 合成功能',
      subtitleEn: 'Unlimited dual-track pass with AI Exam Synthesizer',
      badge: isZh ? '最高性價比' : 'BEST VALUE',
      priceMonthly: 388,
      price3Monthly: 880,
      priceOneTime: 930,
      featuresZh: [
        '同時解鎖 EAQE (100題) 與 SQE (60題) 兩套全真考卷',
        '智能題庫合成器 (Cognitive Synthesizer) 無限動態生成試題',
        '完整 130 題題庫與全套 20 大主題法規速記閃卡',
        '優先排程 AI 弱點診斷導師解析',
        '考前衝刺核心必背條例數字總整理',
        '考季保證：未及格免費展期至及格為止',
      ],
      featuresEn: [
        'Simultaneous access to both EAQE (100 Qs) and SQE (60 Qs) suites',
        'Unlimited AI Cognitive Exam Synthesizer for new dynamic items',
        'Full 130-question bank & complete active recall deck',
        'Priority AI Diagnostic Weakness Tutoring',
        'High-yield statutory numbers & formula cheat sheet',
        'Exam season pass: Free extension until qualified',
      ],
    },
  ];

  const handleCheckout = async (tier: PaidTier, track: 'EAQE' | 'SQE') => {
    // 1. Client-Side Gate: Require authentication prior to checkout
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(`/pricing?tier=${tier}`)}`);
      return;
    }

    setLoadingTier(tier);
    try {
      const selectedTier = TIERS.find((t) => t.id === tier);
      let currentPrice = selectedTier?.price3Monthly || 480;
      if (billingInterval === 'monthly') currentPrice = selectedTier?.priceMonthly || 198;
      if (billingInterval === 'one_time') currentPrice = selectedTier?.priceOneTime || 500;

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          billingInterval,
          email: userEmail,
          track,
          amount: currentPrice,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to initialize payment gateway.');
        setLoadingTier(null);
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert('Unable to connect to Stripe gateway. Please try again.');
      setLoadingTier(null);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 border border-amber-300 text-amber-900">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>TRANSPARENT CANDIDATE PRICING</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            {isZh ? '選擇適合你的備考進度方案' : 'Choose Your Preparation Plan'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isZh
              ? '專業律師與考牌名師依據最新法例編撰。靈活月繳、3 個月考季集中衝刺或一次性全通通行證，隨選即用。'
              : 'Statutory-grounded exam prep platform designed for Hong Kong EAQE & SQE licensing candidates.'}
          </p>

          {/* User Auth Status Notification */}
          <div className="pt-2 flex justify-center">
            {isLoggedIn ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isZh ? `已登入帳號：${userEmail}` : `Logged in as: ${userEmail}`}</span>
              </span>
            ) : (
              <Link
                href="/login?redirect=/pricing"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 hover:bg-blue-100 transition shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{isZh ? '提示：請先登入帳號以綁定升級方案 (點此登入)' : 'Notice: Please log in first to bind your upgrade'}</span>
              </Link>
            )}
          </div>

          {/* 3-Option Segmented Control */}
          <div className="pt-2 flex items-center justify-center">
            <div className="p-1.5 rounded-2xl bg-slate-200/90 border border-slate-300 grid grid-cols-3 gap-1 shadow-inner max-w-xl w-full">
              
              <button
                type="button"
                onClick={() => setBillingInterval('monthly')}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer text-center ${
                  billingInterval === 'monthly'
                    ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-300/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isZh ? '按月訂閱' : 'Monthly'}
              </button>

              <button
                type="button"
                onClick={() => setBillingInterval('3_monthly')}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer text-center relative ${
                  billingInterval === '3_monthly'
                    ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-300/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{isZh ? '3個月考季通' : '3-Month Pass'}</span>
                <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-black">
                  -24%
                </span>
              </button>

              <button
                type="button"
                onClick={() => setBillingInterval('one_time')}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer text-center ${
                  billingInterval === 'one_time'
                    ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-300/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isZh ? '一次性全通' : 'One-Time Pass'}
              </button>

            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => {
            const isCurrent = userTier === tier.id;
            
            let displayPrice = tier.priceMonthly;
            let intervalLabel = isZh ? '/ 每月' : '/ month';
            let sublabel = isZh ? '隨時可取消訂閱' : 'Cancel anytime';

            if (billingInterval === '3_monthly') {
              displayPrice = tier.price3Monthly;
              intervalLabel = isZh ? '/ 每3個月' : '/ every 3 mos';
              sublabel = isZh ? `平均每月約 HK$${Math.round(tier.price3Monthly / 3)}` : `~HK$${Math.round(tier.price3Monthly / 3)}/mo`;
            } else if (billingInterval === 'one_time') {
              displayPrice = tier.priceOneTime;
              intervalLabel = isZh ? ' 一次性付款' : ' one-time';
              sublabel = isZh ? '考季全通，直至及格' : 'Full access until qualified';
            }

            const isLoading = loadingTier === tier.id;

            return (
              <div
                key={tier.id}
                className={`rounded-3xl border bg-white p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  tier.isPopular
                    ? 'border-amber-500 shadow-xl ring-2 ring-amber-400/40 md:-translate-y-2'
                    : 'border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block">
                      {tier.track} LICENSING
                    </span>
                    <h3 className="text-xl font-black text-slate-900 pt-1">
                      {isZh ? tier.nameZh : tier.nameEn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                      {isZh ? tier.subtitleZh : tier.subtitleEn}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-slate-500">HK$</span>
                      <span className="text-4xl font-black tracking-tight text-slate-900">{displayPrice}</span>
                      <span className="text-xs font-semibold text-slate-500">{intervalLabel}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-emerald-700 mt-1.5">
                      {sublabel}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block tracking-wider">
                      {isZh ? '包含所有專業權限：' : 'INCLUDED IN PLAN:'}
                    </span>
                    {(isZh ? tier.featuresZh : tier.featuresEn).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold leading-relaxed">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    disabled={isLoading || isCurrent}
                    onClick={() => handleCheckout(tier.id, tier.track)}
                    className={`w-full py-3.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50 ${
                      tier.isPopular
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-slate-950 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {isLoading ? (
                      <span>{isZh ? '連線 Stripe 中...' : 'Connecting...'}</span>
                    ) : isCurrent ? (
                      <span>{isZh ? '目前使用中計劃' : 'Current Active Plan'}</span>
                    ) : !isLoggedIn ? (
                      <>
                        <LogIn className="h-4 w-4" />
                        <span>{isZh ? '登入後開通 PRO' : 'Log in to Upgrade'}</span>
                      </>
                    ) : (
                      <>
                        <span>{isZh ? '立即開通' : 'Get Started'}</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Preview Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">FREE PREVIEW</span>
            <h4 className="text-lg font-bold text-slate-900">{isZh ? '免費體驗前 10 題' : 'Try Free Preview First'}</h4>
            <p className="text-xs text-slate-600">{isZh ? '免綁定信用卡，即刻體驗 10 題全真測驗、模擬試場與速記閃卡。' : 'No credit card needed. Instant access to 10 questions.'}</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/quiz" className="px-5 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition">
              {isZh ? '體驗題庫' : 'Try Quiz'}
            </Link>
            <Link href="/mock-exam" className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition">
              {isZh ? '體驗模擬考' : 'Try Mock Exam'}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}