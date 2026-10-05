// app/page.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language } = useLanguage();
  const isZh = language === 'ZH';

  const externalResources = [
    {
      titleZh: '地產代理監管局 (EAA) 考試大綱',
      titleEn: 'EAA Qualifying Examination Syllabuses',
      descZh: '查看 EAQE 及 SQE 官方最新考試範圍與規則',
      descEn: 'Official examination guidelines and syllabus breakdown.',
      href: 'https://www.eaa.org.hk/zh-hk/Qualifying-Examinations/Syllabuses',
    },
    {
      titleZh: '《地產代理條例》(第511章)',
      titleEn: 'Estate Agents Ordinance (Cap. 511)',
      descZh: '香港電子版香港法例 (eLegislation) 條文檢索',
      descEn: 'Official Hong Kong eLegislation statutory database.',
      href: 'https://www.elegislation.gov.hk/hk/cap511!zh-Hant-HK',
    },
    {
      titleZh: '土地註冊處 — 查冊指南',
      titleEn: 'Land Registry — Search Procedures',
      descZh: '土地查冊 (Land Search) 及土地登記冊法律常識',
      descEn: 'Land register procedures and search guidance.',
      href: 'https://www.landreg.gov.hk/tc/services/services_b.htm',
    },
  ];

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-16 text-center space-y-8">
        
        {/* Language Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
          <span>
            {isZh ? '🇭🇰 繁體中文 (香港) — 地產代理監管局 (EAA) 試題規範' : '🇭🇰 Traditional Chinese (Hong Kong) — EAA Exam Aligned'}
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
            {isZh ? (
              <>
                地產代理及營業員資格考試 <br className="hidden sm:inline" />
                <span className="text-indigo-600 dark:text-indigo-400">AI 智能雙語高效通關平台</span>
              </>
            ) : (
              <>
                Pass HK EAQE & SQE Exams <br className="hidden sm:inline" />
                <span className="text-indigo-600 dark:text-indigo-400">With AI-Powered Precision</span>
              </>
            )}
          </h1>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            {isZh
              ? 'AgentPass™ 專為 EAQE（大牌）及 SQE（細牌）考生打造。涵蓋《地產代理條例》(第511章) 及最新法例條文，AI 智能精準拆解考題陷阱。'
              : 'Master Hong Kong EAQE and SQE licensing exams with statutory precision. Built on Cap. 511 standards with instant AI explanations and analytics.'}
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link
            href="/quiz"
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all text-center text-sm"
          >
            {isZh ? '🚀 立即開始免費練習' : '🚀 Start Free Practice'}
          </Link>
          <Link
            href="/mock-exam"
            className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-bold rounded-2xl transition-all text-center text-sm shadow-sm"
          >
            {isZh ? '⏱️ 全真模擬考試' : '⏱️ Timed Mock Exam'}
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
          
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-xl">
              📚
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {isZh ? '雙語對照題庫' : 'Bilingual Question Bank'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isZh
                ? '隨時切換繁體中文（香港）與英文專業術語，精確掌握《發牌規例》(第511A章) 專有名詞。'
                : 'Seamlessly toggle between Traditional Chinese (HK) and English legal terminology aligned with Cap. 511A.'}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-xl">
              🤖
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {isZh ? 'AI 法例導師分析' : 'AI Legal Explanations'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isZh
                ? '即時提供法律依據與擬題陷阱分析，助你深度理解地產代理監管局 (EAA) 考題邏輯。'
                : 'Get zero-latency explanations citing statutory clauses and exam trap analysis powered by AI.'}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-xl">
              📊
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {isZh ? '弱點追蹤儀表板' : 'Weakness Analytics'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isZh
                ? '自動記錄錯題並分析個人知識短板，專攻土地註冊、土地查冊及物業轉易等高頻考點。'
                : 'Track incorrect responses and focus revision on land registration, searches, and conveyancing topics.'}
            </p>
          </div>

        </div>

      </section>

      {/* External Official Resources Section */}
      <section className="bg-slate-100/70 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {isZh ? '🏛️ 官方備考參考資源及法例指引' : '🏛️️ Official Statutory & Exam Resources'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isZh
                ? '建議考生搭配地產代理監管局及香港政府律政司電子版香港法例研習'
                : 'Recommended reference resources from the EAA and HKSAR eLegislation database.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {externalResources.map((res, i) => (
              <a
                key={i}
                href={res.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-900 hover:border-indigo-500/50 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition group"
              >
                <div className="flex items-center justify-between pb-1">
                  <h4 className="font-bold text-xs text-indigo-600 dark:text-indigo-400 group-hover:underline">
                    {isZh ? res.titleZh : res.titleEn}
                  </h4>
                  <span className="text-xs text-slate-400">↗</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isZh ? res.descZh : res.descEn}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

// app/page.tsx (At the very end of the main JSX container)
import AiTutorWidget from './components/AiTutorWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Existing landing page hero & cards */}
      
      {/* Floating AI Tutor */}
      <AiTutorWidget locale="zh-HK" />
    </main>
  );
}