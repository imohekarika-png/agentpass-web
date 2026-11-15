
// app/api/schedule/route.ts
// Makes /api/schedule return the SAME EAA_EXAMS list as the frontend.
// This fixes the root cause: API was returning SQE 2026-11-25 / 2026-12-10 (HKEAA-style dates),
// which are NOT EAA SQE dates. Now API + frontend share one source.
import { NextResponse } from 'next/server';
import { EAA_EXAMS } from '@/app/lib/examSchedule';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const track = searchParams.get('track') as 'EAQE' | 'SQE' | null;

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  const schedule = EAA_EXAMS.filter((e) => !track || e.track === track)
    .filter((e) => e.examDate >= todayStr)
    .sort((a, b) => a.examDate.localeCompare(b.examDate))
    .map((e) => ({
      id: e.sessionCode,
      track: e.track,
      examCode: e.sessionCode,
      examDate: e.examDate,
      registrationStart: e.regStart,
      registrationEnd: e.regOnline,
      timeSlot: e.examTime,
      venue: e.format,
      isAvailableForBooking: e.regOnline >= todayStr,
    }));

  return NextResponse.json({ schedule, source: 'EAA / PEAK official timetable', updated: '2026-11-16' });
}

