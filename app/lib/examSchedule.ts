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
  return new Date(`${dateStr}T${endOfDay ? '23:59:59' : '00:00:00'}+08:00`);
}

export function daysUntil(targetDateStr: string, now = new Date(), endOfDay = false): number {
  const target = parseHK(targetDateStr, endOfDay);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

export function getNextExam(track: ExamTrack, now = new Date()): EAAExam | null {
  const todayStart = parseHK(now.toISOString().slice(0, 10));
  const upcoming = EAA_EXAMS.filter(
    (e) => e.track === track && parseHK(e.examDate).getTime() >= todayStart.getTime()
  ).sort((a, b) => a.examDate.localeCompare(b.examDate));
  return upcoming[0] ?? null;
}

export function isValidEAAExamDate(dateStr: string, track?: ExamTrack): boolean {
  const found = getExamByDate(dateStr);
  if (!found) return false;
  if (track && found.track !== track) return false;
  return true;
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

export interface ExamCountdown {
  exam: EAAExam | null;
  examDateStr: string;
  daysToExam: number;
  daysToReg: number;
  daysToRegPost: number;
  isRegClosed: boolean;
  isRegPostClosed: boolean;
  isExamToday: boolean;
  hasNextExam: boolean;
}

export function useExamCountdown(track: ExamTrack): ExamCountdown {
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

      try {
        const savedDate = localStorage.getItem('agentpass_exam_date');
        const savedTrack = (localStorage.getItem('agentpass_selected_track') || '').toUpperCase();
        if (savedDate) {
          const savedExam = getExamByDate(savedDate);
          const isValidForTrack = !!savedExam && savedExam.track === track;
          const isFuture = parseHK(savedDate).getTime() >= parseHK(now.toISOString().slice(0, 10)).getTime();
          if (isValidForTrack && isFuture && (savedTrack === track || !savedTrack)) {
            chosen = savedExam;
          } else if (!savedExam) {
            localStorage.removeItem('agentpass_exam_date');
          } else if (!isFuture) {
            localStorage.removeItem('agentpass_exam_date');
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
    const timer = setInterval(calc, 60 * 60 * 1000);
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'agentpass_exam_date' || e.key === 'agentpass_selected_track') calc();
    };
    const onSync = () => calc();
    window.addEventListener('storage', onStorage);
    window.addEventListener('agentpass_auth_change', onSync);
    window.addEventListener('agentpass_exam_date_change', onSync);
    return () => {
      clearInterval(timer);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('agentpass_auth_change', onSync);
      window.removeEventListener('agentpass_exam_date_change', onSync);
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