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
  Award,
  ShieldAlert,
  Layers,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle
} from 'lucide-react';

interface TopicBlock {
  id: string;
  num: string;
  titleZh: string;
  titleEn: string;
  part: 'I' | 'II';
  categoryZh: string;
  categoryEn: string;
  summaryZh: string;
  summaryEn: string;
  keyStatutes: string[];
}

const TOPIC_BLOCKS: TopicBlock[] = [
  // PART I: Statutory Regulation (Cap. 511 & Statutory Bodies)
  {
    id: 'b1',
    num: 'Block 01',
    part: 'I',
    categoryZh: '發牌與資格',
    categoryEn: 'Licensing & Qualifications',
    titleZh: '地產代理監管局 (EAA) 架構與持牌資格',
    titleEn: 'EAA Structure & Licensing Qualifications',
    summaryZh: 'Cap. 511 規定的代理 (EAQE) 與營業員 (SQE) 發牌條件、適當人選測試 (Fit and Proper Test) 及無破產聲明。',
    summaryEn: 'Licensing conditions under Cap. 511 for EAQE/SQE, Fit & Proper person criteria, and discharge of bankruptcy requirements.',
    keyStatutes: ['Cap. 511 s.15', 'Cap. 511 s.19', 'EAA Guidelines']
  },
  {
    id: 'b2',
    num: 'Block 02',
    part: 'I',
    categoryZh: '營業地點規管',
    categoryEn: 'Business Premises',
    titleZh: '營業地點展示牌照與 31 天法定通知期',
    titleEn: 'License Display & 31-Day Address Change Notice',
    summaryZh: '每個營業地點必須展示牌照正本。營業地點變更後必須於 31 天內以書面通知 EAA，違反屬刑事罪行。',
    summaryEn: 'Mandatory display of original license at every branch. Any change of business address must be notified in writing within 31 days.',
    keyStatutes: ['Cap. 511 s.36', 'Cap. 511 s.40']
  },
  {
    id: 'b3',
    num: 'Block 03',
    part: 'I',
    categoryZh: '廣告與名片規範',
    categoryEn: 'Advertising Rules',
    titleZh: '地產廣告發放與名片印製法定規範',
    titleEn: 'Real Estate Advertising & Business Card Standards',
    summaryZh: '廣告必須取得業主書面授權，名片必須清楚印有牌照號碼及持牌人姓名，禁止發放虛假或誤導性宣傳。',
    summaryEn: 'Written vendor authorization required prior to advertising. Business cards must state license number and registered name.',
    keyStatutes: ['Cap. 511 s.37', 'Practice Regulation s.9']
  },
  {
    id: 'b4',
    num: 'Block 04',
    part: 'I',
    categoryZh: '客戶帳戶管理',
    categoryEn: 'Client Account Trust',
    titleZh: '客戶存款 (Client Money) 託管與獨立信託帳戶',
    titleEn: 'Client Money Custody & Independent Trust Accounts',
    summaryZh: '代理收取之訂金與客戶款項必須於指定期限內存入持牌銀行客戶信託戶口，嚴禁挪用或混淆款項。',
    summaryEn: 'All client deposits must be deposited into designated bank trust accounts. Strict prohibition against commingling funds.',
    keyStatutes: ['Cap. 511 s.43', 'Client Money Rules']
  },
  {
    id: 'b5',
    num: 'Block 05',
    part: 'I',
    categoryZh: '雙重代理與利益',
    categoryEn: 'Dual Agency & Interest',
    titleZh: '雙重代理 (Dual Agency) 與金錢利益全面披露',
    titleEn: 'Dual Agency Status & Financial Interest Disclosures',
    summaryZh: '同時代表買賣雙方必須向兩端進行書面披露並取得同意；對物業有直接或間接金錢利益必須即時聲明。',
    summaryEn: 'Dual agency requires full written disclosure and bilateral consent. Any direct/indirect financial interest must be declared.',
    keyStatutes: ['Cap. 511 s.46', 'Code of Ethics s.3(5)']
  },
  {
    id: 'b6',
    num: 'Block 06',
    part: 'I',
    categoryZh: '紀律程序與制裁',
    categoryEn: 'Disciplinary Actions',
    titleZh: 'EAA 調查權力、紀律研訊與撤銷牌照處分',
    titleEn: 'EAA Investigation Powers & License Revocation',
    summaryZh: '監管局執法人員之進入及巡查權力、紀律委員會處分程序 (譴責、罰款、附帶條件及撤銷牌照)。',
    summaryEn: 'Inspection and entry powers of EAA officers, disciplinary tribunal procedures, fines, conditions, and license revocations.',
    keyStatutes: ['Cap. 511 s.28', 'Cap. 511 s.30', 'Cap. 511 s.44']
  },
  {
    id: 'b7',
    num: 'Block 07',
    part: 'I',
    categoryZh: '操守守則',
    categoryEn: 'Code of Ethics',
    titleZh: '操守守則：盡職審查與誠實秉岸責任',
    titleEn: 'Code of Ethics: Due Diligence & Professional Integrity',
    summaryZh: '代理對客戶應盡的忠誠責任 (Fiduciary Duty)、避免利益衝突、妥善保存紀錄 5 年等專業標準。',
    summaryEn: 'Fiduciary duties owed to clients, conflict avoidance, and statutory duty to retain transaction records for 5 years.',
    keyStatutes: ['EAA Code of Ethics', 'Practice Regulation s.15']
  },
  {
    id: 'b8',
    num: 'Block 08',
    part: 'I',
    categoryZh: '反洗黑錢條例',
    categoryEn: 'AML Compliance',
    titleZh: '反洗錢 (AMLO) 客戶盡職審查與可疑交易舉報',
    titleEn: 'Anti-Money Laundering (AMLO) Customer Due Diligence',
    summaryZh: '打擊洗錢條例 (Cap. 615) 下代理之客戶身分核實 (CDD) 義務、政治敏感人物 (PEP) 審查及 STR 舉報。',
    summaryEn: 'Customer due diligence (CDD) obligations under Cap. 615, Politically Exposed Persons screening, and STR reporting.',
    keyStatutes: ['Cap. 615', 'EAA AML Guidelines']
  },
  {
    id: 'b9',
    num: 'Block 09',
    part: 'I',
    categoryZh: '個人資料私隱',
    categoryEn: 'Privacy Ordinance',
    titleZh: '個人資料 (私隱) 條例 Cap. 486 與電話行銷規管',
    titleEn: 'Personal Data Privacy (Cap. 486) & Direct Marketing',
    summaryZh: '收集客戶身份證及入息證明之六大私隱原則，直接促銷前必須取得客戶明確同意 (Opt-in)。',
    summaryEn: 'Compliance with 6 Data Protection Principles when handling identity/financial proof. Opt-in requirement for direct marketing.',
    keyStatutes: ['Cap. 486', 'DPP 1 - DPP 6']
  },
  {
    id: 'b10',
    num: 'Block 10',
    part: 'I',
    categoryZh: '競爭法例',
    categoryEn: 'Competition Law',
    titleZh: '競爭條例 Cap. 619 與地產代理業界佣金協議 Prohibition',
    titleEn: 'Competition Ordinance (Cap. 619) & Anti-Fixing Commission',
    summaryZh: '禁止競爭對手合謀定價 (Price-fixing) 或協調佣金折讓率，代理行必須獨立制定佣金政策。',
    summaryEn: 'Prohibition of cartel behavior, market sharing, or commission rate-fixing. Independent commission policies mandated.',
    keyStatutes: ['Cap. 619', 'First Conduct Rule']
  },

  // PART II: Conveyancing, Tenancy & Statutory Forms
  {
    id: 'b11',
    num: 'Block 11',
    part: 'II',
    categoryZh: '地產代理協議',
    categoryEn: 'Agency Agreements',
    titleZh: '法定地產代理協議表格 Form 3 至 Form 6 詳解',
    titleEn: 'Statutory Agency Agreements (Forms 3 to 6) Mastery',
    summaryZh: 'Form 3 (賣方)、Form 4 (買方)、Form 5 (出租人) 及 Form 6 (承租人) 之法定條款、有效期限制 (最長 3 個月) 及佣金條款。',
    summaryEn: 'Statutory provisions, mandatory expiration terms (max 3 months), and commission clauses for Forms 3, 4, 5, and 6.',
    keyStatutes: ['Form 3', 'Form 4', 'Form 5', 'Form 6']
  },
  {
    id: 'b12',
    num: 'Block 12',
    part: 'II',
    categoryZh: '物業資料單',
    categoryEn: 'Property Information Form',
    titleZh: '物業資料單 Form 1 (表格 1) 填寫與審核職責',
    titleEn: 'Property Information Form (Form 1) Inspection Duties',
    summaryZh: '出售住宅物業必須附帶 Form 1，包含土地查冊資料、業權負擔、違建工程及管理費詳情。',
    summaryEn: 'Mandatory completion of Form 1 for residential sales, including land register data, encumbrances, and management fees.',
    keyStatutes: ['Form 1', 'Practice Regulation s.3']
  },
  {
    id: 'b13',
    num: 'Block 13',
    part: 'II',
    categoryZh: '租賃資料單',
    categoryEn: 'Leasing Information Form',
    titleZh: '租賃物業資料單 Form 2 (表格 2) 規範',
    titleEn: 'Leasing Property Information Form (Form 2) Rules',
    summaryZh: '出租住宅物業必須提供 Form 2，核實業主身分、擬租出範圍、大廈公契限制及分租許可。',
    summaryEn: 'Mandatory delivery of Form 2 for residential lettings, verifying landlord ownership, DMC restrictions, and subletting rules.',
    keyStatutes: ['Form 2', 'Practice Regulation s.4']
  },
  {
    id: 14 as any,
    num: 'Block 14',
    part: 'II',
    categoryZh: '土地查冊 P-O-I-M',
    categoryEn: 'Land Search P-O-I-M',
    titleZh: '土地查冊 P-O-I-M 四大核心章節深度解析',
    titleEn: 'Land Search P-O-I-M (Property, Owner, Incumbrances, Memorials)',
    summaryZh: 'P (Property details)、O (Owner details)、I (Incumbrances 押記/釘牌/法庭命令) 及 M (Memorials 備忘錄) 的解析技巧。',
    summaryEn: 'Systematic analysis of Property Details, Ownership records, Incumbrances (Charging orders/UBW notices), and Memorials.',
    keyStatutes: ['Land Registration Ordinance Cap. 128']
  },
  {
    id: 'b15',
    num: 'Block 15',
    part: 'II',
    categoryZh: '業權與負擔',
    categoryEn: 'Title Encumbrances',
    titleZh: '業權瑕疵：違建工程 (UBW)、釘牌與法院押記令',
    titleEn: 'Title Defects: UBW, Building Orders & Court Charging Orders',
    summaryZh: '屋宇署 Cap. 123 建築物條例清拆令 (s.24/s.26)、解釘程序、未授權改建對按揭及物業交易之影響。',
    summaryEn: 'Buildings Department Cap. 123 removal orders, charging orders, and unapproved structural alterations affecting mortgage ability.',
    keyStatutes: ['Cap. 123 s.24', 'Cap. 123 s.26']
  },
  {
    id: 'b16',
    num: 'Block 16',
    part: 'II',
    categoryZh: '業主與租客條例',
    categoryEn: 'Tenancy Ordinance Cap. 7',
    titleZh: '業主與租客 (綜合) 條例 Cap. 7 與租務管制',
    titleEn: 'Landlord & Tenant (Consolidation) Ordinance Cap. 7',
    summaryZh: '住宅租約法定終止通知期 (Notice to Quit)、收樓程序、CR109 差餉物業估價署申報表及劏房租務管制 (Part IVA)。',
    summaryEn: 'Statutory Notice to Quit periods, CR109 Notice submission to Rating & Valuation Dept, and Part IVA sub-divided unit control.',
    keyStatutes: ['Cap. 7 Part IV', 'Cap. 7 Part IVA', 'Form CR109']
  },
  {
    id: 'b17',
    num: 'Block 17',
    part: 'II',
    categoryZh: '買賣合約與定金',
    categoryEn: 'PASP & Deposits',
    titleZh: '臨時買賣合約 (PASP) 擬定、細訂與大訂條款',
    titleEn: 'Provisional Agreement (PASP) Drafting & Deposit Rules',
    summaryZh: 'PASP 法律拘束力、細訂 (Initial deposit)、大訂 (Further deposit) 託管於律師樓、必買必賣條款與破約賠訂金。',
    summaryEn: 'Binding nature of PASP, initial vs further deposit stakeholding by solicitors, and default/forfeiture clauses.',
    keyStatutes: ['Conveyancing Ordinance Cap. 219']
  },
  {
    id: 'b18',
    num: 'Block 18',
    part: 'II',
    categoryZh: '印花稅條例',
    categoryEn: 'Stamp Duty Ordinance',
    titleZh: '印花稅條例 Cap. 117：從價印花稅 (AVD) 及買家印花稅',
    titleEn: 'Stamp Duty Ordinance (Cap. 117): AVD & BSD Rules',
    summaryZh: '買賣合約及租約加蓋印花 (Stamping) 的法定限期 (30天內)、從價印花稅 (AVD Scale 1/2) 稅率及租約印花稅 (光印)。',
    summaryEn: 'Statutory 30-day deadline for stamping PASP/Tenancy agreements, AVD scale tiers, and tenancy stamp duty calculation.',
    keyStatutes: ['Cap. 117 s.4', 'Cap. 117 Head 1']
  },
  {
    id: 'b19',
    num: 'Block 19',
    part: 'II',
    categoryZh: '一手住宅物業',
    categoryEn: 'First-hand Sales',
    titleZh: '一手住宅物業銷售條例 Cap. 621 與售樓說明書',
    titleEn: 'First-hand Residential Properties Sales Ordinance (Cap. 621)',
    summaryZh: '一手新盤售樓說明書 (Sales Brochure) 7 天前發放、價單 (Price List) 3 天前公佈、意向書與登記流程規管。',
    summaryEn: 'First-hand developments: 7-day sales brochure rule, 3-day price list publication, and registrants order handling.',
    keyStatutes: ['Cap. 621', 'SRPA Guidelines']
  },
  {
    id: 'b20',
    num: 'Block 20',
    part: 'II',
    categoryZh: '建築物與大廈公契',
    categoryEn: 'DMC & Town Planning',
    titleZh: '大廈公契 (DMC) 條款與城市規劃條例 Cap. 131',
    titleEn: 'Deed of Mutual Covenant (DMC) & Town Planning (Cap. 131)',
    summaryZh: 'DMC 養狗限制、商業/住宅用途變更、城市規劃委員會 (TPB) 法定用途及政府地契 (Government Lease) 限制。',
    summaryEn: 'DMC provisions (pet restrictions, trade uses), Town Planning Board zoning restrictions, and Government Lease user covenants.',
    keyStatutes: ['Cap. 131', 'DMC Express Covenants']
  }
];

