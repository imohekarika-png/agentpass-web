// app/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export default function HomePage() {
  const { language, locale } = useLanguage();
  const [langOverride, setLangOverride] = useState<'EN' | 'ZH' | null>(null);

  const detectedLang = (language || locale || 'EN').toString().toUpperCase();
  const isZh = langOverride
    ? langOverride === 'ZH'
    : detectedLang.includes('ZH') || detectedLang.includes('HK') || detectedLang.includes('CN');

  const [selectedTrack, setSelectedTrack] = useState<'EAQE' | 'SQE'>('EAQE');
  const [sampleAnswer, setSampleAnswer] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      <div className="bg-amber-500 text-slate-950 text-center text-xs sm:text-sm font-black py-2.5 px-4 tracking-wide">{isZh ? "EAQE 12月15日 • 12月1日截止報名 • 尚餘 30 日" : "EAQE 15 DEC • REGISTRATION CLOSES 1 DEC • 30 DAYS LEFT"}</div>
      
      {/* =========================================================
          STAGE 1: HERO SECTION + DUAL TRACK SELECTOR
         ========================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                AI-Powered Prep for HK EAA Licensing Exams • EAQE 15 Dec Sprint
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                Pass <span className="text-amber-600 underline decoration-amber-300 decoration-wavy decoration-2">EAQE on 15 Dec</span> First Time
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Registration closes 1 Dec. 20 statutory blocks, SRS, Memory Palace mnemonics, and IRIS dossiers - built to fix the traps that fail most first-timers in 30 days. Aligned to EAA syllabus and practice circulars. Not EAA approved.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/diagnostic"
                  className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  Take Free 5-Question Diagnostic →
                </Link>
                <Link
                  href="/eaqe-dec-15"
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition"
                >
                  See EAQE Dec 15 Plan
                </Link>
              </div>
            </div>

            {/* Right Column: Track Selector */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200 space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <p className="text-[11px] font-black uppercase tracking-wider text-amber-600">STEP 1: SELECT YOUR TARGET EXAM</p>
                  <h3 className="text-xl font-black text-slate-950 mt-1">Streamline Relevant Content</h3>
                  <p className="text-xs text-slate-500 mt-1">Focus your questions and statutory traps on your specific license category.</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedTrack('EAQE')}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      selectedTrack === 'EAQE'
                        ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                        : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-slate-950">EAQE Estate Agent License (大牌)</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">Individual License</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">20 Statutory Blocks • 100 Qs Full Paper • Part II IRIS Land Search</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedTrack === 'EAQE' ? 'border-amber-600 bg-amber-500 text-white' : 'border-slate-300'}`}>
                      {selectedTrack === 'EAQE' && <span className="text-xs">✓</span>}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedTrack('SQE')}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      selectedTrack === 'SQE'
                        ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                        : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-slate-950">SQE Salesperson License (細牌)</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">Salesperson</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">16 Statutory Blocks • 60 Qs Paper • Basic Agency & Form Practice</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedTrack === 'SQE' ? 'border-amber-600 bg-amber-500 text-white' : 'border-slate-300'}`}>
                      {selectedTrack === 'SQE' && <span className="text-xs">✓</span>}
                    </div>
                  </button>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/diagnostic?track=${selectedTrack}`}
                    className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    Launch {selectedTrack} Diagnostic Environment →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 2: AUTHORITY & STATUTORY COMPLIANCE STRIP
         ========================================================= */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-sm font-black text-slate-900">100% EAA Aligned</p>
              <p className="text-xs text-slate-500">Cap. 511, Cap. 219 & Cap. 123</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-slate-900">Official 60% Passing Mark</p>
              <p className="text-xs text-slate-500">Diagnostic Weakness Radar</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-slate-900">IRIS Land Search Cases</p>
              <p className="text-xs text-slate-500">Probate, Lis Pendens & Encumbrances</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-slate-900">Spaced Repetition (SRS)</p>
              <p className="text-xs text-slate-500">Automated Error Queue Review</p>
            </div>
          </div>
        </div>
      </section>


      {/* STAGE 2.5: EAQE DEC 15 - 30 DAY PLAN (SPRINT ADD) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-amber-600">{isZh ? "EAQE 12月15日 • 30日計劃" : "EAQE 15 DEC • 30-DAY PLAN"}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">{isZh ? "30 日，唔需要更多筆記" : "30 Days. You Do Not Need More Notes."}</h2>
            <p className="text-sm text-slate-600">{isZh ? "你需要停低跌入同一個 IRIS 陷阱。先做診斷，再按計劃做。" : "You need to stop falling for the same IRIS traps. Diagnose first, then follow the plan."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4"><span className="text-4xl font-black text-amber-500/20">01</span><h3 className="text-xl font-bold text-slate-950">{isZh ? "第 1-10 日：打底" : "Days 1-10: Foundations"}</h3><p className="text-sm text-slate-600 leading-relaxed">{isZh ? "完成 20 個法定單元。診斷到 60%。每日 60-90 分鐘。" : "Finish 20 statutory blocks. Diagnostic to 60%. 60-90 mins per day."}</p></div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4"><span className="text-4xl font-black text-amber-500/20">02</span><h3 className="text-xl font-bold text-slate-950">{isZh ? "第 11-20 日：IRIS 陷阱" : "Days 11-20: IRIS Traps"}</h3><p className="text-sm text-slate-600 leading-relaxed">{isZh ? "Probate、Lis Pendens、Encumbrances、Floating Charges。Mock 1 + Mock 2。" : "Probate, Lis Pendens, Encumbrances, Floating Charges. Mock 1 + Mock 2."}</p></div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4"><span className="text-4xl font-black text-amber-500/20">03</span><h3 className="text-xl font-bold text-slate-950">{isZh ? "第 21-30 日：模擬 + 錯題" : "Days 21-30: Mocks + Errors"}</h3><p className="text-sm text-slate-600 leading-relaxed">{isZh ? "Mock 3 + SRS 錯題到 90%。考試日清單。" : "Mock 3 + SRS error queue to 90%. Exam-day checklist."}</p></div>
          </div>
          <div className="text-center"><Link href="/eaqe-dec-15" className="inline-flex px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition">{isZh ? "睇 EAQE 12月15日完整計劃 →" : "See Full EAQE Dec 15 Plan →"}</Link></div>
        </div>
      </section>

      {/* =========================================================
          STAGE 3: THE 3-STEP PASS ENGINE
         ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-amber-600">3-STEP CANDIDATE METHODOLOGY</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">How AgentPass™ Gives You The Edge</h2>
            <p className="text-sm text-slate-600">A deliberate learning architecture designed to eliminate memorization fatigue and trap failures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <span className="text-4xl font-black text-amber-500/20">01</span>
              <h3 className="text-xl font-bold text-slate-950">Study Statutory Blocks</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Review verified statutory notes across all 20 syllabus blocks. Master essential ordinance provisions with side-by-side &quot;Do Not Confuse&quot; trap tables.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <span className="text-4xl font-black text-amber-500/20">02</span>
              <h3 className="text-xl font-bold text-slate-950">Active Recall & Flashcards</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Retain critical statutory numbers, penalties, and time bars using automated Leitner spaced repetition. Tricky legal limits resurface right before you forget them.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <span className="text-4xl font-black text-amber-500/20">03</span>
              <h3 className="text-xl font-bold text-slate-950">Dual-Stage Mock Exam</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Experience the authentic 3-hour exam pressure. Tackle Part I statutory MCQs and Part II IRIS Land Search document dossiers under official countdown timers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 4: INTERACTIVE SAMPLE QUESTION
         ========================================================= */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-10">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              TRY A LIVE SAMPLE QUESTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Can you answer this high-frequency exam trap?</h2>
            <p className="text-xs sm:text-sm text-slate-400">Section 5 of the Land Registration Ordinance (Cap. 128)</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <p className="text-base sm:text-lg font-bold text-slate-100">
              Under Cap. 128, an instrument registered within how many days of execution retains statutory priority from its date of execution?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                { key: 'A', label: '14 days' },
                { key: 'B', label: '30 days (One Month)' },
                { key: 'C', label: '60 days' },
                { key: 'D', label: '3 months' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSampleAnswer(opt.key)}
                  className={`p-4 rounded-xl border text-left font-semibold transition cursor-pointer ${
                    sampleAnswer === opt.key
                      ? opt.key === 'B'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                        : 'border-rose-500 bg-rose-500/10 text-rose-300'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-amber-400 mr-2">{opt.key}.</span> {opt.label}
                </button>
              ))}
            </div>

            {sampleAnswer && (
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                sampleAnswer === 'B'
                  ? 'border-emerald-800 bg-emerald-950/40 text-emerald-200'
                  : 'border-amber-800 bg-amber-950/40 text-amber-200'
              }`}>
                {sampleAnswer === 'B' ? (
                  <p>
                    <strong className="text-emerald-400">Correct!</strong> Under Section 5 of Cap. 128, instruments lodged within <strong>30 days</strong> of execution relate back to their execution date. After 30 days, priority is determined strictly by the registration date.
                  </p>
                ) : (
                  <p>
                    <strong className="text-rose-400">Incorrect.</strong> The statutory window is <strong>30 days (Option B)</strong> under Cap. 128. Failure to register within 30 days forfeits retroactive priority back to the execution date.
                  </p>
                )}
                <div className="mt-3 pt-3 border-t border-slate-800 flex justify-end">
                  <Link href="/mock-exam" className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1">
                    Practice 10 More Free Questions →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 5: EAQE VS. SQE COMPARISON TABLE
         ========================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl font-black text-slate-950">Which License Are You Sitting For?</h2>
            <p className="text-sm text-slate-600">Review the differences between Estate Agent (大牌) and Salesperson (細牌) requirements.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-400 uppercase text-xs">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4 text-slate-900 font-black">EAQE (地產代理資格考試)</th>
                  <th className="py-3 px-4 text-slate-900 font-black">SQE (地產營業員資格考試)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">License Granted</td>
                  <td className="py-3.5 px-4">Individual Estate Agent (大牌 - Can run agency)</td>
                  <td className="py-3.5 px-4">Salesperson (細牌 - Employed agent)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Exam Format</td>
                  <td className="py-3.5 px-4">100 MCQs (3 Hours)</td>
                  <td className="py-3.5 px-4">60 MCQs (2.5 Hours)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Passing Mark</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600">60% in both Part I & Part II</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600">60% in both Part I & Part II</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">IRIS Land Search Depth</td>
                  <td className="py-3.5 px-4">Part II: 20 Advanced Corporate & Probate cases</td>
                  <td className="py-3.5 px-4">Part II: 10 Standard Residential cases</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Key Statutory Focus</td>
                  <td className="py-3.5 px-4">Cap. 511, Manager liabilities, floating charges</td>
                  <td className="py-3.5 px-4">Standard Agency Agreements (Form 1 to 6), Cap. 511</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 6: PRICING PLANS PREVIEW
         ========================================================= */}
      <section id="pricing-section" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3">
              <p className="text-xs font-black uppercase tracking-widest text-amber-600">TRANSPARENT PASS PLANS</p>
              <button
                type="button"
                onClick={() => setLangOverride(isZh ? 'EN' : 'ZH')}
                className="px-2.5 py-0.5 rounded-full border border-slate-300 bg-white text-[11px] font-bold text-slate-700 hover:border-amber-500 transition cursor-pointer"
              >
                {isZh ? 'EN' : '繁體中文'}
              </button>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Invest in Your Hong Kong Real Estate Career</h2>
            <p className="text-sm text-slate-600">Complete access to question banks, mock exams, and flashcards with instant Stripe checkout.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Monthly */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {isZh ? '按月訂閱' : 'MONTHLY ROLLING'}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-extrabold text-slate-600">
                    {isZh ? '靈活按月，隨時取消' : 'Flexible monthly access'}
                  </p>
                  <h3 className="text-2xl font-black text-slate-950">
                    {isZh ? (
                      <>HK$ 198<span className="text-xs text-slate-500 font-normal"> / 每月</span></>
                    ) : (
                      <>From HK$ 198<span className="text-xs text-slate-500 font-normal"> / month</span></>
                    )}
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  {isZh
                    ? '適合短期衝刺。你可隨時於後台取消下期訂閱。'
                    : 'Flexible monthly access for fast brush-ups. Cancel anytime from your billing portal.'}
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pt-2">
                  {(isZh
                    ? ['完整法定題庫與模擬考場', 'IRIS 土地查冊雙個案庫', '電腦及手機跨裝置使用']
                    : ['Full Statutory Question Bank', 'IRIS Land Search Dossiers', 'Cross-device desktop & mobile access']
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* NOT Included Pass Promise Callout */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{isZh ? '不包括合格承諾 Pass Promise' : 'Pass Promise not included'}</span>
                  </p>
                </div>
              </div>
              <Link href="/pricing?interval=monthly" className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition">
                {isZh ? '查看按月選項 →' : 'View Monthly Options →'}
              </Link>
            </div>

            {/* 3-Month Pass */}
            <div className="bg-white rounded-3xl p-8 border-2 border-amber-500 shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                {isZh ? '最受歡迎 • 節省 24%' : 'MOST POPULAR • SAVE 24%'}
              </div>
              <div className="space-y-4 pt-1">
                <span className="text-xs font-bold text-amber-600 uppercase">
                  {isZh ? '3 個月考季通' : '3-MONTH PASS'}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-extrabold text-amber-700">
                    {isZh ? '標準 90 天衝刺週期' : 'Standard 90-day revision'}
                  </p>
                  <h3 className="text-2xl font-black text-slate-950">
                    {isZh ? (
                      <>HK$ 480<span className="text-xs text-slate-500 font-normal"> / 每季</span></>
                    ) : (
                      <>From HK$ 480<span className="text-xs text-slate-500 font-normal"> / quarter</span></>
                    )}
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  {isZh
                    ? '最推薦的 90 天溫習黃金期，讓你以最佳狀態應試。'
                    : 'The standard 90-day revision window recommended by top estate agency training coaches.'}
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pt-2">
                  {(isZh
                    ? ['包含所有按月訂閱權限', '間隔重複 (SRS) 閃卡系統', '官方合格分數診斷雷達']
                    : ['All Monthly Features included', 'Spaced Repetition (SRS) Flashcards', 'Diagnostic Passing Score Radar']
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-medium text-slate-900">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* NOT Included Pass Promise Callout */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{isZh ? '不包括合格承諾 Pass Promise' : 'Pass Promise not included'}</span>
                  </p>
                </div>
              </div>
              <Link href="/pricing?interval=3_monthly" className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs text-center transition shadow-md shadow-amber-500/20">
                {isZh ? '購買 3 個月考季通 →' : 'Get 3-Month Pass →'}
              </Link>
            </div>

            {/* One-Time Pass (+56% Updated: From HK$ 780) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {isZh ? '一次性通行證' : 'ONE-TIME PASS'}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-extrabold text-amber-700">
                    {isZh ? '一次付款，專注備考至考試日' : 'Pay Once. Study Until Your Exam.'}
                  </p>
                  <h3 className="text-2xl font-black text-slate-950">
                    {isZh ? (
                      <>HK$ 780 起<span className="text-xs text-slate-500 font-normal">，一次性</span></>
                    ) : (
                      <>From HK$ 780<span className="text-xs text-slate-500 font-normal"> one-time</span></>
                    )}
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  {isZh
                    ? '一次付款，沒有月費，完整使用至你的考試週期。'
                    : 'One payment. No monthly billing. Full access for your exam cycle.'}
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pt-2">
                  {(isZh
                    ? [
                        '無限次模擬考試，第一部分 + 第二部分 IRIS 土地查冊個案',
                        '完整法定題庫，涵蓋 20 個教學單元',
                        '間隔重複 (SRS) 閃卡 + 錯題重溫',
                        '高效法定重點筆記',
                        '合格分數診斷雷達',
                        '電腦及手機跨裝置使用',
                      ]
                    : [
                        'Uncapped Mock Exams, Part I + Part II IRIS dossiers',
                        'Full Statutory Question Bank, all 20 syllabus blocks',
                        'Spaced Repetition (SRS) Flashcards + Error Queue',
                        'High-Yield Statutory Summary Kit',
                        'Diagnostic Passing Score Radar',
                        'Cross-device desktop and mobile access',
                      ]
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Pass Promise Callout */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                  <p className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{isZh ? '已包括合格承諾 Pass Promise' : 'Pass Promise included'}</span>
                  </p>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    {isZh ? (
                      <>
                        如你完成整個課程，應考後仍未合格，我們免費延長你的完整使用權 90 天，讓你重考。不設現金退款。詳見
                        <a href="#pass-promise-conditions" className="underline font-bold text-emerald-950 hover:text-amber-700 ml-0.5">合格承諾條款</a>。
                      </>
                    ) : (
                      <>
                        If you complete the programme, sit your exam, and do not pass, we extend your full access free for 90 days so you can retake. No cash refund. See{' '}
                        <a href="#pass-promise-conditions" className="underline font-bold text-emerald-950 hover:text-amber-700">Pass Promise conditions</a>.
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <Link
                  href="/pricing?interval=one_time"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center block transition"
                >
                  {isZh ? '購買一次性通行證 →' : 'Get One-Time Pass →'}
                </Link>
                <p className="text-[11px] text-slate-500 leading-relaxed text-center">
                  {isZh
                    ? '經 Stripe 一次付款。合格承諾只提供 90 天免費延期，不設現金退款。每個購買只可享用一次延期。'
                    : 'One payment via Stripe. Pass Promise is a free 90-day extension only, not a refund. One extension per purchase.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 6.5: PASS PROMISE CONDITIONS & FAQ
         ========================================================= */}
      <section
        id="pass-promise-conditions"
        className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold uppercase">
              {isZh ? 'PASS PROMISE 合格承諾條款及常見問題' : 'PASS PROMISE CONDITIONS & FAQ'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              {isZh ? '合格承諾詳細條件與常見問題' : 'Pass Promise Conditions & Frequently Asked Questions'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              {isZh
                ? '適用於所有一次性通行證（One-Time Pass）購買。以下列出完整 6 項資格及申請條款：'
                : 'Applies to One-Time Pass purchases. All 6 eligibility and claim conditions are listed below:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PASS_PROMISE_FAQS.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5"
              >
                <h3 className="text-sm font-black text-slate-950">
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
      </section>

      {/* =========================================================
          STAGE 7: URGENCY CTA BANNER
         ========================================================= */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-black text-white">EAQE 15 Dec. Registration Closes 1 Dec.</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Registration closes 1 Dec online, 24 Nov by post. Over 65% of first-timers fail on IRIS traps and time bars. If you are sitting Dec 15, start tonight with the free diagnostic, then Block 1.
          </p>
          <div>
            <Link
              href="/diagnostic"
              className="inline-flex px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition shadow-xl shadow-amber-500/20"
            >
              Start Free 5-Question Diagnostic →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}