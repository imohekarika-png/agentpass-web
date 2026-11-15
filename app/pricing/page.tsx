// app/pricing/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import PricingWelcomeBanner from '@/components/PricingWelcomeBanner';
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
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
  const [acceptedPassPromise, setAcceptedPassPromise] = useState<boolean>(false);
  const [showTermsWarning, setShowTermsWarning] = useState<boolean>(false);

  // Sync interval from query parameter (e.g., /pricing?interval=one_time)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const intervalParam = params.get('interval');
      if (intervalParam === 'monthly' || intervalParam === '3_monthly' || intervalParam === 'one_time') {
        setBillingInterval(intervalParam);
      }
    }
  }, []);

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
        '已包括合格承諾 Pass Promise（一次性通行證適用）',
      ],
      featuresEn: [
        'Simultaneous access to both EAQE (100 Qs) and SQE (60 Qs) suites',
        'Unlimited AI Cognitive Exam Synthesizer for new dynamic items',
        'Full 130-question bank & complete active recall deck',
        'Priority AI Diagnostic Weakness Tutoring',
        'High-yield statutory numbers & formula cheat sheet',
        'Pass Promise included (applies to One-Time Pass)',
      ],
    },
  ];

  const PASS_PROMISE_FAQS = isZh
    ? [
        {
          q: '如果我考試不合格，怎麼辦？',
          a: '如你符合合格承諾資格，我們會免費延長你的完整使用權 90 天，讓你準備重考。合格承諾是免費延期，不設現金退款。',
        },
        {
          q: '怎樣才符合合格承諾資格？',
          a: '你必須在考試前完成以下全部要求：',
          bullets: [
            '完成 AgentPass 內全部 20 個法定教學單元',
            '完成至少 3 次完整雙階段模擬考試，最後一次取得至少 60%',
            '將 SRS 錯題重溫完成至 90%',
          ],
        },
        {
          q: '怎樣申請合格承諾？',
          a: '在購買後 90 天內應考 EAQE 或 SQE，並在官方成績公布後 14 天內提出申請。請提供官方 PEAK / EAA 成績單，成績單上的姓名必須與你的 AgentPass 帳戶相同。',
        },
        {
          q: '延期有多長？',
          a: '90 天，完整使用權，同一帳戶。每個購買只可享用一次延期。',
        },
        {
          q: '合格承諾會退款嗎？',
          a: '不會。合格承諾只提供免費延期，不設現金退款、積分或轉讓。',
        },
        {
          q: '有什麼情況不包括？',
          a: '缺席、遲到、被取消資格、未完成課程、共用帳戶，或未能提供官方成績單，均不包括。合格承諾只適用於一次性通行證，不適用於月費或 3 個月通行證。',
        },
      ]
    : [
        {
          q: 'What if I fail my exam?',
          a: 'If you qualify for Pass Promise, we extend your full access free for 90 days so you can prepare for your retake. Pass Promise is a free extension, not a cash refund.',
        },
        {
          q: 'How do I qualify for Pass Promise?',
          a: 'You must complete all of these before your exam:',
          bullets: [
            'Complete all 20 statutory blocks in AgentPass',
            'Complete at least 3 full dual-stage mocks, with at least 60% in your last mock',
            'Clear your SRS error queue to 90%',
          ],
        },
        {
          q: 'How do I claim Pass Promise?',
          a: 'Sit your EAQE or SQE within 90 days of purchase, then submit a claim within 14 days of your official result. Send us your official PEAK / EAA result slip. The name on the slip must match your AgentPass account.',
        },
        {
          q: 'How long is the extension?',
          a: '90 days, full access, same account. One extension per purchase.',
        },
        {
          q: 'Does Pass Promise give me a refund?',
          a: 'No. Pass Promise is free extension only. There is no cash refund, credit, or transfer.',
        },
        {
          q: 'What is not covered?',
          a: 'No-show, late arrival, disqualification, incomplete programme, shared account, or a claim without an official result slip. Pass Promise applies to One-Time Pass only, not Monthly or 3-Month Pass.',
        },
      ];

  const handleCheckout = async (tier: PaidTier, track: 'EAQE' | 'SQE') => {
    // 1. Require Pass Promise condition acknowledgment for One-Time Pass
    if (billingInterval === 'one_time' && !acceptedPassPromise) {
      setShowTermsWarning(true);
      return;
    }

    // 2. Client-Side Gate: Require authentication prior to checkout
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(`/pricing?tier=${tier}&interval=${billingInterval}`)}`);
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
          acceptedPassPromise: billingInterval === 'one_time' ? acceptedPassPromise : undefined,
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
        
        {/* Newly Confirmed User Conversion Banner */}
        <PricingWelcomeBanner />

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
                {isZh ? '一次性通行證' : 'One-Time Pass'}
              </button>

            </div>
          </div>
        </div>

        {/* One-Time Pass Checkout Confirmation Checkbox Bar */}
        {billingInterval === 'one_time' && (
          <div
            className={`max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl border transition-all ${
              showTermsWarning && !acceptedPassPromise
                ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                : 'bg-amber-50/90 border-amber-300'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={acceptedPassPromise}
                onChange={(e) => {
                  setAcceptedPassPromise(e.target.checked);
                  if (e.target.checked) setShowTermsWarning(false);
                }}
                className="mt-1 h-4 w-4 rounded border-slate-400 text-amber-600 focus:ring-amber-500 cursor-pointer shrink-0"
              />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                {isZh ? (
                  <>
                    我已閱讀合格承諾條款。我明白合格承諾是 90 天免費延期，不設退款。{' '}
                    <a
                      href="#pass-promise-conditions"
                      className="underline font-extrabold text-amber-800 hover:text-amber-950"
                    >
                      [查看條款]
                    </a>
                  </>
                ) : (
                  <>
                    I have read the Pass Promise conditions. I understand Pass Promise is a free 90-day extension, not a refund.{' '}
                    <a
                      href="#pass-promise-conditions"
                      className="underline font-extrabold text-amber-800 hover:text-amber-950"
                    >
                      [View conditions]
                    </a>
                  </>
                )}
              </span>
            </label>
            {showTermsWarning && !acceptedPassPromise && (
              <p className="text-xs font-bold text-rose-700 mt-2 pl-7">
                {isZh
                  ? '請先勾選確認你已閱讀合格承諾條款，然後繼續付款。'
                  : 'Please tick the checkbox above to confirm you have read the Pass Promise conditions before checkout.'}
              </p>
            )}
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div id="pricing-cards" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
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
              intervalLabel = isZh ? '，一次性' : ' one-time';
              sublabel = isZh
                ? '一次付款，沒有月費，完整使用至你的考試週期。'
                : 'One payment. No monthly billing. Full access for your exam cycle.';
            }

            const isLoading = loadingTier === tier.id;

            return (
              <div
                key={tier.id}
                id={`plan-${tier.id.toLowerCase()}`}
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

                  {/* Pass Promise Callout on One-Time Pass */}
                  {billingInterval === 'one_time' && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                      <p className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{isZh ? '已包括合格承諾 Pass Promise' : 'Pass Promise included'}</span>
                      </p>
                      <p className="text-[11px] text-emerald-800 leading-relaxed">
                        {isZh ? (
                          <>
                            如你完成整個課程，應考後仍未合格，我們免費延長你的完整使用權 90 天，讓你重考。不設現金退款。詳見
                            <a
                              href="#pass-promise-conditions"
                              className="underline font-bold text-emerald-950 hover:text-amber-700 ml-0.5"
                            >
                              合格承諾條款
                            </a>
                            。
                          </>
                        ) : (
                          <>
                            If you complete the programme, sit your exam, and do not pass, we extend your full access free for 90 days so you can retake. No cash refund. See{' '}
                            <a
                              href="#pass-promise-conditions"
                              className="underline font-bold text-emerald-950 hover:text-amber-700"
                            >
                              Pass Promise conditions
                            </a>
                            .
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-8 space-y-2.5">
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
                    ) : billingInterval === 'one_time' ? (
                      <>
                        <span>{isZh ? '購買一次性通行證' : 'Get One-Time Pass'}</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>{isZh ? '立即開通' : 'Get Started'}</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {billingInterval === 'one_time' && (
                    <p className="text-[11px] text-slate-500 leading-relaxed text-center">
                      {isZh
                        ? '經 Stripe 一次付款。合格承諾只提供 90 天免費延期，不設現金退款。每個購買只可享用一次延期。'
                        : 'One payment via Stripe. Pass Promise is a free 90-day extension only, not a refund. One extension per purchase.'}
                    </p>
                  )}
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

        {/* Pass Promise Conditions & FAQ Anchor Section */}
        <div
          id="pass-promise-conditions"
          className="p-7 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-8 scroll-mt-20"
        >
          <div className="space-y-2 border-b border-slate-100 pb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold uppercase">
              <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isZh ? 'PASS PROMISE 合格承諾條款及常見問題' : 'PASS PROMISE CONDITIONS & FAQ'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isZh ? '合格承諾詳細條件與常見問題' : 'Pass Promise Conditions & Frequently Asked Questions'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isZh
                ? '適用於所有一次性通行證（One-Time Pass）購買。以下列出完整 6 項資格及申請條款：'
                : 'Applies to One-Time Pass purchases. All 6 eligibility and claim conditions are listed below:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PASS_PROMISE_FAQS.map((faq, index) => (
              <div
                key={index}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2"
              >
                <h3 className="text-sm font-black text-slate-900">
                  {index + 1}. {faq.q}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">{faq.a}</p>
                {faq.bullets && (
                  <ul className="space-y-1.5 pt-1 text-xs text-slate-800 font-semibold">
                    {faq.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}