export default function CoursePage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [activeTab, setActiveTab] = useState<'all' | 'part1' | 'part2'>('all');
  const [showExplanation, setShowExplanation] = useState(true);

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

  const filteredBlocks = TOPIC_BLOCKS.filter((b) => {
    if (activeTab === 'part1') return b.part === 'I';
    if (activeTab === 'part2') return b.part === 'II';
    return true;
  });

  const memoryStations = [
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

        {/* Course Syllabus Top Banner */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          className="p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Official HK EAA EAQE / SQE Licensing Syllabus</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {isZh ? '20 大主題單元 (20 Topic Blocks)' : '20 Topic Block Lessons'}
            </h1>
            <p className="text-xs sm:text-sm font-medium opacity-80 max-w-2xl leading-relaxed">
              {isZh 
                ? '系統化精讀單元，全面涵蓋地產代理條例 (Cap. 511)、業主與租客條例 (Cap. 7)、土地查冊 P-O-I-M 及 EAA 法定表格 Forms 1-6。'
                : 'Complete statutory coverage of Cap. 511, Cap. 7 Tenancy, Land Search P-O-I-M, and Statutory Forms 1-6.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="#memory-palace"
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
            >
              <Compass className="h-4 w-4" />
              <span>{isZh ? '直達記憶宮殿' : 'Jump to Memory Palace'}</span>
            </Link>

            <Link
              href="/quiz"
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/25 transition flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isZh ? '前往試題庫' : 'Quiz Bank'}</span>
            </Link>
          </div>
        </div>

        {/* Syllabus Part I & Part II Category Tabs */}
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
                onClick={() => setActiveTab('part1')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeTab === 'part1'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-indigo-500/50'
                }`}
              >
                {isZh ? 'Part I: 法定規管與條例 (Block 1-10)' : 'Part I: Statutory Regulations (1-10)'}
              </button>

              <button
                onClick={() => setActiveTab('part2')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeTab === 'part2'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-indigo-500/50'
                }`}
              >
                {isZh ? 'Part II: 轉讓實務與表格 (Block 11-20)' : 'Part II: Practice & Forms (11-20)'}
              </button>
            </div>

            <div className="text-xs font-mono font-bold opacity-60">
              Showing {filteredBlocks.length} of {TOPIC_BLOCKS.length} Topic Blocks
            </div>
          </div>

          {/* 20 Topic Blocks Full Cards Grid */}
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
                    <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                      {isZh ? block.categoryZh : block.categoryEn}
                    </span>
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
                  <div className="flex flex-wrap items-center gap-1.5">
                    {block.keyStatutes.map((st, i) => (
                      <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 opacity-80">
                        {st}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
                  >
                    <span>{isZh ? '進入單元測試' : 'Practice Block Quiz'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10-Station Memory Palace Section */}
        <section 
          id="memory-palace" 
          className="scroll-mt-24 pt-10 border-t space-y-8"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500">
                <Compass className="h-3.5 w-3.5" />
                <span>Visual Spatial Mnemonic Anchor</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                10-Station Memory Palace (10 站記憶宮殿)
              </h2>
            </div>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
              className="px-4 py-2 rounded-2xl border text-xs font-bold transition flex items-center gap-2 hover:border-amber-500 shrink-0 cursor-pointer"
            >
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <span>{showExplanation ? (isZh ? '隱藏記憶法說明' : 'Hide Method Guide') : (isZh ? '甚麼是記憶宮殿？' : 'What is Memory Palace?')}</span>
              {showExplanation ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Student Explanation Guide */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memoryStations.map((st) => (
              <div 
                key={st.num}
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                className="p-5 rounded-2xl border shadow-md flex items-start justify-between gap-4 hover:border-indigo-500/60 transition group cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      Station {st.num}
                    </span>
                    <span className="text-[10px] font-mono opacity-60">{st.section}</span>
                  </div>
                  <h3 className="text-sm font-bold group-hover:text-indigo-400 transition">
                    {isZh ? st.titleZh : st.titleEn}
                  </h3>
                </div>
                <MapPin className="h-5 w-5 text-indigo-400 shrink-0 mt-1 group-hover:scale-110 transition" />
              </div>
            ))}
          </div>

          {/* Bottom Conversion CTA Banner */}
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="p-8 rounded-3xl border shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 mt-8"
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
        </section>

      </div>
    </div>
  );
}