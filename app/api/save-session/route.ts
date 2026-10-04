// app/api/save-session/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: Request) {
  try {
    const { totalQuestions, correctCount, userAnswers } = await req.json();

    if (!totalQuestions || correctCount === undefined || !userAnswers) {
      return NextResponse.json(
        { error: 'Missing session payload parameters.' },
        { status: 400 }
      );
    }

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    // 1. Insert Quiz Session
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .insert({
        total_questions: totalQuestions,
        correct_count: correctCount,
        score_percentage: scorePercentage,
      })
      .select('id')
      .single();

    if (sessionError || !session) {
      throw new Error(sessionError?.message || 'Failed to record session.');
    }

    // 2. Insert Itemized Answers for Weakness Analysis
    const answerRecords = userAnswers.map((ans: any) => ({
      session_id: session.id,
      question_id: ans.questionId,
      ordinance_tag: ans.ordinanceTag || 'Cap. 511',
      user_choice: ans.userChoice,
      is_correct: ans.isCorrect,
    }));

    const { error: answersError } = await supabase
      .from('user_answers')
      .insert(answerRecords);

    if (answersError) {
      console.error('Error recording user answers:', answersError.message);
    }

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      scorePercentage,
    });

  } catch (error: any) {
    console.error('Error saving session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}