// app/lib/examSchedule.ts
// SINGLE SOURCE OF TRUTH for all EAA exam countdowns
// Used by: homepage banner, /eaqe-dec-15, /sqe-next, dashboard OfficialScheduleFetcher + ExamTrackerCTA
// Source: EAA / PEAK official timetable - https://www.eaa.org.hk/en-us/Examination/Registration-details-post-registration-matters
// Last synced from EAA: 16 Nov 2026. When EAA announces new sittings, add one row here - every countdown auto-rolls.
'use client';

import { useState, useEffect } from 'react';

export type ExamTrack = 'EAQE' | 'SQE';

export interface EAAExam {
  track: ExamTrack;
  sessionCode: string;
  examDate: string; // YYYY-MM-DD
  examTime: string;
  format: string;
  regStart: string; // YYYY-MM-DD
  regPost: string; // YYYY-MM-DD - by post deadline
  regOnline: string; // YYYY-MM-DD - online deadline (final deadline)
  fee: number;
}

export const EAA_EXAMS: EAAExam[] = [
  {
    track: 'SQE',
    sessionCode: 'P72171126',
    examDate: '2026-11-17',
    examTime: '2:30 pm - 5:00 pm',
    format: 'Paper-based',
    regStart: '2026-10-13',
    regPost: '2026-10-27',
    regOnline: '2026-11-03',
    fee: 650,
  },
  {
    track: 'EAQE',
    sessionCode: 'P71151226',
    examDate: '2026-12-15',
    examTime: '2:30 pm - 5:30 pm',
    format: 'Paper-based',
    regStart: '2026-11-10',
    regPost: '2026-11-24',
    regOnline: '2026-12-01',
    fee: 900,
  },
  {
    track: 'SQE',
    sessionCode: 'P72250127',
    examDate: '2027-01-25',
    examTime: '2:30 pm - 5:00 pm',
    format: 'Paper-based',
    regStart: '2026-12-21',
    regPost: '2027-01-04',
    regOnline: '2027-01-11',
    fee: 650,
  },
  {
    track: 'SQE',
    sessionCode: 'P72260227',
    examDate: '2027-02-26',
    examTime: '2:30 pm - 5:00 pm',
    format: 'Paper-based',
    regStart: '2027-01-22',
    regPost: '2027-02-05',
    regOnline: '2027-02-12',
    fee: 650,
  },
  {
    track: 'EAQE',
    sessionCode: 'P71180327',
    examDate: '2027-03-18',
    examTime: '2:30 pm - 5:30 pm',
    format: 'Paper-based',
    regStart: '2027-02-11',
    regPost: '2027-02-25',
    regOnline: '2027-03-04',
    fee: 900,
  },
];

// --- Pure helpers (no React, safe to use in Server Components too) ---

function parseHK(dateStr: string, endOfDay = false): Date {
  // Force HK timezone so countdown is same in HK regardless of visitor timezone
  return new Date(`${dateStr}T${endOfDay ? '23:59:59' : '00:00:00'}+08:00`);
}

