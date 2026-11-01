// app/quiz/revision/page.tsx
'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import QuizRunner from '@/components/QuizRunner';
import { useLanguage } from '@/app/context/LanguageContext';
import { RAW_QUESTION_BANK } from '@/app/data/quizQuestions';
import { ArrowLeft, Target, HelpCircle, BookOpen } from 'lucide-react';

export default function RevisionQuizPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ tag?: string }> 
}) {
  // Unwrap searchParams Promise for Next.js 15/16 App Router compatibility
  const resolvedParams = use(searchParams);
  const tag = resolvedParams.tag || 'Cap. 511';

  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // 1. Attempt API fetch
    fetch(`/api/quiz/revision?tag=${encodeURIComponent(tag)}`)
      .then((res) => {
        if (!res.ok) throw new Error('API route unavailable');
        return res.json();
      })
      .then((data) => {
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          setLoading(false);
        } else {
          fallbackToLocalBank();
        }
      })
      .catch(() => {
        // 2. Client-side fallback to RAW_QUESTION_BANK if API is missing or fails
        fallbackToLocalBank();
      });

    function fallbackToLocalBank() {
      const cleanTag = tag.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      const localMatches = (RAW_QUESTION_BANK || []).filter((q: any) => {
        const qTag = (q.ordinance_tag || q.statuteRefZh || q.statuteRefEn || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        return qTag.includes(cleanTag) || cleanTag.includes(qTag);
      });

      // If specific tag has questions, use them; otherwise provide default first 10 questions
      if (localMatches.length > 0) {
        setQuestions(localMatches);
      } else {
        setQuestions((RAW_QUESTION_BANK || []).slice(0, 10));
      }
      setLoading(false);
    }
  }, [tag]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-3">
        <div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full" />
        <p className="text-xs sm:text-sm text-slate-500 font-bold">
          {isZh ? `正在載入 ${tag} 專屬弱點複習題...` : `Loading targeted drill questions for ${tag}...`}
        </p>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-amber-100 text-amber-900 rounded-2xl mb-4 text-3xl">
          🎯
        </div>
        <h1 className="text-xl font-black text-slate-900 mb-2">
          {isZh ? '未找到相應法例的複習題' : 'No Questions Found'}
        </h1>
        <p className="text-slate-500 mb-6 text-xs sm:text-sm max-w-md leading-relaxed">
          {isZh 
            ? `題庫中暫無完全符合 "${tag}" 標籤的試題，建議返回學習進度查看其他單元。`
            : `No questions matching tag "${tag}" were found. Please return to the dashboard.`}
        </p>
        <Link 
          href="/dashboard" 
          className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition shadow-sm"
        >
          ← {isZh ? '返回學習進度儀表板' : 'Return to Dashboard'}
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider inline-block mb-1">
            🎯 {isZh ? '弱點強化模式' : 'Targeted Weakness Drill'}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {isZh ? `專項強化複習：${tag}` : `Topic Drill: ${tag}`}
          </h1>
        </div>
        
        <Link 
          href="/dashboard" 
          className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isZh ? '返回儀表板' : 'Dashboard'}</span>
        </Link>
      </div>

      <QuizRunner questions={questions} />
    </main>
  );
}