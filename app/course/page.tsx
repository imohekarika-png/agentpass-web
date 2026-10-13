// app/course/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  BookOpen, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function CoursePage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  // Auto-scroll handler for Memory Palace hash route
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#memory-palace') {
      setTimeout(() => {
        const el = document.getElementById('memory-palace');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, []);

  const stations = [
    { num: '01', titleZh: '接待大堂：牌照展示與名片規範', titleEn: 'Lobby: License Display & Business Cards', section: 'Cap. 511 s.36' },
    { num: '02', titleZh: '會議室：委託協議 Form 3 簽署點', titleEn: 'Conference Room: Form 3 Execution', section: 'Form 3 Rules' },
    { num: '03', titleZh: '文件櫃：土地查冊 P-O-I-M 審核', titleEn: 'Filing Room: P-O-I-M Land Search', section: 'Land Search' },
    { num: '04', titleZh: '會客室：物業資料單 Form 1 查核', titleEn: 'Meeting Room: Form 1 Inspection', section: 'Form 1 Details' },
    { num: '05', titleZh: '露台：違例建築工程 (UBW) 警示', titleEn: 'Balcony: UBW Risk Disclosure', section: 'Cap. 123 Rules' },
    { num: '06', titleZh: '總經理室：雙重代理與權益披露', titleEn: 'Manager Office: Dual Agency Notice', section: 'Code of Ethics' },
    { num: '07', titleZh: '財務部：客戶帳戶託管與訂金', titleEn: 'Finance: Client Account Trust', section: 'Cap. 511 s.43' },
    { num: '08', titleZh: '簽約廳：臨時買賣合約 (PASP) 擬定', titleEn: 'Signing Room: PASP Execution', section: 'PASP Terms' },
    { num: '09', titleZh: '信件箱：變更營業地點 31 天通知', titleEn: 'Mailbox: 31-Day Address Notice', section: 'Cap. 511 s.40' },
    { num: '10', titleZh: '交鑰處：租約終止通知期 (Cap. 7)', titleEn: 'Handover: Notice to Quit', section: 'Cap. 7 Tenancy' },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Course Syllabus Banner */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          className="p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span>HK EAA EAQE / SQE Official Syllabus</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {isZh ? '20 大主題單元與課程大綱' : '20 Topic Blocks & Course Syllabus'}
            </h1>
            <p className="text-xs sm:text-sm font-medium opacity-80 max-w-2xl leading-relaxed">
              {isZh 
                ? '涵蓋地產代理條例 (Cap. 511)、業主與租客條例 (Cap. 7)、土地查冊 P-O-I-M 及 EAA 法定表格 Forms 1-6。'
                : 'Complete statutory coverage of Cap. 511, Cap. 7 Tenancy, Land Search P-O-I-M, and Statutory Forms 1-6.'}
            </p>
          </div>

          <Link
            href="/quiz"
            className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/25 transition flex items-center gap-2 shrink-0"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isZh ? '前往試題庫練習' : 'Practice Question Bank'}</span>
          </Link>
        </div>

        {/* Syllabus Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="p-6 rounded-3xl border space-y-4 shadow-lg"
          >
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <ShieldCheck className="h-5 w-5" />
              <span>Part I: Statutory Regulation (Cap. 511)</span>
            </div>
            <p className="text-xs opacity-75 leading-relaxed">
              {isZh ? '持牌資格、發牌條件、營業地點變更 31 天通知、客戶帳戶託管及違規紀律處分。' : 'Licensing eligibility, 31-day address notice, client money trust rules, and disciplinary powers.'}
            </p>
          </div>

          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="p-6 rounded-3xl border space-y-4 shadow-lg"
          >
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="h-5 w-5" />
              <span>Part II: Conveyancing Practice & Land Search</span>
            </div>
            <p className="text-xs opacity-75 leading-relaxed">
              {isZh ? '土地查冊 P-O-I-M 查核、物業資料單 Form 1 至 Form 6、違例建築 (UBW) 及 PASP 條款。' : 'P-O-I-M Land Search inspection, Statutory Forms 1-6, UBW risk disclosures, and PASP drafting.'}
            </p>
          </div>
        </div>

        {/* 10-Station Memory Palace Section (Target Anchor) */}
        <section 
          id="memory-palace" 
          className="scroll-mt-24 pt-10 border-t space-y-8"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500">
              <Compass className="h-3.5 w-3.5" />
              <span>Visual Spatial Anchor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              10-Station Memory Palace (10 站記憶宮殿)
            </h2>
            <p className="text-xs sm:text-sm opacity-80 max-w-2xl leading-relaxed">
              {isZh 
                ? '將監管法定職責融入住宅交易實景路線。順序漫步 10 個記憶站點，快速鎖定考題的核心法條與數字錨點。'
                : 'Map regulatory duties onto a residential transaction route. Walk through all 10 stations to master Cap. 511 & Cap. 7 statutory rules in visual sequence.'}
            </p>
          </div>

          {/* 10 Stations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stations.map((st) => (
              <div 
                key={st.num}
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                className="p-5 rounded-2xl border shadow-md flex items-start justify-between gap-4 hover:border-indigo-500/60 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      Station {st.num}
                    </span>
                    <span className="text-[10px] font-mono opacity-60">{st.section}</span>
                  </div>
                  <h3 className="text-sm font-bold">
                    {isZh ? st.titleZh : st.titleEn}
                  </h3>
                </div>
                <MapPin className="h-5 w-5 text-indigo-400 shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}