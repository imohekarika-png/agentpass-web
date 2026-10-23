// app/api/mock-exam/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CLIENT_FALLBACK_QUESTIONS } from '@/app/data/mockQuestions';

export const runtime = 'nodejs';

const ADMIN_EMAILS = [
  'imoh.ekarika@savantnex.com',
  'imoh.ekarika@gmail.com',
  'admin@agentpass.hk'
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const track = (searchParams.get('track') || 'EAQE').toUpperCase() as 'EAQE' | 'SQE';

    const clientEmail = (req.headers.get('x-user-email') || '').toLowerCase().trim();
    const claimedTier = (req.headers.get('x-user-tier') || '').toUpperCase().trim();

    // Recognize admin status by email or by tier
    const isAdmin =
      (clientEmail.length > 0 && ADMIN_EMAILS.includes(clientEmail)) ||
      claimedTier === 'ADMIN_BUILDER';

    const isPaidUser =
      isAdmin ||
      claimedTier === 'ALL_ACCESS_PRO' ||
      claimedTier === 'EAQE_PRO' ||
      (track === 'SQE' && claimedTier === 'SQE_PRO');

    // Filter by track: SQE excludes EAQE_ONLY questions
    const trackFiltered = CLIENT_FALLBACK_QUESTIONS.filter((q) => {
      if (track === 'SQE' && q.trackApplicability === 'EAQE_ONLY') {
        return false;
      }
      return true;
    });

    // Return unlocked data for Admin and Pro tiers
    if (isPaidUser) {
      return NextResponse.json({
        success: true,
        track,
        userTier: isAdmin ? 'ADMIN_BUILDER' : claimedTier,
        isAuthorized: true,
        totalCount: trackFiltered.length,
        questions: trackFiltered.map((q) => ({
          ...q,
          isLocked: false
        }))
      });
    }

    // Free Preview Tier: Questions 1-10 are unlocked; Q11+ are sanitized
    const sanitizedQuestions = trackFiltered.map((q, idx) => {
      if (idx < 10) {
        return { ...q, isLocked: false };
      }

      return {
        id: q.id,
        part: q.part,
        trackApplicability: q.trackApplicability,
        caseScenarioId: q.caseScenarioId,
        topicZh: q.topicZh,
        topicEn: q.topicEn,
        statuteRefZh: q.statuteRefZh,
        statuteRefEn: q.statuteRefEn,
        isLocked: true,
        lockReason: 'REQUIRES_SUBSCRIPTION' as const,
        questionZh: '【PRO 專業版專屬考題】此題屬標準資格考題。請升級以解鎖完整題庫與條例解析。',
        questionEn: '[PRO TIER EXCLUSIVE QUESTION] Upgrade to PRO to view full question stem and statutory analysis.',
        optionsZh: [
          'A. [PRO 專屬選項 - 點擊升級解鎖]',
          'B. [PRO 專屬選項 - 點擊升級解鎖]',
          'C. [PRO 專屬選項 - 點擊升級解鎖]',
          'D. [PRO 專屬選項 - 點擊升級解鎖]'
        ],
        optionsEn: [
          'A. [PRO Locked Option - Upgrade to unlock]',
          'B. [PRO Locked Option - Upgrade to unlock]',
          'C. [PRO Locked Option - Upgrade to unlock]',
          'D. [PRO Locked Option - Upgrade to unlock]'
        ],
        answerIndex: 0,
        explanationZh: '請升級以獲取主考官評分依據與條例解析。',
        explanationEn: 'Please upgrade to view master examiner statutory analysis.'
      };
    });

    return NextResponse.json({
      success: true,
      track,
      userTier: 'FREE_PREVIEW',
      isAuthorized: false,
      totalCount: sanitizedQuestions.length,
      questions: sanitizedQuestions
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve examination paper', details: error?.message },
      { status: 500 }
    );
  }
}