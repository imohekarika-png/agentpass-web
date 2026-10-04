// app/api/quiz/revision/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get('tag');

    if (!tag) {
      return NextResponse.json(
        { error: 'Missing required query parameter: tag' },
        { status: 400 }
      );
    }

    // Fetch up to 20 questions matching the specified ordinance tag
    const { data: questions, error } = await supabase
      .from('questions')
      .select('*')
      .eq('ordinance_tag', tag)
      .limit(20);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      tag,
      count: questions?.length || 0,
      questions: questions || []
    });

  } catch (error: any) {
    console.error('Error fetching revision questions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}