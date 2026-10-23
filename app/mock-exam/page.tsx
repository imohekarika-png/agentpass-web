// app/mock-exam/page.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Award, BookOpen, Building2, ShieldCheck, Globe, Clock, Bookmark,
  ArrowRight, ArrowLeft, Lock, Check, CheckCircle2, RotateCcw,
  ChevronRight, Sparkles, RefreshCw, AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { 
  CLIENT_FALLBACK_QUESTIONS, 
  CASE_SCENARIOS, 
  MockQuestion, 
  ExamDomainBatch 
} from '@/app/data/mockQuestions';

export default function MockExamPage() {
  const { userEmail, userTier, isPaidUser, isAdmin, isMounted, setSession } = useAuth();
  
  const [isZh, setIsZh] = useState<boolean>(true);
  const [examStage, setExamStage] = useState<'briefing' | 'simulation' | 'report'>('briefing');
  const [track, setTrack] = useState<'EAQE' | 'SQE'>('EAQE');
  const [activePartFilter, setActivePartFilter] = useState<'ALL' | 'I' | 'II'>('ALL');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(180 * 60);
  const [activeAnnexTab, setActiveAnnexTab] = useState<'property' | 'owner' | 'incumbrances' | 'narrative'>('incumbrances');

  const [questionsList, setQuestionsList] = useState<MockQuestion[]>(CLIENT_FALLBACK_QUESTIONS);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [selectedLockedQuestion, setSelectedLockedQuestion] = useState<MockQuestion | null>(null);

  const [showSynthesizerModal, setShowSynthesizerModal] = useState<boolean>(false);
  const [selectedBatchDomain, setSelectedBatchDomain] = useState<ExamDomainBatch>('CAP511');
  const [batchQuestionCount, setBatchQuestionCount] = useState<number>(4);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState<boolean>(false);
  const [synthesizerError, setSynthesizerError] = useState<string | null>(null);

  const [launchNotification, setLaunchNotification] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTopRef = useRef<HTMLDivElement | null>(null);

  const handleSecretToggle = () => {
    const nextClicks = clickCount + 1;
    setClickCount(nextClicks);
    if (nextClicks >= 5) {
      if (isAdmin) {
        setSession('guest@agentpass.hk', 'FREE_PREVIEW');
        alert('Admin Mode OFF. Switched to Free Preview (10 Questions).');
      } else {
        setSession('admin@agentpass.hk', 'ADMIN_BUILDER');
        alert('Admin Mode ON. All 100 Questions Unlocked.');
      }
      setClickCount(0);
    }
  };

  const scrollToQuestionTop = () => {
    if (questionTopRef.current) {
      questionTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const loadQuestions = useCallback(async (selectedTrack: 'EAQE' | 'SQE') => {
    const hasHttpOrigin =
      typeof window !== 'undefined' &&
      Boolean(window.location) &&
      typeof window.location.origin === 'string' &&
      window.location.origin.startsWith('http');

    if (!hasHttpOrigin) return;

    try {
      const targetUrl = new URL('/api/mock-exam', window.location.origin);
      targetUrl.searchParams.set('track', selectedTrack);

      const headers: Record<string, string> = {
        'x-user-email': userEmail,
        'x-user-tier': userTier
      };

      const res = await fetch(targetUrl.toString(), { headers });

      if (res.ok) {
        const data = await res.json();
        if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestionsList(data.questions);
        }
      }
    } catch (e) {
      console.warn('Using fallback seed:', e);
    }
  }, [userEmail, userTier]);

  useEffect(() => {
    loadQuestions(track);
  }, [track, loadQuestions]);

  // Spaced Repetition Queue Synchronization
  const syncIncorrectAnswersToSRS = useCallback(() => {
    try {
      const incorrectItems: Array<{
        id: string;
        questionId: number;
        blockNum: string;
        titleZh: string;
        titleEn: string;
        statuteRefZh: string;
        statuteRefEn: string;
        lastReviewed: string;
        nextReviewDate: string;
        ladderStage: 'Day 1' | 'Day 3' | 'Day 7' | 'Day 16' | 'Day 35';
        accuracy: number;
      }> = [];

      const todayStr = new Date().toISOString().split('T')[0];

      questionsList.forEach((q) => {
        if (q.isLocked) return;
        const userAnswer = userAnswers[q.id];
        const isIncorrect = userAnswer !== undefined && userAnswer !== q.answerIndex;

        if (isIncorrect) {
          incorrectItems.push({
            id: `q-${q.id}`,
            questionId: q.id,
            blockNum: `Block ${q.part === 'I' ? '01' : '16'}`,
            titleZh: q.topicZh,
            titleEn: q.topicEn,
            statuteRefZh: q.statuteRefZh,
            statuteRefEn: q.statuteRefEn,
            lastReviewed: todayStr,
            nextReviewDate: todayStr,
            ladderStage: 'Day 1',
            accuracy: 0
          });
        }
      });

      if (incorrectItems.length > 0) {
        const existingQueue = JSON.parse(localStorage.getItem('agentpass_srs_queue_v1') || '[]');
        const existingIds = new Set(existingQueue.map((item: any) => item.questionId || item.id));
        const filteredNew = incorrectItems.filter((item) => !existingIds.has(item.questionId));
        const updatedQueue = [...filteredNew, ...existingQueue];
        localStorage.setItem('agentpass_srs_queue_v1', JSON.stringify(updatedQueue));
      }
    } catch (err) {
      console.warn('SRS Sync Warning:', err);
    }
  }, [questionsList, userAnswers]);

  const handleSubmitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    syncIncorrectAnswersToSRS();
    setExamStage('report');
  };

  const handleSynthesizeBatch = async () => {
    setIsGeneratingBatch(true);
    setSynthesizerError(null);
    setShowSynthesizerModal(false);

    if (examStage !== 'simulation') {
      setTimeLeftSeconds(180 * 60);
      setCurrentQIndex(0);
      setUserAnswers({});
      setFlaggedQuestions({});
      setExamStage('simulation');
    }

    setLaunchNotification(
      isZh 
        ? `⚡ 已啟動智能試題合成！系統正於後台實時載入最新題目...` 
        : `⚡ Dynamic Synthesis Initiated! Streaming targeted items...`
    );
    setTimeout(() => setLaunchNotification(null), 4000);

    try {
      const caseCtx = activeScenario ? {
        title: activeScenario.titleZh,
        narrative: activeScenario.narrativeZh,
        incumbrances: activeScenario.landSearch.incumbrancesZh,
        owner: activeScenario.landSearch.ownerZh
      } : undefined;

      const res = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track,
          domainBatch: selectedBatchDomain,
          count: batchQuestionCount,
          isZh,
          caseScenarioId: selectedBatchDomain === 'POIM_CASE' ? 'case-1' : undefined,
          caseContext: caseCtx
        })
      });

      if (!res.ok) throw new Error(`Synthesis Failed (${res.status})`);

      const data = await res.json();
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestionsList((prev) => {
          const highestId = Math.max(...prev.map((q) => q.id), 0);
          const augmented = data.questions.map((q: any, i: number) => ({
            ...q,
            id: highestId + i + 1,
            isLocked: false
          }));
          return [...prev, ...augmented];
        });
      }
    } catch (err: any) {
      console.warn('Synthesis error:', err);
    } finally {
      setIsGeneratingBatch(false);
    }
  };

  // Enforce 10-question preview limit for free accounts on mock exams
  const activeQuestions = questionsList.filter((q) => {
    if (activePartFilter === 'ALL') return true;
    return q.part === activePartFilter;
  }).map((q, idx) => {
    const isLocked = !isPaidUser && idx >= 10;
    return {
      ...q,
      isLocked: isLocked || Boolean(q.isLocked),
      lockReason: isLocked ? ('REQUIRES_SUBSCRIPTION' as const) : q.lockReason
    };
  });

  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0] || questionsList[0];
  const activeScenario = currentQ?.caseScenarioId ? CASE_SCENARIOS[currentQ.caseScenarioId] : null;

  useEffect(() => {
    if (examStage === 'simulation') {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            syncIncorrectAnswersToSRS();
            setExamStage('report');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStage, syncIncorrectAnswersToSRS]);

  const formatTimer = (totalSecs: number): string => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId: number, optIndex: number) => {
    if (examStage !== 'simulation') return;
    if (currentQ?.isLocked) {
      setSelectedLockedQuestion(currentQ);
      setShowUpgradeModal(true);
      return;
    }
    setUserAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const toggleFlag = (qId: number) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const calculateResults = () => {
    let correctCount = 0;
    let partICorrect = 0, partITotal = 0;
    let partIICorrect = 0, partIITotal = 0;

    questionsList.forEach((q) => {
      if (q.isLocked) return;
      const isCorrect = userAnswers[q.id] === q.answerIndex;
      if (isCorrect) correctCount++;

      if (q.part === 'I') {
        partITotal++;
        if (isCorrect) partICorrect++;
      } else {
        partIITotal++;
        if (isCorrect) partIICorrect++;
      }
    });

    const activeAnswerable = questionsList.filter((q) => !q.isLocked).length;
    const scorePct = activeAnswerable > 0 ? Math.round((correctCount / activeAnswerable) * 100) : 0;
    
    const partIPct = partITotal > 0 ? (partICorrect / partITotal) * 100 : 0;
    const partIIPct = partIITotal > 0 ? (partIICorrect / partIITotal) * 100 : 0;
    const isPassed = partIPct >= 60 && partIIPct >= 60;

    return {
      correctCount, totalQuestions: activeAnswerable, scorePct, isPassed,
      partICorrect, partITotal, partIPct: Math.round(partIPct),
      partIICorrect, partIITotal, partIIPct: Math.round(partIIPct)
    };
  };

  const renderUpgradeModal = () => {
    if (!showUpgradeModal) return null;

    const isEaqeUpgradeRequired = selectedLockedQuestion?.lockReason === 'REQUIRES_EAQE_UPGRADE';

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <span className="text-[10px] font-mono font-black text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-50 border border-amber-200 block w-fit">
                  {isEaqeUpgradeRequired ? 'EAQE MASTER UPGRADE REQUIRED' : 'PRO SUBSCRIPTION REQUIRED'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 pt-0.5">
                  {isEaqeUpgradeRequired
                    ? (isZh ? '解鎖地產代理（大牌）全套考卷' : 'Upgrade to Full EAQE Agent License Paper')
                    : (isZh ? `解鎖官方全真 ${track} 考卷` : `Unlock Full ${track} Examination Suite`)}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <p className="text-slate-700 font-semibold leading-relaxed">
              {isZh
                ? `免費預覽版僅提供前 10 題體驗。升級至 AgentPass ${track} PRO 即可解鎖全套 100 題完整考場：`
                : `Free preview covers the first 10 questions. Upgrade to AgentPass ${track} PRO to access full 100 questions:`}
            </p>

            <div className="space-y-2 font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  {isZh
                    ? `官方 ${track === 'EAQE' ? '100 題全真考卷 (Part I 80 + Part II 20 題查冊個案)' : '60 題全真考卷 (Part I 50 + Part II 10 題查冊個案)'}`
                    : `Official Full ${track === 'EAQE' ? '100-Question' : '60-Question'} Paper`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  {isZh
                    ? '完整 IRIS 土地查冊個案庫（Smart Mansion、Central Tower）'
                    : 'Complete IRIS Land Search Dossiers (Probate, Corporate Debentures, Powers of Attorney)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{isZh ? 'EAA 官方 60% 雙門檻及格雷達診斷與條例剖析' : 'Official 60% Dual-Threshold Diagnostic Radar & Legal Citations'}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
            >
              {isZh ? '繼續免費體驗' : 'Continue Free Preview'}
            </button>

            <Link
              href="/pricing"
              className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-2"
            >
              <span>{isZh ? '立即升級 PRO' : 'Upgrade to PRO'}</span>
              <ChevronRight className="h-4 w-4 text-slate-950" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderSynthesizerModal = () => {
    if (!showSynthesizerModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600 text-white font-bold">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 block w-fit">
                  COGNITIVE EXAM SYNTHESIZER
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 pt-0.5">
                  {isZh ? `動態擴展 ${track} 試卷題庫` : `Synthesize New ${track} Questions`}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSynthesizerModal(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">{isZh ? '選擇法定範疇 (Domain):' : 'Select Statutory Domain:'}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'CAP511', zh: 'Cap. 511 代理條例與常規', en: 'Cap. 511 Licensing & Practice' },
                  { id: 'CONVEYANCING', zh: 'Cap. 219 & 128 轉易查冊', en: 'Conveyancing & Land Search' },
                  { id: 'TENANCY_BUILDINGS', zh: 'Cap. 7 租務與 Cap. 123 僭建', en: 'Tenancy & Building Control' },
                  { id: 'AGENCY_TORT', zh: '普通法代理與防賄條例', en: 'Agency Law & Bribery Ordinance' },
                  { id: 'POIM_CASE', zh: 'Part II 查冊實務個案題', en: 'Part II POIM Case Studies' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedBatchDomain(item.id as ExamDomainBatch)}
                    className={`p-3 rounded-xl border text-left font-bold transition flex items-center justify-between cursor-pointer ${
                      selectedBatchDomain === item.id
                        ? 'bg-indigo-50 text-indigo-900 border-indigo-500 ring-1 ring-indigo-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    <span>{isZh ? item.zh : item.en}</span>
                    {selectedBatchDomain === item.id && <Check className="h-4 w-4 text-indigo-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">{isZh ? '生成題數:' : 'Batch Count:'}</label>
              <div className="flex items-center gap-2">
                {[3, 4, 5].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setBatchQuestionCount(cnt)}
                    className={`flex-1 py-2 rounded-xl border font-bold text-xs transition cursor-pointer ${
                      batchQuestionCount === cnt
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    +{cnt} {isZh ? '題' : 'Qs'}
                  </button>
                ))}
              </div>
            </div>

            {synthesizerError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{synthesizerError}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              disabled={isGeneratingBatch}
              onClick={() => setShowSynthesizerModal(false)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
            >
              {isZh ? '取消' : 'Cancel'}
            </button>

            <button
              type="button"
              disabled={isGeneratingBatch}
              onClick={handleSynthesizeBatch}
              className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingBatch ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>{isZh ? '正在嚴謹合成試題...' : 'Synthesizing...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>{isZh ? '開始動態生成' : 'Generate Now'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">
        Loading Official Examination Suite...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      {renderUpgradeModal()}
      {renderSynthesizerModal()}

      {/* Briefing Stage */}
      {examStage === 'briefing' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-900">
                  <Award className="h-3.5 w-3.5 text-amber-600" />
                  <span>EAA Official Simulation Mode</span>
                </span>
                
                {/* Account Status Badge with Secret 5-Click Toggle */}
                <div className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSecretToggle}
                    title="Click 5 times to toggle Admin Mode"
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border transition cursor-pointer select-none ${
                      isPaidUser
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-amber-50 border-amber-300 text-amber-900'
                    }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{isPaidUser ? 'PRO ACCOUNT (UNLOCKED)' : 'FREE PREVIEW (10 QUESTIONS)'}</span>
                  </button>

                  {!isPaidUser && (
                    <Link
                      href="/pricing"
                      className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>{isZh ? '升級 PRO' : 'Upgrade'}</span>
                    </Link>
                  )}
                </div>

                {/* Restored Language Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsZh(!isZh)}
                  className="px-3 py-1 rounded-full text-xs font-bold border border-slate-200 bg-slate-50 text-slate-800 hover:border-amber-500 transition cursor-pointer flex items-center gap-1"
                >
                  <Globe className="h-3 w-3 text-amber-600" />
                  <span>{isZh ? 'EN' : '繁體中文'}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {isZh ? '香港地產代理資格全真模擬試場' : 'HK EAA Professional Licensing Mock Suite'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {isZh
                  ? '官方雙階段計分架構：Part I 法規選擇題 + Part II 土地查冊個案實務題。'
                  : 'Official dual-part exam architecture: Part I Statutory MCQs & Part II POIM Case Studies.'}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Restored Link To AI Synthesizer */}
              <button
                type="button"
                onClick={() => setShowSynthesizerModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold text-indigo-900 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>{isZh ? '智能題庫合成器' : 'Synthesizer'}</span>
              </button>

              <Link
                href="/course"
                className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-indigo-600" />
                <span>{isZh ? '返回課程' : 'Syllabus'}</span>
              </Link>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTrack('EAQE')}
                className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                  track === 'EAQE'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${track === 'EAQE' ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-slate-700'}`}>
                    FULL AGENT • EAQE
                  </span>
                  <Building2 className={`h-5 w-5 ${track === 'EAQE' ? 'text-slate-950' : 'text-amber-600'}`} />
                </div>
                <h3 className="text-sm font-extrabold mt-3">{isZh ? '地產代理資格考試 (EAQE)' : 'Estate Agent Qualifying Exam'}</h3>
                <p className={`text-xs mt-1 ${track === 'EAQE' ? 'text-slate-900' : 'text-slate-500'}`}>
                  {isZh ? '全真 100 題完整標準卷（Part I 80 題 + Part II 20 題查冊個案）' : '100 Questions (Part I 80 Qs + Part II 20 Qs)'}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTrack('SQE')}
                className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                  track === 'SQE'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${track === 'SQE' ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-slate-700'}`}>
                    SALESPERSON • SQE
                  </span>
                  <ShieldCheck className={`h-5 w-5 ${track === 'SQE' ? 'text-slate-950' : 'text-indigo-600'}`} />
                </div>
                <h3 className="text-sm font-extrabold mt-3">{isZh ? '營業員資格考試 (SQE)' : 'Salesperson Qualifying Exam'}</h3>
                <p className={`text-xs mt-1 ${track === 'SQE' ? 'text-slate-900' : 'text-slate-500'}`}>
                  {isZh ? '全真 60 題完整標準卷（Part I 50 題 + Part II 10 題查冊個案）' : '60 Questions (Part I 50 Qs + Part II 10 Qs)'}
                </p>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono uppercase">{isZh ? '考試時限' : 'Time Allowed'}</span>
                <span className="font-extrabold text-slate-900 text-sm">{track === 'EAQE' ? '3 小時 (180 分鐘)' : '2.5 小時 (150 分鐘)'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono uppercase">{isZh ? '及格標準' : 'Passing Mark'}</span>
                <span className="font-extrabold text-emerald-700 text-sm">雙部分皆須 60%</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono uppercase">{isZh ? '解鎖試題' : 'Unlocked Questions'}</span>
                <span className="font-extrabold text-amber-700 text-sm">
                  {isPaidUser ? (track === 'EAQE' ? '100 題 (全真考場)' : '60 題 (全真考場)') : '10 題 (免費預覽)'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono uppercase">{isZh ? '全真題庫總數' : 'Total Question Bank'}</span>
                <span className="font-extrabold text-blue-700 text-sm">100 題全題庫</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setTimeLeftSeconds(180 * 60);
                  setCurrentQIndex(0);
                  setUserAnswers({});
                  setFlaggedQuestions({});
                  setExamStage('simulation');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isPaidUser ? `進入全真 ${track === 'EAQE' ? '100 題' : '60 題'} 模擬考場` : '進入 10 題免費模擬試場'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulation Stage */}
      {examStage === 'simulation' && (
        <div className="max-w-7xl mx-auto space-y-4">
          {launchNotification && (
            <div className="p-3.5 rounded-2xl bg-indigo-600 text-white shadow-lg flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-300 animate-spin" />
                <span>{launchNotification}</span>
              </div>
              <button type="button" onClick={() => setLaunchNotification(null)} className="text-indigo-200 hover:text-white px-2 py-0.5 rounded-lg text-xs cursor-pointer">✕</button>
            </div>
          )}

          {/* Simulation Top Bar */}
          <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                    {track} • {currentQ?.part === 'I' ? 'Part I Statutory' : 'Part II POIM Case'}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {isZh ? `第 ${currentQIndex + 1} / ${activeQuestions.length} 題` : `Q ${currentQIndex + 1} of ${activeQuestions.length}`}
                  </span>
                </div>
                <div className="text-xs font-extrabold text-slate-800">
                  {isZh ? currentQ?.topicZh : currentQ?.topicEn}
                </div>
              </div>

              <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs">
                {(['ALL', 'I', 'II'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setActivePartFilter(p);
                      setCurrentQIndex(0);
                      scrollToQuestionTop();
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                      activePartFilter === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {p === 'ALL' ? (isZh ? '全部' : 'All') : `Part ${p}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Language Toggle in Simulation */}
              <button
                type="button"
                onClick={() => setIsZh(!isZh)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer hover:border-amber-400"
              >
                <Globe className="h-3.5 w-3.5 text-amber-600" />
                <span>{isZh ? 'EN' : '繁中'}</span>
              </button>

              {/* Synthesizer button in Simulation */}
              <button
                type="button"
                onClick={() => setShowSynthesizerModal(true)}
                className="px-3.5 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-indigo-900 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span>{isZh ? '動態生成' : 'Synthesizer'}</span>
              </button>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs font-bold">
                <Clock className="h-4 w-4 text-amber-600" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>

              <button
                type="button"
                onClick={() => currentQ && toggleFlag(currentQ.id)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  Boolean(flaggedQuestions[currentQ?.id])
                    ? 'bg-amber-500 text-slate-950 border-amber-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>{isZh ? (flaggedQuestions[currentQ?.id] ? '已標記' : '標記覆查') : (flaggedQuestions[currentQ?.id] ? 'Flagged' : 'Flag')}</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs shadow-sm transition cursor-pointer"
              >
                {isZh ? '提早交卷' : 'Submit Exam'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Question Stem / Annex Box */}
            <div className="lg:col-span-8 space-y-4">
              {currentQ?.part === 'II' && activeScenario && (
                <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
                      LAND SEARCH ANNEX (IRIS 查冊附件)
                    </span>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
                      {(['incumbrances', 'owner', 'property', 'narrative'] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveAnnexTab(tab)}
                          className={`px-2.5 py-1 rounded-lg transition cursor-pointer uppercase ${
                            activeAnnexTab === tab ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono leading-relaxed space-y-2">
                    {activeAnnexTab === 'incumbrances' && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-rose-700 block">SECTION (I): INCUMBRANCES</span>
                        {(isZh ? activeScenario.landSearch.incumbrancesZh : activeScenario.landSearch.incumbrancesEn).map((item, idx) => (
                          <p key={idx} className="text-slate-800 font-semibold">• {item}</p>
                        ))}
                      </div>
                    )}
                    {activeAnnexTab === 'owner' && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-amber-800 block">SECTION (O): OWNER PARTICULARS</span>
                        {(isZh ? activeScenario.landSearch.ownerZh : activeScenario.landSearch.ownerEn).map((item, idx) => (
                          <p key={idx} className="text-slate-800 font-semibold">• {item}</p>
                        ))}
                      </div>
                    )}
                    {activeAnnexTab === 'property' && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-indigo-800 block">SECTION (P): PROPERTY PARTICULARS</span>
                        {(isZh ? activeScenario.landSearch.propertyZh : activeScenario.landSearch.propertyEn).map((item, idx) => (
                          <p key={idx} className="text-slate-800 font-semibold">• {item}</p>
                        ))}
                      </div>
                    )}
                    {activeAnnexTab === 'narrative' && (
                      <div className="font-sans space-y-1">
                        <span className="font-bold text-slate-900 block font-mono text-xs">{isZh ? '個案情節與事實：' : 'Case Narrative & Facts:'}</span>
                        <p className="text-slate-700 font-medium">{isZh ? activeScenario.narrativeZh : activeScenario.narrativeEn}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div ref={questionTopRef} className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 scroll-mt-20">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {isZh ? `試題序號 #${currentQ?.id}` : `Question ID #${currentQ?.id}`}
                  </span>
                  <div className="flex items-center gap-2">
                    {currentQ?.isLocked && (
                      <span className="text-xs font-mono font-black text-amber-800 px-2.5 py-0.5 rounded bg-amber-100 border border-amber-300 flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        <span>PRO LOCKED</span>
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-indigo-700 px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                      {isZh ? currentQ?.statuteRefZh : currentQ?.statuteRefEn}
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {isZh ? currentQ?.questionZh : currentQ?.questionEn}
                </h3>

                <div className="space-y-3">
                  {(isZh ? currentQ?.optionsZh : currentQ?.optionsEn)?.map((optionText, optIdx) => {
                    const isSelected = userAnswers[currentQ.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-3 cursor-pointer ${
                          currentQ?.isLocked
                            ? 'bg-slate-50 border-dashed border-slate-300 text-slate-400 hover:border-amber-400'
                            : isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm ring-1 ring-amber-400'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-slate-50'
                        }`}
                      >
                        <span>{optionText}</span>
                        {isSelected && <Check className="h-4 w-4 shrink-0 text-slate-950" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={currentQIndex === 0}
                    onClick={() => {
                      setCurrentQIndex((prev) => Math.max(0, prev - 1));
                      scrollToQuestionTop();
                    }}
                    className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{isZh ? '上一題' : 'Previous'}</span>
                  </button>

                  <span className="text-xs font-mono text-slate-500 font-semibold">
                    {currentQIndex + 1} / {activeQuestions.length}
                  </span>

                  <button
                    type="button"
                    disabled={currentQIndex === activeQuestions.length - 1}
                    onClick={() => {
                      setCurrentQIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1));
                      scrollToQuestionTop();
                    }}
                    className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isZh ? '下一題' : 'Next'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 100-Question Palette Matrix */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="text-xs font-mono font-bold text-slate-700 uppercase">
                    {track} Palette Matrix
                  </h4>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {Object.keys(userAnswers).length}/{activeQuestions.length}
                  </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
                  {activeQuestions.map((q, idx) => {
                    const isAnswered = typeof userAnswers[q.id] === 'number';
                    const isFlagged = Boolean(flaggedQuestions[q.id]);
                    const isCurrent = idx === currentQIndex;

                    let bgClass = 'bg-slate-100 text-slate-700 border-slate-200';
                    if (isCurrent) bgClass = 'bg-slate-950 text-white ring-2 ring-amber-400';
                    else if (q.isLocked) bgClass = 'bg-slate-50 text-slate-400 border-dashed border-slate-300';
                    else if (isFlagged) bgClass = 'bg-amber-400 text-slate-950 border-amber-500 font-extrabold';
                    else if (isAnswered) bgClass = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setCurrentQIndex(idx);
                          scrollToQuestionTop();
                          if (q.isLocked) {
                            setSelectedLockedQuestion(q);
                            setShowUpgradeModal(true);
                          }
                        }}
                        className={`h-9 rounded-xl border text-xs font-mono transition flex items-center justify-center cursor-pointer ${bgClass}`}
                      >
                        {q.isLocked ? <Lock className="h-3 w-3 text-slate-400" /> : idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Stage */}
      {examStage === 'report' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {(() => {
            const results = calculateResults();
            return (
              <>
                <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-900">
                      <Award className="h-3.5 w-3.5 text-amber-600" />
                      <span>{track} Official Diagnostic Performance Radar</span>
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {results.isPassed
                        ? (isZh ? `恭喜及格！達到 ${track} 法定持牌標準` : `Congratulations! Passed ${track} Standard`)
                        : (isZh ? '未達及格門檻，請針對弱項加強複習' : 'Below Passing Threshold, Needs Review')}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {isZh
                        ? `官方規定雙部分皆須達 60%。你獲得了 ${results.scorePct}%，共答對 ${results.correctCount} / ${results.totalQuestions} 題。`
                        : `Official rule requires 60% in BOTH parts. You scored ${results.scorePct}% (${results.correctCount}/${results.totalQuestions} correct).`}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 text-center min-w-[150px]">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">FINAL SCORE</span>
                    <div className={`text-4xl font-black ${results.isPassed ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {results.scorePct}%
                    </div>
                    <span className={`text-xs font-extrabold ${results.isPassed ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {results.isPassed ? 'QUALIFIED (雙部分及格)' : 'NOT YET PASSED'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-800">Part I Statutory Law MCQs</span>
                      <span className={`font-mono font-bold ${results.partIPct >= 60 ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {results.partICorrect}/{results.partITotal} ({results.partIPct}%) {results.partIPct >= 60 ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${results.partITotal > 0 ? (results.partICorrect / results.partITotal) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-800">Part II POIM Land Search Case Study</span>
                      <span className={`font-mono font-bold ${results.partIIPct >= 60 ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {results.partIICorrect}/{results.partIITotal} ({results.partIIPct}%) {results.partIIPct >= 60 ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${results.partIITotal > 0 ? (results.partIICorrect / results.partIITotal) * 100 : 0}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setExamStage('simulation');
                      setCurrentQIndex(0);
                      scrollToQuestionTop();
                    }}
                    className="px-5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4 text-indigo-600" />
                    <span>{isZh ? '檢視答卷' : 'Review Answers'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/dashboard"
                      className="px-5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition"
                    >
                      {isZh ? '溫習儀表板 (SRS)' : 'SRS Dashboard'}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setExamStage('briefing');
                        setUserAnswers({});
                        setFlaggedQuestions({});
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-sm transition cursor-pointer"
                    >
                      {isZh ? '重新應試' : 'Retake Exam'}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-mono font-bold text-slate-700 uppercase tracking-wider">
                    {isZh ? '試題逐題法規深度分析 (Item Analysis):' : 'Item-by-Item Legal Analysis:'}
                  </h3>
                  <div className="space-y-4">
                    {questionsList
                      .filter((q) => !q.isLocked)
                      .map((q, idx) => {
                        const userOpt = userAnswers[q.id];
                        const isCorrect = userOpt === q.answerIndex;
                        return (
                          <div key={q.id} className={`p-5 sm:p-6 rounded-3xl border bg-white shadow-sm space-y-3 ${isCorrect ? 'border-emerald-200' : 'border-rose-200'}`}>
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="text-xs font-mono font-bold text-slate-500">
                                #{idx + 1} • Part {q.part} • {isZh ? q.topicZh : q.topicEn}
                              </span>
                              <span className="text-xs font-mono font-bold text-indigo-700 px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                                {isZh ? q.statuteRefZh : q.statuteRefEn}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">{isZh ? q.questionZh : q.questionEn}</h4>
                            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed">
                              <span className="font-bold block text-amber-900 uppercase font-mono text-[10px] mb-1">
                                {isZh ? '【 官方評分依據與條例解析 】' : '[ Statutory Explanation ]'}
                              </span>
                              <p>{isZh ? q.explanationZh : q.explanationEn}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}