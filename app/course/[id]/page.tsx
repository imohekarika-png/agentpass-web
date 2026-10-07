// app/course/[id]/page.tsx
'use client';

import { use } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { ArrowLeft, CheckCircle, FileText } from 'lucide-react';

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { locale, language } = useLanguage();
  const isZh = locale ? locale === 'zh-HK' : language === 'ZH';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/course"
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isZh ? '返回課程大綱' : 'Back to Syllabus'}</span>
        </Link>

        {/* Lesson Card */}
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <span className="inline-block rounded-lg bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-mono text-indigo-400">
              {resolvedParams.id.toUpperCase()}
            </span>
            <span className="text-xs text-slate-500">Cap. 511 Ordinance</span>
          </div>

          <h1 className="text-2xl font-bold text-white">
            {isZh ? '章節講義與考點分析' : 'Lesson Study Notes & Key Exam Points'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isZh
              ? '本章節涵蓋地產代理條例核心條文及監管局最新指引。請仔細閱讀講義並完成隨堂測驗。'
              : 'This lesson covers core statutory provisions of the Estate Agents Ordinance and EAA guidelines. Review the notes and complete the module quiz.'}
          </p>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <FileText className="h-4 w-4 text-indigo-400" />
              <span>{isZh ? '法定條文要點' : 'Statutory Key Points'}</span>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-1">
              <li>{isZh ? '第15條：持牌人牌照有效期與續期條件' : 'Section 15: License Validity & Renewal Requirements'}</li>
              <li>{isZh ? '第36條：地產代理協議 (Form 1 - Form 6) 必須填寫事項' : 'Section 36: Estate Agency Agreements Mandatory Particulars'}</li>
              <li>{isZh ? '第48條：違規行為之紀律制裁及罰則' : 'Section 48: Disciplinary Sanctions & Penalties'}</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition"
            >
              <CheckCircle className="h-4 w-4" />
              <span>{isZh ? '進入單元隨堂測驗' : 'Start Module Quiz'}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}