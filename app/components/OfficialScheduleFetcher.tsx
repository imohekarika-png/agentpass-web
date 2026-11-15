
// app/components/OfficialScheduleFetcher.tsx
// EAA PRIMARY - FIXED 16 Nov 2026
// BUG FOUND: /api/schedule was returning SQE 2026-11-25 and SQE 2026-12-10, which are NOT in the
// EAA official timetable. Real SQE dates: 17 Nov 2026, 25 Jan 2027, 26 Feb 2027.
// Old code trusted /api/schedule blindly and counted to 25 Nov (9 days) instead of 17 Nov (1 day).
// New code: EAA_EXAMS is source of truth. API is only used if its dates exactly match EAA_EXAMS.
'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, RefreshCw, CheckCircle2 } from 'lucide-react';
import { EAA_EXAMS, daysUntil, isValidEAAExamDate } from '@/app/lib/examSchedule';

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

function toScheduleItem(e: (typeof EAA_EXAMS)[number]): ExamScheduleItem {
  return {
    id: e.sessionCode,
    track: e.track,
    examCode: e.sessionCode,
    examDate: e.examDate,
    registrationStart: e.regStart,
    registrationEnd: e.regOnline,
    timeSlot: e.examTime,
    venue: e.format,
    isAvailableForBooking: daysUntil(e.regOnline, new Date(), true) > 0,
  };
}

export default function OfficialScheduleFetcher({
  track,
  isZh,
  onSelectDate
}: OfficialScheduleFetcherProps) {
  // Start with EAA list immediately - never blank, never wrong
  const eaaSchedules: ExamScheduleItem[] = EAA_EXAMS.filter((e) => e.track === track)
    .filter((e) => daysUntil(e.examDate) >= 0)
    .sort((a, b) => a.examDate.localeCompare(b.examDate))
    .map(toScheduleItem);

  const [schedules, setSchedules] = useState<ExamScheduleItem[]>(eaaSchedules);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedExamId, setSelectedExamId] = useState<string>(eaaSchedules[0]?.id ?? '');
  const [apiMismatch, setApiMismatch] = useState<boolean>(false);

  useEffect(() => {
    // Select nearest upcoming EAA exam on mount / track change
    if (eaaSchedules.length > 0) {
      setSchedules(eaaSchedules);
      setSelectedExamId(eaaSchedules[0].id);
      onSelectDate(eaaSchedules[0].examDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  useEffect(() => {
    // Background check: try /api/schedule, but ONLY use it if it matches EAA_EXAMS.
    // If API returns 2026-11-25 / 2026-12-10 for SQE, ignore it - those are not EAA dates.
    async function checkApi() {
      setLoading(true);
      try {
        const res = await fetch(`/api/schedule?track=${track}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!data.schedule || data.schedule.length === 0) return;
        const apiDates: string[] = data.schedule.map((s: ExamScheduleItem) => s.examDate);
        const allValid = apiDates.every((d) => isValidEAAExamDate(d, track));
        if (!allValid) {
          console.warn(`[OfficialScheduleFetcher] /api/schedule returned non-EAA dates for ${track}:`, apiDates, '- ignoring API, using EAA_EXAMS.');
          setApiMismatch(true);
          return;
        }
        // API matches EAA - safe to use (sorted, upcoming only)
        const sorted = [...data.schedule].sort((a: ExamScheduleItem, b: ExamScheduleItem) =>
          a.examDate.localeCompare(b.examDate)
        );
        const upcoming = sorted.filter((s: ExamScheduleItem) => daysUntil(s.examDate) >= 0);
        const list = upcoming.length > 0 ? upcoming : sorted;
        setSchedules(list);
        setSelectedExamId(list[0].id);
        onSelectDate(list[0].examDate);
      } catch (err) {
        console.warn('Failed to fetch live schedule, using EAA fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    checkApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  return (
    <div className="p-4 rounded-2xl bg-white border border-blue-200 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-900">
            {isZh ? '官方 EAA 考期 • 已同步' : 'Official EAA Schedule Sync'}
          </span>
        </div>
        {loading && <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-600" />}
      </div>
      {apiMismatch && (
        <p className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1">
          {isZh ? 'API 考期與 EAA 官方時間表不符，已改用 EAA 官方時間表。' : 'API schedule did not match EAA official timetable - using EAA official dates.'}
        </p>
      )}

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
                  {item.timeSlot} • {item.venue} • {isZh ? `報名截止 ${item.registrationEnd}` : `Reg closes ${item.registrationEnd}`}
                </div>
              </div>
              {isSelected && <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-slate-400">
        {isZh ? '來源：EAA / PEAK 官方時間表' : 'Source: EAA / PEAK official timetable'}
      </p>
    </div>
  );
}

