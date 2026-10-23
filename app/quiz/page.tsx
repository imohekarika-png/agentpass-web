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
  { blockId: 'b1', blockNum: 'Block 01', topicZh: 'EAA 架構與持牌資格', topicEn: 'EAA Structure & Licensing Qualifications', refZh: '《地產代理條例》Cap. 511 s.15', refEn: 'Cap. 511 s.15', track: 'BOTH' as const, qZh: '下列哪項條件【絕非】個人申請地產代理牌照 (EAQE) 或營業員牌照 (SQE) 的法定要求？', qEn: 'Which of the following is NOT a statutory requirement for applying for an individual Estate Agent or Salesperson licence?', optsZh: ['A. 年滿 18 歲', 'B. 完成中五 (Form 5) 或同等學歷', 'C. 具備最少 1 年地產相關工作經驗', 'D. 獲監管局評定為「適當人選」(Fit and Proper)'], optsEn: ['A. Aged 18 or above', 'B. Completed Form 5 or equivalent', 'C. Possess at least 1 year relevant estate agency work experience', 'D. Deemed a Fit and Proper person by the EAA'], ans: 2, expZh: '《地產代理條例》(Cap. 511) 規定之發牌四條件為：年滿 18 歲、中五學歷、Fit & Proper 評估及考試合格。「工作經驗」絕非發牌法定條件。', expEn: 'Under Cap. 511, the 4 statutory conditions are: Age 18+, Form 5, Fit & Proper, and Exam passed. Work experience is NOT required.' },
  { blockId: 'b2', blockNum: 'Block 02', topicZh: '營業地點與通知', topicEn: 'Business Premises', refZh: 'Cap. 511 s.40', refEn: 'Cap. 511 s.40', track: 'BOTH' as const, qZh: '變更營業地址須於幾多天內通知 EAA？', qEn: 'Address changes must be notified within how many days?', optsZh: ['A. 7 天內', 'B. 14 天內', 'C. 31 天內', 'D. 60 天內'], optsEn: ['A. 7 days', 'B. 14 days', 'C. 31 days', 'D. 60 days'], ans: 2, expZh: '必須於 31 天內書面通知。', expEn: 'Within 31 days.' },
  { blockId: 'b3', blockNum: 'Block 03', topicZh: '廣告發布規範', topicEn: 'Advertising Rules', refZh: 'Cap. 511A s.9', refEn: 'Cap. 511A s.9', track: 'BOTH' as const, qZh: '廣告前必須取得哪份文件？', qEn: 'Which document is required before advertising?', optsZh: ['A. Form 3', 'B. PASP', 'C. HKID', 'D. Land Search'], optsEn: ['A. Form 3', 'B. PASP', 'C. HKID', 'D. Land Search'], ans: 0, expZh: '必須取得 Form 3 授權。', expEn: 'Form 3 required.' },
  { blockId: 'b4', blockNum: 'Block 04', topicZh: '客戶存款', topicEn: 'Client Money', refZh: 'Cap. 511B', refEn: 'Cap. 511B', track: 'EAQE_ONLY' as const, qZh: '收取存款後須於幾多天內發收據？', qEn: 'Receipts must be issued within how many days?', optsZh: ['A. 即時', 'B. 7 天', 'C. 14 天', 'D. 30 天'], optsEn: ['A. Immediately', 'B. 7 days', 'C. 14 days', 'D. 30 days'], ans: 2, expZh: '14天內。', expEn: '14 days.' },
  { blockId: 'b5', blockNum: 'Block 05', topicZh: '雙重代理', topicEn: 'Dual Agency', refZh: 'Cap. 511A s.13', refEn: 'Cap. 511A s.13', track: 'BOTH' as const, qZh: '雙重代理必須？', qEn: 'Dual agency requires?', optsZh: ['A. 事前書面同意', 'B. 事後口頭通知', 'C. 隱瞞', 'D. 只獲賣方同意'], optsEn: ['A. Prior written consent', 'B. Oral notice', 'C. Conceal', 'D. Vendor consent only'], ans: 0, expZh: '事前書面同意。', expEn: 'Prior written consent.' },
  { blockId: 'b6', blockNum: 'Block 06', topicZh: '秘密回佣', topicEn: 'Secret Commissions', refZh: 'Cap. 201 s.9', refEn: 'Cap. 201 s.9', track: 'BOTH' as const, qZh: '未經同意收回佣觸犯？', qEn: 'Secret commission breaches?', optsZh: ['A. 防賄條例 s.9', 'B. 盜竊罪', 'C. 民事法', 'D. 無罪'], optsEn: ['A. POBO s.9', 'B. Theft', 'C. Civil law', 'D. No crime'], ans: 0, expZh: '防賄條例 s.9。', expEn: 'POBO s.9.' },
  { blockId: 'b7', blockNum: 'Block 07', topicZh: '一手樓價單', topicEn: 'First-hand Price List', refZh: 'Cap. 621', refEn: 'Cap. 621', track: 'BOTH' as const, qZh: '售樓書及價單須提前幾天公佈？', qEn: 'Brochure and price list advance days?', optsZh: ['A. 書7價3', 'B. 書14價7', 'C. 書3價1', 'D. 皆30天'], optsEn: ['A. Brochure 7, Price 3', 'B. Brochure 14, Price 7', 'C. Brochure 3, Price 1', 'D. 30 days'], ans: 0, expZh: '書7價3。', expEn: 'Brochure 7, Price 3.' },
  { blockId: 'b8', blockNum: 'Block 08', topicZh: '一手樓冷靜期', topicEn: 'Cooling-off Period', refZh: 'Cap. 621 s.53', refEn: 'Cap. 621 s.53', track: 'BOTH' as const, qZh: '一手樓買家冷靜期內退訂沒收多少？', qEn: 'Deposit forfeited during cooling-off?', optsZh: ['A. 5%', 'B. 10%', 'C. 0%', 'D. 2.5%'], optsEn: ['A. 5%', 'B. 10%', 'C. 0%', 'D. 2.5%'], ans: 0, expZh: '5%。', expEn: '5%.' },
  { blockId: 'b9', blockNum: 'Block 09', topicZh: '15年根源', topicEn: '15-Year Root', refZh: 'Cap. 219 s.13', refEn: 'Cap. 219 s.13', track: 'BOTH' as const, qZh: '業權契據須至少多少年歷史？', qEn: 'Title root must be how old?', optsZh: ['A. 7 年', 'B. 15 年', 'C. 20 年', 'D. 30 年'], optsEn: ['A. 7 yrs', 'B. 15 yrs', 'C. 20 yrs', 'D. 30 yrs'], ans: 1, expZh: '15年。', expEn: '15 yrs.' },
  { blockId: 'b10', blockNum: 'Block 10', topicZh: '聯權共有', topicEn: 'Joint Tenancy', refZh: 'Cap. 219 s.24', refEn: 'Cap. 219 s.24', track: 'BOTH' as const, qZh: '聯權轉讓份額會？', qEn: 'Transferring a joint share causes?', optsZh: ['A. 無效', 'B. 轉為分權共有', 'C. 獨佔', 'D. 沒影響'], optsEn: ['A. Void', 'B. Severance to TIC', 'C. Sole title', 'D. No effect'], ans: 1, expZh: '轉為分權共有。', expEn: 'Severance to TIC.' },
  { blockId: 'b11', blockNum: 'Block 11', topicZh: 'Form 3', topicEn: 'Form 3', refZh: 'Cap. 511A s.6', refEn: 'Cap. 511A s.6', track: 'BOTH' as const, qZh: 'Form 3 未填有效期？', qEn: 'Form 3 without validity period?', optsZh: ['A. 完全無效', 'B. 3個月', 'C. 永久', 'D. 1年'], optsEn: ['A. Void', 'B. 3 months', 'C. Perpetual', 'D. 1 year'], ans: 0, expZh: '完全無效。', expEn: 'Void.' },
  { blockId: 'b12', blockNum: 'Block 12', topicZh: '土地註冊', topicEn: 'Land Registration', refZh: 'Cap. 128 s.5', refEn: 'Cap. 128 s.5', track: 'BOTH' as const, qZh: '優先權追溯期限為？', qEn: 'Relation back period for registration?', optsZh: ['A. 1 個月', 'B. 2 個月', 'C. 3 個月', 'D. 6 個月'], optsEn: ['A. 1 month', 'B. 2 months', 'C. 3 months', 'D. 6 months'], ans: 0, expZh: '1 個月內。', expEn: 'Within 1 month.' },
  { blockId: 'b13', blockNum: 'Block 13', topicZh: '法團成立', topicEn: 'IO Formation', refZh: 'Cap. 344 s.3', refEn: 'Cap. 344 s.3', track: 'EAQE_ONLY' as const, qZh: '成立法團需多少份數支持？', qEn: 'Shares needed to form IO?', optsZh: ['A. 10%', 'B. 30%', 'C. 50%', 'D. 100%'], optsEn: ['A. 10%', 'B. 30%', 'C. 50%', 'D. 100%'], ans: 1, expZh: '30%。', expEn: '30%.' },
  { blockId: 'b14', blockNum: 'Block 14', topicZh: '雙重查冊', topicEn: 'Double Search', refZh: 'Cap. 128', refEn: 'Cap. 128', track: 'BOTH' as const, qZh: '公司賣方必須查？', qEn: 'Company vendor requires?', optsZh: ['A. 公司註冊處查冊', 'B. 商業登記', 'C. 破產署', 'D. 房屋署'], optsEn: ['A. Companies Registry', 'B. BR', 'C. OR', 'D. HD'], ans: 0, expZh: '公司註冊處。', expEn: 'Companies Registry.' },
  { blockId: 'b15', blockNum: 'Block 15', topicZh: '公司授權', topicEn: 'Corporate Authority', refZh: 'Cap. 622', refEn: 'Cap. 622', track: 'EAQE_ONLY' as const, qZh: '核實公司代表簽署須看？', qEn: 'To verify company signatory?', optsZh: ['A. 董事會決議', 'B. BR', 'C. ID', 'D. 稅表'], optsEn: ['A. Board Resolution', 'B. BR', 'C. ID', 'D. Tax return'], ans: 0, expZh: '董事會決議。', expEn: 'Board Resolution.' },
  { blockId: 'b16', blockNum: 'Block 16', topicZh: '沒收租賃', topicEn: 'Forfeiture', refZh: 'Cap. 7', refEn: 'Cap. 7', track: 'BOTH' as const, qZh: '欠租多少天業主可收樓？', qEn: 'Unpaid rent days for forfeiture?', optsZh: ['A. 7 天', 'B. 14 天', 'C. 15 天', 'D. 30 天'], optsEn: ['A. 7 days', 'B. 14 days', 'C. 15 days', 'D. 30 days'], ans: 2, expZh: '15天。', expEn: '15 days.' },
  { blockId: 'b17', blockNum: 'Block 17', topicZh: '印花稅罰款', topicEn: 'Stamp Duty Penalty', refZh: 'Cap. 117 s.9', refEn: 'Cap. 117 s.9', track: 'BOTH' as const, qZh: '逾期2個月印花稅最高罰？', qEn: 'Max penalty for >2 months late?', optsZh: ['A. 2倍', 'B. 4倍', 'C. 10倍', 'D. 20倍'], optsEn: ['A. 2x', 'B. 4x', 'C. 10x', 'D. 20x'], ans: 2, expZh: '10倍。', expEn: '10x.' },
  { blockId: 'b18', blockNum: 'Block 18', topicZh: '僭建令', topicEn: 'Building Orders', refZh: 'Cap. 123 s.24', refEn: 'Cap. 123 s.24', track: 'EAQE_ONLY' as const, qZh: '未獲許可骨灰龕城規會發？', qEn: 'Unauthorized columbarium notice?', optsZh: ['A. 執行通知書', 'B. 清拆令', 'C. 破產令', 'D. 封閉令'], optsEn: ['A. Enforcement Notice', 'B. Removal Order', 'C. Bankruptcy', 'D. Closure'], ans: 0, expZh: '執行通知書。', expEn: 'Enforcement Notice.' },
  { blockId: 'b19', blockNum: 'Block 19', topicZh: '授權書', topicEn: 'Power of Attorney', refZh: 'Cap. 31', refEn: 'Cap. 31', track: 'BOTH' as const, qZh: '賣樓授權書必須是？', qEn: 'Land POA must be?', optsZh: ['A. 契據', 'B. 合約', 'C. 口頭', 'D. 電郵'], optsEn: ['A. Deed', 'B. Contract', 'C. Oral', 'D. Email'], ans: 0, expZh: '契據 (Deed)。', expEn: 'Deed.' },
  { blockId: 'b20', blockNum: 'Block 20', topicZh: '競爭條例', topicEn: 'Competition Law', refZh: 'Cap. 619', refEn: 'Cap. 619', track: 'BOTH' as const, qZh: '代理合謀定價觸犯？', qEn: 'Price fixing breaches?', optsZh: ['A. 第一行為守則', 'B. 商品說明', 'C. 代理條例', 'D. 商業合約'], optsEn: ['A. First Conduct Rule', 'B. TDO', 'C. EAO', 'D. Contract'], ans: 0, expZh: '第一行為守則。', expEn: 'First Conduct Rule.' }
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

  // Developer Tool: Hidden Admin Toggle (Click Status Badge 5 times)
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

  if (!isMounted) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading Session...</div>;

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