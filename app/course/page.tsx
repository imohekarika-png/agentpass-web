// app/course/page.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { BookOpen, ChevronRight, PlayCircle, ShieldCheck } from 'lucide-react';

// Comprehensive EAA Exam Modules (Modules 1 to 4)
const modules = [
  {
    id: 'module-1',
    titleZh: '模組一：地產代理條例 (第511章) 及發牌規例',
    titleEn: 'Module 1: Estate Agents Ordinance (Cap. 511) & Licensing Rules',
    lessons: [
      { id: 'm1-l1', titleZh: '第一講：牌照類別 (EAQE vs SQE) 及申請資格', titleEn: 'Lesson 1: License Types & Eligibility' },
      { id: 'm1-l2', titleZh: '第二講：持牌人常規及操守守則 (Code of Ethics)', titleEn: 'Lesson 2: Code of Ethics & Practice Rules' },
      { id: 'm1-l3', titleZh: '第三講：違規處分、上訴機制與執法權力', titleEn: 'Lesson 3: Disciplinary Sanctions & Appeals' },
      { id: 'm1-l4', titleZh: '第四講：地產代理監管局 (EAA) 權力與職能', titleEn: 'Lesson 4: Functions & Powers of EAA' },
    ],
  },
  {
    id: 'module-2',
    titleZh: '模組二：土地查冊 (Land Search) 與業權實務',
    titleEn: 'Module 2: Land Search & Title Conveyancing',
    lessons: [
      { id: 'm2-l1', titleZh: '第一講：如何解讀土地註冊處查冊紀錄', titleEn: 'Lesson 1: Reading Land Registry Search Reports' },
      { id: 'm2-l2', titleZh: '第二講：負擔 (Encumbrances) 及釘牌/違例建築處理', titleEn: 'Lesson 2: Encumbrances & Unauthorized Building Works' },
      { id: 'm2-l3', titleZh: '第三講：業權證明 (Proof of Title) 及土地註冊條例', titleEn: 'Lesson 3: Proof of Title & Land Registration Ordinance' },
      { id: 'm2-l4', titleZh: '第四講：逆權侵佔 (Adverse Possession) 與地契限制', titleEn: 'Lesson 4: Adverse Possession & Government Lease Restrictions' },
    ],
  },
  {
    id: 'module-3',
    titleZh: '模組三：法定地產代理協議 (Form 1 - Form 6) 與租務實務',
    titleEn: 'Module 3: Statutory Agency Agreements (Forms 1-6) & Tenancy',
    lessons: [
      { id: 'm3-l1', titleZh: '第一講：表格 1 至 6 (Forms 1-6) 填寫規範與法定要點', titleEn: 'Lesson 1: Statutory Forms 1-6 Mandatory Particulars' },
      { id: 'm3-l2', titleZh: '第二講：買賣合約 (ASP) 與訂金處置條款', titleEn: 'Lesson 2: Agreement for Sale & Purchase (ASP) & Stakeholding' },
      { id: 'm3-l3', titleZh: '第三講：業主與租客 (綜合) 條例及租約印花稅', titleEn: 'Lesson 3: Landlord & Tenant Ordinance & Stamp Duty' },
      { id: 'm3-l4', titleZh: '第四講：雙重代理 (Dual Agency) 與佣金申報責任', titleEn: 'Lesson 4: Dual Agency & Disclosure of Commission' },
    ],
  },
  {
    id: 'module-4',
    titleZh: '模組四：物業估值、建築物條例與按揭融資',
    titleEn: 'Module 4: Property Valuation, Buildings Ordinance & Mortgages',
    lessons: [
      { id: 'm4-l1', titleZh: '第一講：物業估值方法 (Valuation Methods) 與面積計算', titleEn: 'Lesson 1: Property Valuation Methods & Area Calculation' },
      { id: 'm4-l2', titleZh: '第二講：建築物條例 (Cap. 123) 及改建限制', titleEn: 'Lesson 2: Buildings Ordinance (Cap. 123) & Alterations' },
      { id: 'm4-l3', titleZh: '第三講：樓宇按揭 (Mortgage) 及供款與入息比率限制', titleEn: 'Lesson 3: Property Mortgages & Debt-to-Income Ratios' },
      { id: 'm4-l4', titleZh: '第四講：印花稅條例 (Cap. 117) 住宅與非住宅稅率', titleEn: 'Lesson 4: Stamp Duty Ordinance (Cap. 117) Rates & Rules' },
    ],
  },
];

export default function CoursePage() {
  const { locale, language } = useLanguage();
  const isZh = locale ? locale === 'zh-HK' : language === 'ZH';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-xs font-semibold text-indigo-300">
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
            <span>
              {isZh ? '香港 EAA 考試完整四大核心單元' : 'Complete 4 Core EAA Exam Modules'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isZh ? 'EAQE / SQE 課程大綱' : 'EAQE / SQE Course Syllabus'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {isZh
              ? '點擊下方任何單元講義，即時進入研讀法定考點、法例條款分析及精選測驗。'
              : 'Select any lesson below to access statutory study notes, Cap. clause analysis, and practice quizzes.'}
          </p>
        </div>

        {/* Modules Grid (1 to 4) */}
        <div className="space-y-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-md"
            >
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <BookOpen className="h-5 w-5 text-indigo-400 shrink-0" />
                <span>{isZh ? module.titleZh : module.titleEn}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/course/${lesson.id}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500 hover:bg-slate-800 transition group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 pr-2">
                      <PlayCircle className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300 transition shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition leading-snug">
                        {isZh ? lesson.titleZh : lesson.titleEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 shrink-0">
                      <span>{isZh ? '開始研讀' : 'Study'}</span>
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