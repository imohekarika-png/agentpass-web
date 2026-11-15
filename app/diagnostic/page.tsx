// app/diagnostic/page.tsx
// Same design system as homepage: slate-50, amber-500, slate-950 dark cards, rounded-3xl, bilingual via useLanguage
// Route: /diagnostic?track=EAQE or SQE - reads track from search params if available, defaults to EAQE
'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

const QUESTIONS = [
  {
    q_en: 'Under Cap. 128, an instrument registered within how many days of execution retains priority from its execution date?',
    q_zh: '根據 Cap. 128，文件簽署後幾多日內註冊，先可以由簽署日開始有優先權？',
    options_en: ['14 days', '30 days (One Month)', '60 days', '3 months'],
    options_zh: ['14 日', '30 日（一個月）', '60 日', '3 個月'],
    correct: 1,
    explain_en: 'Section 5 Cap. 128: within 30 days, priority relates back to execution date. After 30 days, priority is by registration date.',
    explain_zh: 'Cap. 128 第 5 條：30 日內註冊，優先權由簽署日計起。過咗 30 日，只按註冊日計。',
  },
  {
    q_en: 'If there is a valid will, who applies for the grant?',
    q_zh: '如果有有效遺囑，邊個申請授予書？',
    options_en: ['Administrator', 'Executor named in will', 'Any agent', 'EAA'],
    options_zh: ['遺產管理人', '遺囑指定的遺囑執行人', '任何代理', 'EAA'],
    correct: 1,
    explain_en: 'With a will: executor applies. Without a will: administrator applies.',
    explain_zh: '有遺囑：遺囑執行人申請。無遺囑：遺產管理人申請。',
  },
  {
    q_en: 'What does a Lis Pendens do?',
    q_zh: 'Lis Pendens 係咩？',
    options_en: ['Blocks all sales forever', 'Registers a pending court action on title', 'Proves ownership', 'Cancels mortgage'],
    options_zh: ['永遠阻止出售', '將待決訴訟登記喺業權上', '證明業權', '取消按揭'],
    correct: 1,
    explain_en: 'Lis Pendens = pending litigation registered against title. Buyers will walk away until cleared.',
    explain_zh: 'Lis Pendens = 待決訴訟登記喺業權上。買家見到會卻步，直至清除。',
  },
  {
    q_en: 'When does a floating charge crystallise?',
    q_zh: '浮動押記幾時會固定化（crystallise）？',
    options_en: ['On registration', 'On specified event, e.g. winding up / default', 'Never', 'On signing'],
    options_zh: ['註冊嗰陣', '發生指定事件，例如清盤 / 違約', '永遠唔會', '簽署嗰陣'],
    correct: 1,
    explain_en: 'Floating charge crystallises on winding up, default, or other specified event in the charge.',
    explain_zh: '浮動押記喺清盤、違約或押記指明的事件發生時固定化。',
  },
  {
    q_en: 'Under Cap. 511, who is liable for building management breach?',
    q_zh: '根據 Cap. 511，大廈管理違規，邊個負責？',
    options_en: ['Manager only', 'Owner only', 'Depends on deed of mutual covenant + who breached', 'EAA'],
    options_zh: ['只係經理人', '只係業主', '視乎大廈公契 + 邊個違規', 'EAA'],
    correct: 2,
    explain_en: 'Cap. 511: liability follows the DMC and the party who breached. Exam loves manager vs owner traps.',
    explain_zh: 'Cap. 511：責任跟大廈公契 + 邊個違規。考試最鍾意考經理人 vs 業主陷阱。',
  },
];

