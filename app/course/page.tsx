// app/course/page.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { BookOpen, ChevronRight, PlayCircle, CheckCircle } from 'lucide-react';

// Sample Course / Module Structure
const modules = [
  {
    id: 'module-1',
    titleZh: '模組一：地產代理條例 (第511章) 及發牌規例',
    titleEn: 'Module 1: Estate Agents Ordinance (Cap. 511) & Licensing Rules',
    lessons: [
      { id: 'm1-l1', titleZh: '第一講：牌照類別 (EAQE vs SQE) 及申請資格', titleEn: 'Lesson 1: License Types & Eligibility' },
      { id: 'm1-l2', titleZh: '第二講：持牌人常規及操守守則 (Code of Ethics)', titleEn: 'Lesson 2: Code of Ethics & Conduct' },
      { id: 'm1-l3', titleZh: '第三講：違規處分、上訴機制與執法權力', titleEn: 'Lesson 3: Disciplinary Sanctions & Appeals' },
    ],
  },
  {
    id: 'module-2',
    titleZh: '模組二：土地查冊 (Land Search) 與業權實務',
    titleEn: 'Module 2: Land Search & Title Conveyancing',
    lessons: [
      { id: 'm2-l1', titleZh: '第一講：如何解讀土地註冊處查冊紀錄', titleEn: 'Lesson 1: Reading Land Registry Search Reports' },
      { id: 'm2-l2', titleZh: '第二講：負擔 (Encumbrances) 及釘牌/違例建築處理', titleEn: 'Lesson 2: Encumbrances & Unauthorized Building Works' },
    ],
  },
];

export default function CoursePage() {
  const { locale, language } = useLanguage();
  const isZh = locale === 'zh-HK' || language === 'ZH';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Course Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isZh ? 'EAQE / SQE 課程大綱' : 'EAQE / SQE Course Syllabus'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            {isZh
              ? '選擇下方章節開始研讀法定考點、法例條款分析及單元隨堂測驗。'
              : 'Select a lesson below to study statutory key points, Cap. clause analysis, and module quizzes.'}
          </p>
        </div>

        {/* Modules & Active Lesson Links */}
        <div className="space-y-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4"
            >
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-400" />
                <span>{isZh ? module.titleZh : module.titleEn}</span>
              </h2>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/course/${lesson.id}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500 hover:bg-slate-800 transition group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <PlayCircle className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition">
                        {isZh ? lesson.titleZh : lesson.titleEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                      <span>{isZh ? '開始學習' : 'Start Lesson'}</span>
                      <ChevronRight className="h-4 w-4" />
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