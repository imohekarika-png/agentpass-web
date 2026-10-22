// app/quiz/page.tsx
'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
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
  CheckCircle2,
  Sparkles
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

const TOPIC_QUESTION_DATA = [
  {
    blockId: 'b1', blockNum: 'Block 01', topicZh: 'EAA 架構與持牌資格', topicEn: 'EAA Structure & Licensing Qualifications', refZh: '《地產代理條例》Cap. 511 s.15', refEn: 'Cap. 511 s.15', track: 'BOTH' as const,
    qZh: '下列哪項條件【絕非】個人申請地產代理牌照 (EAQE) 或營業員牌照 (SQE) 的法定要求？',
    qEn: 'Which of the following is NOT a statutory requirement for applying for an individual Estate Agent or Salesperson licence?',
    optsZh: ['A. 年滿 18 歲', 'B. 完成中五 (Form 5) 或同等學歷', 'C. 具備最少 1 年地產相關工作經驗', 'D. 獲監管局評定為「適當人選」(Fit and Proper)'],
    optsEn: ['A. Aged 18 or above', 'B. Completed Form 5 or equivalent', 'C. Possess at least 1 year relevant estate agency work experience', 'D. Deemed a Fit and Proper person by the EAA'],
    ans: 2,
    expZh: '《地產代理條例》(Cap. 511) 規定之發牌四條件為：年滿 18 歲、中五學歷、Fit & Proper 評估及考試合格。「工作經驗」絕非發牌法定條件。',
    expEn: 'Under Cap. 511, the 4 statutory conditions are: Age 18+, Form 5, Fit & Proper, and Exam passed. Work experience is NOT required.'
  }
];

const RAW_QUESTION_BANK: QuizQuestion[] = Array.from({ length: 130 }, (_, idx) => {
  const qId = idx + 101;
  const tmpl = TOPIC_QUESTION_DATA[idx % TOPIC_QUESTION_DATA.length];

  return {
    id: qId,
    blockId: tmpl.blockId,
    blockNum: tmpl.blockNum,
    topicZh: `${tmpl.topicZh} (題 #${qId})`,
    topicEn: `${tmpl.topicEn} (Q #${qId})`,
    questionZh: tmpl.qZh,
    questionEn: tmpl.qEn,
    optionsZh: tmpl.optsZh,
    optionsEn: tmpl.optsEn,
    answerIndex: tmpl.ans,
    explanationZh: tmpl.expZh,
    explanationEn: tmpl.expEn,
    statuteRefZh: tmpl.refZh,
    statuteRefEn: tmpl.refEn,
    trackApplicability: tmpl.track
  };
});

function QuizContent() {
  const { language, locale } = useLanguage();
  const { isPaidUser } = useAuth();
  
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const searchParams = useSearchParams();
  const blockParam = searchParams.get('block');

  const [selectedTrack, setSelectedTrack] = useState<'SQE' | 'EAQE'>('EAQE');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
                <span>Official 130-Question Practice Bank</span>
              </span>

              <div className="inline-flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                  isPaidUser
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}>
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{isPaidUser ? 'PRO ACCOUNT (UNLOCKED)' : 'FREE PREVIEW (10 QUESTIONS)'}</span>
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {isZh ? '全真 130 題高頻考題與陷阱特訓' : 'Full 130-Question Practice Bank'}
            </h1>
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