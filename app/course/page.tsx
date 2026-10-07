// app/course/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  EAA_COURSE_SYLLABUS, 
  CourseModule, 
  Lesson 
} from '@/app/data/courseSyllabus';
import { 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Globe, 
  Award, 
  BookMarked,
  PlayCircle,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

const PROGRESS_STORAGE_KEY = 'agentpass_course_completed_lessons_v1';

export default function CourseSyllabusPage() {
  const { locale, toggleLocale } = useLanguage();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string>(EAA_COURSE_SYLLABUS[0].id);
  const [activeLesson, setActiveLesson] = useState<Lesson>(EAA_COURSE_SYLLABUS[0].lessons[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Failed to load course progress:', err);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(completedLessons));
    } catch (err) {
      console.error('Failed to save course progress:', err);
    }
  }, [completedLessons, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex items-center justify-center">
        <div className="text-xs text-slate-500 font-mono animate-pulse">
          Loading course syllabus...
        </div>
      </div>
    );
  }

  const isZh = locale === 'zh-HK';

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleAskAiTutor = (promptTopic: string) => {
    window.dispatchEvent(
      new CustomEvent('agentpass:ask-tutor', { detail: { prompt: promptTopic } })
    );
  };

  const currentModule = EAA_COURSE_SYLLABUS.find((m) => m.id === activeModuleId) || EAA_COURSE_SYLLABUS[0];

  const totalLessons = EAA_COURSE_SYLLABUS.reduce(
    (acc, mod) => acc + mod.lessons.length,
    0
  );
  const overallPercentage = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8" translate="no">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
              <BookMarked className="h-4 w-4" />
              <span>
                {isZh ? '香港地產代理牌照考試課程' : 'HK Estate Agency Licensing Course'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              <span>
                {isZh ? 'EAQE / SQE 證書考試課程大綱' : 'EAQE / SQE Exam Syllabus & Revision Guide'}
              </span>
            </h1>
          </div>

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-indigo-500 hover:text-white transition self-start sm:self-auto"
          >
            <Globe className="h-4 w-4 text-indigo-400" />
            <span>{isZh ? 'English' : '繁體中文'}</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="rounded-2xl border border-indigo-900/50 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {isZh ? '總課程完成度' : 'Overall Course Progress'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {isZh
                  ? `已完成 ${completedLessons.length} / ${totalLessons} 個章節考點`
                  : `Completed ${completedLessons.length} of ${totalLessons} syllabus topics`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-full sm:w-48 bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <span className="text-sm font-extrabold text-indigo-300 w-12 text-right notranslate" translate="no">
              {overallPercentage}%
            </span>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Module Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              {isZh ? '選擇模組' : 'Select Module'}
            </div>
            
            {EAA_COURSE_SYLLABUS.map((module: CourseModule) => {
              const moduleCompletedCount = module.lessons.filter((l) =>
                completedLessons.includes(l.id)
              ).length;
              const isSelected = activeModuleId === module.id;

              return (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModuleId(module.id);
                    setActiveLesson(module.lessons[0]);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/30 text-white shadow-lg'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700 notranslate" translate="no">
                      Module {module.moduleNumber}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {moduleCompletedCount} / {module.lessons.length}
                    </span>
                  </div>
                  <div className="text-xs font-bold leading-snug line-clamp-2 mt-1">
                    {module.title[locale]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Lesson View */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-1">
                <PlayCircle className="h-4 w-4" />
                <span>{isZh ? '目前學習章節' : 'Active Lesson'}</span>
              </div>
              <h2 className="text-base font-bold text-white mb-1">
                {activeLesson.title[locale]}
              </h2>
              {activeLesson.capReference && (
                <span className="inline-block text-xs text-amber-400 font-mono mb-2">
                  {activeLesson.capReference}
                </span>
              )}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {activeLesson.summary[locale]}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => toggleLessonCompletion(activeLesson.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                    completedLessons.includes(activeLesson.id)
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
                >
                  {completedLessons.includes(activeLesson.id) ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{isZh ? '已完成考點' : 'Completed'}</span>
                    </>
                  ) : (
                    <>
                      <Circle className="h-4 w-4" />
                      <span>{isZh ? '標示為已完成' : 'Mark as Completed'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleAskAiTutor(activeLesson.promptTopic)}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
                >
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                  <span>{isZh ? 'AI 導師解題' : 'Ask AI Tutor'}</span>
                </button>

                <Link
                  href="/quiz"
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-950/40 border border-indigo-800 px-3.5 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/60 transition"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>{isZh ? '前往模擬測驗' : 'Take Practice Quiz'}</span>
                </Link>
              </div>
            </div>

            {/* Lesson List within Module */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                {isZh ? '模組章節列表' : 'Module Lessons'}
              </div>

              {currentModule.lessons.map((lesson) => {
                const isCurrent = activeLesson.id === lesson.id;
                const isDone = completedLessons.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isCurrent
                        ? 'border-indigo-500 bg-indigo-950/20 text-white'
                        : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isDone ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-600 shrink-0" />
                      )}
                      <div>
                        <div className="text-xs font-bold">
                          {lesson.title[locale]}
                        </div>
                        {lesson.capReference && (
                          <div className="text-[10px] text-slate-500 font-mono">{lesson.capReference}</div>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}