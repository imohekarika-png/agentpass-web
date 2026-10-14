// app/course/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Compass,
  Calendar,
  Clock,
  Sparkles,
  Zap,
  Target,
  Award
} from 'lucide-react';

interface TopicBlock {
  id: string;
  num: string;
  part: 'I' | 'II';
  scope: 'SQE_EAQE' | 'EAQE_ONLY';
  categoryZh: string;
  categoryEn: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  keyStatutes: string[];
  suggestedDay30: number; // Suggested completion day in 30-day schedule
}

const TOPIC_BLOCKS: TopicBlock[] = [
  // PART I: Statutory Regulation
  { id: 'b1', num: 'Block 01', part: 'I', scope: 'SQE_EAQE', categoryZh: '發牌與資格', categoryEn: 'Licensing & Qualifications', titleZh: '地產代理監管局 (EAA) 架構與持牌資格', titleEn: 'EAA Structure & Licensing Qualifications', summaryZh: 'Cap. 511 規定的代理 (EAQE) 與營業員 (SQE) 發牌條件及適當人選測試。', summaryEn: 'Licensing conditions under Cap. 511 for EAQE/SQE and Fit & Proper person criteria.', keyStatutes: ['Cap. 511 s.15', 'Cap. 511 s.19'], suggestedDay30: 1 },
  { id: 'b2', num: 'Block 02', part: 'I', scope: 'SQE_EAQE', categoryZh: '營業地點規管', categoryEn: 'Business Premises', titleZh: '營業地點展示牌照與 31 天法定通知期', titleEn: 'License Display & 31-Day Address Change Notice', summaryZh: '每個營業地點必須展示牌照正本。變更營業地點後必須於 31 天內以書面通知 EAA。', summaryEn: 'Mandatory display of license. Address changes require written notice within 31 days.', keyStatutes: ['Cap. 511 s.36', 'Cap. 511 s.40'], suggestedDay30: 2 },
  { id: 'b3', num: 'Block 03', part: 'I', scope: 'SQE_EAQE', categoryZh: '廣告與名片規範', categoryEn: 'Advertising Rules', titleZh: '地產廣告發放與名片印製法定規範', titleEn: 'Real Estate Advertising & Business Card Standards', summaryZh: '廣告必須取得業主書面授權，名片必須印有牌照號碼及持牌人姓名。', summaryEn: 'Written vendor authorization required. Business cards must state license number.', keyStatutes: ['Cap. 511 s.37', 'Practice Regulation s.9'], suggestedDay30: 3 },
  { id: 'b4', num: 'Block 04', part: 'I', scope: 'EAQE_ONLY', categoryZh: '客戶帳戶管理', categoryEn: 'Client Account Trust', titleZh: '客戶存款 (Client Money) 託管與獨立信託帳戶', titleEn: 'Client Money Custody & Independent Trust Accounts [EAQE Focus]', summaryZh: '代理收取之訂金與客戶款項必須存入指定客戶信託戶口，嚴禁挪用。', summaryEn: 'All client deposits must be held in designated bank trust accounts.', keyStatutes: ['Cap. 511 s.43', 'Client Money Rules'], suggestedDay30: 5 },
  { id: 'b5', num: 'Block 05', part: 'I', scope: 'SQE_EAQE', categoryZh: '雙重代理與利益', categoryEn: 'Dual Agency & Interest', titleZh: '雙重代理 (Dual Agency) 與金錢利益全面披露', titleEn: 'Dual Agency Status & Financial Interest Disclosures', summaryZh: '同時代表買賣雙方必須進行書面披露並取得同意；利益必須即時聲明。', summaryEn: 'Dual agency requires written disclosure and consent. Financial interest must be declared.', keyStatutes: ['Cap. 511 s.46', 'Code of Ethics s.3(5)'], suggestedDay30: 6 },
  { id: 'b6', num: 'Block 06', part: 'I', scope: 'EAQE_ONLY', categoryZh: '紀律程序與制裁', categoryEn: 'Disciplinary Actions', titleZh: 'EAA 調查權力、紀律研訊與撤銷牌照處分', titleEn: 'EAA Investigation Powers & License Revocation [EAQE Focus]', summaryZh: '巡查權力、紀律處分程序 (譴責、罰款、附帶條件及撤銷牌照)。', summaryEn: 'Entry/inspection powers of EAA officers, fines, and license revocations.', keyStatutes: ['Cap. 511 s.28', 'Cap. 511 s.44'], suggestedDay30: 8 },
  { id: 'b7', num: 'Block 07', part: 'I', scope: 'SQE_EAQE', categoryZh: '操守守則', categoryEn: 'Code of Ethics', titleZh: '操守守則：盡職審查與誠實秉岸責任', titleEn: 'Code of Ethics: Due Diligence & Integrity', summaryZh: '忠誠責任 (Fiduciary Duty)、避免利益衝突、保存紀錄 5 年等標準。', summaryEn: 'Fiduciary duties, conflict avoidance, and 5-year record retention rule.', keyStatutes: ['EAA Code of Ethics', 'Practice Regulation s.15'], suggestedDay30: 9 },
  { id: 'b8', num: 'Block 08', part: 'I', scope: 'SQE_EAQE', categoryZh: '反洗黑錢條例', categoryEn: 'AML Compliance', titleZh: '反洗錢 (AMLO) 客戶盡職審查與可疑交易舉報', titleEn: 'Anti-Money Laundering (AMLO) Customer Due Diligence', summaryZh: '打擊洗錢條例 (Cap. 615) 下之客戶身分核實 (CDD) 及 STR 舉報。', summaryEn: 'Customer due diligence obligations under Cap. 615 and STR reporting.', keyStatutes: ['Cap. 615', 'EAA AML Guidelines'], suggestedDay30: 11 },
  { id: 'b9', num: 'Block 09', part: 'I', scope: 'SQE_EAQE', categoryZh: '個人資料私隱', categoryEn: 'Privacy Ordinance', titleZh: '個人資料 (私隱) 條例 Cap. 486 與電話行銷規管', titleEn: 'Personal Data Privacy (Cap. 486) & Direct Marketing', summaryZh: '六大私隱原則，直接促銷前必須取得客戶明確同意 (Opt-in)。', summaryEn: 'Compliance with 6 Data Protection Principles. Opt-in required for direct marketing.', keyStatutes: ['Cap. 486', 'DPP 1 - DPP 6'], suggestedDay30: 12 },
  { id: 'b10', num: 'Block 10', part: 'I', scope: 'EAQE_ONLY', categoryZh: '競爭法例', categoryEn: 'Competition Law', titleZh: '競爭條例 Cap. 619 與地產代理業界佣金協議 Prohibition', titleEn: 'Competition Ordinance (Cap. 619) & Anti-Fixing Commission', summaryZh: '禁止競爭對手合謀定價 (Price-fixing) 或協調佣金折讓率。', summaryEn: 'Prohibition of cartel behavior or commission rate-fixing.', keyStatutes: ['Cap. 619', 'First Conduct Rule'], suggestedDay30: 14 },

  // PART II: Conveyancing, Tenancy & Statutory Forms
  { id: 'b11', num: 'Block 11', part: 'II', scope: 'SQE_EAQE', categoryZh: '地產代理協議', categoryEn: 'Agency Agreements', titleZh: '法定地產代理協議表格 Form 3 至 Form 6 詳解', titleEn: 'Statutory Agency Agreements (Forms 3 to 6) Mastery', summaryZh: 'Form 3 至 Form 6 之法定條款、最長 3 個月有效期及佣金條款。', summaryEn: 'Statutory terms, max 3-month validity, and commission clauses for Forms 3-6.', keyStatutes: ['Form 3', 'Form 4', 'Form 5', 'Form 6'], suggestedDay30: 15 },
  { id: 'b12', num: 'Block 12', part: 'II', scope: 'SQE_EAQE', categoryZh: '物業資料單', categoryEn: 'Property Information Form', titleZh: '物業資料單 Form 1 (表格 1) 填寫與審核職責', titleEn: 'Property Information Form (Form 1) Inspection Duties', summaryZh: '出售住宅必須附帶 Form 1，包含土地查冊資料及違建工程詳情。', summaryEn: 'Mandatory Form 1 for sales, including land register data and UBW details.', keyStatutes: ['Form 1', 'Practice Regulation s.3'], suggestedDay30: 17 },
  { id: 'b13', num: 'Block 13', part: 'II', scope: 'SQE_EAQE', categoryZh: '租賃資料單', categoryEn: 'Leasing Information Form', titleZh: '租賃物業資料單 Form 2 (表格 2) 規範', titleEn: 'Leasing Property Information Form (Form 2) Rules', summaryZh: '出租住宅物業必須提供 Form 2，核實業主身分及大廈公契限制。', summaryEn: 'Mandatory Form 2 for lettings, verifying ownership and DMC restrictions.', keyStatutes: ['Form 2', 'Practice Regulation s.4'], suggestedDay30: 18 },
  { id: 'b14', num: 'Block 14', part: 'II', scope: 'SQE_EAQE', categoryZh: '土地查冊 P-O-I-M', categoryEn: 'Land Search P-O-I-M', titleZh: '土地查冊 P-O-I-M 四大核心章節深度解析', titleEn: 'Land Search P-O-I-M (Property, Owner, Incumbrances, Memorials)', summaryZh: 'Property, Owner, Incumbrances (釘牌/押記) 及 Memorials 解析技巧。', summaryEn: 'Analysis of Property Details, Ownership, Incumbrances, and Memorials.', keyStatutes: ['Land Registration Ordinance Cap. 128'], suggestedDay30: 20 },
  { id: 'b15', num: 'Block 15', part: 'II', scope: 'SQE_EAQE', categoryZh: '業權與負擔', categoryEn: 'Title Encumbrances', titleZh: '業權瑕疵：違建工程 (UBW)、釘牌與法院押記令', titleEn: 'Title Defects: UBW, Building Orders & Court Charging Orders', summaryZh: '屋宇署 Cap. 123 清拆令 (s.24/s.26)、解釘程序及按揭影響。', summaryEn: 'Buildings Dept Cap. 123 removal orders and charging orders affecting mortgages.', keyStatutes: ['Cap. 123 s.24', 'Cap. 123 s.26'], suggestedDay30: 22 },
  { id: 'b16', num: 'Block 16', part: 'II', scope: 'SQE_EAQE', categoryZh: '業主與租客條例', categoryEn: 'Tenancy Ordinance Cap. 7', titleZh: '業主與租客 (綜合) 條例 Cap. 7 與租務管制', titleEn: 'Landlord & Tenant (Consolidation) Ordinance Cap. 7', summaryZh: '住宅租約法定終止通知期 (Notice to Quit) 及 CR109 申報。', summaryEn: 'Statutory Notice to Quit periods, CR109 filing, and Part IVA sub-divided units.', keyStatutes: ['Cap. 7 Part IV', 'Cap. 7 Part IVA', 'Form CR109'], suggestedDay30: 24 },
  { id: 'b17', num: 'Block 17', part: 'II', scope: 'SQE_EAQE', categoryZh: '買賣合約與定金', categoryEn: 'PASP & Deposits', titleZh: '臨時買賣合約 (PASP) 擬定、細訂與大訂條款', titleEn: 'Provisional Agreement (PASP) Drafting & Deposit Rules', summaryZh: 'PASP 法律拘束力、細訂大訂託管於律師樓及破約賠訂金責任。', summaryEn: 'Binding nature of PASP, deposit stakeholding by solicitors, and default terms.', keyStatutes: ['Conveyancing Ordinance Cap. 219'], suggestedDay30: 25 },
  { id: 'b18', num: 'Block 18', part: 'II', scope: 'EAQE_ONLY', categoryZh: '印花稅條例', categoryEn: 'Stamp Duty Ordinance', titleZh: '印花稅條例 Cap. 117：從價印花稅 (AVD) 及買家印花稅', titleEn: 'Stamp Duty Ordinance (Cap. 117): AVD & BSD Rules [EAQE Focus]', summaryZh: '加蓋印花法定限期 (30天內)、從價印花稅 (AVD) 稅率及租約印花稅。', summaryEn: 'Statutory 30-day deadline for stamping and AVD tax rate scales.', keyStatutes: ['Cap. 117 s.4', 'Cap. 117 Head 1'], suggestedDay30: 27 },
  { id: 'b19', num: 'Block 19', part: 'II', scope: 'EAQE_ONLY', categoryZh: '一手住宅物業', categoryEn: 'First-hand Sales', titleZh: '一手住宅物業銷售條例 Cap. 621 與售樓說明書', titleEn: 'First-hand Residential Properties Sales Ordinance (Cap. 621) [EAQE Focus]', summaryZh: '售樓說明書 7 天前發放、價單 3 天前公佈及意向書流程規管。', summaryEn: 'First-hand sales: 7-day sales brochure rule and 3-day price list publication.', keyStatutes: ['Cap. 621', 'SRPA Guidelines'], suggestedDay30: 28 },
  { id: 'b20', num: 'Block 20', part: 'II', scope: 'SQE_EAQE', categoryZh: '建築物與大廈公契', categoryEn: 'DMC & Town Planning', titleZh: '大廈公契 (DMC) 條款與城市規劃條例 Cap. 131', titleEn: 'Deed of Mutual Covenant (DMC) & Town Planning (Cap. 131)', summaryZh: 'DMC 養狗限制、用途變更及城市規劃委員會 (TPB) 法定用途。', summaryEn: 'DMC provisions, Town Planning Board zoning restrictions, and lease covenants.', keyStatutes: ['Cap. 131', 'DMC Express Covenants'], suggestedDay30: 30 }
];

