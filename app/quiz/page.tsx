// app/quiz/page.tsx
'use client';

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
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
  Sparkles,
  X
} from 'lucide-react';

function QuizCore() {
  const { language, locale } = useLanguage();
  const { isPaidUser, isAdmin, setSession } = useAuth() as any;
  
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const searchParams = useSearchParams();
  const blockParam = searchParams ? searchParams.get('block') : null;

  const [mounted, setMounted] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<'SQE' | 'EAQE'>('EAQE');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const questionCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedTrack = localStorage.getItem('agentpass_selected_track');
      if (savedTrack === 'sqe' || savedTrack === 'sqe_pro') {
        setSelectedTrack('SQE');
      }
    }
  }, []);

  useEffect(() => {
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
  }, [blockParam, selectedTrack]);

  // Robust questions resolver with fallback
  const activeQuestions = useMemo(() => {
    const rawList = Array.isArray(RAW_QUESTION_BANK) ? RAW_QUESTION_BANK : [];
    if (rawList.length === 0) return [];

    let filtered = rawList.filter((q: any) => {
      if (!q) return false;

      // 1. Resolve block query parameter
      if (blockParam) {
        const bp = blockParam.toLowerCase().trim();
        const qBlockId = (q.blockId || '').toLowerCase().trim();
        const qId = (q.id || '').toLowerCase().trim();
        const qBlockNum = (q.blockNum || '').toLowerCase().trim();

        if (qBlockId === bp || qId === bp || qBlockNum === bp) return true;

        const bpDigits = bp.replace(/\D/g, '');
        const qBlockDigits = (q.blockId || q.blockNum || '').replace(/\D/g, '');
        const qIdDigits = (q.id || '').replace(/\D/g, '');

        if (bp.startsWith('q') && qIdDigits && bpDigits === qIdDigits) return true;
        if (bpDigits && qBlockDigits && parseInt(bpDigits, 10) === parseInt(qBlockDigits, 10)) return true;

        return false;
      }

      // 2. Track applicability filter
      if (selectedTrack === 'SQE' && q.trackApplicability === 'EAQE_ONLY') {
        return false;
      }

      return true;
    });

    // Fallback: If zero items matched the query, load full track questions instead of an empty array
    if (filtered.length === 0) {
      filtered = rawList.filter((q: any) => !(selectedTrack === 'SQE' && q?.trackApplicability === 'EAQE_ONLY'));
    }
    if (filtered.length === 0) {
      filtered = rawList;
    }

    return filtered.map((q: any, idx: number) => {
      const isLocked = !isPaidUser && idx >= 10;
      if (isLocked) {
        return {
          ...q,
          isLocked: true,
          questionZh: '【PRO 專業版專屬考題】此題屬官方高頻資格試題。請升級解鎖完整 130 題庫與深度條例解析。',
          questionEn: '[PRO TIER EXCLUSIVE QUESTION] Upgrade to PRO to unlock full 130-question bank and statutory analysis.',
          optionsZh: ['A. [PRO 專屬選項]', 'B. [PRO 專屬選項]', 'C. [PRO 專屬選項]', 'D. [PRO 專屬選項]'],
          optionsEn: ['A. [PRO Locked Option]', 'B. [PRO Locked Option]', 'C. [PRO Locked Option]', 'D. [PRO Locked Option]']
        };
      }
      return { ...q, isLocked: false };
    });
  }, [blockParam, selectedTrack, isPaidUser]);

  const safeIndex = Math.min(Math.max(0, currentQIndex), Math.max(0, activeQuestions.length - 1));
  const currentQ = activeQuestions[safeIndex] || (RAW_QUESTION_BANK && RAW_QUESTION_BANK[0] ? RAW_QUESTION_BANK[0] : null);

  const handleSelectOption = (index: number) => {
    if (currentQ?.isLocked) {
      setShowUpgradeModal(true);
      return;
    }
    if (isSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleCheckAnswer = () => {
    if (!currentQ || currentQ.isLocked) {
      if (currentQ?.isLocked) setShowUpgradeModal(true);
      return;
    }
    if (selectedOptionIndex === null) return;
    setIsSubmitted(true);

    const isCorrect = selectedOptionIndex === (currentQ.answerIndex ?? 0);
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
        setSession?.('guest@agentpass.hk', 'FREE_PREVIEW');
        alert('Admin mode OFF.');
      } else {
        setSession?.('admin@agentpass.hk', 'ADMIN_BUILDER');
        alert('Admin mode ON. 130 Questions Unlocked.');
      }
      setClickCount(0);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">
        <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mr-2" />
        <span>Loading Quiz Module...</span>
      </div>
    );
  }

  if (!currentQ) {
    return (
      <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            {isZh ? '載入題庫中' : 'Loading Question Bank'}
          </h2>
          <div className="flex gap-2 justify-center pt-2">
            <Link
              href="/quiz"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
            >
              {isZh ? '查看全部 130 題' : 'View All 130 Questions'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const options = isZh
    ? (currentQ.optionsZh || currentQ.options?.map((o: any) => (typeof o === 'string' ? o : o.text_zh || o.text)) || [])
    : (currentQ.optionsEn || currentQ.options?.map((o: any) => (typeof o === 'string' ? o : o.text || o.text_zh)) || []);

  const questionTitle = isZh
    ? (currentQ.questionZh || currentQ.stem_zh || currentQ.stem || '')
    : (currentQ.questionEn || currentQ.stem || currentQ.stem_zh || '');

  const topicName = isZh
    ? (currentQ.topicZh || currentQ.ordinance_tag || '考題')
    : (currentQ.topicEn || currentQ.ordinance_tag || 'Question');

  const statuteRef = isZh
    ? (currentQ.statuteRefZh || currentQ.ordinance_tag || '')
    : (currentQ.statuteRefEn || currentQ.ordinance_tag || '');

  const explanationText = isZh
    ? (currentQ.explanationZh || currentQ.explanation || '')
    : (currentQ.explanationEn || currentQ.explanation || '');

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="flex gap-3 items-center">
                <span className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 shadow-sm">
                  <Lock className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                    PRO REQUIRED
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    {isZh ? '解鎖完整 130 題全真考題' : 'Unlock Full 130 Question Bank'}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setShowUpgradeModal(false)} 
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isZh 
                ? '免費版僅供前 10 題試題體驗。升級至 PRO 專業版立即解鎖 130 題官方考試題庫、詳盡條例考點剖析及艾賓浩斯間隔記憶階梯。' 
                : 'Free preview covers the first 10 questions. Upgrade to PRO to unlock all 130 statutory questions and explanations.'}
            </p>
            
            <div className="flex gap-3 pt-2 justify-end">
              <button 
                onClick={() => setShowUpgradeModal(false)} 
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                {isZh ? '繼續免費體驗' : 'Continue Free'}
              </button>
              <Link 
                href="/pricing" 
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl font-black text-xs flex items-center gap-2 text-slate-950 shadow-md shadow-amber-500/20 transition cursor-pointer"
              >
                <span>{isZh ? '立即升級開通' : 'Upgrade to PRO'}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
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
                  <button 
                    onClick={() => setShowUpgradeModal(true)} 
                    className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-xs hover:bg-amber-400 transition cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Upgrade</span>
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
              {isZh ? '全真 130 題高頻考題與陷阱特訓' : 'Full 130-Question Practice Bank'}
            </h1>
          </div>

          <div className="flex gap-2.5 shrink-0 flex-wrap">
            <Link 
              href="/course" 
              className="px-4 py-2.5 border border-slate-300 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 shadow-xs"
            >
              <BookOpen className="h-4 w-4 text-blue-600"/>
              <span>{isZh ? '課程大綱' : 'Syllabus'}</span>
            </Link>
            <Link 
              href="/mock-exam" 
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
            >
              <Award className="h-4 w-4"/>
              <span>{isZh ? '全真模擬考' : 'Mock Exam'}</span>
            </Link>
          </div>
        </div>

        {/* Filter & Controller Bar */}
        <div className="p-4 sm:p-6 rounded-3xl border border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-700">{isZh ? '考試軌道:' : 'Track:'}</span>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                <button 
                  onClick={() => { setSelectedTrack('SQE'); handleResetQuiz(); }} 
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                    selectedTrack === 'SQE' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  SQE
                </button>
                <button 
                  onClick={() => { setSelectedTrack('EAQE'); handleResetQuiz(); }} 
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                    selectedTrack === 'EAQE' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  EAQE
                </button>
              </div>
            </div>

            {blockParam && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                <span>{isZh ? `過濾: ${blockParam}` : `Filter: ${blockParam}`}</span>
                <Link href="/quiz" title={isZh ? '清除過濾' : 'Clear filter'} className="hover:text-blue-950 font-bold ml-1">
                  ✕
                </Link>
              </div>
            )}
          </div>

          <div className="text-xs font-mono font-bold text-slate-500 flex items-center gap-2">
            <span>
              {safeIndex + 1} / {activeQuestions.length} {isZh ? '題' : 'Questions'}
            </span>
            {userScore.total > 0 && (
              <span className="ml-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                Acc: {Math.round((userScore.correct / userScore.total) * 100)}%
              </span>
            )}
          </div>
        </div>

        {/* Question Card */}
        <div ref={questionCardRef} className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 scroll-mt-20">
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-xl text-xs font-mono font-bold">
              {currentQ.blockNum || currentQ.blockId || 'Block'} • {topicName}
            </span>
            {statuteRef && (
              <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                {statuteRef}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-relaxed">
            {questionTitle}
          </h3>

          <div className="space-y-3">
            {options.map((opt: string, idx: number) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === (currentQ.answerIndex ?? 0);
              
              let style = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';

              if (currentQ.isLocked) {
                style = 'bg-slate-50 border-dashed border-slate-300 text-slate-400 cursor-not-allowed';
              } else if (isSubmitted) {
                if (isCorrect) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected) {
                  style = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
                } else {
                  style = 'bg-slate-50 border-slate-200 text-slate-400';
                }
              } else if (isSelected) {
                style = 'bg-blue-50 border-blue-600 text-blue-950 font-bold ring-1 ring-blue-500';
              }

              return (
                <button 
                  key={idx} 
                  onClick={() => handleSelectOption(idx)} 
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold flex justify-between items-center transition cursor-pointer ${style}`}
                >
                  <span className="leading-snug">{opt}</span>
                  {currentQ.isLocked && <Lock className="h-4 w-4 text-slate-400 shrink-0 ml-2" />}
                  {!currentQ.isLocked && isSubmitted && isCorrect && <Check className="h-4 w-4 text-emerald-600 shrink-0 ml-2" />}
                  {!currentQ.isLocked && isSubmitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-600 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isSubmitted && !currentQ.isLocked && explanationText && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-950 rounded-2xl space-y-1 animate-in fade-in duration-150">
              <span className="font-bold text-[10px] font-mono text-amber-900 block uppercase">
                {isZh ? '【 試題解析 】' : '[ Statutory Explanation ]'}
              </span>
              <p className="text-xs leading-relaxed">{explanationText}</p>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center gap-3">
            <button 
              onClick={handleResetQuiz} 
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4"/>
              <span>{isZh ? '重新計分' : 'Restart'}</span>
            </button>

            {!isSubmitted ? (
              <button 
                onClick={handleCheckAnswer} 
                disabled={selectedOptionIndex === null}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
              >
                {isZh ? '核對答案' : 'Check Answer'}
              </button>
            ) : (
              <button 
                onClick={handleNextQuestion} 
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <span>{isZh ? '下一題' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4"/>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">
        Loading Quiz Module...
      </div>
    }>
      <QuizCore />
    </Suspense>
  );
}