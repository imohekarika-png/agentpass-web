// app/mock-exam/page.tsx
'use client';

import { useEffect, useState } from 'react';
import QuizRunner from '@/components/QuizRunner';

export default function MockExamPage() {
  const [examType, setExamType] = useState<'SQE' | 'EAQE'>('SQE');
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0); // Time in seconds

  const startExam = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/quiz/mock?type=${examType}`);
      const data = await res.json();
      
      setQuestions(data.questions || []);
      setTimeLeft((data.durationMinutes || 150) * 60);
      setStarted(true);
    } catch (err) {
      console.error('Error launching mock exam:', err);
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer hook
  useEffect(() => {
    if (!started || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert('⏰ Time expired! Your exam has been automatically submitted.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // LOBBY / SELECTION SCREEN
  if (!started) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 max-w-2xl mx-auto text-center">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          Official Exam Simulator
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2 mb-4">
          ⏱️ EAA Timed Mock Examination
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">
          Simulate official Hong Kong Estate Agents Authority test conditions under strict time limits. Instant AI explanations are disabled until after exam submission.
        </p>

        {/* Exam Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setExamType('SQE')}
            className={`p-6 rounded-2xl border text-left transition ${
              examType === 'SQE' 
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600' 
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
            }`}
          >
            <div className="font-extrabold text-slate-900 dark:text-slate-100 text-lg">SQE Exam</div>
            <div className="text-xs text-slate-500 mt-1">Salespersons Qualifying Exam</div>
            <div className="mt-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <div>📋 <strong>40 Questions</strong></div>
              <div>⏱️ <strong>2.5 Hours</strong> (150 mins)</div>
              <div>🎯 <strong>60% Pass Mark</strong></div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setExamType('EAQE')}
            className={`p-6 rounded-2xl border text-left transition ${
              examType === 'EAQE' 
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600' 
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
            }`}
          >
            <div className="font-extrabold text-slate-900 dark:text-slate-100 text-lg">EAQE Exam</div>
            <div className="text-xs text-slate-500 mt-1">Estate Agents Qualifying Exam</div>
            <div className="mt-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <div>📋 <strong>50 Questions</strong></div>
              <div>⏱️ <strong>3.0 Hours</strong> (180 mins)</div>
              <div>🎯 <strong>60% Pass Mark</strong></div>
            </div>
          </button>
        </div>

        <button
          type="button"
          onClick={startExam}
          disabled={loading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transition flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <span>🚀 Begin Timed Examination</span>
          )}
        </button>
      </main>
    );
  }

  // ACTIVE EXAM RUNNER SCREEN
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 px-4">
      {/* Sticky Exam Status Header */}
      <div className="max-w-3xl mx-auto mb-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex justify-between items-center sticky top-4 z-10">
        <div>
          <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider animate-pulse">
            ● Examination in Progress
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {examType} Official Mock Session
          </h2>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block font-medium">Time Remaining</span>
          <span className={`text-xl font-mono font-extrabold ${timeLeft < 600 ? 'text-red-600 animate-bounce' : 'text-slate-800 dark:text-slate-100'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* QuizRunner with isMockExam set to true */}
      <QuizRunner questions={questions} isMockExam={true} />
    </main>
  );
}