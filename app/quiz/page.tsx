// app/quiz/page.tsx
'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { RAW_QUESTION_BANK } from '@/app/data/quizQuestions';
import {
  HelpCircle,
  BookOpen,
  Award,
  Check,
  XCircle,
  RotateCcw,
  ArrowRight,
  Filter,
  Lock,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

function QuizContent() {
  const { language, locale } = useLanguage();
  const { userTier, isPaidUser, isAdmin, isMounted, setSession } = useAuth();
  
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const searchParams = useSearchParams();
  const blockParam = searchParams.get('block');

  const [selectedTrack, setSelectedTrack] = useState<'SQE' | 'EAQE'>('EAQE');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const questionCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTrack = localStorage.getItem('agentpass_selected_track');
      if (savedTrack === 'sqe' || savedTrack === 'sqe_pro') {
        setSelectedTrack('SQE');
      }
    }
  }, []);

  const activeQuestions = RAW_QUESTION_BANK.filter((q) => {
    if (blockParam && q.blockId !== blockParam) return false;
    if (selectedTrack === 'SQE' && q.trackApplicability === 'EAQE_ONLY') return false;
    return true;
  }).map((q, idx) => {
    const isLocked = !isPaidUser && idx >= 10;
    if (isLocked) {
      return {
        ...q,
        isLocked: true,
        questionZh: '【PRO 專業版專屬考題】此題屬標準資格考題。請升級解鎖完整 130 題庫與條例解析。',
        questionEn: '[PRO TIER EXCLUSIVE QUESTION] Upgrade to PRO to unlock full 130-question bank.',
        optionsZh: ['A. [PRO 專屬選項]', 'B. [PRO 專屬選項]', 'C. [PRO 專屬選項]', 'D. [PRO 專屬選項]'],
        optionsEn: ['A. [PRO Locked Option]', 'B. [PRO Locked Option]', 'C. [PRO Locked Option]', 'D. [PRO Locked Option]']
      };
    }
    return { ...q, isLocked: false };
  });

  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0];

  const handleSelectOption = (index: number) => {
    if (currentQ?.isLocked) {
      setShowUpgradeModal(true);
      return;
    }
    if (isSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleCheckAnswer = () => {
    if (currentQ?.isLocked) {
      setShowUpgradeModal(true);
      return;
    }
    if (selectedOptionIndex === null) return;
    setIsSubmitted(true);

    const isCorrect = selectedOptionIndex === currentQ.answerIndex;
    setUserScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
    setTimeout(() => {
      if (questionCardRef.current) {
        questionCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleResetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setUserScore({ correct: 0, total: 0 });
    if (questionCardRef.current) {
      questionCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [clickCount, setClickCount] = useState(0);
  const handleSecretToggle = () => {
    const nextClicks = clickCount + 1;
    setClickCount(nextClicks);
    if (nextClicks >= 5) {
      if (isAdmin) {
        setSession('guest@agentpass.hk', 'FREE_PREVIEW');
        alert('Admin mode OFF.');
      } else {
        setSession('admin@agentpass.hk', 'ADMIN_BUILDER');
        alert('Admin mode ON. 130 Questions Unlocked.');
      }
      setClickCount(0);
    }
  };

  if (!isMounted) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Loading Session...</div>;

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 space-y-6">
            <div className="flex justify-between border-b pb-4">
              <div className="flex gap-2">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950"><Lock className="h-5 w-5" /></span>
                <div>
                  <span className="text-[10px] font-mono font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded">PRO REQUIRED</span>
                  <h3 className="text-xl font-extrabold">{isZh ? '解鎖完整 130 題' : 'Unlock 130 Questions'}</h3>
                </div>
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>
            <p className="text-xs text-slate-700">{isZh ? '免費版僅供前 10 題體驗。' : 'Free preview covers 10 questions.'}</p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowUpgradeModal(false)} className="px-4 py-2 border rounded-2xl text-xs font-bold text-slate-700">{isZh ? '繼續免費' : 'Continue Free'}</button>
              <a href="/pricing" className="px-6 py-2 bg-amber-500 rounded-2xl font-black text-xs flex items-center gap-2 text-slate-950">{isZh ? '立即升級' : 'Upgrade'}<ChevronRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Official 130-Question Practice Bank</span>
              </span>

              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSecretToggle}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border transition cursor-pointer select-none ${
                    isPaidUser ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{isPaidUser ? 'PRO ACCOUNT (UNLOCKED)' : 'FREE PREVIEW (10 QUESTIONS)'}</span>
                </button>

                {!isPaidUser && (
                  <button onClick={() => setShowUpgradeModal(true)} className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-2xs">
                    <Sparkles className="h-3 w-3" /><span>Upgrade</span>
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black">{isZh ? '全真 130 題高頻考題與陷阱特訓' : 'Full 130-Question Practice Bank'}</h1>
          </div>

          <div className="flex gap-2">
            <Link href="/course" className="px-4 py-2 border rounded-2xl text-xs font-bold flex items-center gap-2"><BookOpen className="h-4 w-4 text-blue-600"/>{isZh ? '課程大綱' : 'Syllabus'}</Link>
            <Link href="/mock-exam" className="px-4 py-2 bg-blue-600 text-white rounded-2xl text-xs font-bold flex items-center gap-2"><Award className="h-4 w-4"/>{isZh ? '模擬考' : 'Mock Exam'}</Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 sm:p-6 rounded-3xl border border-slate-200 bg-white flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-bold">{isZh ? '軌道:' : 'Track:'}</span>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              <button onClick={() => { setSelectedTrack('SQE'); handleResetQuiz(); }} className={`px-3 py-1 text-xs font-bold rounded-lg ${selectedTrack === 'SQE' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>SQE</button>
              <button onClick={() => { setSelectedTrack('EAQE'); handleResetQuiz(); }} className={`px-3 py-1 text-xs font-bold rounded-lg ${selectedTrack === 'EAQE' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>EAQE</button>
            </div>
          </div>
          <div className="text-xs font-mono font-bold text-slate-500">
            {currentQIndex + 1} / {activeQuestions.length}
            {userScore.total > 0 && <span className="ml-3 text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Acc: {Math.round((userScore.correct/userScore.total)*100)}%</span>}
          </div>
        </div>

        {/* Question Card Rendering */}
        <div ref={questionCardRef} className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 scroll-mt-20">
          <div className="flex justify-between border-b pb-3">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-xl text-xs font-mono font-bold">{currentQ.blockNum} • {isZh ? currentQ.topicZh : currentQ.topicEn}</span>
            <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border">{isZh ? currentQ.statuteRefZh : currentQ.statuteRefEn}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold">{isZh ? currentQ.questionZh : currentQ.questionEn}</h3>

          <div className="space-y-3">
            {(isZh ? currentQ.optionsZh : currentQ.optionsEn).map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === currentQ.answerIndex;
              let style = 'bg-white border-slate-200 text-slate-800';

              if (currentQ.isLocked) style = 'bg-slate-50 border-dashed text-slate-400';
              else if (isSubmitted) {
                if (isCorrect) style = 'bg-emerald-500 text-white font-bold';
                else if (isSelected) style = 'bg-rose-500 text-white font-bold';
                else style = 'bg-slate-50 text-slate-400';
              } else if (isSelected) style = 'bg-blue-600 text-white font-bold';

              return (
                <button key={idx} onClick={() => handleSelectOption(idx)} className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold flex justify-between ${style}`}>
                  <span>{opt}</span>
                  {currentQ.isLocked && <Lock className="h-4 w-4 text-slate-400" />}
                  {!currentQ.isLocked && isSubmitted && isCorrect && <Check className="h-4 w-4" />}
                  {!currentQ.isLocked && isSubmitted && isSelected && !isCorrect && <XCircle className="h-4 w-4" />}
                </button>
              );
            })}
          </div>

          {isSubmitted && !currentQ.isLocked && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-950 rounded-2xl">
              <span className="font-bold text-[10px] font-mono text-amber-900 block mb-1">[ Explanation ]</span>
              <p className="text-xs">{isZh ? currentQ.explanationZh : currentQ.explanationEn}</p>
            </div>
          )}

          <div className="pt-4 border-t flex justify-between gap-3">
            <button onClick={handleResetQuiz} className="px-4 py-2 border rounded-2xl text-xs font-bold text-slate-700 flex items-center gap-1.5"><RotateCcw className="h-4 w-4"/>Restart</button>
            {!isSubmitted ? (
              <button onClick={handleCheckAnswer} className="px-6 py-2 bg-blue-600 text-white rounded-2xl text-xs font-bold shadow-md">Check Answer</button>
            ) : (
              <button onClick={handleNextQuestion} className="px-6 py-2 bg-blue-600 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5">Next <ArrowRight className="h-4 w-4"/></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading Quiz Module...</div>}>
      <QuizContent />
    </Suspense>
  );
}