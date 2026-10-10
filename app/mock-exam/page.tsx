// app/mock-exam/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  Timer, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Award,
  BookOpen,
  FileText,
  HelpCircle,
  BarChart3
} from 'lucide-react';

interface Question {
  id: number;
  part: 1 | 2; // Part I: MC, Part II: Case Study
  topic: string;
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationZh: string;
  explanationEn: string;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    part: 1,
    topic: 'Cap. 511 Licensing Regulation',
    questionZh: '根據《地產代理條例》(Cap. 511)，持牌持有人在更換其主要營業地址後，必須在多少天內書面通知地產代理監管局 (EAA)？',
    questionEn: 'Under the Estate Agents Ordinance (Cap. 511), within how many days must a licensee notify the EAA in writing after changing their principal place of business?',
    optionsZh: ['7 天', '14 天', '21 天', '30 天'],
    optionsEn: ['7 days', '14 days', '21 days', '30 days'],
    correctIndex: 3,
    explanationZh: 'Cap. 511 s.40 規定持牌人變更營業地址必須於 31 天內（常考實務為 30 天內）通知 EAA。',
    explanationEn: 'Under Cap. 511 s.40, any change of business address must be reported to EAA within 30 days.'
  },
  {
    id: 2,
    part: 1,
    topic: 'Land Search & Encumbrances',
    questionZh: '在土地註冊處查冊紀錄中，若出現「Notice under Section 24 of Buildings Ordinance」(屋宇署第24條命令)，這代表什麼？',
    questionEn: 'In a Land Registry search record, what does a "Notice under Section 24 of the Buildings Ordinance" signify?',
    optionsZh: ['物業已被法院收回', '物業存在未清繳的地租', '屋宇署發出的拆卸違例建築物(僭建)命令', '物業已被業主立案法團查封'],
    optionsEn: ['Property repossessed by court', 'Unpaid Government rent', 'Order to demolish unauthorized building works (UBW)', 'Property impounded by IO'],
    correctIndex: 2,
    explanationZh: '屋宇署 s.24 命令屬於常見的建築物違例/僭建物清拆令，屬於影響業權的重大負擔。',
    explanationEn: 'Section 24 Order refers to mandatory demolition of UBW (Unauthorized Building Works).'
  },
  {
    id: 3,
    part: 2,
    topic: 'Case Study: Tenancy & Form 6',
    questionZh: '【個案題】地產代理 Chan 在處理一宗住宅租務交易時，安排租客簽署了表格 6 (Form 6)。但 Chan 漏填了地產代理佣金金額及支付日期。該地產代理協議是否有效？',
    questionEn: '[Case Study] Agent Chan arranged a residential tenancy using Form 6, but omitted the commission amount and payment date. Is the agreement valid?',
    optionsZh: [
      '完全有效，佣金可於事後口頭追討',
      '無效，且代理違反監管規例，可能面臨 disciplinary action',
      '自動轉為標準 1 個月租金佣金',
      '只需租客單方面簽署補款聲明即可生效'
    ],
    optionsEn: [
      'Fully valid; commission recovered orally later',
      'Invalid; agent breaches regulations and faces disciplinary action',
      'Automatically defaults to 1 month rent commission',
      'Valid if tenant signs a supplementary declaration'
    ],
    correctIndex: 1,
    explanationZh: '地產代理協議 (Form 3 至 Form 6) 的必要條款（包括佣金與支付條件）如未填妥即屬違規，且影響協議法律效力。',
    explanationEn: 'Essential terms of Estate Agency Agreements must be fully completed. Omission violates EAA Practice Rules.'
  }
];

