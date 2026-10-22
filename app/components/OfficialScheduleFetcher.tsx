// app/components/OfficialScheduleFetcher.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, RefreshCw, CheckCircle2 } from 'lucide-react';

export interface ExamScheduleItem {
  id: string;
  track: 'EAQE' | 'SQE';
  examCode: string;
  examDate: string; // ISO Format YYYY-MM-DD
  registrationStart: string;
  registrationEnd: string;
  timeSlot: string;
  venue: string;
  isAvailableForBooking: boolean;
}

interface OfficialScheduleFetcherProps {
  track: 'EAQE' | 'SQE';
  isZh: boolean;
  onSelectDate: (examDate: string) => void;
}

export default function OfficialScheduleFetcher({
  track,
  isZh,
  onSelectDate
}: OfficialScheduleFetcherProps) {
  const [schedules, setSchedules] = useState<ExamScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedExamId, setSelectedExamId] = useState<string>('');

  useEffect(() => {
    async function fetchOfficialSchedule() {
      setLoading(true);
      try {
        const res = await fetch(`/api/schedule?track=${track}`);
        if (res.ok) {
          const data = await res.json();
          if (data.schedule && data.schedule.length > 0) {
            setSchedules(data.schedule);
            // Auto-select nearest upcoming date
            const defaultExam = data.schedule[0];
            setSelectedExamId(defaultExam.id);
            onSelectDate(defaultExam.examDate);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch live schedule:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOfficialSchedule();
  }, [track, onSelectDate]);

  return (
    <div className="p-4 rounded-2xl bg-white border border-blue-200 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-900">
            {isZh ? '官方 HKEAA/EAA 考期自動追蹤' : 'Official HKEAA Schedule Sync'}
          </span>
        </div>
        {loading && <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-600" />}
      </div>

      <div className="space-y-2">
        {schedules.map((item) => {
          const isSelected = item.id === selectedExamId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedExamId(item.id);
                onSelectDate(item.examDate);
              }}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between text-xs font-bold cursor-pointer ${
                isSelected
                  ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300'
              }`}
            >
              <div>
                <div className="font-extrabold text-slate-900">
                  {item.examCode} ({item.examDate})
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {item.timeSlot} • {item.venue}
                </div>
              </div>
              {isSelected && <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}