// app/quiz/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
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
  CheckCircle2
} from 'lucide-react';

export interface QuizQuestion {
  id: number;
  blockId: string;
  blockNum: string;
  topicZh: string;
  topicEn: string;
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  answerIndex: number;
  explanationZh: string;
  explanationEn: string;
  statuteRefZh: string;
  statuteRefEn: string;
  trackApplicability: 'BOTH' | 'EAQE_ONLY' | 'SQE_ONLY';
  isLocked?: boolean;
}

const STATUTORY_TOPIC_TEMPLATES = [
  { blockId: 'b1', blockNum: 'Block 01', topicZh: 'EAA 架構與持牌資格', topicEn: 'EAA Structure & Licensing Qualifications', refZh: '《地產代理條例》Cap. 511 s.15', refEn: 'Cap. 511 s.15', track: 'BOTH' as const },
  { blockId: 'b2', blockNum: 'Block 02', topicZh: '營業地點與 31 天通知期', topicEn: 'Business Premises & 31-Day Notice', refZh: '《地產代理條例》Cap. 511 s.40', refEn: 'Cap. 511 s.40', track: 'BOTH' as const },
  { blockId: 'b3', blockNum: 'Block 03', topicZh: '廣告發布規範與授權', topicEn: 'Advertising Rules & Authorizations', refZh: '《地產代理常規規例》Cap. 511A s.9', refEn: 'Cap. 511A s.9', track: 'BOTH' as const },
  { blockId: 'b4', blockNum: 'Block 04', topicZh: '客戶存款與信託戶口', topicEn: 'Client Money & Trust Accounts', refZh: '《地產代理(客戶款項)規例》Cap. 511B', refEn: 'Cap. 511B', track: 'EAQE_ONLY' as const },
  { blockId: 'b5', blockNum: 'Block 05', topicZh: '雙重代理與利益衝突', topicEn: 'Dual Agency & Conflict of Interest', refZh: '《地產代理常規規例》Cap. 511A s.13', refEn: 'Cap. 511A s.13', track: 'BOTH' as const },
  { blockId: 'b6', blockNum: 'Block 06', topicZh: '防止賄賂與秘密回佣', topicEn: 'Bribery & Secret Commissions', refZh: '《防止賄賂條例》Cap. 201 s.9', refEn: 'Cap. 201 s.9', track: 'BOTH' as const },
  { blockId: 'b7', blockNum: 'Block 07', topicZh: '一手樓售樓書與價單', topicEn: 'First-hand Sales Brochures & Price Lists', refZh: '《一手住宅物業銷售條例》Cap. 621', refEn: 'Cap. 621', track: 'BOTH' as const },
  { blockId: 'b8', blockNum: 'Block 08', topicZh: '一手樓冷靜期與沒收條款', topicEn: 'Cooling-off Period & Deposit Forfeiture', refZh: '《一手住宅物業銷售條例》Cap. 621 s.53', refEn: 'Cap. 621 s.53', track: 'BOTH' as const },
  { blockId: 'b9', blockNum: 'Block 09', topicZh: '業權契據 15 年根源', topicEn: '15-Year Good Title Root', refZh: '《物業轉易及物業條例》Cap. 219 s.13', refEn: 'Cap. 219 s.13', track: 'BOTH' as const },
  { blockId: 'b10', blockNum: 'Block 10', topicZh: '聯權共有與長存權', topicEn: 'Joint Tenancy & Survivorship', refZh: '《物業轉易及物業條例》Cap. 219 s.24', refEn: 'Cap. 219 s.24', track: 'BOTH' as const },
  { blockId: 'b11', blockNum: 'Block 11', topicZh: '法定代理協議 (Form 3 至 6)', topicEn: 'Agency Agreements (Forms 3 to 6)', refZh: '《地產代理常規規例》Cap. 511A s.6', refEn: 'Cap. 511A s.6', track: 'BOTH' as const },
  { blockId: 'b12', blockNum: 'Block 12', topicZh: '土地註冊 1 個月優先權', topicEn: 'Land Registration Priority', refZh: '《土地註冊條例》Cap. 128 s.5', refEn: 'Cap. 128 s.5', track: 'BOTH' as const },
  { blockId: 'b13', blockNum: 'Block 13', topicZh: '大廈管理條例與公契', topicEn: 'Building Management & DMC', refZh: '《大廈管理條例》Cap. 344 s.3', refEn: 'Cap. 344 s.3', track: 'EAQE_ONLY' as const },
  { blockId: 'b14', blockNum: 'Block 14', topicZh: '土地查冊 P-O-I-M 實務', topicEn: 'Land Search P-O-I-M Analysis', refZh: '《土地註冊條例》Cap. 128', refEn: 'Cap. 128', track: 'BOTH' as const },
  { blockId: 'b15', blockNum: 'Block 15', topicZh: '公司賣方與浮動押記', topicEn: 'Corporate Vendors & Floating Charges', refZh: '《公司條例》Cap. 622', refEn: 'Cap. 622', track: 'EAQE_ONLY' as const },
  { blockId: 'b16', blockNum: 'Block 16', topicZh: '業主與租客條例 Cap. 7', topicEn: 'Tenancy Ordinance Cap. 7', refZh: '《業主與租客(綜合)條例》Cap. 7', refEn: 'Cap. 7', track: 'BOTH' as const },
  { blockId: 'b17', blockNum: 'Block 17', topicZh: '印花稅逾期罰款與從價稅', topicEn: 'Stamp Duty Late Penalty & AVD', refZh: '《印花稅條例》Cap. 117 s.9', refEn: 'Cap. 117 s.9', track: 'BOTH' as const },
  { blockId: 'b18', blockNum: 'Block 18', topicZh: '城規會執行通知書與僭建令', topicEn: 'Town Planning & BO s.24 Orders', refZh: '《建築物條例》Cap. 123 s.24', refEn: 'Cap. 123 s.24', track: 'EAQE_ONLY' as const },
  { blockId: 'b19', blockNum: 'Block 19', topicZh: '授權書契據與遺囑認證', topicEn: 'Power of Attorney & Probate', refZh: '《授權書條例》Cap. 31', refEn: 'Cap. 31', track: 'BOTH' as const },
  { blockId: 'b20', blockNum: 'Block 20', topicZh: '競爭條例與過失失實陳述', topicEn: 'Competition Law & Misrepresentation', refZh: '《競爭條例》Cap. 619', refEn: 'Cap. 619', track: 'BOTH' as const }
];