export default function MockExamPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 mins timer
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  // Calculate scores
  const part1Questions = MOCK_QUESTIONS.filter((q) => q.part === 1);
  const part2Questions = MOCK_QUESTIONS.filter((q) => q.part === 2);

  const part1Correct = part1Questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const part2Correct = part2Questions.filter((q) => answers[q.id] === q.correctIndex).length;

  const part1ScorePct = Math.round((part1Correct / part1Questions.length) * 100) || 0;
  const part2ScorePct = Math.round((part2Correct / part2Questions.length) * 100) || 0;
  
  const overallPassed = part1ScorePct >= 60 && part2ScorePct >= 60;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-300 mb-2">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>{isZh ? 'EAA 全真模擬考試考場' : 'Official EAQE/SQE Timed Exam Simulator'}</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              {isZh ? '地產代理資格全真模擬測驗' : 'Full Exam Readiness Assessment'}
            </h1>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <Timer className={`h-5 w-5 ${timeLeft < 300 ? 'text-rose-400 animate-pulse' : 'text-indigo-400'}`} />
            <span className="font-mono text-lg font-black text-white">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Exam Results Modal / Summary Banner */}
        {isSubmitted && (
          <div className={`p-6 sm:p-8 rounded-2xl border ${overallPassed ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-rose-950/30 border-rose-500/50'} space-y-6`}>
            <div className="flex items-center gap-3">
              {overallPassed ? (
                <CheckCircle2 className="h-8 w-8 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="h-8 w-8 text-rose-400 shrink-0" />
              )}
              <div>
                <h2 className="text-xl font-black text-white">
                  {overallPassed
                    ? (isZh ? '🎉 恭喜！您已達到 EAA 雙合格過線標準' : '🎉 Congratulations! You Passed Both Sections')
                    : (isZh ? '⚠️ 未能合格：請檢討未過線部分' : '⚠️ Exam Result: Retake Recommended')}
                </h2>
                <p className="text-xs text-slate-300">
                  {isZh
                    ? 'EAA 規定：Part I (單選題) 與 Part II (個案題) 均須同時達到 60% 分數線。'
                    : 'EAA Threshold: Both Part I and Part II must individually reach 60%.'}
                </p>
              </div>
            </div>

            {/* Part Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block font-bold">Part I (Multiple Choice)</span>
                <span className={`text-2xl font-black ${part1ScorePct >= 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {part1ScorePct}% ({part1Correct}/{part1Questions.length})
                </span>
                <span className="text-[11px] block text-slate-400 mt-1">
                  {part1ScorePct >= 60 ? '✅ Passed (≥60%)' : '❌ Failed (<60%)'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block font-bold">Part II (Case Studies)</span>
                <span className={`text-2xl font-black ${part2ScorePct >= 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {part2ScorePct}% ({part2Correct}/{part2Questions.length})
                </span>
                <span className="text-[11px] block text-slate-400 mt-1">
                  {part2ScorePct >= 60 ? '✅ Passed (≥60%)' : '❌ Failed (<60%)'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setAnswers({});
                setTimeLeft(1800);
                setIsSubmitted(false);
              }}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{isZh ? '重新挑戰測驗' : 'Retake Test'}</span>
            </button>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {MOCK_QUESTIONS.map((q, idx) => {
            const selectedIdx = answers[q.id];
            const isCorrect = selectedIdx === q.correctIndex;

            return (
              <div key={q.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                    Question {idx + 1} • {q.topic}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                    Part {q.part} ({q.part === 1 ? 'MC' : 'Case Study'})
                  </span>
                </div>

                <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {isZh ? q.questionZh : q.questionEn}
                </p>

                {/* Options */}
                <div className="space-y-2.5 pt-2">
                  {(isZh ? q.optionsZh : q.optionsEn).map((opt, optIdx) => {
                    const isChoice = selectedIdx === optIdx;

                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500/50';
                    if (isChoice) {
                      btnStyle = 'bg-indigo-950 border-indigo-500 text-white';
                    }

                    if (isSubmitted) {
                      if (optIdx === q.correctIndex) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isChoice && !isCorrect) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isSubmitted && optIdx === q.correctIndex && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-amber-400 block">{isZh ? '考官解析 (Explanation):' : 'Explanation:'}</span>
                    <p>{isZh ? q.explanationZh : q.explanationEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Action */}
        {!isSubmitted && (
          <button
            onClick={() => setIsSubmitted(true)}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-extrabold text-sm text-white transition shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <BarChart3 className="h-5 w-5" />
            <span>{isZh ? '提交答案並計算成績' : 'Submit Answers & Calculate Score'}</span>
          </button>
        )}

      </div>
    </div>
  );
}