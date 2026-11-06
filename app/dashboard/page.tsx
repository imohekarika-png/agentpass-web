// app/dashboard/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ExamTrackerCTA from '@/app/components/ExamTrackerCTA';
import OfficialScheduleFetcher from '@/app/components/OfficialScheduleFetcher';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Award, 
  ArrowRight
} from 'lucide-react';

interface ReviewItem {
  id: string;
  blockNum: string;
  blockId?: string;
  titleZh: string;
  titleEn: string;
  lastReviewed: string;
  nextReviewDate: string;
  ladderStage: 'Day 1' | 'Day 3' | 'Day 7' | 'Day 16' | 'Day 35';
  accuracy: number;
}

export default function DashboardPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const { userEmail } = useAuth();

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<string>('sqe');
  const [isMounted, setIsMounted] = useState(false);

  // Load reviews scoped specifically to the current user email
  const loadUserProgress = useCallback(() => {
    if (typeof window === 'undefined') return;

    const savedTrack = localStorage.getItem('agentpass_selected_track');
    if (savedTrack) setSelectedTrack(savedTrack);

    const storageKey = userEmail && userEmail !== 'guest@agentpass.hk'
      ? `agentpass_srs_${encodeURIComponent(userEmail.toLowerCase().trim())}`
      : 'agentpass_srs_guest';

    try {
      const rawData = localStorage.getItem(storageKey);
      if (rawData) {
        const syncedSRSQueue = JSON.parse(rawData);
        if (Array.isArray(syncedSRSQueue)) {
          setReviews(syncedSRSQueue);
          return;
        }
      }
      // For any clean account or new user with no attempts, start at 0
      setReviews([]);
    } catch (e) {
      console.warn('Failed to load user SRS Queue:', e);
      setReviews([]);
    }
  }, [userEmail]);

  useEffect(() => {
    setIsMounted(true);
    loadUserProgress();

    // Listen to real-time auth changes across tabs or logout
    const handleAuthEvent = () => loadUserProgress();
    window.addEventListener('agentpass_auth_change', handleAuthEvent);
    return () => window.removeEventListener('agentpass_auth_change', handleAuthEvent);
  }, [loadUserProgress]);

  const handleSelectOfficialDate = (fetchedDate: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('agentpass_exam_date', fetchedDate);
    }
  };

  // Maps any legacy format ('q-1', 'Block 01', 'b1') to a valid block route
  const getReviewHref = (item: ReviewItem) => {
    if (item.blockNum) {
      const digits = item.blockNum.replace(/\D/g, '');
      if (digits) {
        return `/quiz?block=b${parseInt(digits, 10)}`;
      }
    }

    if (item.blockId && item.blockId.startsWith('b')) {
      return `/quiz?block=${item.blockId}`;
    }

    if (item.id && item.id.startsWith('b')) {
      return `/quiz?block=${item.id}`;
    }

    if (item.id && item.id.startsWith('q')) {
      const digits = item.id.replace(/\D/g, '');
      if (digits) {
        return `/quiz?block=b${parseInt(digits, 10)}`;
      }
    }

    return '/quiz';
  };

  // Calculate dynamic accuracy and confidence based on actual attempts
  const averageAccuracy = reviews.length > 0
    ? Math.round(reviews.reduce((sum, item) => sum + (item.accuracy || 0), 0) / reviews.length)
    : 0;

  if (!isMounted) return null;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header Banner */}
        <div className="p-8 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Spaced Repetition Engine (1-3-7-16-35 Ladder)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              {isZh ? '學員溫習儀表板與記憶階梯' : 'Student Review Dashboard'}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-2xl">
              {isZh ? '根據艾賓浩斯記憶曲線自動推算最佳複習時間點，精準消滅弱點單元。' : 'Automated spaced repetition review schedules tracking weak blocks.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/mock-exam"
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
            >
              <Award className="h-4 w-4" />
              <span>{isZh ? '進入全真模擬考' : 'Full Mock Exam'}</span>
            </Link>
          </div>
        </div>

        {/* Live Schedule Sync */}
        <OfficialScheduleFetcher
          track={selectedTrack.toUpperCase() as 'EAQE' | 'SQE'}
          isZh={isZh}
          onSelectDate={handleSelectOfficialDate}
        />

        {/* Calendar & Reminder CTAs */}
        <ExamTrackerCTA
          isZh={isZh}
          trackName={selectedTrack.toUpperCase() as 'EAQE' | 'SQE'}
        />

        {/* Performance Overview Grid with Dynamic Resetting Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm space-y-2 hover:shadow-md transition">
            <span className="text-xs font-mono font-bold uppercase text-slate-500 block">Active Track</span>
            <span className="text-xl font-black text-indigo-600">
              {selectedTrack.toUpperCase()} {selectedTrack === 'sqe' ? '(16 Blocks)' : '(20 Blocks)'}
            </span>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm space-y-2 hover:shadow-md transition">
            <span className="text-xs font-mono font-bold uppercase text-slate-500 block">Due Today for Review</span>
            <span className="text-xl font-black text-amber-600">{reviews.length} Topic Blocks</span>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm space-y-2 hover:shadow-md transition">
            <span className="text-xs font-mono font-bold uppercase text-slate-500 block">Overall Mastery Level</span>
            <div className="flex items-baseline justify-between">
              <span className={`text-xl font-black ${reviews.length > 0 ? 'text-emerald-600' : 'text-slate-500'}`}>
                {reviews.length > 0 ? `${averageAccuracy}% Pass Confidence` : (isZh ? '0% 尚未應考' : '0% Not Started')}
              </span>
            </div>
            {/* Visual Dynamic Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full" 
                style={{ width: `${reviews.length > 0 ? averageAccuracy : 0}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Spaced Repetition Review Table */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-base font-extrabold text-slate-900">
              <Calendar className="h-5 w-5 text-amber-500" />
              <span>{isZh ? '今日待溫習單元 (Due for Spaced Review)' : 'Today\'s Spaced Repetition Queue'}</span>
            </div>
            <span className="text-xs font-mono text-slate-500">Ladder: 1 - 3 - 7 - 16 - 35 Days</span>
          </div>

          <div className="space-y-3">
            {reviews.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 border border-indigo-200 text-[10px] font-mono font-bold text-indigo-700">
                      {item.blockNum}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-[10px] font-mono font-bold text-amber-800">
                      {item.ladderStage}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isZh ? item.titleZh : item.titleEn}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0 mt-2 sm:mt-0">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold block text-emerald-700">{item.accuracy}% Accuracy</span>
                    <span className="text-[10px] text-slate-500">Next: {item.nextReviewDate}</span>
                  </div>

                  <Link
                    href={getReviewHref(item)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="!text-white">{isZh ? '立即複習' : 'Review Now'}</span>
                    <ArrowRight className="h-3.5 w-3.5 !text-white" />
                  </Link>
                </div>
              </div>
            ))}
            
            {reviews.length === 0 && (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-sm font-bold text-slate-700">{isZh ? '今日無需溫習！' : 'You are all caught up for today!'}</p>
                <p className="text-xs text-slate-500 mt-1">{isZh ? '前往模擬試場挑戰新試題，即可建立個人專屬的 1-3-7-16-35 記憶階梯。' : 'Take a mock exam to record your personal mistake queue and build your ladder.'}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}