// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  BrainCircuit, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface ReviewItem {
  id: string;
  topicZh: string;
  topicEn: string;
  intervalDay: number;
  dueDate: string;
  status: 'due' | 'upcoming' | 'completed';
}

export default function DashboardPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'r1',
      topicZh: 'Cap. 511 牌照條例與營業地址申報 (30天規則)',
      topicEn: 'Cap. 511 Licensing & Business Address Rules',
      intervalDay: 1,
      dueDate: 'Today',
      status: 'due'
    },
    {
      id: 'r2',
      topicZh: '屋宇署 s.24 違例建築物清拆令 (UBW)',
      topicEn: 'Buildings Ordinance s.24 Demolition Orders',
      intervalDay: 3,
      dueDate: 'Tomorrow',
      status: 'upcoming'
    },
    {
      id: 'r3',
      topicZh: 'Cap. 7 租務條例與無保障租務解約程序',
      topicEn: 'Cap. 7 Landlord & Tenant Ordinance Terminations',
      intervalDay: 7,
      dueDate: 'In 4 Days',
      status: 'upcoming'
    },
    {
      id: 'r4',
      topicZh: '表格 3 至 表格 6 (Form 3-6) 必填佣金條款',
      topicEn: 'Form 3-6 Mandatory Commission Terms',
      intervalDay: 16,
      dueDate: 'In 12 Days',
      status: 'upcoming'
    }
  ]);

  const markComplete = (id: string) => {
    setReviews(prev => prev.map(item => item.id === id ? { ...item, status: 'completed' } : item));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-300 mb-2">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{isZh ? '1-3-7-16-35 間隔重複溫習儀表板' : 'Ebbinghaus Spaced Review Dashboard'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {isZh ? '個人學員溫習進度與復習階梯' : 'Personal Study & Review Progress'}
            </h1>
          </div>

          <Link
            href="/mock-exam"
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Award className="h-4 w-4" />
            <span>{isZh ? '進入全真模擬考場' : 'Take Timed Mock Exam'}</span>
          </Link>
        </div>

        {/* Ebbinghaus Review Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-400" />
              <span>{isZh ? '今日待複習記憶卡片 (Spaced Review Queue)' : 'Today\'s Spaced Review Queue'}</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {reviews.filter(r => r.status === 'due').length} {isZh ? '項待複習' : 'Pending'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((item) => (
              <div 
                key={item.id}
                className={`p-5 rounded-2xl border transition space-y-3 ${
                  item.status === 'completed'
                    ? 'bg-slate-950/40 border-slate-800 opacity-60'
                    : item.status === 'due'
                    ? 'bg-indigo-950/20 border-indigo-500/40'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                    Day {item.intervalDay} Review
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{item.dueDate}</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">
                  {isZh ? item.topicZh : item.topicEn}
                </h3>

                {item.status !== 'completed' ? (
                  <button
                    onClick={() => markComplete(item.id)}
                    className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-emerald-950 border border-slate-800 hover:border-emerald-500 text-xs font-bold text-slate-300 hover:text-emerald-300 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{isZh ? '標記為已複習' : 'Mark Reviewed'}</span>
                  </button>
                ) : (
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isZh ? '已完成記憶強化' : 'Memory Reinforced'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}