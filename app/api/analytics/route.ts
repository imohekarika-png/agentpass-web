// app/api/analytics/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET() {
  try {
    // 1. Fetch overall session stats
    const { data: sessions } = await supabase
      .from('quiz_sessions')
      .select('score_percentage, created_at')
      .order('created_at', { ascending: false });

    // 2. Fetch answer breakdown by ordinance tag
    const { data: answers } = await supabase
      .from('user_answers')
      .select('ordinance_tag, is_correct');

    if (!answers || answers.length === 0) {
      return NextResponse.json({
        hasData: false,
        message: 'No practice sessions recorded yet.'
      });
    }

    // 3. Aggregate performance by Ordinance Topic
    const topicStats: Record<string, { total: number; correct: number }> = {};

    answers.forEach((ans) => {
      const tag = ans.ordinance_tag || 'Cap. 511';
      if (!topicStats[tag]) {
        topicStats[tag] = { total: 0, correct: 0 };
      }
      topicStats[tag].total += 1;
      if (ans.is_correct) {
        topicStats[tag].correct += 1;
      }
    });

    const topicBreakdown = Object.keys(topicStats).map((tag) => {
      const { total, correct } = topicStats[tag];
      const accuracy = Math.round((correct / total) * 100);
      return {
        ordinanceTag: tag,
        totalAttempted: total,
        correctCount: correct,
        accuracyPercentage: accuracy,
        status: accuracy >= 70 ? 'Pass' : 'Weakness'
      };
    });

    // 4. Calculate Overall Exam Readiness Score
    const totalAttempted = answers.length;
    const totalCorrect = answers.filter((a) => a.is_correct).length;
    const overallReadiness = Math.round((totalCorrect / totalAttempted) * 100);

    return NextResponse.json({
      hasData: true,
      overallReadiness,
      totalQuestionsAnswered: totalAttempted,
      totalSessionsCompleted: sessions?.length || 0,
      topicBreakdown
    });

  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}