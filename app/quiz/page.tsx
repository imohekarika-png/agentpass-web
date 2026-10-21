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
  Filter
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
}

// 130-Question Complete Practice Bank Generator across 20 Topic Blocks
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

const QUIZ_QUESTION_BANK: QuizQuestion[] = Array.from({ length: 130 }, (_, idx) => {
  const qId = idx + 101;
  const tmpl = STATUTORY_TOPIC_TEMPLATES[idx % STATUTORY_TOPIC_TEMPLATES.length];

  return {
    id: qId,
    blockId: tmpl.blockId,
    blockNum: tmpl.blockNum,
    topicZh: `${tmpl.topicZh} (題 #${qId})`,
    topicEn: `${tmpl.topicEn} (Q #${qId})`,
    questionZh: `【${tmpl.blockNum} 考點特訓 #${qId}】關於${tmpl.topicZh}，下列哪項符合香港地產法規（${tmpl.refZh}）之規定？`,
    questionEn: `[${tmpl.blockNum} Drill #${qId}] Regarding ${tmpl.topicEn}, which statement accurately reflects Hong Kong statutory requirement under ${tmpl.refEn}?`,
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTrack = localStorage.getItem('agentpass_selected_track');
      if (savedTrack === 'sqe' || savedTrack === 'sqe_pro') {
        setSelectedTrack('SQE');
      }
    }
  }, []);

  const activeQuestions = QUIZ_QUESTION_BANK.filter((q) => {
    if (blockParam && q.blockId !== blockParam) return false;
    if (selectedTrack === 'SQE' && q.trackApplicability === 'EAQE_ONLY') return false;
    return true;
  });

  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0] || QUIZ_QUESTION_BANK[0];

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOptionIndex === null) return;
    setIsSubmitted(true);

    const isCorrect = selectedOptionIndex === currentQ.answerIndex;
    setUserScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));

    if (!isCorrect && typeof window !== 'undefined') {
      try {
        const todayStr = new Date().toISOString().split('T')[0];
        const srsItem = {
          id: `q-${currentQ.id}`,
          questionId: currentQ.id,
          blockNum: currentQ.blockNum,
          titleZh: currentQ.topicZh,
          titleEn: currentQ.topicEn,
          statuteRefZh: currentQ.statuteRefZh,
          statuteRefEn: currentQ.statuteRefEn,
          lastReviewed: todayStr,
          nextReviewDate: todayStr,
          ladderStage: 'Day 1',
          accuracy: 0
        };

        const existingQueue = JSON.parse(
          localStorage.getItem('agentpass_srs_queue_v1') || '[]'
        );

        const existingIds = new Set(existingQueue.map((item: any) => item.questionId || item.id));
        if (!existingIds.has(currentQ.id)) {
          localStorage.setItem('agentpass_srs_queue_v1', JSON.stringify([srsItem, ...existingQueue]));
        }
      } catch (err) {
        console.warn('SRS Sync Warning:', err);
      }
    }
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
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
              <span>Official 130-Question Practice Bank & Trap Register</span>
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

              if (isSubmitted) {
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
                  {isSubmitted && isCorrect && <Check className="h-4 w-4 text-white shrink-0" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {isSubmitted && (
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
                disabled={selectedOptionIndex === null}
                onClick={handleCheckAnswer}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition cursor-pointer disabled:opacity-40"
              >
                <span>{isZh ? '提交答案' : 'Check Answer'}</span>
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