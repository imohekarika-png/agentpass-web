// app/page.tsx
'use client';

import Link from 'next/link';
import { Sparkles, BookOpen, Scale, LayoutDashboard, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();
  // Compatible with 'zh', 'zh-HK', or 'zh-TW' types
  const isZh = (language as string) === 'zh-HK' || (language as string) === 'zh';

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden">
      {/* Top Banner Notice */}
      <div className="bg-indigo-950/60 border-b border-indigo-900/50 py-2 px-4 text-center text-xs font-medium text-indigo-300">
        {isZh
          ? '專為香港地產代理 (EAQE) 及營業員 (SQE) 資格考試而設的 AI 智能備考平台'
          : 'AI-Powered Exam Preparation Platform for HK EAQE & SQE Licensing Exams'}
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>{isZh ? '全新 AI 導師現已上線' : 'New AI Legal Mentor Enabled'}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          {isZh ? (
            <>
              高效、極速、智能的 <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                香港地產牌照考證平台
              </span>
            </>
          ) : (
            <>
              Intelligent, Bilingual & Efficient <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                HK Real Estate Licensing Exam Prep
              </span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          {isZh
            ? 'AgentPass™ 專為大牌 (EAQE) 及細牌 (SQE) 考生打造。涵蓋《地產代理條例》(第511章) 最新法例，利用 AI 導師精準拆解考題陷阱，助你一次過關。'
            : 'AgentPass™ is designed specifically for EAQE (major) and SQE (minor) candidates. Covering the Real Estate Agents Ordinance (Cap. 511) with AI legal guidance.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/quiz"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30"
          >
            <span>{isZh ? '立即免費練習' : 'Start Practicing Free'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/mock-exam"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>{isZh ? '全真模擬考試' : 'Full-scale Mock Exam'}</span>
          </Link>
        </div>
      </section>

      {/* Core Platform Features Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isZh ? '雙語題庫即時切換' : 'Bilingual Question Bank'}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {isZh
                ? '支援繁體中文 (香港) 與英文題庫，對照《地產代理 (發牌) 規例》法例原文。'
                : 'Switch seamlessly between Traditional Chinese (HK) and English for EAQE/SQE practice questions.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center mb-4">
              <Scale className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isZh ? 'AI 法律導師解題' : 'AI Legal Mentor Analysis'}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {isZh
                ? '針對錯題即時解析，根據地產代理監管局 (EAA) 考綱提示地查、表格簽署要點。'
                : 'Get instant explanations referencing EAA regulatory codes and Cap. 511 Ordinance guidelines.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center mb-4">
              <LayoutDashboard className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isZh ? '個人弱點追蹤面板' : 'Vulnerability Tracking'}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {isZh
                ? '系統自動記錄常錯考題，包括物業轉讓、地查查冊、租務條例及註冊程序。'
                : 'Track individual performance data across conveyancing, search procedures, and tenancy regulations.'}
            </p>
          </div>
        </div>
      </section>

      {/* Official Legal References Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">
              {isZh ? '官方考試參考指引與法例資源' : 'Official Regulatory Guidance & Legal References'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <a
              href="https://www.eaa.org.hk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 flex items-center justify-between text-slate-300 transition"
            >
              <span>{isZh ? '地產代理監管局 (EAA) 考綱' : 'Estate Agents Authority (EAA)'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
            <a
              href="https://www.elegislation.gov.hk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 flex items-center justify-between text-slate-300 transition"
            >
              <span>{isZh ? '《地產代理條例》(第511章)' : 'Cap. 511 Ordinance'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
            <a
              href="https://www.landreg.gov.hk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 flex items-center justify-between text-slate-300 transition"
            >
              <span>{isZh ? '土地註冊處查冊指引' : 'Land Registry Search Guide'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}