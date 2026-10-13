// app/memory-palace/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  ShieldAlert, 
  Layers, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function MemoryPalacePage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [showExplanation, setShowExplanation] = useState(true);

  const stations = [
    { num: '01', titleZh: '接待大堂：牌照展示與名片規範', titleEn: 'Lobby: License Display & Business Cards', section: 'Cap. 511 s.36', descZh: '每一營業地點必須展示牌照正本，名片需有持牌人姓名及號碼。', descEn: 'Mandatory display of original license at branch. Cards must state license number.' },
    { num: '02', titleZh: '會議室：委託協議 Form 3 簽署點', titleEn: 'Conference Room: Form 3 Execution', section: 'Form 3 Rules', descZh: '賣方地產代理協議 (Form 3) 最長有效期為 3 個月。', descEn: 'Vendor agency agreement (Form 3) validity capped at 3 months.' },
    { num: '03', titleZh: '文件櫃：土地查冊 P-O-I-M 審核', titleEn: 'Filing Room: P-O-I-M Land Search', section: 'Land Search', descZh: '審核 Property, Owner, Incumbrances (釘牌/押記) 及 Memorials。', descEn: 'Audit Property, Owner, Incumbrances (Charging orders), and Memorials.' },
    { num: '04', titleZh: '會客室：物業資料單 Form 1 查核', titleEn: 'Meeting Room: Form 1 Inspection', section: 'Form 1 Details', descZh: '出售住宅必須附帶 Form 1，核實業權及違建紀錄。', descEn: 'Mandatory Form 1 for residential sales; verify ownership and encumbrances.' },
    { num: '05', titleZh: '露台：違例建築工程 (UBW) 警示', titleEn: 'Balcony: UBW Risk Disclosure', section: 'Cap. 123 Rules', descZh: '屋宇署 Cap. 123 清拆令 (s.24/s.26)，代理需向買方警示按揭風險。', descEn: 'Buildings Dept Cap. 123 removal orders; warn buyers of mortgage risks.' },
    { num: '06', titleZh: '總經理室：雙重代理與權益披露', titleEn: 'Manager Office: Dual Agency Notice', section: 'Code of Ethics', descZh: '雙重代理必須取得雙方書面同意，披露任何金錢利益。', descEn: 'Dual agency requires bilateral written consent and full interest disclosure.' },
    { num: '07', titleZh: '財務部：客戶帳戶託管與訂金', titleEn: 'Finance: Client Account Trust', section: 'Cap. 511 s.43', descZh: '客戶款項必須存入獨立信託戶口，嚴禁挪用。', descEn: 'Client deposits must be held in designated bank trust accounts.' },
    { num: '08', titleZh: '簽約廳：臨時買賣合約 (PASP) 擬定', titleEn: 'Signing Room: PASP Execution', section: 'PASP Terms', descZh: 'PASP 具法律約束力，細訂與大訂條款及破約賠訂責任。', descEn: 'Binding nature of PASP, initial/further deposit terms, and default remedies.' },
    { num: '09', titleZh: '信件箱：變更營業地點 31 天通知', titleEn: 'Mailbox: 31-Day Address Notice', section: 'Cap. 511 s.40', descZh: '營業地點變更必須於 31 天內以書面通知 EAA。', descEn: 'Written notice to EAA within 31 days of changing business address.' },
    { num: '10', titleZh: '交鑰處：租約終止通知期 (Cap. 7)', titleEn: 'Handover: Notice to Quit', section: 'Cap. 7 Tenancy', descZh: 'Cap. 7 住宅租務終止通知期 (Notice to Quit) 及 CR109 申報。', descEn: 'Cap. 7 statutory Notice to Quit rules and Rating & Valuation CR109 filing.' },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Top Header Banner */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          className="p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500">
              <Compass className="h-3.5 w-3.5" />
              <span>Step 2 • Visual Spatial Mnemonic Anchor</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {isZh ? '10 站實景記憶宮殿' : '10-Station Memory Palace'}
            </h1>
            <p className="text-xs sm:text-sm font-medium opacity-80 max-w-2xl leading-relaxed">
              {isZh 
                ? '將香港 EAA 監管局核心法條與數字錨點，順序映射至真實住宅交易路線的 10 個記憶站點。'
                : 'Map HK EAA statutory duties and numeric anchors onto a 10-station residential transaction route.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/course"
              className="px-5 py-3 rounded-2xl border border-slate-700 hover:border-indigo-500 font-bold text-xs transition flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-indigo-400" />
              <span>{isZh ? '返回課程大綱' : 'View Syllabus'}</span>
            </Link>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
              className="px-4 py-3 rounded-2xl border text-xs font-bold transition flex items-center gap-2 hover:border-amber-500 cursor-pointer"
            >
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <span>{showExplanation ? (isZh ? '隱藏指南' : 'Hide Guide') : (isZh ? '記憶法指南' : 'Method Guide')}</span>
              {showExplanation ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Student Concept Guide */}
        {showExplanation && (
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="p-6 sm:p-8 rounded-3xl border shadow-lg space-y-4 animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
              <Sparkles className="h-4 w-4" />
              <span>{isZh ? '學員記憶法指引：如何運用 10 站實景記憶宮殿？' : 'Student Guide: How to Use the 10-Station Spatial Memory Palace'}</span>
            </div>

            <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
              {isZh 
                ? '考場上死記硬背容易混淆死板法條。「記憶宮殿 (Loci Method)」將香港 EAA 監管局最常考的 10 大法定職責，按「住宅物業交易流程」從接待大堂一路順序映射到交鑰處。在試場上，您只需在腦海中「漫步這 10 個房間」，即可秒速喚醒 Cap. 511、Cap. 7 及 Form 1-6 的核心條文與數字時間限制。'
                : 'Rote learning statute numbers leads to confusion under exam pressure. The Memory Palace converts key HK EAA statutory duties into a physical residential transaction route (Lobby to Handover). During the exam, simply "walk" through these 10 rooms in your mind to instantly recall statutory numbers, notice deadlines, and form execution rules.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold">
              <div className="p-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 space-y-1">
                <span className="text-indigo-400 font-mono font-bold block">01. 空間順序 (Sequence)</span>
                <p className="opacity-75">{isZh ? '按物業代理交易真實先後順序排列，絕不混淆流程。' : 'Arranged in chronological real estate transaction sequence.'}</p>
              </div>

              <div className="p-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-1">
                <span className="text-amber-400 font-mono font-bold block">02. 數字錨點 (Anchors)</span>
                <p className="opacity-75">{isZh ? '精準鎖定 31 天地點變更通知、Form 3 三個月等關鍵期限。' : 'Anchors 31-day notice, 3-month Form 3 limit, and Cap. 7 deadlines.'}</p>
              </div>

              <div className="p-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
                <span className="text-emerald-400 font-mono font-bold block">03. 關聯特訓 (Drills)</span>
                <p className="opacity-75">{isZh ? '溫習完 10 站後，直接進入 38 個考官陷阱進行實戰測驗。' : 'Directly links memory anchors to 38 Exam Trap questions.'}</p>
              </div>
            </div>
          </div>
        )}

        {/* 10 Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((st) => (
            <div 
              key={st.num}
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
              className="p-6 rounded-3xl border shadow-xl flex flex-col justify-between space-y-4 hover:border-amber-500/60 transition group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
                    Station {st.num}
                  </span>
                  <span className="text-[10px] font-mono opacity-60 bg-slate-800/60 px-2 py-0.5 rounded-lg">
                    {st.section}
                  </span>
                </div>

                <h3 className="text-base font-bold group-hover:text-amber-400 transition">
                  {isZh ? st.titleZh : st.titleEn}
                </h3>

                <p className="text-xs opacity-75 leading-relaxed">
                  {isZh ? st.descZh : st.descEn}
                </p>
              </div>

              <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-[10px] font-mono font-bold opacity-50 uppercase">
                  Route Stage {st.num}/10
                </span>
                <MapPin className="h-4 w-4 text-amber-400 group-hover:scale-110 transition" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Transition CTA Banner */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          className="p-8 rounded-3xl border shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              {isZh ? '【 步驟 2 完成 】下一步：考官陷阱特訓' : '[ Step 2 Complete ] Next: Exam Trap Drills'}
            </span>
            <h3 className="text-xl font-extrabold">
              {isZh ? '準備好驗證您的記憶宮殿了嗎？' : 'Ready to Test Your Memory Palace Anchors?'}
            </h3>
            <p className="text-xs opacity-80 max-w-xl">
              {isZh 
                ? '進入 Step 3 破解 38 個主考官假命題陷阱，或開啟速記閃卡特訓。' 
                : 'Proceed to Step 3 to review 38 Master Exam Traps or test yourself with AI Legal Flashcards.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/quiz"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 hover:opacity-95 transition flex items-center gap-2"
            >
              <ShieldAlert className="h-4 w-4" />
              <span>{isZh ? '破解 38 考官陷阱' : 'Master 38 Traps'}</span>
            </Link>

            <Link
              href="/flashcards"
              className="px-5 py-3 rounded-2xl border border-slate-700 hover:border-indigo-500 font-bold text-xs transition flex items-center gap-2"
            >
              <Layers className="h-4 w-4 text-indigo-400" />
              <span>{isZh ? '開啟速記閃卡' : 'Flip Flashcards'}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}