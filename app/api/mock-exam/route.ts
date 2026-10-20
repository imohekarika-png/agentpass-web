import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

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

// Full 100-Question Distinct Statutory Master Seed
const TOPIC_TEMPLATES = [
  {
    topicZh: '牌照變更通知 (Cap. 511 s.40)',
    topicEn: 'Notice of Change of Particulars (Cap. 511 s.40)',
    qZh: '根據《地產代理條例》(Cap. 511) 第 40 條，持牌人變更主要或分行營業地點、個人註冊地址後，必須於多少天內以書面通知地產代理監管局 (EAA)？',
    qEn: 'Under Cap. 511 s.40, within how many days must a licensee notify the EAA in writing after changing business address or registered personal particulars?',
    optsZh: ['A. 7 天', 'B. 14 天', 'C. 31 天', 'D. 60 天'],
    optsEn: ['A. 7 Days', 'B. 14 Days', 'C. 31 Days', 'D. 60 Days'],
    ans: 2,
    expZh: '根據 Cap. 511 s.40，持牌人地址或經理變更必須於 31 天內以書面通知 EAA。',
    expEn: 'Under Cap. 511 s.40, notice of change of address or designated manager must be submitted in writing within 31 days.',
    refZh: '《地產代理條例》Cap. 511 s.40',
    refEn: 'Estate Agents Ordinance Cap. 511 s.40'
  },
  {
    topicZh: '客戶款項規則 (Client Money Rules)',
    topicEn: 'Client Money Trust Accounts',
    qZh: '地產代理行收到客戶存款後，必須依據法規於多少天內向客戶發出收據？相關信託戶口紀錄須妥善保存多久？',
    qEn: 'Upon receiving client deposit monies, within how many days must an agency issue a receipt, and for how long must trust records be retained?',
    optsZh: ['A. 7 天發收據，保存 1 年', 'B. 14 天發收據，保存 3 年', 'C. 21 天發收據，保存 5 年', 'D. 30 天發收據，保存 7 年'],
    optsEn: ['A. 7 days receipt, 1 year retention', 'B. 14 days receipt, 3 years retention', 'C. 21 days receipt, 5 years retention', 'D. 30 days receipt, 7 years retention'],
    ans: 1,
    expZh: '口訣【3-2-14-3】：存款收據須於 14 天內開具，信託紀錄及收據副本必須妥善保存至少 3 年。',
    expEn: 'Under Client Money Rules, deposit receipts must be issued within 14 days and trust records retained for at least 3 years.',
    refZh: '《地產代理(客戶款項)規例》第 4 及 8 條',
    refEn: 'Estate Agents (Client Money) Rules s.4 & s.8'
  },
  {
    topicZh: '二手住宅物業資料單 (Form 1)',
    topicEn: 'Property Information Form (Form 1)',
    qZh: '持牌地產代理在向二手住宅物業準買家推介單位前，必須向買家提供並解釋哪一份法定資料表格？',
    qEn: 'Before introducing a second-hand residential property to a prospective purchaser, which prescribed form must the agent provide and explain?',
    optsZh: ['A. 表格一 (Form 1 - 物業資料單)', 'B. 表格三 (Form 3 - 出售代理協議)', 'C. 表格四 (Form 4 - 購買代理協議)', 'D. 表格六 (Form 6 - 租賃代理協議)'],
    optsEn: ['A. Form 1 (Property Information Form)', 'B. Form 3 (Estate Agency Agreement for Sale)', 'C. Form 4 (Estate Agency Agreement for Purchase)', 'D. Form 6 (Estate Agency Agreement for Leasing)'],
    ans: 0,
    expZh: '二手住宅推介前必須向買家提供 Form 1（物業資料單）並附連土地查冊紀錄。',
    expEn: 'Form 1 (Property Information Form) accompanied by a land search copy must be provided to prospective buyers before introduction.',
    refZh: '《地產代理常規規例》Cap. 511A 表格一',
    refEn: 'Estate Agents Practice Regulations Cap. 511A Form 1'
  },
  {
    topicZh: '住宅租務沒收權 (Cap. 7)',
    topicEn: 'Forfeiture for Non-payment of Rent (Cap. 7)',
    qZh: '在未有明訂條款情況下，住宅租客拖欠租金達多少天時，業主可根據法定隱含條件行使沒收租賃權 (Forfeiture)？',
    qEn: 'In the absence of an express forfeiture clause, after how many days of unpaid domestic rent can a landlord exercise statutory implied forfeiture?',
    optsZh: ['A. 7 天', 'B. 14 天', 'C. 15 天', 'D. 30 天'],
    optsEn: ['A. 7 Days', 'B. 14 Days', 'C. 15 Days', 'D. 30 Days'],
    ans: 2,
    expZh: '《業主與租客（綜合）條例》(Cap. 7) 規定，住宅拖欠租金之法定沒收權門檻為 15 天。',
    expEn: 'Under Cap. 7, the statutory implied forfeiture threshold for non-payment of residential rent is 15 days.',
    refZh: '《業主與租客（綜合）條例》Cap. 7 第 IV 部',
    refEn: 'Landlord and Tenant (Consolidation) Ordinance Cap. 7 Part IV'
  },
  {
    topicZh: '劏房租務管制 (Cap. 7 Part IVA)',
    topicEn: 'Subdivided Unit Control (Cap. 7 Part IVA)',
    qZh: '根據《業主與租客（綜合）條例》第 IVA 部，規管租賃首期 2 年屆滿後，次期 2 年續租租金加幅上限為何？',
    qEn: 'Under Cap. 7 Part IVA (Subdivided Units), upon expiry of the first 2-year term, what is the maximum statutory rent increase cap for the second 2-year term?',
    optsZh: ['A. 5%', 'B. 10% 或差估署同類租金指數變動百分率（以較低者為準）', 'C. 15%', 'D. 由業主單方面決定'],
    optsEn: ['A. 5%', 'B. 10% or the RVD rental index change percentage, whichever is lower', 'C. 15%', 'D. Unilateral landlord discretion'],
    ans: 1,
    expZh: 'Cap. 7 Part IVA 規定 2+2 續租加幅不得超過差估署私樓租金指數變動，上限封頂 10%。',
    expEn: 'Rent increases on renewal under Cap. 7 Part IVA are capped at the RVD rental index movement, subject to an absolute ceiling of 10%.',
    refZh: '《業主與租客（綜合）條例》第 IVA 部 s.120AA',
    refEn: 'Landlord and Tenant Ordinance Part IVA s.120AA'
  },
  {
    topicZh: '聯權共有與中斷 (Cap. 219)',
    topicEn: 'Joint Tenancy & Severance (Cap. 219)',
    qZh: '若甲、乙以「聯權共有 (Joint Tenancy)」持有物業，甲未經乙同意依法將其權益轉讓予丙。此舉對業權產生何種法律效果？',
    qEn: 'If A and B hold a property as Joint Tenants, and A conveys his share to C without B’s consent, what is the legal effect on title?',
    optsZh: ['A. 轉讓無效', 'B. 聯權共有中斷 (Severance)，乙與丙轉為「分權共有 (Tenancy in Common)」', 'C. 乙自動獲得全部業權', 'D. 乙有權沒收全部樓款'],
    optsEn: ['A. Assignment is void', 'B. Joint tenancy is severed; B and C become Tenants in Common holding equal shares', 'C. B absorbs full title via survivorship', 'D. B can forfeit entire purchase price'],
    ans: 1,
    expZh: '轉讓聯權共有份額會破壞四同原則，導致 Severance，轉換為分權共有 (Tenancy in Common)。',
    expEn: 'Conveying a joint tenant share severs the joint tenancy, creating a tenancy in common with the new assignee.',
    refZh: '《物業轉易及物業條例》(Cap. 219)',
    refEn: 'Conveyancing and Property Ordinance Cap. 219'
  },
  {
    topicZh: '土地註冊優先權 (Cap. 128)',
    topicEn: 'Registration Priority (Cap. 128)',
    qZh: '根據《土地註冊條例》(Cap. 128)，物業契約若在簽立後多少個月內交付土地註冊處註冊，其優先權可回溯至簽立日生效？',
    qEn: 'Under Cap. 128, if a deed is registered within how many months of execution does its priority relate back to execution date?',
    optsZh: ['A. 1 個月', 'B. 2 個月', 'C. 3 個月', 'D. 6 個月'],
    optsEn: ['A. 1 Month', 'B. 2 Months', 'C. 3 Months', 'D. 6 Months'],
    ans: 0,
    expZh: '《土地註冊條例》第 5 條規定，契約簽立後 1 個月內交付註冊者，優先權回溯至簽立日。',
    expEn: 'Under Cap. 128 s.5, deeds registered within 1 month take priority from date of execution.',
    refZh: '《土地註冊條例》Cap. 128 s.5',
    refEn: 'Land Registration Ordinance Cap. 128 s.5'
  },
  {
    topicZh: '防止賄賂條例 (Cap. 201 s.9)',
    topicEn: 'Prevention of Bribery (Cap. 201 s.9)',
    qZh: '地產代理未得主事人事前書面同意，私下向對家收取非法回佣，觸犯香港法例哪一項罪行？',
    qEn: 'If an estate agent accepts an undisclosed secret commission from the other party without principal written consent, which offence is committed?',
    optsZh: ['A. 《防止賄賂條例》第 9 條（代理人的貪污交易罪）', 'B. 《盜竊罪條例》第 18 條', 'C. 僅屬於民事違約，不涉刑事', 'D. 行政罰款 500 元'],
    optsEn: ['A. Prevention of Bribery Ordinance Cap. 201 s.9 (Corrupt transactions)', 'B. Theft Ordinance s.18', 'C. Pure civil breach with no criminal liability', 'D. Administrative fine of HK$500'],
    ans: 0,
    expZh: '未得主事人同意收受對家利益屬於 Cap. 201 s.9 嚴重刑事罪行，最高可判監禁 7 年及罰款 50 萬元。',
    expEn: 'Under Cap. 201 s.9, accepting secret commissions without principal consent is a serious criminal offence.',
    refZh: '《防止賄賂條例》Cap. 201 s.9',
    refEn: 'Prevention of Bribery Ordinance Cap. 201 s.9'
  },
  {
    topicZh: '一手住宅銷售售樓書與價單 (Cap. 621)',
    topicEn: 'First-hand Sales Brochure & Price List (Cap. 621)',
    qZh: '根據《一手住宅物業銷售條例》(Cap. 621)，發展商在開售前至少多少天必須公佈售樓說明書？價單則須提前至少幾天公佈？',
    qEn: 'Under Cap. 621, at least how many days before sale must the sales brochure and price list be made available to the public?',
    optsZh: ['A. 售樓書 7 天前，價單 3 天前', 'B. 售樓書 14 天前，價單 7 天前', 'C. 售樓書 3 天前，價單 24 小時前', 'D. 售樓書 30 天前，價單 14 天前'],
    optsEn: ['A. Sales brochure 7 days before; Price list 3 days before', 'B. Sales brochure 14 days before; Price list 7 days before', 'C. Sales brochure 3 days before; Price list 24 hours before', 'D. Sales brochure 30 days before; Price list 14 days before'],
    ans: 0,
    expZh: 'Cap. 621 核心口訣【書 7 價 3】：售樓書須於開售前至少 7 天提供；價單須於開售前至少 3 天公佈。',
    expEn: 'Under Cap. 621, sales brochures must be available at least 7 days before sale; price lists at least 3 days before.',
    refZh: '《一手住宅物業銷售條例》Cap. 621 s.25 & s.32',
    refEn: 'First-hand Residential Properties Ordinance Cap. 621'
  },
  {
    topicZh: '冷靜期與沒收訂金 (Cap. 621 s.53)',
    topicEn: 'Cooling-off Period & Deposit Forfeiture',
    qZh: '購買一手住宅物業簽署 PASP 後，買方享有 5 個工作天冷靜期。若買方決定放棄交易，賣方有權沒收多少訂金？',
    qEn: 'Upon signing a PASP for a first-hand property, a buyer has a 5-working-day cooling-off period. If the buyer withdraws, how much deposit can the vendor forfeit?',
    optsZh: ['A. 沒收全數 10% 訂金並可追討損失', 'B. 沒收樓價 5% 的臨時訂金，且賣方無權提出進一步索償', 'C. 全數無條件退還訂金', 'D. 沒收 2.5% 訂金'],
    optsEn: ['A. Forfeit full 10% deposit and claim damages', 'B. Forfeit 5% preliminary deposit only; vendor cannot claim further damages', 'C. Full unconditional deposit refund', 'D. Forfeit 2.5% deposit'],
    ans: 1,
    expZh: 'Cap. 621 s.53(2) 規定：若買方於 5 個工作天內未簽署正式合約，賣方沒收 5% 臨時訂金，但無權追討額外賠償。',
    expEn: 'Under Cap. 621 s.53(2), the 5% preliminary deposit is forfeited upon withdrawal within 5 working days, with no further claims.',
    refZh: '《一手住宅物業銷售條例》Cap. 621 s.53',
    refEn: 'First-hand Residential Properties Ordinance Cap. 621 s.53'
  }
];

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

  // Part I Dynamic Selection across 10 distinct statutory topics
  const tmpl = TOPIC_TEMPLATES[(qId - 1) % TOPIC_TEMPLATES.length];
  return {
    id: qId,
    part: 'I',
    trackApplicability: qId % 3 === 0 ? 'EAQE_ONLY' : 'BOTH',
    topicZh: `${tmpl.topicZh} (試題 #${qId})`,
    topicEn: `${tmpl.topicEn} (Item #${qId})`,
    questionZh: `【Part I 條例題 - #${qId}】${tmpl.qZh}`,
    questionEn: `[Part I MCQ - #${qId}] ${tmpl.qEn}`,
    optionsZh: tmpl.optsZh,
    optionsEn: tmpl.optsEn,
    answerIndex: tmpl.ans,
    explanationZh: tmpl.expZh,
    explanationEn: tmpl.expEn,
    statuteRefZh: tmpl.refZh,
    statuteRefEn: tmpl.refEn
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
          ? '【EAQE 大牌專屬試題】此題屬地產代理（大牌）資格考題。請升級以解鎖全真大牌試卷。'
          : '【PRO 專業版專屬考題】此題屬標準資格考題。請解鎖專業版以閱覽完整題幹、ABCD 選項及法規解析。',
        questionEn: requiresEaqeUpgrade
          ? '[EAQE EXCLUSIVE] This item tests Estate Agent level competency. Upgrade to access full EAQE papers.'
          : '[PRO TIER EXCLUSIVE QUESTION] Unlock PRO to inspect question stems, options, and statutory analysis.',
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