// app/sqe-next/page.tsx
// Same design system as homepage + EAQE Dec 15 page: slate-50, amber-500, emerald Pass Promise, rounded-3xl cards
// NOTE: SQE 17 Nov registration already closed. This page is for NEXT sitting + retakers.

'use client';

import React, { useState } from 'react';
import { useRegisterableExamCountdown, useExamCountdown, formatExamDate } from '@/app/lib/examSchedule';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export default function SQENextPage() {
  const { language, locale } = useLanguage();
  const [langOverride, setLangOverride] = useState<'EN' | 'ZH' | null>(null);
  const detectedLang = (language || locale || 'EN').toString().toUpperCase();
  const isZh = langOverride ? langOverride === 'ZH' : detectedLang.includes('ZH') || detectedLang.includes('HK') || detectedLang.includes('CN');

  // Header countdown - SYNCED to exam schedule, REGISTERABLE exam only
  // Today 16 Nov: skips 17 Nov (reg closed 3 Nov), shows 25 Jan 2027 • Reg closes 11 Jan • 70 days
  // After 17 Nov, still shows 25 Jan. After 25 Jan, auto-rolls to 26 Feb, etc.
  const { exam: sqeExam, daysToExam: sqeDaysToExam, daysToReg: sqeDaysToReg } = useRegisterableExamCountdown('SQE');
  const sqeExamLabelZh = sqeExam ? formatExamDate(sqeExam.examDate, true) : '1月25日';
  const sqeExamLabelEn = sqeExam ? formatExamDate(sqeExam.examDate, false) : '25 JAN';
  const sqeRegLabelZh = sqeExam ? formatExamDate(sqeExam.regOnline, true) : '1月11日';
  const sqeRegLabelEn = sqeExam ? formatExamDate(sqeExam.regOnline, false) : '11 JAN';

  // Immediate next exam (for context line: 17 Nov closed)
  const { exam: sqeNextRaw } = useExamCountdown('SQE');
  const sqeRawLabelZh = sqeNextRaw ? formatExamDate(sqeNextRaw.examDate, true) : '11月17日';
  const sqeRawLabelEn = sqeNextRaw ? formatExamDate(sqeNextRaw.examDate, false) : '17 NOV';

  const PASS_PROMISE_FAQS = isZh ? [
    { q: '如果我考試不合格，怎麼辦？', a: '如你符合合格承諾資格，我們會免費延長你的完整使用權 90 天，讓你準備重考。合格承諾是免費延期，不設現金退款。' },
    { q: '怎樣才符合合格承諾資格？', a: '你必須在考試前完成以下全部要求：', bullets: ['完成 AgentPass 內全部法定教學單元', '完成至少 3 次完整雙階段模擬考試，最後一次取得至少 60%', '將 SRS 錯題重溫完成至 90%'] },
    { q: '怎樣申請合格承諾？', a: '在購買後 90 天內應考 SQE，並在官方成績公布後 14 天內提出申請。請提供官方 PEAK / EAA 成績單，成績單上的姓名必須與你的 AgentPass 帳戶相同。' },
    { q: '合格承諾會退款嗎？', a: '不會。合格承諾只提供免費延期，不設現金退款、積分或轉讓。' },
  ] : [
    { q: 'What if I fail my exam?', a: 'If you qualify for Pass Promise, we extend your full access free for 90 days so you can prepare for your retake. Pass Promise is a free extension, not a cash refund.' },
    { q: 'How do I qualify for Pass Promise?', a: 'You must complete all of these before your exam:', bullets: ['Complete all statutory blocks in AgentPass', 'Complete at least 3 full dual-stage mocks, with at least 60% in your last mock', 'Clear your SRS error queue to 90%'] },
    { q: 'How do I claim Pass Promise?', a: 'Sit your SQE within 90 days of purchase, then submit a claim within 14 days of your official result. Send us your official PEAK / EAA result slip. The name on the slip must match your AgentPass account.' },
    { q: 'Does Pass Promise give me a refund?', a: 'No. Pass Promise is free extension only. There is no cash refund, credit, or transfer.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      <div className="bg-amber-500 text-slate-950 text-center text-xs sm:text-sm font-black py-2.5 px-4 tracking-wide">
        {sqeDaysToReg > 0
          ? (isZh ? `SQE ${sqeExamLabelZh} • ${sqeRegLabelZh}截止報名 • 尚餘 ${sqeDaysToExam} 日` : `SQE ${sqeExamLabelEn} • REGISTRATION CLOSES ${sqeRegLabelEn} • ${sqeDaysToExam} DAYS LEFT`)
          : (isZh ? `SQE ${sqeExamLabelZh} • 報名已截止 • 尚餘 ${sqeDaysToExam} 日應考` : `SQE ${sqeExamLabelEn} • REGISTRATION CLOSED • ${sqeDaysToExam} DAYS TO EXAM`)}
      </div>

      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                {isZh ? `SQE 下一期 • ${sqeExamLabelZh} • 尚餘 ${sqeDaysToExam} 日` : `SQE NEXT • ${sqeExamLabelEn} • ${sqeDaysToExam} DAYS LEFT`}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                {isZh ? <>SQE 下一期。<br />第一次就合格。</> : <>SQE Next Sitting.<br />Pass <span className="text-amber-600 underline decoration-amber-300 decoration-wavy decoration-2">First Time.</span></>}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {isZh ? 'SQE 11月17日已截止報名。此頁為下一期 + 重考。提早開始：先做免費診斷，搵到你最弱嗰個位，再用 SRS 補返。對齊 EAA 課程及實務通告，非 EAA 認可。' : 'SQE 17 Nov registration already closed. This page is for next sitting + retakers. Start early: take the free diagnostic, find your weakest block, then fix it with SRS. Aligned to EAA syllabus and practice circulars. Not EAA approved.'}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/diagnostic?track=SQE" className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5">
                  {isZh ? '做免費 5 題診斷 →' : 'Take Free 5-Question Diagnostic →'}
                </Link>
                <Link href="#pricing-section" className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition">
                  {isZh ? '睇備考計劃' : 'View Preparation Plans'}
                </Link>
              </div>
              <p className="text-xs text-slate-500">{isZh ? `SQE ${sqeRawLabelZh}：已截止 • 下一可報考：${sqeExamLabelZh} • ${sqeRegLabelZh}截止 • 尚餘 ${sqeDaysToExam} 日` : `SQE ${sqeRawLabelEn}: registration closed • Next registerable: ${sqeExamLabelEn} • Reg closes ${sqeRegLabelEn} • ${sqeDaysToExam} days left`}</p>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200 space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <p className="text-[11px] font-black uppercase tracking-wider text-amber-600">{isZh ? '適合邊個？' : 'WHO IS THIS FOR?'}</p>
                  <h3 className="text-xl font-black text-slate-950 mt-1">{isZh ? '考緊下一期 SQE' : 'Sitting SQE Next'}</h3>
                </div>
                <ul className="text-sm text-slate-700 space-y-3">
                  <li className="flex gap-2"><span className="text-emerald-600 font-bold">✓</span><span>{isZh ? '第一次考 SQE，下一期' : 'First-time SQE takers, next sitting'}</span></li>
                  <li className="flex gap-2"><span className="text-emerald-600 font-bold">✓</span><span>{isZh ? '上次 Form 1-6 / Cap. 511 跌咗，重考' : 'Retakers who failed Form 1-6 or Cap. 511'}</span></li>
                  <li className="flex gap-2"><span className="text-emerald-600 font-bold">✓</span><span>{isZh ? '想提早 60 日開始，唔捱夜' : 'Want 60 days early, no cramming'}</span></li>
                </ul>
                <div className="pt-2">
                  <Link href="/diagnostic?track=SQE" className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition">
                    {isZh ? '即刻做診斷 →' : 'Start Diagnostic Now →'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-amber-600">{isZh ? '60日計劃' : '60-DAY PLAN'}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">{isZh ? '點樣用 60 日合格？' : 'How You Pass in 60 Days'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4"><span className="text-4xl font-black text-amber-500/20">01</span><h3 className="text-xl font-bold text-slate-950">{isZh ? '第 1-20 日：打底' : 'Days 1-20: Foundations'}</h3><p className="text-sm text-slate-600 leading-relaxed">{isZh ? '完成 SQE 法定單元。Form 1-6 + Cap. 511。' : 'Finish SQE statutory blocks. Form 1-6 + Cap. 511.'}</p></div>
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4"><span className="text-4xl font-black text-amber-500/20">02</span><h3 className="text-xl font-bold text-slate-950">{isZh ? '第 21-40 日：陷阱 + 模擬' : 'Days 21-40: Traps + Mocks'}</h3><p className="text-sm text-slate-600 leading-relaxed">{isZh ? '標準 IRIS 個案 + Mock 1 + Mock 2。' : 'Standard IRIS cases + Mock 1 + Mock 2.'}</p></div>
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4"><span className="text-4xl font-black text-amber-500/20">03</span><h3 className="text-xl font-bold text-slate-950">{isZh ? '第 41-60 日：模擬 + 錯題' : 'Days 41-60: Mocks + Errors'}</h3><p className="text-sm text-slate-600 leading-relaxed">{isZh ? 'Mock 3 + SRS 錯題到 90%。' : 'Mock 3 + SRS error queue to 90%.'}</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1"><p className="text-sm font-black text-slate-900">SQE Blocks</p><p className="text-xs text-slate-500">Full SQE syllabus</p></div>
            <div className="space-y-1"><p className="text-sm font-black text-slate-900">Form 1-6</p><p className="text-xs text-slate-500">Agency agreements</p></div>
            <div className="space-y-1"><p className="text-sm font-black text-slate-900">SRS Error Queue</p><p className="text-xs text-slate-500">To 90% before exam</p></div>
            <div className="space-y-1"><p className="text-sm font-black text-slate-900">3 Dual-Stage Mocks</p><p className="text-xs text-slate-500">60% in last mock for Pass Promise</p></div>
          </div>
        </div>
      </section>

      <section id="pricing-section" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3">
              <p className="text-xs font-black uppercase tracking-widest text-amber-600">TRANSPARENT PASS PLANS</p>
              <button type="button" onClick={() => setLangOverride(isZh ? 'EN' : 'ZH')} className="px-2.5 py-0.5 rounded-full border border-slate-300 bg-white text-[11px] font-bold text-slate-700 hover:border-amber-500 transition cursor-pointer">{isZh ? 'EN' : '繁體中文'}</button>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">{isZh ? '揀一個計劃，今晚開始' : 'Pick a Plan. Start Tonight.'}</h2>
            <p className="text-sm text-slate-600">{isZh ? '一次性通行證包括合格承諾。月費及 3 個月通不包括。' : 'One-Time Pass includes Pass Promise. Monthly and 3-Month do not.'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase">{isZh ? '按月訂閱' : 'MONTHLY ROLLING'}</span>
                <h3 className="text-2xl font-black text-slate-950">HK$ 198<span className="text-xs text-slate-500 font-normal"> / month</span></h3>
                <p className="text-xs text-slate-600">{isZh ? '靈活按月，隨時取消。' : 'Flexible monthly access. Cancel anytime.'}</p>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200"><p className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5"><ShieldAlert className="h-4 w-4 text-slate-400 shrink-0" /><span>{isZh ? '不包括合格承諾 Pass Promise' : 'Pass Promise not included'}</span></p></div>
              </div>
              <Link href="/pricing?interval=monthly" className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition">{isZh ? '查看按月選項 →' : 'View Monthly Options →'}</Link>
            </div>
            <div className="bg-white rounded-3xl p-8 border-2 border-amber-500 shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">{isZh ? '最受歡迎 • 節省 24%' : 'MOST POPULAR • SAVE 24%'}</div>
              <div className="space-y-4 pt-1">
                <span className="text-xs font-bold text-amber-600 uppercase">{isZh ? '3 個月考季通' : '3-MONTH PASS'}</span>
                <h3 className="text-2xl font-black text-slate-950">HK$ 480<span className="text-xs text-slate-500 font-normal"> / quarter</span></h3>
                <p className="text-xs text-slate-600">{isZh ? '標準 90 天衝刺週期。' : 'Standard 90-day revision window.'}</p>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200"><p className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5"><ShieldAlert className="h-4 w-4 text-slate-400 shrink-0" /><span>{isZh ? '不包括合格承諾 Pass Promise' : 'Pass Promise not included'}</span></p></div>
              </div>
              <Link href="/pricing?interval=3_monthly" className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs text-center transition shadow-md shadow-amber-500/20">{isZh ? '購買 3 個月考季通 →' : 'Get 3-Month Pass →'}</Link>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase">{isZh ? '一次性通行證' : 'ONE-TIME PASS'}</span>
                <h3 className="text-2xl font-black text-slate-950">HK$ 780<span className="text-xs text-slate-500 font-normal"> one-time</span></h3>
                <p className="text-xs text-slate-600">{isZh ? '一次付款，專注備考至考試日。' : 'One payment. Full access for your exam cycle.'}</p>
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                  <p className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" /><span>{isZh ? '已包括合格承諾 Pass Promise' : 'Pass Promise included'}</span></p>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">{isZh ? '如你完成整個課程，應考後仍未合格，我們免費延長你的完整使用權 90 天，讓你重考。不設現金退款。' : 'If you complete the programme, sit your exam, and do not pass, we extend your full access free for 90 days so you can retake. No cash refund.'}</p>
                </div>
              </div>
              <div className="space-y-2.5">
                <Link href="/pricing?interval=one_time" className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center block transition">{isZh ? '購買一次性通行證 →' : 'Get One-Time Pass →'}</Link>
                <p className="text-[11px] text-slate-500 leading-relaxed text-center">{isZh ? '經 Stripe 一次付款。合格承諾只提供 90 天免費延期，不設現金退款。' : 'One payment via Stripe. Pass Promise is a free 90-day extension only, not a refund.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pass-promise-conditions" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold uppercase">{isZh ? 'PASS PROMISE 合格承諾條款' : 'PASS PROMISE CONDITIONS & FAQ'}</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">{isZh ? '合格承諾詳細條件' : 'Pass Promise Conditions'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PASS_PROMISE_FAQS.map((faq: any, index: number) => (
              <div key={index} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5">
                <h3 className="text-sm font-black text-slate-950">{index + 1}. {faq.q}</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{faq.a}</p>
                {faq.bullets && (<ul className="space-y-1.5 pt-1 text-xs text-slate-800 font-semibold">{faq.bullets.map((b: string, bi: number) => (<li key={bi} className="flex items-start gap-2"><span className="text-emerald-600 font-bold">•</span><span>{b}</span></li>))}</ul>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-black text-white">{isZh ? '提早開始，唔好等到最後。' : 'Start Early. Do Not Wait.'}</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">{isZh ? '先做免費診斷，睇下你邊個位最弱。' : 'Take the free diagnostic first. See your weakest block, then start Block 1 tonight.'}</p>
          <div><Link href="/diagnostic?track=SQE" className="inline-flex px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition shadow-xl shadow-amber-500/20">{isZh ? '做免費 5 題診斷 →' : 'Start Free 5-Question Diagnostic →'}</Link></div>
        </div>
      </section>
    </div>
  );
}