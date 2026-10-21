// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Award, 
  ArrowRight
} from 'lucide-react';

interface ReviewItem {
  id: string;
  blockNum: string;
  titleZh: string;
  titleEn: string;
  lastReviewed: string;
  nextReviewDate: string;
  ladderStage: 'Day 1' | 'Day 3' | 'Day 7' | 'Day 16' | 'Day 35';
  accuracy: number;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'b1',
    blockNum: 'Block 01',
    titleZh: 'EAA 架構與持牌資格',
    titleEn: 'EAA Structure & Licensing Qualifications',
    lastReviewed: '2026-10-12',
    nextReviewDate: '2026-10-15',
    ladderStage: 'Day 3',
    accuracy: 85
  },
  {
    id: 'b4',
    blockNum: 'Block 04',
    titleZh: '客戶存款 (Client Money) 託管與獨立信託帳戶',
    titleEn: 'Client Money Custody & Trust Accounts',
    lastReviewed: '2026-10-13',
    nextReviewDate: '2026-10-14',
    ladderStage: 'Day 1',
    accuracy: 60
  },
  {
    id: 'b16',
    blockNum: 'Block 16',
    titleZh: '業主與租客 (綜合) 條例 Cap. 7',
    titleEn: 'Landlord & Tenant Ordinance Cap. 7',
    lastReviewed: '2026-10-07',
    nextReviewDate: '2026-10-14',
    ladderStage: 'Day 7',
    accuracy: 50
  }
];

export default function DashboardPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
  const [selectedTrack, setSelectedTrack] = useState<string>('sqe');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTrack = localStorage.getItem('agentpass_selected_track');
      if (savedTrack) setSelectedTrack(savedTrack);

      try {
        const syncedSRSQueue = JSON.parse(
          localStorage.getItem('agentpass_srs_queue_v1') || '[]'
        );
        if (Array.isArray(syncedSRSQueue) && syncedSRSQueue.length > 0) {
          setReviews(syncedSRSQueue);
        }
      } catch (e) {
        console.warn('Failed to load dynamic SRS Queue:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header Banner */}
        <div 
          className="p-8 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
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

        {/* Performance Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="p-6 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-lg space-y-2"
          >
            <span className="text-xs font-mono font-bold uppercase text-slate-500 block">Active Track</span>
            <span className="text-xl font-black text-indigo-600">
              {selectedTrack.toUpperCase()} {selectedTrack === 'sqe' ? '(16 Blocks)' : '(20 Blocks)'}
            </span>
          </div>

          <div 
            className="p-6 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-lg space-y-2"
          >
            <span className="text-xs font-mono font-bold uppercase text-slate-500 block">Due Today for Review</span>
            <span className="text-xl font-black text-amber-600">{reviews.length} Topic Blocks</span>
          </div>

          <div 
            className="p-6 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-lg space-y-2"
          >
            <span className="text-xs font-mono font-bold uppercase text-slate-500 block">Overall Mastery Level</span>
            <span className="text-xl font-black text-emerald-600">68% Pass Confidence</span>
          </div>
        </div>

        {/* Spaced Repetition Review Table */}
        <div 
          className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-xl space-y-6"
        >
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
                /* Clean White Card Background + Soft Slate Border */
                className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs transition-all hover:border-slate-300"
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

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold block text-emerald-700">{item.accuracy}% Accuracy</span>
                    <span className="text-[10px] text-slate-500">Next: {item.nextReviewDate}</span>
                  </div>

                  {/* Vibrant Blue Button (bg-blue-600) with Strict White Text (!text-white) */}
                  <Link
                    href={`/quiz?block=${item.id}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="!text-white">{isZh ? '立即複習' : 'Review Now'}</span>
                    <ArrowRight className="h-3.5 w-3.5 !text-white" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}