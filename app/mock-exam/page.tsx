// app/mock-exam/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { getUserQuota, canRunExam, consumeQuota, UserQuota } from '@/app/utils/quotaManager';
import { PRESET_EXAM_BANK, getExamSuiteByMode, Question } from '@/app/data/examPool';
import { 
  Timer, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award,
  BarChart3,
  ArrowRight,
  BookOpen,
  LayoutDashboard,
  Sparkles,
  Zap,
  ShieldAlert
} from 'lucide-react';

type ExamMode = 'express' | 'sqe' | 'eaqe';

const MODE_CONFIGS = {
  express: { nameZh: 'Express 快速診斷卡', nameEn: 'Express Drill', questionsCount: 10, timeMinutes: 30 },
  sqe: { nameZh: 'SQE 營業員 50 題全真考場', nameEn: 'Full SQE Simulation', questionsCount: 50, timeMinutes: 150 },
  eaqe: { nameZh: 'EAQE 地產代理 50 題主管考場', nameEn: 'Full EAQE Master Sim', questionsCount: 50, timeMinutes: 180 },
};

export default function MockExamPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [selectedMode, setSelectedMode] = useState<ExamMode>('express');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number>(1800);
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [quotaError, setQuotaError] = useState<string | null>(null);
  const [userQuota, setUserQuota] = useState<UserQuota | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUserQuota(getUserQuota());
  }, []);

  useEffect(() => {
    if (!isExamActive || isSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamActive, isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Instant Launch Execution (< 0.1 seconds)
  const launchExamInstant = (mode: ExamMode) => {
    const check = canRunExam(mode);
    if (!check.allowed) {
      setQuotaError(check.reason || '配額不足');
      return;
    }

    setQuotaError(null);
    setSelectedMode(mode);
    const config = MODE_CONFIGS[mode];

    // Serve pre-computed questions instantly
    const suite = getExamSuiteByMode(mode);

    consumeQuota(mode);
    setUserQuota(getUserQuota());
    setQuestions(suite);
    setAnswers({});
    setTimeLeft(config.timeMinutes * 60);
    setIsExamActive(true);
    setIsSubmitted(false);
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const part1Questions = questions.filter((q) => q.part === 1);
  const part2Questions = questions.filter((q) => q.part === 2);

  const part1Correct = part1Questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const part2Correct = part2Questions.filter((q) => answers[q.id] === q.correctIndex).length;

  const part1ScorePct = Math.round((part1Correct / (part1Questions.length || 1)) * 100);
  const part2ScorePct = Math.round((part2Correct / (part2Questions.length || 1)) * 100);
  const overallPassed = part1ScorePct >= 60 && part2ScorePct >= 60;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Mode Selector Area */}
        {!isExamActive && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1 text-xs font-bold text-indigo-300">
                <Award className="h-4 w-4 text-amber-400" />
                <span>{isZh ? 'EAA 全真 AI 智能模擬考場中心' : 'Official EAA AI Exam Center'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                {isZh ? '選擇您的模擬考試模式' : 'Select Your Practice Exam Mode'}
              </h1>
              <p className="text-xs text-slate-400 max-w-xl mx-auto">
                {isZh 
                  ? '選擇合適的考場模式，即可秒速開啟符合地產代理監管局雙過線標準的全真試卷。'
                  : 'Select an exam mode to launch instantly with verified HK EAA question standards.'}
              </p>
            </div>

            {quotaError && (
              <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs font-bold flex items-center gap-2 max-w-2xl mx-auto">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <span>{quotaError}</span>
              </div>
            )}

            {/* Mode Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              {/* Mode 1: Express */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold">10 Qs / 30 Mins</span>
                    <Zap className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-black text-white">{isZh ? 'Express 快速診斷卡' : 'Express Drill'}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isZh ? '適合通勤與零碎時間刷題。包含 5 題單選 + 5 題個案速刷。' : 'Quick 10-question drill for rapid knowledge checks.'}
                  </p>
                </div>

                <button
                  onClick={() => launchExamInstant('express')}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
                >
                  <Zap className="h-4 w-4 text-amber-300" />
                  <span>{isZh ? '秒速開啟 Express 測驗' : 'Start Express Drill'}</span>
                </button>
              </div>

              {/* Mode 2: SQE 50 Qs */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">50 Qs / 150 Mins</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Salesperson</span>
                  </div>
                  <h3 className="text-lg font-black text-white">{isZh ? 'SQE 營業員全真考場' : 'Full SQE Simulation'}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isZh ? '150 分鐘完整時限，30 題 Part I 單選 + 20 題 Part II 個案題。' : 'Full 2.5-hour official simulation for Salesperson licence candidates.'}
                  </p>
                </div>

                <button
                  onClick={() => launchExamInstant('sqe')}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  <Zap className="h-4 w-4 text-amber-300" />
                  <span>{isZh ? '秒速開啟 SQE 全真考場' : 'Start SQE Sim'}</span>
                </button>
              </div>

              {/* Mode 3: EAQE 50 Qs */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 hover:border-indigo-400 transition flex flex-col justify-between space-y-4 shadow-xl shadow-indigo-950/50">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 font-mono text-xs font-bold">50 Qs / 180 Mins</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Master Agent</span>
                  </div>
                  <h3 className="text-lg font-black text-white">{isZh ? 'EAQE 地產代理主管考場' : 'Full EAQE Master Sim'}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isZh ? '3 小時耐力極限模擬，完整模擬地產代理牌照雙過線核算機制。' : 'Full 3-hour official simulation for Estate Agent licence candidates.'}
                  </p>
                </div>

                <button
                  onClick={() => launchExamInstant('eaqe')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:opacity-90 font-bold text-xs text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Zap className="h-4 w-4 text-amber-200" />
                  <span>{isZh ? '秒速解鎖 EAQE 主管考場' : 'Start EAQE Master Sim'}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Active Test Area */}
        {isExamActive && (
          <div className="space-y-8">
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase block mb-1">
                  Mode: {MODE_CONFIGS[selectedMode].nameEn}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {isZh ? MODE_CONFIGS[selectedMode].nameZh : MODE_CONFIGS[selectedMode].nameEn}
                </h1>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <Timer className={`h-5 w-5 ${timeLeft < 300 ? 'text-rose-400 animate-pulse' : 'text-indigo-400'}`} />
                  <span className="font-mono text-lg font-black text-white">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>

            {/* Results Modal */}
            {isSubmitted && (
              <div ref={resultRef} className={`p-6 sm:p-8 rounded-2xl border ${overallPassed ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-rose-950/30 border-rose-500/50'} space-y-6 shadow-2xl`}>
                <div className="flex items-center gap-3">
                  {overallPassed ? (
                    <CheckCircle2 className="h-8 w-8 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="h-8 w-8 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <h2 className="text-xl font-black text-white">
                      {overallPassed
                        ? (isZh ? '🎉 恭喜！您已達到 EAA 雙過線合格標準' : '🎉 Congratulations! You Passed Both Sections')
                        : (isZh ? '⚠️ 未能合格：請檢討未過線部分' : '⚠️ Retake Recommended')}
                    </h2>
                    <p className="text-xs text-slate-300">
                      {isZh ? 'EAA 規定：Part I 與 Part II 均須同時達到 60% 分數線。' : 'EAA Threshold: Part I and Part II must both reach ≥60%.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-bold">Part I (Multiple Choice)</span>
                    <span className={`text-2xl font-black ${part1ScorePct >= 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {part1ScorePct}% ({part1Correct}/{part1Questions.length})
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 block font-bold">Part II (Case Studies)</span>
                    <span className={`text-2xl font-black ${part2ScorePct >= 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {part2ScorePct}% ({part2Correct}/{part2Questions.length})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsExamActive(false)}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>{isZh ? '返回考場模式選擇' : 'Back to Mode Selection'}</span>
                </button>
              </div>
            )}

            {/* Questions Feed */}
            <div className="space-y-6">
              {questions.map((q, idx) => {
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

                    <div className="space-y-2.5 pt-2">
                      {(isZh ? q.optionsZh : q.optionsEn).map((opt, optIdx) => {
                        const isChoice = selectedIdx === optIdx;

                        let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500/50';
                        if (isChoice) btnStyle = 'bg-indigo-950 border-indigo-500 text-white';

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
                            className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && optIdx === q.correctIndex && (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <span className="font-bold text-amber-400 block">{isZh ? '考官解析:' : 'Explanation:'}</span>
                        <p>{isZh ? q.explanationZh : q.explanationEn}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Submit Bar */}
            {!isSubmitted && (
              <button
                onClick={handleSubmit}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-extrabold text-sm text-white transition shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <BarChart3 className="h-5 w-5" />
                <span>{isZh ? '提交答案並計算成績' : 'Submit Answers & Calculate Score'}</span>
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
}