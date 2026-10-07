// app/page.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';

export default function HomePage() {
  const { locale } = useLanguage();
  const isZh = locale === 'zh-HK';

  const handleOpenAiTutor = () => {
    window.dispatchEvent(
      new CustomEvent('agentpass:ask-tutor', {
        detail: {
          prompt: isZh
            ? '請簡介 EAQE / SQE 牌照考試範圍及如何備考？'
            : 'Please introduce the EAQE / SQE exam syllabus and revision strategy.',
        },
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
            <span>
              {isZh
                ? '針對香港地產代理監管局 (EAA) 試題規範'
                : 'Aligned with HK Estate Agents Authority (EAA) Guidelines'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {isZh ? (
              <>
                一次通過 EAQE / SQE 牌照考試 <br />
                <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  AgentPass™ AI 智能備考平台
                </span>
              </>
            ) : (
              <>
                Pass Your EAQE / SQE Licensing Exam <br />
                <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  AgentPass™ AI Prep Platform
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {isZh
              ? '結合《地產代理條例》(第511章) 法定課程大綱、模擬試題庫及 24/7 AI 法律導師，助您高效考取地產代理與營業員牌照。'
              : 'Master Cap. 511 Estate Agents Ordinance with interactive syllabus, exam question banks, and a 24/7 AI Tutor.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/course"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition"
            >
              <BookOpen className="h-4 w-4" />
              <span>{isZh ? '開始學習課程大綱' : 'Start Course Syllabus'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/quiz"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-bold text-slate-200 hover:border-slate-500 hover:bg-slate-800 transition"
            >
              <HelpCircle className="h-4 w-4 text-indigo-400" />
              <span>{isZh ? '進入模擬測驗' : 'Take Practice Quiz'}</span>
            </Link>

            <button
              onClick={handleOpenAiTutor}
              className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-950/40 px-6 py-3 text-sm font-bold text-indigo-300 hover:bg-indigo-900/60 transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span>{isZh ? '諮詢 AI 導師' : 'Ask AI Tutor'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Course */}
          <Link
            href="/course"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-indigo-500 hover:bg-slate-900 hover:shadow-xl"
          >
            <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition">
              {isZh ? 'EAA 四大核心模組課程' : 'EAA 4 Core Modules'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {isZh
                ? '涵蓋第511章條例、土地查冊、法定表格 Form 1-6、物業估值及印花稅條例。'
                : 'Covers Cap. 511 Ordinance, Land Search reading, Statutory Forms 1-6, Valuation & Stamp Duty.'}
            </p>
            <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1">
              {isZh ? '查看課程內容' : 'Explore Modules'} <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          {/* Card 2: Quiz */}
          <Link
            href="/quiz"
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-emerald-500 hover:bg-slate-900 hover:shadow-xl"
          >
            <div className="h-12 w-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition">
              {isZh ? '全真模擬試題庫' : 'Exam Practice Bank'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {isZh
                ? '提供即時題解、法定條款引用 (Cap. References) 及雙語對照模式。'
                : 'Includes detailed explanations, statutory Cap. citations, and bilingual mode.'}
            </p>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              {isZh ? '立即開始測驗' : 'Start Practice'} <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          {/* Card 3: AI Tutor */}
          <div
            onClick={handleOpenAiTutor}
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-yellow-500 hover:bg-slate-900 hover:shadow-xl cursor-pointer"
          >
            <div className="h-12 w-12 rounded-xl bg-yellow-600/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-yellow-300 transition">
              {isZh ? 'AI 法規導師助手' : 'AI Legal Assistant'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {isZh
                ? '24/7 解答任何條例疑難、雙重代理案例分析及過往考點解構。'
                : '24/7 answers for dual agency questions, statutory disclosures, and exam scenarios.'}
            </p>
            <span className="text-xs font-semibold text-yellow-400 flex items-center gap-1">
              {isZh ? '打開 AI 導師' : 'Open AI Tutor'} <ArrowRight className="h-3 w-3" />
            </span>
          </div>

        </div>
      </section>
    </div>
  );
}