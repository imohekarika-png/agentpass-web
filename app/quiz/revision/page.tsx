// app/quiz/revision/page.tsx
'use client';

import { useEffect, useState, use } from 'react';
import QuizRunner from '@/components/QuizRunner';
import Link from 'next/link';

export default function RevisionQuizPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ tag?: string }> 
}) {
  // Unwrap searchParams Promise for Next.js 15/16 App Router compatibility
  const resolvedParams = use(searchParams);
  const tag = resolvedParams.tag || 'Cap. 511';

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/quiz/revision?tag=${encodeURIComponent(tag)}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading revision questions:', err);
        setLoading(false);
      });
  }, [tag]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center space-y-3">
        <div className="animate-spin h-8 w-8 border-4 border-amber-600 border-t-transparent rounded-full" />
        <p className="text-sm text-slate-500 font-medium">
          Loading topic drill questions for {tag}...
        </p>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-2xl mb-4 text-3xl">
          🎯
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          No Questions Found
        </h1>
        <p className="text-slate-500 mb-6 text-sm max-w-md">
          No questions matching ordinance tag <strong>"{tag}"</strong> were found in the database.
        </p>
        <Link 
          href="/dashboard" 
          className="px-5 py-2.5 bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 rounded-xl text-sm font-semibold transition hover:bg-slate-700"
        >
          ← Return to Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            🎯 Targeted Weakness Revision Mode
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Topic Drill: {tag}
          </h1>
        </div>
        <Link 
          href="/dashboard" 
          className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition"
        >
          ← Dashboard
        </Link>
      </div>

      <QuizRunner questions={questions} />
    </main>
  );
}