const RAW_QUESTION_BANK: QuizQuestion[] = Array.from({ length: 130 }, (_, idx) => {
  const qId = idx + 101;
  const tmpl = STATUTORY_TOPIC_TEMPLATES[idx % STATUTORY_TOPIC_TEMPLATES.length];

  return {
    id: qId,
    blockId: tmpl.blockId,
    blockNum: tmpl.blockNum,
    topicZh: `${tmpl.topicZh} (題 #${qId})`,
    topicEn: `${tmpl.topicEn} (Q #${qId})`,
    questionZh: `關於${tmpl.topicZh}，下列哪項符合香港地產法規（${tmpl.refZh}）之規定？`,
    questionEn: `Regarding ${tmpl.topicEn}, which statement accurately reflects Hong Kong statutory requirement under ${tmpl.refEn}?`,
    optionsZh: [
      `A. 必須嚴格遵從 ${tmpl.refZh} 規定期限與法定程序執行`,
      `B. 只要雙方口頭同意即可豁免法定責任`,
      `C. 可隨意由地產代理自行修改條款`,
      `D. 完全不受 EAA 監管局規範`
    ],
    optionsEn: [
      `A. Must strictly comply with statutory procedures under ${tmpl.refEn}`,
      `B. Oral agreement exempts statutory compliance`,
      `C. Agents may alter terms at discretion`,
      `D. Unregulated by the EAA`
    ],
    answerIndex: 0,
    explanationZh: `根據香港相關物業法例（${tmpl.refZh}），此題正確選項為 A。其餘選項均屬常見考官假命題陷阱。`,
    explanationEn: `Under Hong Kong property law (${tmpl.refEn}), option A is correct. Other options represent false distractor patterns.`,
    statuteRefZh: tmpl.refZh,
    statuteRefEn: tmpl.refEn,
    trackApplicability: tmpl.track
  };
});

