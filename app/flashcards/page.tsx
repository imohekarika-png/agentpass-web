// app/flashcards/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { RAW_QUESTION_BANK, QuizQuestion } from '@/app/data/quizQuestions';
import {
  Zap, ArrowRight, ArrowLeft, RefreshCw, Bookmark, 
  ShieldCheck, Sparkles, BookOpen, Lock, CheckCircle2
} from 'lucide-react';

function FlashcardContent() {
  const { language, locale } = useLanguage();
  const { userTier, isPaidUser, isAdmin, isMounted, setSession } = useAuth();
  
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const searchParams = useSearchParams();
  const blockParam = searchParams.get('block');

  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Derive Flashcards directly from the 130-Question Quiz Bank
  const deck = RAW_QUESTION_BANK.filter((q) => {
    // If user clicked from a specific syllabus block, filter to that block
    if (blockParam && q.blockId !== blockParam) return false;
    return true;
  }).map((q, idx) => {
    // Free Preview limits to 10 cards per deck
    const isLocked = !isPaidUser && idx >= 10;
    return {
      id: q.id,
      blockNum: q.blockNum,
      topicZh: q.topicZh,
      topicEn: q.topicEn,
      frontZh: q.questionZh,
      frontEn: q.questionEn,
      backZh: `正確答案：${q.optionsZh[q.answerIndex]}\n\n解析：${q.explanationZh}`,
      backEn: `Correct Answer: ${q.optionsEn[q.answerIndex]}\n\nExplanation: ${q.explanationEn}`,
      statuteRefZh: q.statuteRefZh,
      statuteRefEn: q.statuteRefEn,
      isLocked
    };
  });

  const currentCard = deck[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < deck.length - 1) {
        if (deck[currentIndex + 1].isLocked) {
          setShowUpgradeModal(true);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }, 150);
  };

  const handleFlip = () => {
    if (currentCard?.isLocked) {
      setShowUpgradeModal(true);
      return;
    }
    setIsFlipped(!isFlipped);
  };

  const [clickCount, setClickCount] = useState(0);
  const handleSecretToggle = () => {
    const nextClicks = clickCount + 1;
    setClickCount(nextClicks);
    if (nextClicks >= 5) {
      if (isAdmin) {
        setSession('guest@agentpass.hk', 'FREE_PREVIEW');
        alert('Admin mode OFF. Switched to Free Preview (10 Cards).');
      } else {
        setSession('admin@agentpass.hk', 'ADMIN_BUILDER');
        alert('Admin mode ON. 130 Flashcards Unlocked.');
      }
      setClickCount(0);
    }
  };

  if (!isMounted) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Loading Flashcards...</div>;

  if (deck.length === 0) {
    return (
      <div className="min-h-screen py-12 flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-xl font-bold">No flashcards found for this block.</h2>
        <Link href="/course" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-2xl font-bold">Return to Syllabus</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      
      {/* Upgrade Paywall Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 space-y-6">
            <div className="flex justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black"><Lock className="h-5 w-5" /></span>
                <div>
                  <span className="text-[10px] font-mono font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded">PRO REQUIRED</span>
                  <h3 className="text-xl font-extrabold">{isZh ? '解鎖完整 130 題閃卡庫' : 'Unlock 130 Flashcards'}</h3>
                </div>
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>
            <p className="text-sm font-semibold">{isZh ? '免費版僅供前 10 張卡片體驗。' : 'Free preview covers 10 flashcards.'}</p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowUpgradeModal(false)} className="px-4 py-2 border rounded-2xl text-xs font-bold text-slate-700">{isZh ? '繼續免費' : 'Continue Free'}</button>
              <a href="/pricing" className="px-6 py-2 bg-amber-500 rounded-2xl font-black text-xs flex items-center gap-2 text-slate-950">{isZh ? '立即升級' : 'Upgrade'}<ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                <Zap className="h-3.5 w-3.5" />
                <span>Active Recall Engine</span>
              </span>

              <button onClick={handleSecretToggle} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border transition select-none ${isPaidUser ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'}`}>
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isPaidUser ? 'PRO ACCOUNT (UNLOCKED)' : 'FREE PREVIEW (10 CARDS)'}</span>
              </button>

              {!isPaidUser && (
                <button onClick={() => setShowUpgradeModal(true)} className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /><span>Upgrade</span>
                </button>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black">{isZh ? '速記閃卡 (Flashcards)' : 'Spaced Repetition Flashcards'}</h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link href="/course" className="px-4 py-2 border rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-slate-50"><BookOpen className="h-4 w-4 text-blue-600"/>{isZh ? '課程大綱' : 'Syllabus'}</Link>
          </div>
        </div>

        {/* Counter & Controls */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-bold text-slate-500 font-mono">
            CARD {currentIndex + 1} OF {deck.length}
          </span>
          <button onClick={() => { setCurrentIndex(0); setIsFlipped(false); }} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
            <RefreshCw className="h-3 w-3" /> Restart Deck
          </button>
        </div>

        {/* 3D Flashcard Container */}
        <div className="relative w-full h-[400px] perspective-1000 group">
          <div 
            onClick={handleFlip}
            className={`w-full h-full duration-500 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.5s' }}
          >
            
            {/* Front of Card (Question) */}
            <div 
              className="absolute w-full h-full backface-hidden rounded-3xl border border-slate-200 bg-white shadow-md p-8 sm:p-10 flex flex-col"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex justify-between items-center border-b pb-3 mb-6">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-xl text-xs font-mono font-bold">
                  {currentCard?.blockNum} • {isZh ? currentCard?.topicZh : currentCard?.topicEn}
                </span>
                {currentCard?.isLocked && (
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    <Lock className="h-3 w-3"/> PRO LOCKED
                  </span>
                )}
              </div>
              
              <div className="flex-1 flex items-center justify-center text-center">
                <h2 className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-800">
                  {isZh ? currentCard?.frontZh : currentCard?.frontEn}
                </h2>
              </div>

              <div className="text-center pt-6 text-xs font-bold text-slate-400">
                {isZh ? '點擊翻轉查看答案' : 'Click to flip for answer'}
              </div>
            </div>

            {/* Back of Card (Answer & Explanation) */}
            <div 
              className="absolute w-full h-full backface-hidden rounded-3xl border border-blue-300 bg-blue-50/50 shadow-md p-8 sm:p-10 flex flex-col rotate-y-180"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="flex justify-between items-center border-b border-blue-200 pb-3 mb-6">
                <span className="text-xs font-mono font-black text-blue-800">
                  {isZh ? '法定解析 (Statutory Analysis)' : 'Statutory Analysis'}
                </span>
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-mono font-bold">
                  {isZh ? currentCard?.statuteRefZh : currentCard?.statuteRefEn}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-sm sm:text-base font-semibold leading-loose text-blue-950 whitespace-pre-wrap">
                  {isZh ? currentCard?.backZh : currentCard?.backEn}
                </p>
              </div>

              <div className="text-center pt-6 text-xs font-bold text-slate-400">
                {isZh ? '點擊翻轉回正面' : 'Click to flip to front'}
              </div>
            </div>

          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className="flex-1 py-4 rounded-2xl border border-slate-200 bg-white font-bold text-slate-700 disabled:opacity-40 transition flex items-center justify-center gap-2 shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" /> {isZh ? '上一張' : 'Previous'}
          </button>
          
          <button
            disabled={currentIndex === deck.length - 1}
            onClick={handleNext}
            className="flex-1 py-4 rounded-2xl bg-amber-500 text-slate-950 font-black disabled:opacity-40 transition flex items-center justify-center gap-2 shadow-sm hover:bg-amber-400"
          >
            {isZh ? '下一張' : 'Next'} <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default function FlashcardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Loading Flashcard Engine...</div>}>
      <FlashcardContent />
    </Suspense>
  );
}