// app/course/page.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  BookOpen, 
  ChevronRight, 
  ShieldCheck, 
  AlertTriangle, 
  BrainCircuit, 
  Compass, 
  Scale
} from 'lucide-react';

const EAA_COURSE_STRUCTURE = [
  {
    moduleId: 'module-1',
    titleZh: 'Module 1：監管核心 (The Regulatory Core)',
    titleEn: 'Module 1: The Regulatory Core & Licensing',
    weight: '約 40% 考點 (Highest Return)',
    descriptionZh: '涵蓋《地產代理條例》(Cap. 511)、發牌條件、法定表格 Forms 1-6、執業規例及操守守則。',
    descriptionEn: 'Cap. 511, licensing requirements, prescribed Forms 1-6, Practice Regulation, and Code of Ethics.',
    blocks: [
      { id: 'm1-l1', titleZh: '1.1 EAO 立法原意與 EAA 職能 (四層監管架構)', titleEn: '1.1 Why EAO Exists & EAA 4-Floor Model' },
      { id: 'm1-l2', titleZh: '1.2 牌照類別與申請資格 (18-5-12-F&P 及 3到1續期)', titleEn: '1.2 License Types & Eligibility (18-5-12-F&P & 3-to-1 Renewal)' },
      { id: 'm1-l3', titleZh: '1.3 法定表格 Forms 1 至 6 (單數賣、雙數買)', titleEn: '1.3 Prescribed Forms 1-6 (Odd Sells, Even Buys)' },
      { id: 'm1-l4', titleZh: '1.4 執業規例與客戶資金託管 (3-2-14-3 法則)', titleEn: '1.4 Practice Regulation & Client Money (3-2-14-3 Rule)' },
      { id: 'm1-l5', titleZh: '1.5 操守守則 (3H 原則、利益申報與公平對待)', titleEn: '1.5 Code of Ethics (3 H\'s & Disclosure Duties)' },
      { id: 'm1-l6', titleZh: '1.6 調查、紀律處分 (ARSC)、上訴與佣金爭議', titleEn: '1.6 Investigations, Discipline (ARSC) & Appeals' },
    ]
  },
  {
    moduleId: 'module-2',
    titleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    titleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    weight: '約 10% 考點 (Level 2 基礎概念)',
    descriptionZh: '普通法、衡平法、合約法、失實陳述、物業轉讓條例、按揭及五大物業相關稅項。',
    descriptionEn: 'Common Law, Equity, Agency, Contract, Misrepresentation, Mortgages, and Taxes.',
    blocks: [
      { id: 'm2-l1', titleZh: '2.1 法律三大來源與代理人權限 (O-A-C-I 合約要件)', titleEn: '2.1 Sources of Law & Contract Formation (O-A-C-I)' },
      { id: 'm2-l2', titleZh: '2.2 合約、失實陳述與疏忽 (「現狀 As Is」條款真義)', titleEn: '2.2 Misrepresentation & "As Is" Clause Scope' },
      { id: 'm2-l3', titleZh: '2.3 相關條例三大家族 (交易、房屋及行為守則)', titleEn: '2.3 Ordinance Families (Deal, Home, Behavior)' },
      { id: 'm2-l4', titleZh: '2.4 業權證明 (15 年業權鏈) 與訂金託管 (NEG-CHG-CONF)', titleEn: '2.4 Title Proof (15-Yr Chain) & Stakeholding (NEG-CHG-CONF)' },
      { id: 'm2-l5', titleZh: '2.5 物業相關稅項 (印花稅計算與五大稅種)', titleEn: '2.5 Property Taxes & Stamp Duty Calculation' },
    ]
  },
  {
    moduleId: 'module-3',
    titleZh: 'Module 3：閱讀物業 (Reading the Property)',
    titleEn: 'Module 3: Land Search, Buildings & Valuation',
    weight: '約 18% Part I / 30% Part II 個案題',
    descriptionZh: '土地查冊四抽屜 (P-O-I-M)、公司賣方雙重查冊、大廈公契 (DMC)、建築物條例及估值四大方法 (CIRP)。',
    descriptionEn: 'Land search (P-O-I-M), corporate vendor rule, DMC, Buildings Ordinance (Cap. 123), Valuation (CIRP).',
    blocks: [
      { id: 'm3-l1', titleZh: '3.1 土地查冊四抽屜 (P-O-I-M) 與公司賣方雙重查冊', titleEn: '3.1 Land Search Structure (P-O-I-M) & Corporate Vendor' },
      { id: 'm3-l2', titleZh: '3.2 建築物條例、拆改結構牆規範與大廈公契 (DMC)', titleEn: '3.2 Buildings Ordinance, Structural Alterations & DMC' },
      { id: 'm3-l3', titleZh: '3.3 物業估值四大方法 (CIRP) 與地盤估值 (CRD)', titleEn: '3.3 Property Valuation (CIRP) & Site Methods (CRD)' },
      { id: 'm3-l4', titleZh: '3.4 統計數據與官方資訊系統 (差餉物業估價署 RVD)', titleEn: '3.4 Housing Statistics & Official RVD Information' },
    ]
  },
  {
    moduleId: 'module-4',
    titleZh: 'Module 4：租務實務、機構管理與應試技巧',
    titleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    weight: '約 22% 考點 (Level 4 重點考區)',
    descriptionZh: '租務 2-2-2 鏡像、15 天欠租沒收、CR109 申報、機構管理及交易記憶宮殿。',
    descriptionEn: 'Tenancy 2-2-2 mirror, 15-day forfeiture, CR109, agency management, Memory Palace.',
    blocks: [
      { id: 'm4-l1', titleZh: '4.1 租務 2-2-2 鏡像法则、15 天沒收權與 CR109 申報', titleEn: '4.1 Tenancy 2-2-2 Mirror, 15-Day Forfeiture & CR109' },
      { id: 'm4-l2', titleZh: '4.2 有效機構管理 (P-M-D 通知、S-C-P-R 反洗錢與信頭規範)', titleEn: '4.2 Agency Management (P-M-D Notice, S-C-P-R AML)' },
      { id: 'm4-l3', titleZh: '4.3 十站交易記憶宮殿 (Transaction Memory Palace)', titleEn: '4.3 The 10-Station Transaction Memory Palace' },
      { id: 'm4-l4', titleZh: '4.4 Part II 個案研習技巧與審題「三行法則」', titleEn: '4.4 Part II Case Study Technique & 3-Line Method' },
      { id: 'm4-l5', titleZh: '4.5 1-3-7-16-35 溫習階梯與大師級考前陷阱冊', titleEn: '4.5 Spaced Repetition Ladder & Master Trap Register' },
    ]
  }
];