export function daysUntil(targetDateStr: string, now = new Date(), endOfDay = false): number {
  const target = parseHK(targetDateStr, endOfDay);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

export function getNextExam(track: ExamTrack, now = new Date()): EAAExam | null {
  // First exam on/after today for this track. Auto-rolls: after 15 Dec, EAQE -> 18 Mar 2027.
  const todayStart = parseHK(now.toISOString().slice(0, 10));
  const upcoming = EAA_EXAMS.filter(
    (e) => e.track === track && parseHK(e.examDate).getTime() >= todayStart.getTime()
  ).sort((a, b) => a.examDate.localeCompare(b.examDate));
  return upcoming[0] ?? null;
}

export function getExamByDate(dateStr: string): EAAExam | undefined {
  return EAA_EXAMS.find((e) => e.examDate === dateStr);
}

export function formatExamDate(dateStr: string, isZh: boolean): string {
  const d = parseHK(dateStr);
  if (isZh) return `${d.getMonth() + 1}月${d.getDate()}日`;
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

// --- Hook: shared countdown engine ---
// Mirrors dashboard behaviour: if user picked a date in dashboard (OfficialScheduleFetcher
// saves it to localStorage 'agentpass_exam_date'), honour that date. Otherwise fall back to
// the next official exam for the requested track. This is what makes homepage + dashboard
// stay in sync - they read the same keys + same EAA_EXAMS list.

export interface ExamCountdown {
  exam: EAAExam | null;
  examDateStr: string;
  daysToExam: number;
  daysToReg: number; // days to online deadline (final)
  daysToRegPost: number;
  isRegClosed: boolean;
  isRegPostClosed: boolean;
  isExamToday: boolean;
  hasNextExam: boolean;
}

export function useExamCountdown(track: ExamTrack): ExamCountdown {
  // Initial fallback = next official exam at build time (avoids hydration mismatch)
  const fallback = getNextExam(track) ?? EAA_EXAMS.find((e) => e.track === track) ?? null;

  const [exam, setExam] = useState<EAAExam | null>(fallback);
  const [daysToExam, setDaysToExam] = useState(() =>
    fallback ? daysUntil(fallback.examDate) : 0
  );
  const [daysToReg, setDaysToReg] = useState(() =>
    fallback ? daysUntil(fallback.regOnline, new Date(), true) : 0
  );
  const [daysToRegPost, setDaysToRegPost] = useState(() =>
    fallback ? daysUntil(fallback.regPost, new Date(), true) : 0
  );

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      let chosen: EAAExam | null = getNextExam(track, now);

      // Honour dashboard-picked date if it is still in the future and matches this track
      // Dashboard keys: 'agentpass_exam_date' + 'agentpass_selected_track' - see dashboard/page.tsx
      try {
        const savedDate = localStorage.getItem('agentpass_exam_date');
        const savedTrack = (localStorage.getItem('agentpass_selected_track') || '').toUpperCase();
        if (savedDate && (savedTrack === track || !savedTrack)) {
          const savedExam = getExamByDate(savedDate);
          if (savedExam && savedExam.track === track) {
            // Only use saved date if it hasn't passed - otherwise fall through to next official
            if (parseHK(savedDate).getTime() >= parseHK(now.toISOString().slice(0, 10)).getTime()) {
              chosen = savedExam;
            }
          } else if (savedDate) {
            // Custom / future date not in EAA_EXAMS yet - treat as ad-hoc exam, keep official deadlines
            // by falling back to official next exam for reg dates, but exam countdown uses saved date
            // For safety, keep official chosen for reg deadlines and override exam date below
            if (parseHK(savedDate).getTime() >= parseHK(now.toISOString().slice(0, 10)).getTime()) {
              const adHoc: EAAExam = chosen ?? {
                track,
                sessionCode: 'CUSTOM',
                examDate: savedDate,
                examTime: '2:30 pm',
                format: 'Paper-based',
                regStart: savedDate,
                regPost: savedDate,
                regOnline: savedDate,
                fee: 0,
              };
              // If saved date is different from official, use it as exam date
              if (chosen && chosen.examDate !== savedDate) {
                chosen = { ...adHoc, regPost: chosen.regPost, regOnline: chosen.regOnline };
              }
            }
          }
        }
      } catch {}

      setExam(chosen);
      if (chosen) {
        setDaysToExam(daysUntil(chosen.examDate, now));
        setDaysToReg(daysUntil(chosen.regOnline, now, true));
        setDaysToRegPost(daysUntil(chosen.regPost, now, true));
      }
    };

    calc();
    const timer = setInterval(calc, 60 * 60 * 1000); // re-check hourly
    // Re-sync if dashboard changes exam date in another tab
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'agentpass_exam_date' || e.key === 'agentpass_selected_track') calc();
    };
    const onAuth = () => calc();
    window.addEventListener('storage', onStorage);
    window.addEventListener('agentpass_auth_change', onAuth);
    return () => {
      clearInterval(timer);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('agentpass_auth_change', onAuth);
    };
  }, [track]);

  return {
    exam,
    examDateStr: exam?.examDate ?? '',
    daysToExam,
    daysToReg,
    daysToRegPost,
    isRegClosed: daysToReg <= 0,
    isRegPostClosed: daysToRegPost <= 0,
    isExamToday: daysToExam === 0,
    hasNextExam: !!exam,
  };
}