// app/course/[id]/page.tsx
'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { LESSON_REGISTRY } from '@/app/content';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Lightbulb, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight,
  Scale,
  FileText,
  AlertTriangle,
  BrainCircuit,
  CheckSquare
} from 'lucide-react';

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams.id.toLowerCase();
  const { locale, language } = useLanguage();
  const isZh = locale ? locale === 'zh-HK' : language === 'ZH';

  // Lookup lesson directly from master LESSON_REGISTRY
  const lesson = LESSON_REGISTRY[lessonId] || LESSON_REGISTRY['m1-l1'];

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-400 hover:text-indigo-300 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isZh ? '返回課程大綱' : 'Back to Syllabus'}</span>
          </Link>
          <span className="rounded-full bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 text-[11px] font-mono text-indigo-300 flex items-center gap-1.5">
            <Scale className="h-3.5 w-3.5 text-indigo-400" />
            <span>{lesson.capRef}</span>
          </span>
        </div>

        {/* Title & Module Banner */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {isZh ? lesson.moduleZh : lesson.moduleEn}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {isZh ? lesson.titleZh : lesson.titleEn}
          </h1>
        </div>

        {/* 1. MEMORY HOOK (Dual Coding Image & Mnemonics) */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <BrainCircuit className="h-5 w-5 text-amber-400" />
            <span>{isZh ? lesson.memoryHookZh.title : lesson.memoryHookEn.title}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-amber-500/20 text-xs text-amber-300/90 italic">
            💡 {isZh ? lesson.memoryHookZh.imageConcept : lesson.memoryHookEn.imageConcept}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            {isZh ? lesson.memoryHookZh.desc : lesson.memoryHookEn.desc}
          </p>
        </div>

        {/* 2. CASE SCENARIO */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <span>{isZh ? '【香港 EAA 實務情境思考】' : '[EAA Practical Case Scenario]'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
            "{isZh ? lesson.scenarioZh : lesson.scenarioEn}"
          </p>
        </div>

        {/* 3. VERIFIED SYLLABUS NOTES (✓) */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>{isZh ? '試題庫核實考點 (Syllabus Verified Notes ✓)' : 'Syllabus Verified Notes ✓'}</span>
          </h2>
          <ul className="space-y-3">
            {(isZh ? lesson.verifiedNotesZh : lesson.verifiedNotesEn).map((note, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  ✓
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. DEEP LEGAL & STATUTORY COMMENTARY */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="h-5 w-5 text-indigo-400" />
            <span>{isZh ? '法例條文與監管指南深層剖析' : 'Detailed Legal & Regulatory Commentary'}</span>
          </h2>
          <div className="space-y-3">
            {(isZh ? lesson.detailedLawNotesZh : lesson.detailedLawNotesEn).map((paragraph, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 5. MASTER TRAP REGISTER (⚠) */}
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm border-b border-rose-500/20 pb-2">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
            <span>{isZh ? '考官陷阱與干擾項拆解 (Exam Trap Register ⚠)' : 'Exam Trap Register ⚠'}</span>
          </div>
          <ul className="space-y-2">
            {(isZh ? lesson.trapsZh : lesson.trapsEn).map((trap, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                {trap}
              </li>
            ))}
          </ul>
        </div>

        {/* 6. ACTIVE RETRIEVAL CHECKLIST */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <CheckSquare className="h-5 w-5 text-indigo-400" />
            <span>{isZh ? '全真檢索思考提問 (Active Retrieval Prompts)' : 'Active Retrieval Prompts'}</span>
          </h2>
          <div className="space-y-2.5">
            {(isZh ? lesson.retrievalQuestionsZh : lesson.retrievalQuestionsEn).map((q, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs sm:text-sm text-indigo-200 font-mono">
                {q}
              </div>
            ))}
          </div>
        </div>

        {/* 7. KNOWLEDGE CHECK MULTIPLE-CHOICE QUIZ */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              {isZh ? '單元測驗 (Sample Exam Quiz)' : 'Sample Exam Quiz'}
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
              {isZh ? lesson.quiz.questionZh : lesson.quiz.questionEn}
            </p>

            <div className="space-y-2.5">
              {(isZh ? lesson.quiz.optionsZh : lesson.quiz.optionsEn).map((opt, idx) => {
                let btnStyle = "border-slate-800 bg-slate-800/50 hover:bg-slate-800 text-slate-300";
                
                if (selectedOption === idx) {
                  btnStyle = "border-indigo-500 bg-indigo-950/60 text-white font-semibold";
                }

                if (isSubmitted) {
                  if (idx === lesson.quiz.correctIndex) {
                    btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200 font-bold";
                  } else if (selectedOption === idx) {
                    btnStyle = "border-rose-500 bg-rose-950/50 text-rose-200";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && idx === lesson.quiz.correctIndex && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isSubmitted && selectedOption === idx && idx !== lesson.quiz.correctIndex && (
                      <XCircle className="h-4 w-4 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {!isSubmitted ? (
              <button
                onClick={() => selectedOption !== null && setIsSubmitted(true)}
                disabled={selectedOption === null}
                className="mt-4 flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition disabled:opacity-50 cursor-pointer"
              >
                <span>{isZh ? '核對答案' : 'Submit Answer'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <div className={`p-4 rounded-xl border space-y-2 ${selectedOption === lesson.quiz.correctIndex ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-rose-950/30 border-rose-500/40'}`}>
                <div className="flex items-center gap-2 text-xs font-bold">
                  {selectedOption === lesson.quiz.correctIndex ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> {isZh ? '回答正確！' : 'Correct Answer!'}
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> {isZh ? '回答錯誤，請參閱解析' : 'Incorrect. See explanation below.'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isZh ? lesson.quiz.explanationZh : lesson.quiz.explanationEn}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isZh ? '返回大綱' : 'Syllabus'}</span>
          </Link>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
          >
            <span>{isZh ? '進入完整全真試題庫' : 'Practice Question Bank'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}