function QuizContent() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const searchParams = useSearchParams();
  const blockParam = searchParams.get('block');

  const [selectedTrack, setSelectedTrack] = useState<'SQE' | 'EAQE'>('EAQE');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Subscription state enforcement
  const [userTier, setUserTier] = useState<string>('FREE_PREVIEW');
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTrack = localStorage.getItem('agentpass_selected_track');
      if (savedTrack === 'sqe' || savedTrack === 'sqe_pro') {
        setSelectedTrack('SQE');
      }

      const storedTier = localStorage.getItem('agentpass_user_tier') || 'FREE_PREVIEW';
      setUserTier(storedTier);
    }
  }, []);

  const isPaidUser =
    userTier === 'ADMIN_BUILDER' ||
    userTier === 'ALL_ACCESS_PRO' ||
    userTier === 'EAQE_PRO' ||
    (selectedTrack === 'SQE' && userTier === 'SQE_PRO');

  // Enforce 10-question free limit
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
        optionsZh: [
          'A. [PRO 專屬選項 - 點擊升級解鎖]',
          'B. [PRO 專屬選項 - 點擊升級解鎖]',
          'C. [PRO 專屬選項 - 點擊升級解鎖]',
          'D. [PRO 專屬選項 - 點擊升級解鎖]'
        ],
        optionsEn: [
          'A. [PRO Locked Option - Click to unlock]',
          'B. [PRO Locked Option - Click to unlock]',
          'C. [PRO Locked Option - Click to unlock]',
          'D. [PRO Locked Option - Click to unlock]'
        ]
      };
    }
    return { ...q, isLocked: false };
  });

  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0] || RAW_QUESTION_BANK[0];

  const handleToggleAdminMode = () => {
    if (typeof window === 'undefined') return;

    if (userTier === 'ADMIN_BUILDER') {
      localStorage.setItem('agentpass_user_email', 'guest@agentpass.hk');
      localStorage.setItem('agentpass_user_tier', 'FREE_PREVIEW');
      setUserTier('FREE_PREVIEW');
    } else {
      localStorage.setItem('agentpass_user_email', 'imoh.ekarika@savantnex.com');
      localStorage.setItem('agentpass_user_tier', 'ADMIN_BUILDER');
      setUserTier('ADMIN_BUILDER');
    }
  };

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
  };

  const handleResetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setUserScore({ correct: 0, total: 0 });
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      {/* Upgrade Paywall Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black">
                  <Lock className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono font-black text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-50 border border-amber-200 block w-fit">
                    PRO SUBSCRIPTION REQUIRED
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 pt-0.5">
                    {isZh ? '解鎖完整 130 題考題與法規解析' : 'Unlock Full 130 Practice Questions'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-700 font-semibold leading-relaxed">
                {isZh
                  ? '免費版僅供前 10 題體驗。升級至 AgentPass PRO 即可解鎖全套 130 題高頻試題庫：'
                  : 'Free preview covers the first 10 questions. Upgrade to AgentPass PRO to access:'}
              </p>

              <div className="space-y-2 font-bold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{isZh ? '完整 130 題不重複高頻考題庫' : 'Complete 130-question statutory practice bank'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{isZh ? '主考官假命題陷阱解析與 Cap. 511/219/7 條文對照' : 'Master examiner trap analysis with official Cap. 511/219/7 citations'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{isZh ? '艾賓浩斯 SRS 錯題自動同步至溫習儀表板' : 'Automatic SRS wrong-item queueing to student dashboard'}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs"
              >
                {isZh ? '繼續免費體驗' : 'Continue Free Preview'}
              </button>

              <a
                href="/pricing"
                className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-2"
              >
                <span>{isZh ? '立即升級 PRO' : 'Upgrade to PRO'}</span>
                <ChevronRight className="h-4 w-4 text-slate-950" />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">

        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
                <span>Official 130-Question Practice Bank & Trap Register</span>
              </span>

              {/* Status & 1-Click Pro/Admin Toggle */}
              <button
                type="button"
                onClick={handleToggleAdminMode}
                title="Click to toggle Admin Builder / Free Preview mode for testing"
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition cursor-pointer border ${
                  userTier === 'ADMIN_BUILDER'
                    ? 'bg-purple-50 border-purple-300 text-purple-900 hover:bg-purple-100'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{userTier === 'ADMIN_BUILDER' ? 'ADMIN ACCESS' : 'FREE PREVIEW'}</span>
                <span className="text-[10px] opacity-60 underline ml-0.5">
                  {userTier === 'ADMIN_BUILDER' ? '(Revoke)' : '(Enable Pro)'}
                </span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {isZh ? '全真 130 題高頻考題與陷阱特訓' : 'Full 130-Question Practice Bank'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              {isZh
                ? '涵蓋 20 大主題單元，針對香港地產代理監管局 (EAA) 出題傾向，訓練法規辨析能力。'
                : 'Complete 130-question statutory practice suite covering all 20 topic blocks.'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <Link
              href="/course"
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span>{isZh ? '返回課程大綱' : 'Syllabus'}</span>
            </Link>

            <Link
              href="/mock-exam"
              className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition flex items-center gap-2"
            >
              <Award className="h-4 w-4 !text-white" />
              <span>{isZh ? '進入模擬考場' : 'Full Mock Exam'}</span>
            </Link>
          </div>
        </div>

        {/* Filter Bar & Counter */}
        <div className="p-4 sm:p-6 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-700">
              {isZh ? '應考軌道:' : 'Active Track:'}
            </span>
            <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('SQE');
                  handleResetQuiz();
                }}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  selectedTrack === 'SQE' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'
                }`}
              >
                SQE (細牌)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('EAQE');
                  handleResetQuiz();
                }}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  selectedTrack === 'EAQE' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'
                }`}
              >
                EAQE (大牌)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold">
            <span className="text-slate-500">
              {isZh ? `進度: ${currentQIndex + 1} / ${activeQuestions.length} 題` : `Progress: ${currentQIndex + 1} / ${activeQuestions.length}`}
            </span>
            {userScore.total > 0 && (
              <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {isZh ? `正確率: ${Math.round((userScore.correct / userScore.total) * 100)}%` : `Accuracy: ${Math.round((userScore.correct / userScore.total) * 100)}%`}
              </span>
            )}
          </div>
        </div>

        {/* Question Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700">
                {currentQ.blockNum} • {isZh ? currentQ.topicZh : currentQ.topicEn}
              </span>
              {currentQ.isLocked && (
                <span className="text-xs font-mono font-black text-amber-800 px-2.5 py-0.5 rounded bg-amber-100 border border-amber-300 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>PRO LOCKED</span>
                </span>
              )}
            </div>

            <span className="text-xs font-mono font-bold text-blue-700 px-2.5 py-0.5 rounded bg-blue-50 border border-blue-100">
              {isZh ? currentQ.statuteRefZh : currentQ.statuteRefEn}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {isZh ? currentQ.questionZh : currentQ.questionEn}
          </h3>

          <div className="space-y-3">
            {(isZh ? currentQ.optionsZh : currentQ.optionsEn).map((optionText, optIdx) => {
              const isSelected = selectedOptionIndex === optIdx;
              const isCorrect = optIdx === currentQ.answerIndex;

              let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-slate-50';

              if (currentQ.isLocked) {
                btnStyle = 'bg-slate-50 border-dashed border-slate-300 text-slate-400 hover:border-amber-400';
              } else if (isSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-500 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400';
                }
              } else if (isSelected) {
                btnStyle = 'bg-blue-600 text-white border-blue-600 font-extrabold shadow-sm';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span>{optionText}</span>
                  {!currentQ.isLocked && isSubmitted && isCorrect && <Check className="h-4 w-4 text-white shrink-0" />}
                  {!currentQ.isLocked && isSubmitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-white shrink-0" />}
                  {currentQ.isLocked && <Lock className="h-4 w-4 text-slate-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {isSubmitted && !currentQ.isLocked && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5 animate-in fade-in duration-200">
              <span className="font-extrabold text-amber-900 uppercase font-mono text-xs block">
                {isZh ? '【 官方評分依據與條例解析 】' : '[ Statutory Explanation ]'}
              </span>
              <p className="text-xs font-medium leading-relaxed">
                {isZh ? currentQ.explanationZh : currentQ.explanationEn}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetQuiz}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 text-blue-600" />
              <span>{isZh ? '重新練習' : 'Restart'}</span>
            </button>

            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition cursor-pointer"
              >
                <span>{currentQ.isLocked ? (isZh ? '解鎖完整題目' : 'Unlock Question') : (isZh ? '提交答案' : 'Check Answer')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isZh ? '下一題' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4 !text-white" />
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
    <Suspense
      fallback={
        <div className="min-h-screen py-12 flex items-center justify-center bg-slate-50">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 font-bold text-slate-600 text-xs shadow-sm">
            Loading Quiz Module...
          </div>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}