export default function CoursePage() {
  const { locale, language } = useLanguage();
  const isZh = locale ? locale === 'zh-HK' : language === 'ZH';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
            <span>
              {isZh ? '香港 EAA 20 大主題單元與記憶工程學' : 'HK EAA 20 Topic Blocks with Memory Engineering'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isZh ? 'EAQE / SQE 雙語通關課程大綱' : 'EAQE / SQE Bilingual Course Syllabus'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {isZh
              ? '依據 EAA 官方大綱與真題答案庫編寫。結合記憶鉤 (Memory Hooks)、全真檢索測試與考官陷阱拆解。'
              : 'Built on official EAA syllabi and sample exam answer keys. Features Memory Hooks, Active Retrieval, and Trap Registers.'}
          </p>
        </div>

        {/* Quick Tools Access Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/course/m4-l3"
            className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 hover:border-indigo-400 transition flex items-center gap-3"
          >
            <Compass className="h-6 w-6 text-indigo-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">{isZh ? '十站交易記憶宮殿' : '10-Station Memory Palace'}</div>
              <div className="text-[11px] text-slate-400">{isZh ? '貫串全套交易流程' : 'Transaction lifecycle walk'}</div>
            </div>
          </Link>

          <Link
            href="/course/m4-l5"
            className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 hover:border-amber-400 transition flex items-center gap-3"
          >
            <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">{isZh ? '大師級陷阱冊' : 'Master Trap Register'}</div>
              <div className="text-[11px] text-slate-400">{isZh ? '38 個官方核實錯項' : '38 verified exam traps'}</div>
            </div>
          </Link>

          <Link
            href="/quiz"
            className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 transition flex items-center gap-3"
          >
            <BrainCircuit className="h-6 w-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">{isZh ? '1-3-7-16-35 溫習階梯' : 'Spaced Repetition'}</div>
              <div className="text-[11px] text-slate-400">{isZh ? '進入全真模擬題庫' : 'Practice question bank'}</div>
            </div>
          </Link>
        </div>

        {/* Modules Grid (Modules 1 - 4 with 20 Blocks) */}
        <div className="space-y-8 pt-2">
          {EAA_COURSE_STRUCTURE.map((module) => (
            <div
              key={module.moduleId}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-400 shrink-0" />
                    <span>{isZh ? module.titleZh : module.titleEn}</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {isZh ? module.descriptionZh : module.descriptionEn}
                  </p>
                </div>
                <span className="rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-mono font-semibold text-indigo-300">
                  {module.weight}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {module.blocks.map((block) => (
                  <Link
                    key={block.id}
                    href={`/course/${block.id}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500 hover:bg-slate-800 transition group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 pr-2">
                      <Scale className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300 transition shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition leading-snug">
                        {isZh ? block.titleZh : block.titleEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 shrink-0">
                      <span>{isZh ? '研讀' : 'Study'}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}