export default function CoursePage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [activeTab, setActiveTab] = useState<'all' | 'sqe' | 'eaqe'>('all');
  const [examDate, setExamDate] = useState<string>('2026-11-18');
  const [scheduleTrack, setScheduleTrack] = useState<'30day' | '14day'>('30day');

  const filteredBlocks = TOPIC_BLOCKS.filter((b) => {
    if (activeTab === 'sqe') return b.scope === 'SQE_EAQE';
    if (activeTab === 'eaqe') return true; // EAQE includes all blocks
    return true;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Top Header Banner */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          className="p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Official HK EAA EAQE & SQE Licensing Syllabi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {isZh ? '20 大主題單元 (20 Topic Blocks)' : '20 Topic Block Lessons'}
            </h1>
            <p className="text-xs sm:text-sm font-medium opacity-80 max-w-2xl leading-relaxed">
              {isZh 
                ? '根據地產代理 (EAQE) 及營業員 (SQE) 官方考試大綱研發。每個單元精確對應試題庫與 1-3-7-16-35 間隔重複溫習時程。'
                : 'Engineered directly from official EAQE & SQE exam syllabi. Each lesson links directly to targeted practice questions and spaced repetition schedules.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/memory-palace"
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
            >
              <Compass className="h-4 w-4" />
              <span>{isZh ? '進入記憶宮殿' : 'Memory Palace'}</span>
            </Link>

            <Link
              href="/quiz"
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/25 transition flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isZh ? '試題庫練習' : 'Quiz Bank'}</span>
            </Link>
          </div>
        </div>

        {/* Fixed Calendar Completion Schedule Widget */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          className="p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold">
                  {isZh ? '考試倒數與 20 單元溫習進度表' : 'Exam Countdown & Completion Schedule'}
                </h3>
                <p className="text-xs opacity-70">
                  {isZh ? '根據目標考試日期與學員節奏自動生成間隔重複溫習日程' : 'Automated completion schedule aligned with your target exam date'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setScheduleTrack('30day')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  scheduleTrack === '30day'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold'
                    : 'border-slate-800 bg-slate-900/60 opacity-80'
                }`}
              >
                {isZh ? '30 天標準軌道' : '30-Day Standard'}
              </button>

              <button
                onClick={() => setScheduleTrack('14day')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  scheduleTrack === '14day'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold'
                    : 'border-slate-800 bg-slate-900/60 opacity-80'
                }`}
              >
                {isZh ? '14 天衝刺軌道' : '14-Day Crash'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold uppercase mb-1 opacity-70">
                {isZh ? '選擇目標考試日期' : 'Target Exam Date'}
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border text-xs font-bold focus:outline-none focus:border-indigo-500 transition"
                style={{ backgroundColor: 'var(--bg-main)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
              />
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase opacity-70 block">
                {isZh ? '每日溫習目標' : 'Daily Pace Requirement'}
              </span>
              <span className="text-lg font-black text-indigo-400">
                {scheduleTrack === '30day' ? '1 Block / Day' : '1.5 Blocks / Day'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase opacity-70 block">
                {isZh ? '建議模擬考啟動點' : 'Mock Exam Activation Target'}
              </span>
              <span className="text-lg font-black text-emerald-400">
                {scheduleTrack === '30day' ? 'Day 22 (Complete 15 Blocks)' : 'Day 10 (Complete 15 Blocks)'}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Tabs (Scope Differentiation) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-indigo-500/50'
                }`}
              >
                {isZh ? '全部 20 大單元' : 'All 20 Blocks'}
              </button>

              <button
                onClick={() => setActiveTab('sqe')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeTab === 'sqe'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-indigo-500/50'
                }`}
              >
                {isZh ? 'SQE 營業員必考 (16 單元)' : 'SQE Core (16 Blocks)'}
              </button>

              <button
                onClick={() => setActiveTab('eaqe')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeTab === 'eaqe'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-indigo-500/50'
                }`}
              >
                {isZh ? 'EAQE 地產代理全範疇 (20 單元)' : 'EAQE Master (All 20 Blocks)'}
              </button>
            </div>

            <div className="text-xs font-mono font-bold opacity-60">
              Showing {filteredBlocks.length} of {TOPIC_BLOCKS.length} Topic Blocks
            </div>
          </div>

          {/* 20 Topic Blocks Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlocks.map((block) => (
              <div
                key={block.num}
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                className="p-6 rounded-3xl border shadow-xl space-y-4 flex flex-col justify-between hover:border-indigo-500/60 transition group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-bold text-indigo-400">
                      {block.num} • Part {block.part}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border ${
                        block.scope === 'SQE_EAQE' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {block.scope === 'SQE_EAQE' ? 'SQE + EAQE' : 'EAQE FOCUS'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold group-hover:text-indigo-400 transition">
                      {isZh ? block.titleZh : block.titleEn}
                    </h3>
                    <p className="text-xs opacity-80 mt-2 leading-relaxed">
                      {isZh ? block.summaryZh : block.summaryEn}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-3" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {block.keyStatutes.map((st, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 opacity-80">
                          {st}
                        </span>
                      ))}
                    </div>

                    <span className="text-[10px] font-mono font-bold opacity-50">
                      Target: Day {scheduleTrack === '30day' ? block.suggestedDay30 : Math.ceil(block.suggestedDay30 / 2)}
                    </span>
                  </div>

                  <Link
                    href={`/quiz?block=${block.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
                  >
                    <Target className="h-3.5 w-3.5" />
                    <span>{isZh ? `進入 ${block.num} 專屬試題` : `Practice ${block.num} Quiz`}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}