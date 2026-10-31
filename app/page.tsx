'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [selectedTrack, setSelectedTrack] = useState<'EAQE' | 'SQE'>('EAQE');
  const [sampleAnswer, setSampleAnswer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* =========================================================
          STAGE 1: HERO SECTION + DUAL TRACK SELECTOR
         ========================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                AI-Powered Prep for HK EAA Licensing Exams
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                Master <span className="text-amber-600 underline decoration-amber-300 decoration-wavy decoration-2">EAQE & SQE</span> Licensing Exams with AI Precision
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Combining 20 statutory syllabus blocks, Spaced Repetition (SRS), Memory Palace visual mnemonics, and IRIS Land Search dossiers to maximize your first-attempt passing rate.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/mock-exam"
                  className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  Start Free Mock Exam (10 Qs) →
                </Link>
                <Link
                  href="#pricing-section"
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition"
                >
                  View Preparation Plans
                </Link>
              </div>

              {/* Real-time Candidate Notice */}
              <p className="text-xs text-slate-400 font-medium">
                ⚡ Aligned with latest EAA practice circulars • No credit card required to sample.
              </p>
            </div>

            {/* Right Column: Interactive Track Target Selector */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200 space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <p className="text-[11px] font-black uppercase tracking-wider text-amber-600">STEP 1: SELECT YOUR TARGET EXAM</p>
                  <h3 className="text-xl font-black text-slate-950 mt-1">Streamline Relevant Content</h3>
                  <p className="text-xs text-slate-500 mt-1">Focus your questions and statutory traps on your specific license category.</p>
                </div>

                <div className="space-y-3">
                  {/* Option 1: EAQE */}
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

                  {/* Option 2: SQE */}
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
                    href={`/mock-exam?track=${selectedTrack}`}
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

      {/* =========================================================
          STAGE 3: THE 3-STEP PASS ENGINE (CONSOLIDATED)
         ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-amber-600">3-STEP CANDIDATE METHODOLOGY</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">How AgentPass™ Guarantees Your Edge</h2>
            <p className="text-sm text-slate-600">A deliberate learning architecture designed to eliminate memorization fatigue and trap failures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 relative">
              <span className="text-4xl font-black text-amber-500/20">01</span>
              <h3 className="text-xl font-bold text-slate-950">Study Statutory Blocks</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Review verified statutory notes across all 20 syllabus blocks. Master essential ordinance provisions with side-by-side &quot;Do Not Confuse&quot; trap tables.
              </p>
              <div className="pt-2">
                <Link href="/syllabus" className="text-xs font-bold text-amber-600 hover:text-amber-700">Explore Syllabus Notes →</Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 relative">
              <span className="text-4xl font-black text-amber-500/20">02</span>
              <h3 className="text-xl font-bold text-slate-950">Active Recall & Flashcards</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Retain critical statutory numbers, penalties, and time bars using automated Leitner spaced repetition. Tricky legal limits resurface right before you forget them.
              </p>
              <div className="pt-2">
                <Link href="/flashcards" className="text-xs font-bold text-amber-600 hover:text-amber-700">Launch Flashcards Deck →</Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 relative">
              <span className="text-4xl font-black text-amber-500/20">03</span>
              <h3 className="text-xl font-bold text-slate-950">Dual-Stage Mock Exam</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Experience the authentic 3-hour exam pressure. Tackle Part I statutory MCQs and Part II IRIS Land Search document dossiers under official countdown timers.
              </p>
              <div className="pt-2">
                <Link href="/mock-exam" className="text-xs font-bold text-amber-600 hover:text-amber-700">Test Mock Simulation →</Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          STAGE 4: INTERACTIVE SAMPLE QUESTION (CONVERSION HOOK)
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
          STAGE 5: EAQE VS. SQE EXAM COMPARISON TABLE
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
            <p className="text-xs font-black uppercase tracking-widest text-amber-600">TRANSPARENT PASS PLANS</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Invest in Your Hong Kong Real Estate Career</h2>
            <p className="text-sm text-slate-600">Complete access to question banks, mock exams, and flashcards with instant Stripe checkout.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Monthly */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase">MONTHLY ROLLING</span>
                <h3 className="text-2xl font-black text-slate-950">From HK$ 198<span className="text-xs text-slate-500 font-normal"> / month</span></h3>
                <p className="text-xs text-slate-600">Flexible monthly access for fast brush-ups. Cancel anytime from your billing portal.</p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2">
                  <li className="flex items-center gap-2">✓ Full Statutory Question Bank</li>
                  <li className="flex items-center gap-2">✓ IRIS Land Search Dossiers</li>
                  <li className="flex items-center gap-2">✓ Cross-device desktop & mobile access</li>
                </ul>
              </div>
              <Link href="/pricing" className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition">
                View Monthly Options →
              </Link>
            </div>

            {/* 3-Month Pass (Featured) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-amber-500 shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                MOST POPULAR • SAVE 24%
              </div>
              <div className="space-y-4 pt-1">
                <span className="text-xs font-bold text-amber-600 uppercase">3-MONTH PASS</span>
                <h3 className="text-2xl font-black text-slate-950">From HK$ 480<span className="text-xs text-slate-500 font-normal"> / quarter</span></h3>
                <p className="text-xs text-slate-600">The standard 90-day revision window recommended by top estate agency training coaches.</p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2">
                  <li className="flex items-center gap-2 font-medium text-slate-900">✓ All Monthly Features included</li>
                  <li className="flex items-center gap-2 font-medium text-slate-900">✓ Spaced Repetition (SRS) Flashcards</li>
                  <li className="flex items-center gap-2 font-medium text-slate-900">✓ Diagnostic Passing Score Radar</li>
                </ul>
              </div>
              <Link href="/pricing" className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs text-center transition shadow-md shadow-amber-500/20">
                Get 3-Month Pass →
              </Link>
            </div>

            {/* One-Time Pass */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase">ONE-TIME PASS</span>
                <h3 className="text-2xl font-black text-slate-950">From HK$ 500<span className="text-xs text-slate-500 font-normal"> one-time</span></h3>
                <p className="text-xs text-slate-600">Full access until you pass your exam. Zero recurring billing or expiration worries.</p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2">
                  <li className="flex items-center gap-2">✓ Full Exam Pass Guarantee</li>
                  <li className="flex items-center gap-2">✓ Uncapped Mock Exams</li>
                  <li className="flex items-center gap-2">✓ High-Yield Statutory Summary Kit</li>
                </ul>
              </div>
              <Link href="/pricing" className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition">
                View One-Time Pass →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 7: URGENCY CTA & STATUTORY FOOTER
         ========================================================= */}
      <section className="bg-slate-950 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-black text-white">Next EAA Exam Season Is Approaching</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Over 65% of first-time test takers fail due to IRIS Land Search traps and numerical time limits. Start preparing with real exam conditions today.
          </p>
          <div>
            <Link
              href="/mock-exam"
              className="inline-flex px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition shadow-xl shadow-amber-500/20"
            >
              Start Free 10-Question Diagnostic Exam →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="font-bold text-white text-sm">AgentPass™</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                AI-powered prep platform engineered specifically for Hong Kong EAQE & SQE licensing exam candidates.
              </p>
            </div>

            <div>
              <p className="font-bold text-white mb-2">Navigation</p>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link href="/syllabus" className="hover:text-white">Course Syllabus</Link></li>
                <li><Link href="/mock-exam" className="hover:text-white">Mock Exam Suite</Link></li>
                <li><Link href="/flashcards" className="hover:text-white">Legal Flashcards</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing Plans</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-2">Legal & Privacy</p>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy (PDPO)</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-2">Support</p>
              <ul className="space-y-1.5 text-slate-400">
                <li>Email: support@agentpass.hk</li>
                <li>WhatsApp: +852 5432 7572</li>
                <li>Hours: Mon–Fri 09:00 – 18:00 HKT</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-6 text-[11px] text-slate-500 space-y-2">
            <p>
              <strong>EAA Syllabus Aligned • Independent Prep Notice:</strong> AgentPass™ is an independent digital preparation product. Study notes and statutory explanations are compiled directly from Cap. 511, Cap. 219, and official EAA syllabi. AgentPass™ is not affiliated with, sponsored by, or endorsed by the Hong Kong Estate Agents Authority (EAA).
            </p>
            <p>© 2026 Valor Spatial Limited. All rights reserved. Hong Kong SAR.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}