// app/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import {
  Award,
  BookOpen,
  Compass,
  HelpCircle,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Building2,
  Zap,
  Target,
  FileText
} from 'lucide-react';

export default function MergedLandingPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [selectedTrack, setSelectedTrack] = useState<'SQE' | 'EAQE'>('EAQE');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">

        {/* Hero Section */}
        <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>{isZh ? '香港地產代理 AI 智能備考平台' : 'AI-Powered Prep for HK EAA Licensing Exams'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {isZh ? (
                <>一站式通關 <span className="text-blue-600">EAQE 大牌</span> 與 <span className="text-blue-600">SQE 細牌</span> 資格考試</>
              ) : (
                <>Master <span className="text-blue-600">EAQE & SQE</span> Licensing Exams with AI Precision</>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isZh
                ? '結合 20 大主題單元、艾賓浩斯記憶階梯 (SRS)、記憶宮殿與 IRIS 土地查冊實務題庫，幫助學員精準考取地產代理資格。'
                : 'Combining 20 statutory blocks, Spaced Repetition (SRS), Memory Palace routes, and IRIS Land Search dossiers to maximize your passing rate.'}
            </p>

            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <Link
                href="/mock-exam"
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-sm shadow-md transition flex items-center gap-2"
              >
                <span>{isZh ? '免費體驗全真模擬考' : 'Start Free Mock Exam'}</span>
                <ArrowRight className="h-4 w-4 !text-white" />
              </Link>

              <Link
                href="/course"
                className="px-6 py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-sm text-slate-700 transition flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span>{isZh ? '瀏覽 20 大單元大綱' : 'Explore Syllabus'}</span>
              </Link>
            </div>
          </div>

          {/* Quick Track Selection Card */}
          <div className="w-full md:w-80 p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-4 shrink-0">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                {isZh ? 'STEP 1: 選擇你的應考軌道' : 'STEP 1: Select Your Track'}
              </span>
              <h3 className="text-sm font-extrabold text-slate-900">
                {isZh ? '即時過濾專屬考綱' : 'Streamline Relevant Content'}
              </h3>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSelectedTrack('EAQE')}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  selectedTrack === 'EAQE'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="font-black">EAQE {isZh ? '地產代理 (大牌)' : 'Estate Agent'}</div>
                  <div className={`text-[10px] ${selectedTrack === 'EAQE' ? 'text-blue-100' : 'text-slate-500'}`}>
                    {isZh ? '20 Blocks • 100 題完整卷' : '20 Blocks • 100 Qs Paper'}
                  </div>
                </div>
                {selectedTrack === 'EAQE' && <CheckCircle2 className="h-4 w-4 text-white" />}
              </button>

              <button
                type="button"
                onClick={() => setSelectedTrack('SQE')}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  selectedTrack === 'SQE'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="font-black">SQE {isZh ? '營業員 (細牌)' : 'Salesperson'}</div>
                  <div className={`text-[10px] ${selectedTrack === 'SQE' ? 'text-blue-100' : 'text-slate-500'}`}>
                    {isZh ? '16 Blocks • 60 題完整卷' : '16 Blocks • 60 Qs Paper'}
                  </div>
                </div>
                {selectedTrack === 'SQE' && <CheckCircle2 className="h-4 w-4 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Onboarding Steps Section (Integrated from /welcome) */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider block">
              {isZh ? '迎新備考 3 步曲' : '3-Step Candidate Guidance'}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {isZh ? '如何利用 AgentPass™ 高效備考？' : 'How AgentPass™ Accelerates Your Pass Rate'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
                01
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                {isZh ? '研讀 20 大主題與圖像口訣' : 'Study Statutory Blocks'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isZh
                  ? '進入課程大綱精讀法定筆記，配合記憶宮殿圖像與「易混淆對照表」，徹底釐清法規盲區。'
                  : 'Review statutory notes, memory hooks, and Do Not Confuse tables across the 20 official syllabus blocks.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-sm">
                02
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                {isZh ? '艾賓浩斯 SRS 記憶階梯複習' : 'Spaced Repetition Review'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isZh
                  ? '模擬考中答錯的題目會自動同步至溫習儀表板 (1-3-7-16-35 天)，依據記憶曲線自動提醒溫習。'
                  : 'Incorrect answers automatically queue into your SRS Dashboard ladder for review at optimal memory intervals.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm">
                03
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                {isZh ? '雙階段全真模擬考場應試' : 'Dual-Stage Mock Simulation'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isZh
                  ? '體驗 Part I 法規選擇題與 Part II 土地查冊個案實務題，達到官方 60% 雙門檻及格標準。'
                  : 'Simulate full Part I MCQs and Part II IRIS Land Search dossiers with official 60% passing diagnostics.'}
              </p>
            </div>
          </div>
        </div>

        {/* Feature Modules Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider block">
              {isZh ? '核心功能模組' : 'Platform Modules'}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {isZh ? '全方位備考工具箱' : 'Complete Prep Toolkit'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link
              href="/course"
              className="p-6 rounded-3xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition space-y-3 block"
            >
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 w-fit">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                {isZh ? '課程大綱' : 'Syllabus & Lessons'}
              </h3>
              <p className="text-xs text-slate-600">
                {isZh ? '20 大主題精讀課文、條例對照與考官陷阱登錄。' : '20 block lessons with verified notes and trap registers.'}
              </p>
            </Link>

            <Link
              href="/memory-palace"
              className="p-6 rounded-3xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition space-y-3 block"
            >
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 w-fit">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                {isZh ? '記憶宮殿' : 'Memory Palace'}
              </h3>
              <p className="text-xs text-slate-600">
                {isZh ? '10 站視覺化記憶路線，迅速掌握條例數字與死記考點。' : '10-station visual loci routes for memorizing legal limits.'}
              </p>
            </Link>

            <Link
              href="/mock-exam"
              className="p-6 rounded-3xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition space-y-3 block"
            >
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 w-fit">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                {isZh ? '全真模擬考場' : 'Mock Exam Suite'}
              </h3>
              <p className="text-xs text-slate-600">
                {isZh ? '100 題完全不重複題庫，真實調色板與 IRIS 查冊附件。' : '100 unique items with official palette matrix and IRIS annex.'}
              </p>
            </Link>

            <Link
              href="/dashboard"
              className="p-6 rounded-3xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition space-y-3 block"
            >
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 w-fit">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                {isZh ? '溫習儀表板' : 'SRS Review Dashboard'}
              </h3>
              <p className="text-xs text-slate-600">
                {isZh ? '追蹤各單元掌握度，智能推算最佳複習時間點。' : 'Track topic mastery and review due queue automatically.'}
              </p>
            </Link>
          </div>
        </div>

        {/* EAA Compliance Disclaimer Footer Card */}
        <div className="p-6 rounded-3xl border border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0" />
            <span>{isZh ? '100% 地產代理監管局 (EAA) 考綱對齊' : '100% EAA Official Syllabus Aligned'}</span>
          </div>
          <p className="text-slate-500 text-center sm:text-right">
            {isZh
              ? '內容嚴格對照 Cap. 511、Cap. 219、Cap. 7 及一手樓 Cap. 621 最新法規。'
              : 'Compliant with Cap. 511, Cap. 219, Cap. 7, and Cap. 621 regulations.'}
          </p>
        </div>

      </div>
    </div>
  );
}