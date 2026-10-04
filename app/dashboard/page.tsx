// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TopicStat {
  ordinanceTag: string;
  totalAttempted: number;
  correctCount: number;
  accuracyPercentage: number;
  status: 'Pass' | 'Weakness';
}

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching analytics:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!data?.hasData) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          No Practice Analytics Yet
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
          Complete your first practice quiz or timed mock exam to unlock ordinance weakness tracking and readiness scoring.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/mock-exam"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold shadow transition"
          >
            ⏱️ Timed Mock Exam
          </Link>
          <Link
            href="/quiz"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow transition"
          >
            🚀 Start Practice Quiz
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 max-w-4xl mx-auto">
      {/* Header Bar with Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            📊 EAQE / SQE Candidate Readiness
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time performance metrics grounded in Hong Kong Estate Agent legal requirements.
          </p>
        </div>

        {/* Action Navigation Buttons */}
        <div className="flex items-center space-x-3 shrink-0">
          <Link
            href="/mock-exam"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition shadow-sm"
          >
            ⏱️ Timed Mock Exam
          </Link>
          <Link
            href="/quiz"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition shadow-sm"
          >
            Practice Quiz →
          </Link>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Overall Exam Readiness
          </span>
          <div className="text-3xl font-extrabold text-indigo-600 mt-2">
            {data.overallReadiness}%
          </div>
          <span className="text-xs text-slate-500">Passing benchmark: 60%</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Questions Answered
          </span>
          <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
            {data.totalQuestionsAnswered}
          </div>
          <span className="text-xs text-slate-500">Across {data.totalSessionsCompleted} sessions</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Status
          </span>
          <div className={`text-2xl font-extrabold mt-2 ${
            data.overallReadiness >= 60 ? 'text-green-600' : 'text-amber-600'
          }`}>
            {data.overallReadiness >= 60 ? '✅ On Track to Pass' : '⚠️ Revision Recommended'}
          </div>
          <span className="text-xs text-slate-500">Based on official EAA passing criteria</span>
        </div>
      </div>

      {/* Ordinance Weakness Breakdown */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
          📜 Mastery by Ordinance Topic
        </h2>
        
        <div className="space-y-4">
          {data.topicBreakdown.map((topic: TopicStat) => (
            <div 
              key={topic.ordinanceTag} 
              className="p-4 border rounded-xl border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50"
            >
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {topic.ordinanceTag}
                </span>
                
                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    topic.status === 'Pass' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                  }`}>
                    {topic.accuracyPercentage}% ({topic.correctCount}/{topic.totalAttempted})
                  </span>

                  {/* Targeted Revision Drill Button */}
                  <Link
                    href={`/quiz/revision?tag=${encodeURIComponent(topic.ordinanceTag)}`}
                    className="px-3 py-1 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-bold transition shadow-sm"
                  >
                    🎯 Drill Topic
                  </Link>
                </div>
              </div>

              {/* Accuracy Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    topic.accuracyPercentage >= 70 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${topic.accuracyPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}