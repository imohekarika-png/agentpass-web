// app/api/quiz/questions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CLIENT_FALLBACK_QUESTIONS, MockQuestion } from '@/app/data/mockQuestions';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

const PAID_TIERS = ['EAQE_PRO', 'SQE_PRO', 'ALL_ACCESS_PRO', 'ADMIN_BUILDER'];

export async function GET(req: NextRequest) {
  try {
    const userEmailCookie = req.cookies.get('agentpass_user_email')?.value;
    const cleanEmail = userEmailCookie
      ? decodeURIComponent(userEmailCookie).trim().toLowerCase()
      : null;

    let isAuthorizedPaid = false;
    let resolvedTier = 'FREE_PREVIEW';

    if (cleanEmail && cleanEmail !== 'guest@agentpass.hk') {
      const { data: profile, error } = await supabaseAdmin
        .from('profiles')
        .select('tier')
        .eq('email', cleanEmail)
        .single();

      if (!error && profile?.tier) {
        resolvedTier = profile.tier;
        if (PAID_TIERS.includes(profile.tier)) {
          isAuthorizedPaid = true;
        }
      }
    }

    const rawBank: MockQuestion[] = CLIENT_FALLBACK_QUESTIONS;

    // Full access for authorized paid accounts
    if (isAuthorizedPaid) {
      return NextResponse.json({
        isPaidUser: true,
        userTier: resolvedTier,
        totalQuestions: rawBank.length,
        unlockedCount: rawBank.length,
        questions: rawBank.map((q) => ({
          ...q,
          isLocked: false,
        })),
      });
    }

    // Mask questions beyond question 10 on the server for free preview
    const securedQuestions: MockQuestion[] = rawBank.map((q, idx) => {
      if (idx < 10) {
        return {
          ...q,
          isLocked: false,
        };
      }

      return {
        id: q.id,
        part: q.part,
        topicZh: q.topicZh,
        topicEn: q.topicEn,
        statuteRefZh: q.statuteRefZh,
        statuteRefEn: q.statuteRefEn,
        questionZh: q.questionZh,
        questionEn: q.questionEn,
        isLocked: true,
        lockReason: 'REQUIRES_SUBSCRIPTION',
        optionsZh: [],
        optionsEn: [],
        answerIndex: -1,
        explanationZh: '',
        explanationEn: '',
        caseScenarioId: q.caseScenarioId,
      };
    });

    return NextResponse.json({
      isPaidUser: false,
      userTier: resolvedTier,
      totalQuestions: rawBank.length,
      unlockedCount: Math.min(10, rawBank.length),
      questions: securedQuestions,
    });
  } catch (err: any) {
    console.error('[QUIZ QUESTIONS API ERROR]', err);
    return NextResponse.json(
      {
        error: 'Failed to load exam data.',
        message: err?.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}