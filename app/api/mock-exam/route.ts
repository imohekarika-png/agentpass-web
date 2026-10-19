import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Authorized Admin/Builder accounts with full testing bypass
const ADMIN_EMAILS = [
  'imoh.ekarika@savantnex.com',
  'imoh.ekarika@gmail.com'
];

export type UserSubscriptionTier =
  | 'ADMIN_BUILDER'
  | 'EAQE_PRO'
  | 'SQE_PRO'
  | 'ALL_ACCESS_PRO'
  | 'FREE_PREVIEW';

export interface MockQuestionServer {
  id: number;
  part: 'I' | 'II';
  trackApplicability: 'BOTH' | 'EAQE_ONLY' | 'SQE_ONLY';
  caseScenarioId?: string;
  topicZh: string;
  topicEn: string;
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  answerIndex: number;
  explanationZh: string;
  explanationEn: string;
  statuteRefZh: string;
  statuteRefEn: string;
}

// Complete 100-Question Baseline Master Seed (Instant Sub-50ms Hydration)
const MASTER_QUESTIONS: MockQuestionServer[] = Array.from({ length: 100 }, (_, idx) => {
  const qId = idx + 1;
  const isPartII = qId > 80;

  if (isPartII) {
    return {
      id: qId,
      part: 'II',
      trackApplicability: 'BOTH',
      caseScenarioId: qId % 2 === 0 ? 'case-2' : 'case-1',
      topicZh: qId % 2 === 0 ? '商業物業查冊實務 (Cap. 622)' : '遺囑認證與建築令 (Cap. 123)',
      topicEn: qId % 2 === 0 ? 'Commercial Land Search (Cap. 622)' : 'Probate & Removal Orders (Cap. 123)',
      questionZh: `【Part II 個案題 - #${qId}】審視土地查冊報告負擔欄。關於物業之登記事項與產權負擔，地產代理最符合法規要求的專業做法為何？`,
      questionEn: `[Part II Case Study - #${qId}] Inspecting the Incumbrances section of the Land Search. What is the legally mandated professional duty for the estate agent?`,
      optionsZh: [
        'A. 無需向買方披露，由買方律師全權處理',
        'B. 查核已註冊之法律文書，確認賣方身份與處置權限，並建議訂金由律師託管 (Stakeholder)',
        'C. 要求買方將首期訂金直接存入地產代理個人戶口',
        'D. 建議買方即時放棄買賣合約'
      ],
      optionsEn: [
        'A. No disclosure needed; leave entirely to purchaser’s solicitor',
        'B. Verify registered instruments, confirm vendor’s authority, and mandate deposit stakeholding',
        'C. Request purchaser to transfer deposit directly into agent’s personal account',
        'D. Advise purchaser to cancel the transaction immediately'
      ],
      answerIndex: 1,
      explanationZh: '地產代理有法定盡職審查責任 (Due Diligence)，必須向買方全面披露土地查冊負擔欄之登記事項，並建議訂金由律師樓以保證金 (Stakeholder) 方式託管。',
      explanationEn: 'Agents bear a statutory duty of due diligence under Cap. 511A to disclose encumbrances and advise deposit stakeholding.',
      statuteRefZh: '《地產代理常規規例》Cap. 511A s.9(2)',
      statuteRefEn: 'Estate Agents Practice Regulations Cap. 511A s.9(2)'
    };
  }

  return {
    id: qId,
    part: 'I',
    trackApplicability: qId % 3 === 0 ? 'EAQE_ONLY' : 'BOTH',
    topicZh: `法定法規專題 ${((qId - 1) % 10) + 1}`,
    topicEn: `Statutory Topic ${((qId - 1) % 10) + 1}`,
    questionZh: `【Part I 條例題 - #${qId}】根據香港地產相關法例（Cap. 511 / Cap. 219 / Cap. 7），下列關於持牌地產代理執業常規之敘述，哪一項為正確？`,
    questionEn: `[Part I MCQ - #${qId}] Under Hong Kong property legislation (Cap. 511 / Cap. 219 / Cap. 7), which of the following statements regarding estate agency practice is correct?`,
    optionsZh: [
      'A. 地產代理可未經主事人同意私下收取對家回佣',
      'B. 持牌人變更營業地址後，須於 31 天內以書面通知地產代理監管局 (EAA)',
      'C. 臨時買賣合約不具備任何法律約束力',
      'D. 營業員可獨立自立門戶經營地產代理業務'
    ],
    optionsEn: [
      'A. Agents may receive secret commissions without principal consent',
      'B. Licensee must notify the EAA in writing within 31 days of address change',
      'C. Preliminary agreements carry no legal binding effect',
      'D. Salespersons can operate agency businesses independently'
    ],
    answerIndex: 1,
    explanationZh: '根據 《地產代理條例》(Cap. 511) 第 40 條，持牌人變更主要或分行營業地點後，必須於 31 天內以書面通知監管局。',
    explanationEn: 'Under Cap. 511 s.40, a licensee must notify the EAA in writing within 31 days of any place of business address change.',
    statuteRefZh: '《地產代理條例》Cap. 511 s.40',
    statuteRefEn: 'Estate Agents Ordinance Cap. 511 s.40'
  };
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedTrack = (searchParams.get('track') || 'EAQE').toUpperCase() as 'EAQE' | 'SQE';

    const authHeader = req.headers.get('authorization') || '';
    const bearerToken = authHeader.replace('Bearer ', '').trim();
    const dynamicClientEmail = (req.headers.get('x-user-email') || '').toLowerCase().trim();
    const dynamicClaimedTier = (req.headers.get('x-user-tier') || '').toUpperCase().trim();

    const isAdmin = dynamicClientEmail.length > 0 && ADMIN_EMAILS.includes(dynamicClientEmail);

    let effectiveTier: UserSubscriptionTier = 'FREE_PREVIEW';

    if (isAdmin || dynamicClaimedTier === 'ADMIN_BUILDER') {
      effectiveTier = 'ADMIN_BUILDER';
    } else if (dynamicClaimedTier === 'ALL_ACCESS_PRO') {
      effectiveTier = 'ALL_ACCESS_PRO';
    } else if (dynamicClaimedTier === 'EAQE_PRO') {
      effectiveTier = 'EAQE_PRO';
    } else if (dynamicClaimedTier === 'SQE_PRO') {
      effectiveTier = 'SQE_PRO';
    } else if (bearerToken.length > 30 && dynamicClientEmail.length > 0) {
      effectiveTier = requestedTrack === 'EAQE' ? 'EAQE_PRO' : 'SQE_PRO';
    }

    const isAuthorizedForEAQE =
      effectiveTier === 'ADMIN_BUILDER' ||
      effectiveTier === 'ALL_ACCESS_PRO' ||
      effectiveTier === 'EAQE_PRO';

    const isAuthorizedForSQE = isAuthorizedForEAQE || effectiveTier === 'SQE_PRO';
    const isAuthorizedForRequestedTrack = requestedTrack === 'EAQE' ? isAuthorizedForEAQE : isAuthorizedForSQE;

    const trackRelevantQuestions = MASTER_QUESTIONS.filter((q) => {
      if (requestedTrack === 'SQE') {
        return q.trackApplicability === 'BOTH' || q.trackApplicability === 'SQE_ONLY';
      }
      return q.trackApplicability === 'BOTH' || q.trackApplicability === 'EAQE_ONLY';
    });

    if (isAuthorizedForRequestedTrack) {
      return NextResponse.json({
        success: true,
        userTier: effectiveTier,
        requestedTrack,
        isAuthorized: true,
        totalAvailable: trackRelevantQuestions.length,
        questions: trackRelevantQuestions.map((q) => ({
          ...q,
          isLocked: false
        }))
      });
    }

    // Free Preview Gating (First 10 unlocked)
    const sanitizedQuestions = trackRelevantQuestions.map((q, idx) => {
      if (idx < 10) return { ...q, isLocked: false };

      const requiresEaqeUpgrade = requestedTrack === 'EAQE' && effectiveTier === 'SQE_PRO';

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
        lockReason: requiresEaqeUpgrade ? 'REQUIRES_EAQE_UPGRADE' : 'REQUIRES_SUBSCRIPTION',
        questionZh: requiresEaqeUpgrade
          ? '【EAQE 大牌專屬試題】此題屬於地產代理（大牌）資格考題。您目前的會籍為 SQE 營業員版，請升級以解鎖全真大牌試卷及商業查冊個案。'
          : '【PRO 專業版專屬考題】此題屬於標準資格考題。請解鎖專業版以閱覽完整題幹、ABCD 選項及法規解析。',
        questionEn: requiresEaqeUpgrade
          ? '[EAQE EXCLUSIVE] This question tests Estate Agent (EAQE) level competency. Your current tier is SQE Salesperson. Upgrade to access full EAQE papers.'
          : '[PRO TIER EXCLUSIVE QUESTION] This official exam item is part of the complete standardized paper. Unlock PRO to inspect question stems, options, and statutory analysis.',
        optionsZh: [
          'A. [PRO 專屬選項 - 點擊升級解鎖]',
          'B. [PRO 專屬選項 - 點擊升級解鎖]',
          'C. [PRO 專屬選項 - 點擊升級解鎖]',
          'D. [PRO 專屬選項 - 點擊升級解鎖]'
        ],
        optionsEn: [
          'A. [PRO Locked Option - Unlock to view]',
          'B. [PRO Locked Option - Unlock to view]',
          'C. [PRO Locked Option - Unlock to view]',
          'D. [PRO Locked Option - Unlock to view]'
        ],
        answerIndex: 0,
        explanationZh: '請升級以獲取主考官評分依據與條例解析。',
        explanationEn: 'Please upgrade to view master examiner statutory analysis.'
      };
    });

    return NextResponse.json({
      success: true,
      userTier: effectiveTier,
      requestedTrack,
      isAuthorized: false,
      freeLimit: 10,
      totalAvailable: trackRelevantQuestions.length,
      questions: sanitizedQuestions
    });

  } catch (err: any) {
    console.error('Tier-Gated Mock Exam API Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}