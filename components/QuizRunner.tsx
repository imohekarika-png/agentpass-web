// components/QuizRunner.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import AiTutorModal from '@/components/AiTutorModal';

interface QuestionOption {
  key: string;
  text: string;
  text_zh?: string;
}

interface Question {
  id: string;
  target_exam: string;
  correct_option: string;
  ordinance_tag: string;
  stem: string;
  stem_zh?: string;
  explanation: string;
  explanation_zh?: string;
  options: QuestionOption[];
}

interface Props {
  questions: Question[];
  isMockExam?: boolean;
}

export default function QuizRunner({ questions, isMockExam = false }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState<'EN' | 'ZH'>('ZH');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  if (!questions || questions.length === 0) {
    return <div className="text-center p-8 text-slate-500">No questions found.</div>;
  }

  const currentQuestion = questions[currentIndex];
  const currentSelected = selectedAnswers[currentQuestion.id];
  const isSubmitted = submitted[currentQuestion.id];
  const isCorrect = currentSelected === currentQuestion.correct_option;

  const handleSelectOption = (key: string) => {
    if (isSubmitted && !isMockExam) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: key }));
  };

  const handleSubmitAnswer = () => {
    if (!currentSelected) return;
    setSubmitted((prev) => ({ ...prev, [currentQuestion.id]: true }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuizSession();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const finishQuizSession = async () => {
    setSaving(true);

    let correctCount = 0;
    const userAnswers = questions.map((q) => {
      const choice = selectedAnswers[q.id] || 'NONE';
      const isAnsCorrect = choice === q.correct_option;
      if (isAnsCorrect) correctCount++;

      return {
        questionId: q.id,
        ordinanceTag: q.ordinance_tag || 'Cap. 511',
        userChoice: choice,
        isCorrect: isAnsCorrect,
      };
    });

    try {
      await fetch('/api/save-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalQuestions: questions.length,
          correctCount,
          userAnswers,
        }),
      });
    } catch (err) {
      console.error('Failed to log session:', err);
    } finally {
      setSaving(false);
      setIsCompleted(true);
    }
  };

  const isZh = language === 'ZH';
  const stem = isZh && currentQuestion.stem_zh ? currentQuestion.stem_zh : currentQuestion.stem;

  // --- POST-EXAM REVIEW MODE (AI TUTOR ENABLED HERE) ---
  if (isCompleted && reviewMode) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              📋 {isZh ? '試卷檢討與 AI 導師解答' : 'Exam Review & AI Tutor Explanations'}
            </h2>
            <p className="text-xs text-slate-500">
              {isZh ? `第 ${currentIndex + 1} / ${questions.length} 題` : `Question ${currentIndex + 1} of ${questions.length}`}
            </p>
          </div>
          <button
            onClick={() => setReviewMode(false)}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-lg"
          >
            ← {isZh ? '返回總結' : 'Back to Summary'}
          </button>
        </div>

        {/* Question Review Card */}
        <div className="p-6 bg-white dark:bg-slate-900 shadow-lg rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="mb-4 font-semibold text-slate-800 dark:text-slate-100">
            {stem}
          </div>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((opt) => {
              const optText = isZh && opt.text_zh ? opt.text_zh : opt.text;
              const isSelected = selectedAnswers[currentQuestion.id] === opt.key;
              const isRightAnswer = opt.key === currentQuestion.correct_option;

              let btnStyle = "border-slate-200 dark:border-slate-800";
              if (isRightAnswer) {
                btnStyle = "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-300 font-medium";
              } else if (isSelected && !isRightAnswer) {
                btnStyle = "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-300";
              }

              return (
                <div
                  key={opt.key}
                  className={`p-4 rounded-xl border flex items-start space-x-3 text-sm ${btnStyle}`}
                >
                  <span className="font-bold">{opt.key}.</span>
                  <span>{optText}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center border-t pt-4 border-slate-200 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 disabled:opacity-40 rounded-lg text-xs font-semibold"
            >
              ← {isZh ? '上一題' : 'Previous'}
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className="px-4 py-2 bg-indigo-600 text-white disabled:opacity-40 rounded-lg text-xs font-semibold"
            >
              {isZh ? '下一題 →' : 'Next →'}
            </button>
          </div>

          {/* Render Pre-cached AI Explanation for Missed Question */}
          {selectedAnswers[currentQuestion.id] !== currentQuestion.correct_option && (
            <div className="mt-6">
              <AiTutorModal
                questionId={currentQuestion.id}
                question={currentQuestion}
                userChoice={selectedAnswers[currentQuestion.id] || 'NONE'}
                language={language}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- EXAM COMPLETION SUMMARY SCREEN ---
  if (isCompleted) {
    const totalCorrect = questions.filter(
      (q) => selectedAnswers[q.id] === q.correct_option
    ).length;
    const scorePct = Math.round((totalCorrect / questions.length) * 100);

    return (
      <div className="max-w-xl mx-auto p-8 bg-white dark:bg-slate-900 shadow-xl rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
        <div className="text-5xl mb-4">{scorePct >= 60 ? '🎉' : '📚'}</div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {isZh ? '模擬考試完成！' : 'Mock Exam Completed!'}
        </h2>
        <p className="text-slate-500 mb-6 text-sm">
          {scorePct >= 60 
            ? (isZh ? '恭喜！您已達到 EAA 60% 合格分數線。' : 'Congratulations! You passed the 60% benchmark.') 
            : (isZh ? '未達合格線，建議檢討錯題並針對弱點法例進行練習。' : 'Score is below 60%. Review missed items below.')}
        </p>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-6">
          <div className="text-4xl font-extrabold text-indigo-600 mb-1">{scorePct}%</div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
            {totalCorrect} / {questions.length} {isZh ? '題答對' : 'Correct Answers'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setReviewMode(true);
            }}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-semibold shadow transition"
          >
            🧐 {isZh ? '檢討錯題 & AI 解答' : 'Review Items & AI Explanations'}
          </button>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow transition"
          >
            📊 {isZh ? '查看弱點分析' : 'View Analytics'}
          </Link>
        </div>
      </div>
    );
  }

  // --- REGULAR QUIZ / ACTIVE MOCK EXAM RUNNER ---
  return (
    <div 
      key={currentQuestion.id} 
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-900 shadow-lg rounded-2xl border border-slate-100 dark:border-slate-800"
    >
      {/* Header Bar */}
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 font-semibold text-xs rounded-full">
            {currentQuestion.target_exam} ({currentQuestion.ordinance_tag || 'Cap. 511'})
          </span>
          <span className="text-sm text-slate-500 font-medium">
            {isZh ? `第 ${currentIndex + 1} / ${questions.length} 題` : `Question ${currentIndex + 1} of ${questions.length}`}
          </span>
        </div>

        <button
          onClick={() => setLanguage(isZh ? 'EN' : 'ZH')}
          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition"
        >
          🌐 {isZh ? 'Switch to English' : '切換至 繁體中文'}
        </button>
      </div>

      {/* Question Stem */}
      <div className="mb-6">
        <h2 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-line">
          {stem}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((opt) => {
          const optText = isZh && opt.text_zh ? opt.text_zh : opt.text;
          const isSelected = currentSelected === opt.key;
          const isRightAnswer = opt.key === currentQuestion.correct_option;

          let btnStyle = "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50";
          
          if (isSubmitted && !isMockExam) {
            if (isRightAnswer) {
              btnStyle = "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-300 font-medium";
            } else if (isSelected && !isCorrect) {
              btnStyle = "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-300";
            }
          } else if (isSelected) {
            btnStyle = "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 ring-1 ring-indigo-600";
          }

          return (
            <button
              key={`${currentQuestion.id}-${opt.key}`}
              disabled={isSubmitted && !isMockExam}
              onClick={() => handleSelectOption(opt.key)}
              className={`w-full text-left p-4 rounded-xl border transition flex items-start space-x-3 ${btnStyle}`}
            >
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0 ${
                isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {opt.key}
              </span>
              <span className="text-sm leading-snug pt-0.5">{optText}</span>
            </button>
          );
        })}
      </div>

      {/* Action Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition"
        >
          ← {isZh ? '上一題' : 'Previous'}
        </button>

        {isMockExam ? (
          <button
            onClick={handleNext}
            disabled={saving}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition flex items-center space-x-2"
          >
            <span>
              {currentIndex === questions.length - 1
                ? (isZh ? '提交試卷' : 'Submit Exam')
                : (isZh ? '下一題 →' : 'Next Question →')}
            </span>
            {saving && <div className="animate-spin h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full ml-2" />}
          </button>
        ) : (
          !isSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!currentSelected}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg text-sm font-semibold shadow transition"
            >
              {isZh ? '提交答案' : 'Submit Answer'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={saving}
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-semibold transition flex items-center space-x-2"
            >
              <span>
                {currentIndex === questions.length - 1
                  ? (isZh ? '完成並查看結果' : 'Finish Quiz')
                  : (isZh ? '下一題 →' : 'Next Question →')}
              </span>
              {saving && <div className="animate-spin h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full ml-2" />}
            </button>
          )
        )}
      </div>

      {/* Immediate AI Tutor Modal - DISABLED during active Mock Exam */}
      {isSubmitted && !isCorrect && !isMockExam && (
        <AiTutorModal
          questionId={currentQuestion.id}
          question={currentQuestion}
          userChoice={currentSelected}
          language={language}
        />
      )}
    </div>
  );
}