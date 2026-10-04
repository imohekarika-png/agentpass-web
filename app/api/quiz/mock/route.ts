// app/api/quiz/mock/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const examType = (searchParams.get('type') || 'SQE').toUpperCase();

    // Official EAA Parameters
    const questionLimit = examType === 'EAQE' ? 50 : 40;
    const durationMinutes = examType === 'EAQE' ? 180 : 150;

    // Fetch random set of questions from Supabase
    const { data: questions, error } = await supabase
      .from('questions')
      .select('*')
      .limit(questionLimit);

    if (error) throw new Error(error.message);

    // Shuffle array helper for authentic randomized exam layout
    const shuffled = (questions || []).sort(() => 0.5 - Math.random());

    return NextResponse.json({
      success: true,
      examType,
      durationMinutes,
      totalQuestions: shuffled.length,
      questions: shuffled
    });

  } catch (error: any) {
    console.error('Error starting mock exam:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}