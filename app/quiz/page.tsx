// app/quiz/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import {
  HelpCircle,
  BookOpen,
  Award,
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Bookmark,
  Target,
  AlertTriangle,
  Zap,
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

const QUIZ_QUESTION_BANK: QuizQuestion[] = [
  {
    id: 101,
    blockId: 'b1',
    blockNum: 'Block 01',
    topicZh: 'EAA 架構與持牌資格',
    topicEn: 'EAA Structure & Licensing Qualifications',
    questionZh: '下列哪項條件【絕非】申請個人地產代理牌照 (EAQE) 或營業員牌照 (SQE) 的法定要求？',
    questionEn: 'Which of the following is NOT a statutory requirement for an individual license?',
    optionsZh: [
      'A. 年滿 18 歲',
      'B. 完成中五 (Form 5) 或同等學歷',
      'C. 具備最少 1 年地產相關工作經驗',
      'D. 獲監管局評定為「適當人選」(Fit and Proper)'
    ],
    optionsEn: [
      'A. Aged 18 or above',
      'B. Completed Form 5 or equivalent',
      'C. Possess at least 1 year relevant estate agency work experience',
      'D. Considered a Fit and Proper person by EAA'
    ],
    answerIndex: 2,
    explanationZh: '《地產代理條例》(Cap. 511) 規定之發牌四條件為：年滿 18 歲、中五或同等學歷、Fit & Proper 評估及指定期限內考試合格。「工作經驗」絕非發牌法定條件。',
    explanationEn: 'Under Cap. 511, the 4 statutory conditions are: Age 18+, Form 5, Fit & Proper, and Exam passed. Work experience is NOT required.',
    statuteRefZh: '《地產代理條例》Cap. 511 s.15',
    statuteRefEn: 'Estate Agents Ordinance Cap. 511 s.15',
    trackApplicability: 'BOTH'
  },
  {
    id: 102,
    blockId: 'b1',
    blockNum: 'Block 01',
    topicZh: '考試合格有效期限',
    topicEn: 'Exam Validity Windows',
    questionZh: '營業員資格考試 (SQE) 考試合格後，申請人最遲須於考試合格日後多久內遞交牌照申請？',
    questionEn: 'After passing the Salesperson Qualifying Exam (SQE), within what time frame must the license application be submitted?',
    optionsZh: [
      'A. 3 個月內',
      'B. 6 個月內',
      'C. 12 個月內',
      'D. 24 個月內'
    ],
    optionsEn: [
      'A. Within 3 months',
      'B. Within 6 months',
      'C. Within 12 months',
      'D. Within 24 months'
    ],
    answerIndex: 1,
    explanationZh: '營業員牌照 (SQE) 的考試合格有效期限為 6 個月；地產代理牌照 (EAQE) 為 12 個月。切勿混淆兩者時間！',
    explanationEn: 'The exam validity window for Salesperson (SQE) is 6 months, whereas for Estate Agent (EAQE) it is 12 months.',
    statuteRefZh: '《地產代理條例》Cap. 511 s.18',
    statuteRefEn: 'Estate Agents Ordinance Cap. 511 s.18',
    trackApplicability: 'BOTH'
  },
  {
    id: 103,
    blockId: 'b2',
    blockNum: 'Block 02',
    topicZh: '營業地點與 31 天通知期',
    topicEn: 'Business Premises & 31-Day Notice',
    questionZh: '持牌地產代理公司變更營業地址或委任新分行經理後，須於幾多天內以書面通知 EAA？',
    questionEn: 'Within how many days must an agency notify EAA in writing of a change in business address or branch manager appointment?',
    optionsZh: [
      'A. 7 天內',
      'B. 14 天內',
      'C. 31 天內',
      'D. 60 天內'
    ],
    optionsEn: [
      'A. Within 7 days',
      'B. Within 14 days',
      'C. Within 31 days',
      'D. Within 60 days'
    ],
    answerIndex: 2,
    explanationZh: 'Cap. 511 s.40 規定，變更主要營業地點、開設新分行或委任分行經理，均須於 31 天內以書面通知監管局。',
    explanationEn: 'Cap. 511 s.40 mandates that address changes and branch manager appointments must be reported in writing within 31 days.',
    statuteRefZh: '《地產代理條例》Cap. 511 s.40',
    statuteRefEn: 'Estate Agents Ordinance Cap. 511 s.40',
    trackApplicability: 'BOTH'
  },
  {
    id: 104,
    blockId: 'b4',
    blockNum: 'Block 04',
    topicZh: '客戶存款與信託戶口',
    topicEn: 'Client Money & Trust Accounts',
    questionZh: '地產代理代客戶收取存款後，必須於幾多天內向客戶發出正式書面收據？',
    questionEn: 'Within how many days must an estate agent issue a written receipt after receiving client money?',
    optionsZh: [
      'A. 即時發出',
      'B. 7 天內',
      'C. 14 天內',
      'D. 30 天內'
    ],
    optionsEn: [
      'A. Immediately',
      'B. Within 7 days',
      'C. Within 14 days',
      'D. Within 30 days'
    ],
    answerIndex: 2,
    explanationZh: '《地產代理(客戶款項)規例》Cap. 511B 規定，收取客戶存款後必須即時存入獨立信託戶口，並於 14 天內發出書面收據。收據副本須保存至少 3 年。',
    explanationEn: 'Cap. 511B requires client money to be deposited immediately in trust and a receipt issued within 14 days (retained for 3 years).',
    statuteRefZh: '《地產代理(客戶款項)規例》Cap. 511B s.4',
    statuteRefEn: 'Estate Agents (Client Money) Rules Cap. 511B s.4',
    trackApplicability: 'EAQE_ONLY'
  },
  {
    id: 105,
    blockId: 'b11',
    blockNum: 'Block 11',
    topicZh: '法定代理協議有效期限',
    topicEn: 'Agency Agreement Statutory Validity',
    questionZh: '業主簽署 Form 3 出售放盤協議時，若協議內未填寫有效期限，該協議有何法律效力？',
    questionEn: 'If the validity period is omitted when a vendor signs Form 3, what is its legal status?',
    optionsZh: [
      'A. 協議無效 (Invalid)',
      'B. 自動以 3 個月為上限',
      'C. 自動以 1 年為上限',
      'D. 永久有效'
    ],
    optionsEn: [
      'A. Agreement is invalid / void',
      'B. Deemed valid for 3 months maximum',
      'C. Deemed valid for 1 year maximum',
      'D. Perpetually valid'
    ],
    answerIndex: 0,
    explanationZh: '《地產代理常規規例》規定，法定代理協議 (Form 3 至 6) 必須載明有效期限，最長不得超過 3 個月。未列明有效期的協議完全無效。',
    explanationEn: 'Practice Regulations require Forms 3 to 6 to specify a validity period (max 3 months). Omitting this renders the agreement invalid.',
    statuteRefZh: '《地產代理常規規例》Cap. 511A s.6',
    statuteRefEn: 'Estate Agents Practice Regulations Cap. 511A s.6',
    trackApplicability: 'BOTH'
  },
  {
    id: 106,
    blockId: 'b16',
    blockNum: 'Block 16',
    topicZh: '住宅租務欠租沒收權',
    topicEn: 'Tenancy Forfeiture for Non-payment',
    questionZh: '根據《業主與租客(綜合)條例》(Cap. 7)，在無明確條款下，住宅租客拖欠租金達幾多天時，業主可根據法定隱含條件行使沒收租賃權 (Forfeiture)？',
    questionEn: 'Under Cap. 7, absent an express clause, after how many days of unpaid rent can a landlord forfeit the tenancy?',
    optionsZh: [
      'A. 7 天',
      'B. 14 天',
      'C. 15 天',
      'D. 30 天'
    ],
    optionsEn: [
      'A. 7 Days',
      'B. 14 Days',
      'C. 15 Days',
      'D. 30 Days'
    ],
    answerIndex: 2,
    explanationZh: 'Cap. 7 法定隱含條件規定，拖欠租金達 15 天 (15 Days) 即觸發業主沒收租賃權。14 天是常見干擾項！',
    explanationEn: 'Cap. 7 statutory implied condition provides a 15-day unpaid rent threshold for tenancy forfeiture. 14 days is a false distractor!',
    statuteRefZh: '《業主與租客(綜合)條例》Cap. 7 Part IV',
    statuteRefEn: 'Landlord and Tenant Ordinance Cap. 7 Part IV',
    trackApplicability: 'BOTH'
  }
];

export default function QuizPage() {
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

    // Task 1.2.1 Integration: Sync incorrect answers to Spaced Repetition Queue (SRS)
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
              <span>Official Practice Bank & Exam Trap Register</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {isZh ? '全真高頻考題與陷阱特訓' : 'Practice Quiz Bank & Exam Traps'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              {isZh
                ? '針對香港地產代理監管局 (EAA) 最新出題傾向，訓練法規辨析能力與消除考官陷阱。'
                : 'Targeted practice drills reinforcing statutory citations and eliminating examiner trap patterns.'}
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

        {/* Filter Bar & Performance Counter */}
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
              {isZh ? `進度: ${currentQIndex + 1} / ${activeQuestions.length}` : `Progress: ${currentQIndex + 1} / ${activeQuestions.length}`}
            </span>
            {userScore.total > 0 && (
              <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {isZh ? `正確率: ${Math.round((userScore.correct / userScore.total) * 100)}%` : `Accuracy: ${Math.round((userScore.correct / userScore.total) * 100)}%`}
              </span>
            )}
          </div>
        </div>

        {/* Main Quiz Question Card */}
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

          {/* Options Grid */}
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

          {/* Explanation Box */}
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

          {/* Navigation Controls */}
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