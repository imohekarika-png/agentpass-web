// app/api/schedule/route.ts
import { NextResponse } from 'next/server';

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

// Normalized Official EAA / HKEAA Yearly Exam Schedule Dataset
const OFFICIAL_EXAM_SCHEDULE: ExamScheduleItem[] = [
  {
    id: 'eaqe-2026-q4',
    track: 'EAQE',
    examCode: 'EAQE-2026-11',
    examDate: '2026-11-18',
    registrationStart: '2026-09-01',
    registrationEnd: '2026-09-25',
    timeSlot: '09:30 - 12:30 HKT',
    venue: 'HKEAA San Po Kong Assessment Centre',
    isAvailableForBooking: true
  },
  {
    id: 'sqe-2026-q4-a',
    track: 'SQE',
    examCode: 'SQE-2026-11A',
    examDate: '2026-11-25',
    registrationStart: '2026-09-10',
    registrationEnd: '2026-10-05',
    timeSlot: '14:30 - 17:00 HKT',
    venue: 'HKEAA Lai King Assessment Centre',
    isAvailableForBooking: true
  },
  {
    id: 'sqe-2026-q4-b',
    track: 'SQE',
    examCode: 'SQE-2026-12',
    examDate: '2026-12-10',
    registrationStart: '2026-10-01',
    registrationEnd: '2026-10-25',
    timeSlot: '09:30 - 12:00 HKT',
    venue: 'HKEAA Wan Chai Assessment Centre',
    isAvailableForBooking: true
  },
  {
    id: 'eaqe-2027-q1',
    track: 'EAQE',
    examCode: 'EAQE-2027-02',
    examDate: '2027-02-20',
    registrationStart: '2026-12-01',
    registrationEnd: '2026-12-20',
    timeSlot: '09:30 - 12:30 HKT',
    venue: 'HKEAA San Po Kong Assessment Centre',
    isAvailableForBooking: true
  }
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const trackFilter = searchParams.get('track')?.toUpperCase();

    let schedule = OFFICIAL_EXAM_SCHEDULE;

    if (trackFilter === 'EAQE' || trackFilter === 'SQE') {
      schedule = schedule.filter((item) => item.track === trackFilter);
    }

    return NextResponse.json({
      success: true,
      updatedAt: new Date().toISOString(),
      schedule
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch exam schedule' },
      { status: 500 }
    );
  }
}