function DiagnosticContent() {
  const { language, locale } = useLanguage();
  const detectedLang = (language || locale || 'EN').toString().toUpperCase();
  const isZh = detectedLang.includes('ZH') || detectedLang.includes('HK') || detectedLang.includes('CN');
  const searchParams = useSearchParams();
  const track = (searchParams.get('track') || 'EAQE').toUpperCase();
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [showResult, setShowResult] = useState(false);

  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length;
  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      <div className="bg-amber-500 text-slate-950 text-center text-xs sm:text-sm font-black py-2.5 px-4 tracking-wide">
        {isZh ? '免費 5 題診斷 • 3 分鐘 • 睇下你合格未' : 'FREE 5-QUESTION DIAGNOSTIC • 3 MINS • ARE YOU READY?'}
      </div>

      <section className="relative overflow-hidden pt-12 pb-12 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {isZh ? `${track} • 免費診斷` : `${track} • FREE DIAGNOSTIC`}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
            {isZh ? '5 題，睇下你 IRIS 合格未' : '5 Questions. See If Your IRIS Passes.'}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {isZh ? '做完即刻知你最弱嗰個位。唔好估，測咗先。' : 'Finish and see your weakest block instantly. Do not guess. Diagnose first.'}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          {QUESTIONS.map((q, qi) => (
            <div key={qi} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              <p className="text-xs font-black tracking-widest text-amber-400">Q{qi + 1} / 5 • {isZh ? '必考陷阱' : 'HIGH-FREQUENCY TRAP'}</p>
              <p className="text-base sm:text-lg font-bold text-slate-100">{isZh ? q.q_zh : q.q_en}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {(isZh ? q.options_zh : q.options_en).map((opt, oi) => {
                  const selected = answers[qi] === oi;
                  const isCorrect = oi === q.correct;
                  return (
                    <button
                      key={oi}
                      onClick={() => { const next = [...answers]; next[qi] = oi; setAnswers(next); }}
                      className={`p-4 rounded-xl border text-left font-semibold transition cursor-pointer ${
                        selected
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                            : 'border-rose-500 bg-rose-500/10 text-rose-300'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="text-amber-400 mr-2">{['A','B','C','D'][oi]}.</span> {opt}
                    </button>
                  );
                })}
              </div>
              {answers[qi] !== null && (
                <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${answers[qi] === q.correct ? 'border-emerald-800 bg-emerald-950/40 text-emerald-200' : 'border-amber-800 bg-amber-950/40 text-amber-200'}`}>
                  <p><strong>{answers[qi] === q.correct ? (isZh ? '啱！' : 'Correct!') : (isZh ? '錯咗。' : 'Incorrect.')}</strong> {isZh ? q.explain_zh : q.explain_en}</p>
                </div>
              )}
            </div>
          ))}

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-slate-900 space-y-4 text-center">
            {!showResult ? (
              <>
                <p className="text-sm text-slate-600">{isZh ? `已答 ${answers.filter((a) => a !== null).length} / 5` : `Answered ${answers.filter((a) => a !== null).length} / 5`}</p>
                <button
                  disabled={!allAnswered}
                  onClick={() => setShowResult(true)}
                  className={`px-8 py-4 rounded-2xl font-black text-sm transition shadow-xl ${allAnswered ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  {isZh ? '睇結果 →' : 'See My Result →'}
                </button>
                {!allAnswered && <p className="text-xs text-slate-500">{isZh ? '答晒 5 題先睇到結果' : 'Answer all 5 to see your result'}</p>}
              </>
            ) : (
              <>
                <p className="text-xs font-black uppercase tracking-widest text-amber-600">{isZh ? '你嘅診斷結果' : 'YOUR DIAGNOSTIC RESULT'}</p>
                <h2 className="text-3xl font-black text-slate-950">{score} / 5</h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
                  {score <= 2
                    ? (isZh ? '高風險。12月15日要合格，你今晚就要開始 Block 1。' : 'High risk for Dec 15. Start Block 1 tonight.')
                    : score <= 4
                    ? (isZh ? '差少少。補返你錯嗰啲位 + 做一次 Mock，今個禮拜就追得返。' : 'Close. Fix your wrong blocks + do 1 mock this week and you catch up.')
                    : (isZh ? 'Ready 去 Mock。做 Mock 1 確認 60%+。' : 'Ready to mock. Do Mock 1 to confirm 60%+.')}
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Link href="/eaqe-dec-15" className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition">
                    {isZh ? '睇 30 日計劃 →' : 'See 30-Day Plan →'}
                  </Link>
                  <Link href="/pricing?interval=one_time" className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition">
                    {isZh ? '購買一次性通行證 HK$780 →' : 'Get One-Time Pass HK$780 →'}
                  </Link>
                </div>
                <p className="text-[11px] text-slate-500">{isZh ? '一次性通行證包括合格承諾：免費 90 天延期，不設退款。' : 'One-Time Pass includes Pass Promise: free 90-day extension, not a refund.'}</p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DiagnosticPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-slate-500">Loading diagnostic...</div>}>
      <DiagnosticContent />
    </Suspense>
  );
}