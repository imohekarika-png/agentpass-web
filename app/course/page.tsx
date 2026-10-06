// app/course/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  EAA_COURSE_SYLLABUS, 
  CourseModule, 
  Lesson 
} from '@/app/data/courseSyllabus';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Globe, 
  Award, 
  FileText, 
  ChevronRight,
  BookMarked
} from 'lucide-react';

const PROGRESS_STORAGE_KEY = 'agentpass_course_completed_lessons_v1';

export default function CourseSyllabusPage() {
  const [locale, setLocale] = useState<'zh-HK' | 'en'>('zh-HK');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string>(EAA_COURSE_SYLLABUS[0].id);
  const [mounted, setMounted] = useState(false);

  const isZh = locale === 'zh-HK';

  // Load completed lessons from localStorage
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

  // Save progress changes
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(completedLessons));
    } catch (err) {
      console.error('Failed to save course progress:', err);
    }
  }, [completedLessons, mounted]);

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  // Dispatch custom event or open AI Tutor widget with pre-filled prompt
  const handleAskAiTutor = (promptTopic: string) => {
    // Open widget if available or trigger custom prompt event
    window.dispatchEvent(
      new CustomEvent('agentpass:ask-tutor', { detail: { prompt: promptTopic } })
    );

    // Fallback copy/alert if listener isn't configured
    if (navigator.clipboard) {
      navigator.clipboard.writeText(promptTopic);
    }
  };

  // Calculate overall syllabus completion
  const totalLessons = EAA_COURSE_SYLLABUS.reduce(
    (acc, mod) => acc + mod.lessons.length,
    0
  );
  const overallPercentage = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Course Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
              <BookMarked className="h-4 w-4" />
              <span>{isZh ? '香港地產代理牌照考試課程' : 'HK Estate Agency Licensing Course'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {isZh ? 'EAQE / SQE 證書考試課程大綱' : 'EAQE / SQE Exam Syllabus & Revision Guide'}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              {isZh
                ? '根據地產代理監管局 (EAA) 最新考試大綱及《地產代理條例》(第511章) 編製，支援一鍵 AI 導師深入解題。'
                : 'Structured according to EAA examination guidelines and Cap. 511 statutory requirements with instant AI Tutor assistance.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setLocale(isZh ? 'en' : 'zh-HK')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-500 transition"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{isZh ? 'English' : '繁體中文'}</span>
            </button>
          </div>
        </div>

        {/* Overall Completion Progress Banner */}
        <div className="rounded-2xl border border-indigo-900/50 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {isZh ? '課程完成進度' : 'Overall Course Progress'}
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
            <span className="text-sm font-extrabold text-indigo-300 w-12 text-right">
              {overallPercentage}%
            </span>
          </div>
        </div>

        {/* Course Modules Grid & Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Module Tabs (4 columns) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              {isZh ? '課程模組列表' : 'Course Modules'}
            </div>
            
            {EAA_COURSE_SYLLABUS.map((module: CourseModule) => {
              const moduleCompletedCount = module.lessons.filter((l) =>
                completedLessons.includes(l.id)
              ).length;
              const isSelected = activeModuleId === module.id;

              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModuleId(module.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/30 text-white shadow-lg'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
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

          {/* Right Active Module Lessons View (8 columns) */}
          <div className="lg:col-span-8 space-y-4">
            {EAA_COURSE_SYLLABUS.filter((m) => m.id === activeModuleId).map(
              (activeModule) => (
                <div key={activeModule.id} className="space-y-4">
                  {/* Active Module Header */}
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                    <h2 className="text-base font-bold text-white mb-1">
                      {activeModule.title[locale]}
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {activeModule.description[locale]}
                    </p>
                  </div>

                  {/* Lessons List */}
                  <div className="space-y-3">
                    {activeModule.lessons.map((lesson: Lesson) => {
                      const isDone = completedLessons.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            isDone
                              ? 'border-emerald-900/40 bg-emerald-950/10'
                              : 'border-slate-800 bg-slate-900'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-start gap-2.5">
                              <button
                                onClick={() => toggleLessonCompletion(lesson.id)}
                                title={isZh ? '標示為已完成' : 'Toggle Completion'}
                                className="mt-0.5 text-slate-500 hover:text-emerald-400 transition shrink-0"
                              >
                                {isDone ? (
                                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                ) : (
                                  <Circle className="h-5 w-5" />
                                )}
                              </button>
                              <div>
                                <h3
                                  className={`text-xs sm:text-sm font-bold leading-snug ${
                                    isDone ? 'line-through text-slate-400' : 'text-slate-100'
                                  }`}
                                >
                                  {lesson.title[locale]}
                                </h3>
                                {lesson.capReference && (
                                  <span className="inline-block text-[10px] text-indigo-400 font-mono mt-0.5">
                                    {lesson.capReference}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed pl-7 mb-4">
                            {lesson.summary[locale]}
                          </p>

                          {/* Action Buttons */}
                          <div className="pl-7 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
                            <button
                              onClick={() => handleAskAiTutor(lesson.promptTopic)}
                              className="flex items-center gap-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition"
                            >
                              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                              <span>{isZh ? 'AI 導師深入解題' : 'Ask AI Tutor to Explain'}</span>
                            </button>

                            <button
                              onClick={() => toggleLessonCompletion(lesson.id)}
                              className="text-xs text-slate-400 hover:text-slate-200 transition px-2 py-1"
                            >
                              {isDone
                                ? (isZh ? '標示為未完成' : 'Mark Incomplete')
                                : (isZh ? '完成此章節' : 'Mark Complete')}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>

        </div>

      </div>
    </div>
  );
}