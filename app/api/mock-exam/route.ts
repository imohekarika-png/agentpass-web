import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// List of Admin/Builder emails with permanent full access bypass
const ADMIN_EMAILS = [
  'imoh.ekarika@gmail.com',
  'imoh.ekarika@savantnex.com'
];

interface MockQuestionMaster {
  id: number;
  part: 'I' | 'II';
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

/* ========================================================
   SERVER-SIDE PROPRIETARY MASTER EXAM (50 QUESTIONS)
   Protected: Free users only receive Q1 - Q10
   ======================================================== */
const MASTER_QUESTIONS_SERVER: MockQuestionMaster[] = [
  // PART I - CAP 511 & LICENSING (Free Tier Sample: Q1 - Q3)
  {
    id: 1,
    part: 'I',
    topicZh: '條例牌照要求 (Cap. 511)',
    topicEn: 'Licensing Requirements (Cap. 511)',
    questionZh: '根據《地產代理條例》(Cap. 511)，地產代理（個人）牌照持有人在變更其主要或分行營業地點後，必須於多少天內以書面通知地產代理監管局 (EAA)？',
    questionEn: 'Under the Estate Agents Ordinance (Cap. 511), within how many days must an individual estate agent licensee notify the EAA in writing after a change in principal or branch place of business?',
    optionsZh: ['A. 7 天', 'B. 14 天', 'C. 31 天', 'D. 60 天'],
    optionsEn: ['A. 7 Days', 'B. 14 Days', 'C. 31 Days', 'D. 60 Days'],
    answerIndex: 2,
    explanationZh: '根據 Cap. 511 第 40 條，任何持牌人若變更營業地址、個人註冊住址或經理指派，均須於 31 天內以書面表格通知 EAA。',
    explanationEn: 'Under Cap. 511 s.40, a licensee must notify the Authority in writing within 31 days of any change of business address, registered personal address, or manager designation.',
    statuteRefZh: '《地產代理條例》Cap. 511 s.40',
    statuteRefEn: 'Estate Agents Ordinance Cap. 511 s.40'
  },
  {
    id: 2,
    part: 'I',
    topicZh: '客戶款項規則 (Client Money)',
    topicEn: 'Client Money Accounts (Cap. 511)',
    questionZh: '地產代理行收受客戶託管訂金款項後，必須依據法規將該款項存入獨立之客戶信託戶口，且開立及開具收據的期限為多少天？相關款項紀錄須保存多久？',
    questionEn: 'When an estate agency receives client deposits, within how many days must receipts be issued, and for how long must trust account records be preserved?',
    optionsZh: [
      'A. 7 天開具收據，保存 1 年',
      'B. 14 天開具收據，保存 3 年',
      'C. 21 天開具收據，保存 5 年',
      'D. 30 天開具收據，保存 7 年'
    ],
    optionsEn: [
      'A. Issue receipt in 7 days, retain for 1 year',
      'B. Issue receipt in 14 days, retain for 3 years',
      'C. Issue receipt in 21 days, retain for 5 years',
      'D. Issue receipt in 30 days, retain for 7 years'
    ],
    answerIndex: 1,
    explanationZh: '口訣【3-2-14-3】：地產代理客戶存款規則要求，代理行收到客戶存款後須於 14 天內向客戶發出收據，相關帳冊及收據副本必須妥善保存至少 3 年。',
    explanationEn: 'Mnemonic 3-2-14-3: Under the Estate Agents (Client Money) Rules, deposit receipts must be issued within 14 days and trust financial records must be kept for at least 3 years.',
    statuteRefZh: '《地產代理 (客戶款項) 規例》第 4 及 8 條',
    statuteRefEn: 'Estate Agents (Client Money) Rules s.4 & s.8'
  },
  {
    id: 3,
    part: 'I',
    topicZh: '物業資料常規 (Practice Regs)',
    topicEn: 'Practice Regulations (Cap. 511A)',
    questionZh: '持牌地產代理在向二手住宅物業買家推介物業前，必須向買家提供並解釋哪一項法定資料表格？',
    questionEn: 'Before introducing a second-hand residential property to a prospective purchaser, which prescribed form must the agent provide and explain?',
    optionsZh: [
      'A. 表格一 (Form 1 - 物業資料單)',
      'B. 表格三 (Form 3 - 出售地產代理協議)',
      'C. 表格四 (Form 4 - 購買地產代理協議)',
      'D. 表格六 (Form 6 - 租賃代理協議)'
    ],
    optionsEn: [
      'A. Form 1 (Property Information Form)',
      'B. Form 3 (Estate Agency Agreement for Sale)',
      'C. Form 4 (Estate Agency Agreement for Purchase)',
      'D. Form 6 (Estate Agency Agreement for Leasing)'
    ],
    answerIndex: 0,
    explanationZh: '二手住宅推介規定必須提供 Form 1（物業資料單）附連土地查冊紀錄。Form 3/4/5/6 為代理協議，而非物業資料單。',
    explanationEn: 'Under Cap. 511A, Form 1 (Property Information Form) with land search must be provided and explained to prospective purchasers.',
    statuteRefZh: '《地產代理常規 (一般職責及香港住宅物業) 規例》Form 1',
    statuteRefEn: 'Estate Agents Practice (General & Residential) Regs Form 1'
  },

  // PART I - TENANCY & BUILDINGS (Free Tier Sample: Q4 - Q5)
  {
    id: 4,
    part: 'I',
    topicZh: '租務法定權益 (Cap. 7)',
    topicEn: 'Landlord & Tenant Rights (Cap. 7)',
    questionZh: '在雙方未有明訂沒收條款的情況下，住宅租客拖欠租金達多少天時，業主可根據法定隱含條件行使沒收租賃權 (Forfeiture for Non-Payment of Rent)？',
    questionEn: 'In the absence of an express forfeiture clause, after how many days of unpaid domestic rent can a landlord exercise the statutory implied right of forfeiture?',
    optionsZh: ['A. 7 天', 'B. 14 天', 'C. 15 天', 'D. 30 天'],
    optionsEn: ['A. 7 Days', 'B. 14 Days', 'C. 15 Days', 'D. 30 Days'],
    answerIndex: 2,
    explanationZh: '《業主與租客（綜合）條例》(Cap. 7) 第 IV 部規定，住宅租賃中拖欠租金的法定沒收權門檻為 15 天。',
    explanationEn: 'Under Cap. 7 Part IV, the statutory implied forfeiture threshold for non-payment of domestic rent is 15 days.',
    statuteRefZh: '《業主與租客（綜合）條例》Cap. 7 Part IV',
    statuteRefEn: 'Landlord & Tenant (Consolidation) Ordinance Cap. 7'
  },
  {
    id: 5,
    part: 'I',
    topicZh: '劏房租務管制 (Cap. 7 Part IVA)',
    topicEn: 'Subdivided Unit Control (Cap. 7 Part IVA)',
    questionZh: '根據《業主與租客（綜合）條例》第 IVA 部（劏房租管），規管租賃首期 2 年租期屆滿後，次期租賃（次期 2 年）租金加幅上限為何？',
    questionEn: 'Under Cap. 7 Part IVA (Subdivided Units), upon expiry of the first 2-year term, what is the maximum statutory rent increase cap for the second 2-year term?',
    optionsZh: [
      'A. 5%',
      'B. 10% 或差餉物業估價署同類物業租金指數變動百分率（以較低者為準）',
      'C. 15%',
      'D. 由業主單方面全權決定'
    ],
    optionsEn: [
      'A. 5%',
      'B. 10% or the RVD rental index change percentage, whichever is lower',
      'C. 15%',
      'D. At the landlord’s unilateral discretion'
    ],
    answerIndex: 1,
    explanationZh: 'Cap. 7 Part IVA 明訂 2+2 保障期內，次期續租租金加幅不得超過差估署私樓租金指數變動百分率，並設有 10% 的法定上限封頂。',
    explanationEn: 'Under Cap. 7 Part IVA, rent renewal increases are capped at the RVD private domestic rental index movement, subject to an absolute ceiling of 10%.',
    statuteRefZh: '《業主與租客（綜合）條例》第 IVA 部 第 120AA 條',
    statuteRefEn: 'Landlord & Tenant (Consolidation) Ordinance Part IVA s.120AA'
  },

  // PART I - CONVEYANCING (Free Tier Sample: Q6)
  {
    id: 6,
    part: 'I',
    topicZh: '聯權共有與分權共有 (Cap. 219)',
    topicEn: 'Joint Tenancy & Severance (Cap. 219)',
    questionZh: '若甲、乙兩人以「聯權共有 (Joint Tenancy)」形式持有香港物業，甲未經乙同意，依法將其權益轉讓予丙。此項轉讓對物業業權模式產生何種法律效果？',
    questionEn: 'If A and B hold a property as Joint Tenants, and A conveys his interest to C without B’s consent, what is the legal effect on ownership structure?',
    optionsZh: [
      'A. 轉讓無效，因聯權共有未經全體同意不得處置',
      'B. 聯權共有中斷 (Severance)，乙與丙將以「分權共有 (Tenancy in Common)」形式各佔一半權益',
      'C. 乙自動獲得甲的全部業權 (Right of Survivorship)',
      'D. 乙有權撤銷該買賣並沒收全部樓款'
    ],
    optionsEn: [
      'A. The conveyance is void ab initio without unanimous consent',
      'B. Joint tenancy is severed; B and C become Tenants in Common holding equal undivided shares',
      'C. B automatically absorbs A’s share via right of survivorship',
      'D. B can unilaterally rescind the assignment and forfeit sale proceeds'
    ],
    answerIndex: 1,
    explanationZh: '普通法及 Cap. 219 規定：聯權共有人轉讓其份額將破壞產權四同原則，導致聯權共有中斷 (Severance)，轉為分權共有 (Tenancy in Common)。',
    explanationEn: 'Conveying a joint tenant share severs the joint tenancy, creating a tenancy in common between the remaining owner and new assignee.',
    statuteRefZh: '《物業轉易及物業條例》(Cap. 219)',
    statuteRefEn: 'Conveyancing and Property Ordinance (Cap. 219)'
  },

  // PART I - LAND REGISTRATION & MISREPRESENTATION (Free Tier Sample: Q7 - Q8)
  {
    id: 7,
    part: 'I',
    topicZh: '土地註冊優先權 (Cap. 128)',
    topicEn: 'Registration Priority (Cap. 128)',
    questionZh: '根據《土地註冊條例》(Cap. 128)，物業契約若在簽立後多少個月內交付土地註冊處註冊，其註冊效力可回溯至契約簽立當日生效？',
    questionEn: 'Under the Land Registration Ordinance (Cap. 128), if a deed is registered within how many months of execution does its priority relate back to the date of execution?',
    optionsZh: ['A. 1 個月', 'B. 2 個月', 'C. 3 個月', 'D. 6 個月'],
    optionsEn: ['A. 1 Month', 'B. 2 Months', 'C. 3 Months', 'D. 6 Months'],
    answerIndex: 0,
    explanationZh: '《土地註冊條例》第 5 條明訂契約於簽立日起 1 個月內交付註冊者，其優先權回溯至簽立日生效。超過 1 個月者，則僅以交付註冊之日起算優先權。',
    explanationEn: 'Under Cap. 128 s.5, deeds registered within 1 month take priority from date of execution; otherwise from date of registration.',
    statuteRefZh: '《土地註冊條例》Cap. 128 第 5 條',
    statuteRefEn: 'Land Registration Ordinance Cap. 128 s.5'
  },
  {
    id: 8,
    part: 'I',
    topicZh: '防止賄賂條例 (Cap. 201 s.9)',
    topicEn: 'Prevention of Bribery (Cap. 201 s.9)',
    questionZh: '地產代理在未得主事人（買方或賣方）事前書面同意及批准下，私下向對家收取非法利益或回佣，將觸犯香港法例哪一項刑事罪行？',
    questionEn: 'If an estate agent solicits or accepts an undisclosed rebate or secret commission from the other party without the prior written consent of their principal, which criminal offence is committed?',
    optionsZh: [
      'A. 《防止賄賂條例》第 9 條（代理人的貪污交易罪）',
      'B. 《盜竊罪條例》第 18 條（欺詐手段取得金錢）',
      'C. 僅屬於民事合約違約，不涉刑事罪行',
      'D. 《地產代理條例》簡易程序罰款 500 元'
    ],
    optionsEn: [
      'A. Prevention of Bribery Ordinance Cap. 201 s.9 (Corrupt transactions with agents)',
      'B. Theft Ordinance Cap. 210 s.18 (Deception)',
      'C. Pure civil breach of contract with no criminal liability',
      'D. Minor statutory administrative fine of HK$500'
    ],
    answerIndex: 0,
    explanationZh: '地產代理作為主事人之受信人，未得主事人明確許可收受利益，即構成《防止賄賂條例》(Cap. 201) 第 9 條之嚴重刑事罪行，最高可判監禁 7 年及罰款 50 萬元。',
    explanationEn: 'Under Cap. 201 s.9, an agent accepting secret commission without the principal’s informed consent commits a serious criminal corrupt transaction.',
    statuteRefZh: '《防止賄賂條例》Cap. 201 第 9 條',
    statuteRefEn: 'Prevention of Bribery Ordinance Cap. 201 s.9'
  },

  // PART II - CASE 1 SAMPLES (Free Tier Sample: Q9 - Q10)
  {
    id: 9,
    part: 'II',
    caseScenarioId: 'case-1',
    topicZh: '土地查冊 (POIM 業主權限)',
    topicEn: 'Land Search (POIM Ownership & Probate)',
    questionZh: '【Part II 個案題 - 個案一】審視 Smart Mansion 查冊報告附件，物業目前由溫先生以「單獨遺囑執行人 (Sole Executor)」登記。在簽署臨時買賣合約及收取樓價訂金時，地產代理 Sunny 最符合法規要求的專業做法為何？',
    questionEn: '[Part II Case Study - Case 1] Reviewing the Smart Mansion Land Search Annex, the property is registered under Mr. Wan as Sole Executor. When arranging the PASP and deposit payment, which practice is legally correct for agent Sunny?',
    optionsZh: [
      'A. 要求買方將所有首期訂金支票抬頭直接寫給地產代理個人，由代理轉交',
      'B. 查核已註冊之遺囑認證文件 (Letters of Probate)，確認執行人身份，並安排訂金由賣方律師樓以保證金 (Stakeholder) 方式託管',
      'C. 遺囑執行人無權出售物業，代理必須直接拒絕簽約',
      'D. 無需核實遺囑，直接將訂金全數交付溫先生個人銀行戶口'
    ],
    optionsEn: [
      'A. Direct the purchaser to draw the deposit cheque directly in Sunny’s personal name',
      'B. Verify the registered Letters of Probate to confirm executor authority, and mandate that initial deposits be held by the vendor’s solicitor as stakeholder',
      'C. Refuse to execute the transaction, claiming an executor has no statutory capacity to convey title',
      'D. Release all initial deposit monies immediately into Mr. Wan’s personal bank account'
    ],
    answerIndex: 1,
    explanationZh: '單獨遺囑執行人有權處置物業，但因存在清拆命令與潛在債權人風險，地產代理必須查驗已於土地註冊處登記的遺囑認證文書，並極力建議所有訂金以 Stakeholder 方式由律師樓託管，以保障買方利益。',
    explanationEn: 'A sole executor has statutory power of disposal, but given the UBW and estate debts, the agent must inspect the probate memorial and hold deposits in escrow via vendor solicitor as stakeholder.',
    statuteRefZh: '《遺囑認證及遺產管理條例》(Cap. 10) 及 EAA 操守守則',
    statuteRefEn: 'Probate and Administration Ordinance (Cap. 10) & EAA Code'
  },
  {
    id: 10,
    part: 'II',
    caseScenarioId: 'case-1',
    topicZh: '違建命令揭示 (Cap. 123 s.24)',
    topicEn: 'UBW Disclosure & Requisition (Cap. 123)',
    questionZh: '【Part II 個案題 - 個案一】查冊負擔欄 (Incumbrances) 登記有屋宇署第 24 條清拆命令。地產代理 Sunny 未於簽約前向買方鄧小姐披露並解釋此命令。Sunny 可能違反何項 EAA 操守規定？',
    questionEn: '[Part II Case Study - Case 1] The Incumbrances section registers a Buildings Dept s.24 Removal Order. Sunny failed to disclose or explain this order before signing. Which EAA statutory duty has Sunny breached?',
    optionsZh: [
      'A. 僅屬於無心之失，法例並無要求代理交代建築物命令',
      'B. 違反《地產代理常規規例》，未盡應盡的努力 (Due Diligence) 查明並告知買方物業存在產權負擔及按揭風險',
      'C. 只要買方委聘了律師，代理即完全免除所有物業查證責任',
      'D. 屋宇署 s.24 清拆令不屬於土地查冊重要事項，無須向買方解釋'
    ],
    optionsEn: [
      'A. Pure oversight; agents bear no statutory obligation to explain building orders',
      'B. Breached Practice Regulations by failing to exercise due diligence to ascertain and disclose encumbrances affecting title and mortgageability',
      'C. Complete exemption applies once the purchaser engages independent legal representation',
      'D. Cap. 123 s.24 orders do not constitute material encumbrances under land search rules'
    ],
    answerIndex: 1,
    explanationZh: '《地產代理常規規例》第 9(2) 條及 EAA 執業通告明確規定：代理在安排簽約前必須向買方全面披露查冊中登記的未清拆令及 UBW 風險，未作揭示構成嚴重失職及紀律制裁處分。',
    explanationEn: 'Under Cap. 511A s.9(2) and EAA Practice Circulars, failure to explain a registered s.24 removal order and potential defect in title constitutes gross professional misconduct.',
    statuteRefZh: '《地產代理常規規例》Cap. 511A s.9(2)',
    statuteRefEn: 'Estate Agents Practice Regulations Cap. 511A s.9(2)'
  },

  // PART I - EXTENDED PROFESSIONAL BANK (Paid / Admin Gated: Q11 - Q30)
  {
    id: 11,
    part: 'I',
    topicZh: '一手住宅銷售條例 (Cap. 621)',
    topicEn: 'First-hand Residential Sales (Cap. 621)',
    questionZh: '根據《一手住宅物業銷售條例》(Cap. 621)，發展商在指明住宅物業開售前至少多少天，必須向公眾公佈售樓說明書 (Sales Brochure)？價單 (Price List) 則須提前至少幾天公佈？',
    questionEn: 'Under the Residential Properties (First-hand Sales) Ordinance (Cap. 621), at least how many days before sale must the sales brochure and price list be made available to the public?',
    optionsZh: [
      'A. 售樓書 7 天前，價單 3 天前',
      'B. 售樓書 14 天前，價單 7 天前',
      'C. 售樓書 3 天前，價單 24 小時前',
      'D. 售樓書 30 天前，價單 14 天前'
    ],
    optionsEn: [
      'A. Sales brochure 7 days before; Price list 3 days before',
      'B. Sales brochure 14 days before; Price list 7 days before',
      'C. Sales brochure 3 days before; Price list 24 hours before',
      'D. Sales brochure 30 days before; Price list 14 days before'
    ],
    answerIndex: 0,
    explanationZh: 'Cap. 621 核心口訣【書 7 價 3】：售樓說明書須於開售前至少 7 天提供；價單須於開售前至少 3 天公佈。',
    explanationEn: 'Under Cap. 621, sales brochures must be available at least 7 days before sale; price lists at least 3 days before.',
    statuteRefZh: '《一手住宅物業銷售條例》Cap. 621 第 25 及 32 條',
    statuteRefEn: 'First-hand Residential Properties Ordinance Cap. 621'
  },
  {
    id: 12,
    part: 'I',
    topicZh: '冷靜期與沒收訂金 (Cap. 621 s.53)',
    topicEn: 'Cooling-off Period & Deposit (Cap. 621 s.53)',
    questionZh: '在購買香港一手住宅物業簽署臨時買賣合約 (PASP) 後，買方享有 5 個工作天的冷靜期。若買方決定放棄交易而不簽署正式合約，賣方有權沒收多少訂金？',
    questionEn: 'Upon signing a PASP for a first-hand property, a purchaser has a 5-working-day cooling-off period. If the purchaser elects not to sign the formal ASP, how much deposit can the vendor forfeit?',
    optionsZh: [
      'A. 沒收全數 10% 訂金並可追討轉售虧損',
      'B. 沒收相當於樓價 5% 的臨時訂金，且賣方不可向買方追討任何其他補償',
      'C. 全數無條件退還訂金予買方',
      'D. 沒收 2.5% 訂金並向 EAA 申報'
    ],
    optionsEn: [
      'A. Forfeit full 10% deposit and claim subsequent resale losses',
      'B. Forfeit 5% preliminary deposit only; vendor cannot claim further damages',
      'C. Full unconditional refund of all deposit monies',
      'D. Forfeit 2.5% and file notice with EAA'
    ],
    answerIndex: 1,
    explanationZh: 'Cap. 621 第 53(2) 條規定：若買方於 5 個工作天內未簽署正式合約，臨時合約即告終止，賣方沒收 5% 臨時訂金，但賣方無權提出進一步索償。',
    explanationEn: 'Under Cap. 621 s.53(2), the 5% preliminary deposit is forfeited upon withdrawal within 5 working days, with no further claim against the buyer.',
    statuteRefZh: '《一手住宅物業銷售條例》Cap. 621 第 53 條',
    statuteRefEn: 'First-hand Residential Properties Ordinance Cap. 621 s.53'
  },
  {
    id: 13,
    part: 'I',
    topicZh: '實用面積定義 (Saleable Area)',
    topicEn: 'Saleable Area Definition (Cap. 621 & EAA)',
    questionZh: '在香港二手與一手物業推廣中，法定「實用面積 (Saleable Area)」的量度範圍應包含下列何者？',
    questionEn: 'Under HK conveyancing practice and EAA directives, what is included in the statutory calculation of "Saleable Area"?',
    optionsZh: [
      'A. 僅指單位內部地台面積，完全不含圍封牆',
      'B. 該樓面面積連同露台 (Balcony)、工作平台 (Utility Platform) 及陽台 (Verandah) 的樓面面積，計至圍封牆的外圍或共用牆的中線',
      'C. 必須計入大廈公用電梯大堂、會所及停車位之分攤面積',
      'D. 包含窗台但剔除露台'
    ],
    optionsEn: [
      'A. Solely internal carpet floor area excluding all perimeter walls',
      'B. Floor area of the unit including balcony, utility platform, and verandah, measured to external wall face or shared party wall centerline',
      'C. Apportioned common lift lobby, clubhouse, and parking space areas',
      'D. Bay windows included while balconies are excluded'
    ],
    answerIndex: 1,
    explanationZh: '根據差估署標準及 Cap. 621，實用面積量度至圍封牆外圍（共用牆量至中線），並包括露台、工作平台及陽台。窗台 (Bay window) 及天井不計入實用面積。',
    explanationEn: 'Saleable area measures to the exterior of enclosing walls (centerline for party walls) and explicitly includes balconies and utility platforms.',
    statuteRefZh: 'EAA 執業通告及 Cap. 621 第 8 條',
    statuteRefEn: 'EAA Practice Circular & Cap. 621 s.8'
  },
  {
    id: 14,
    part: 'I',
    topicZh: '廣告常規守則 (Advertising Code)',
    topicEn: 'Advertising Regulations (Cap. 511A s.9)',
    questionZh: '地產代理在發佈物業廣告（包括網上社交媒體盤源）前，必須取得下列哪項法律授權？',
    questionEn: 'Before publishing a property advertisement (including online social media listings), which legal authorization must an estate agent obtain?',
    optionsZh: [
      'A. 口頭通知業主即可發佈',
      'B. 取得賣方或業主簽署的地產代理協議（Form 3 或 Form 5）並取得書面明確授權',
      'C. 只要已在網上進行土地查冊，無需業主授權即可宣傳',
      'D. 經地產代理公司董事口頭批准'
    ],
    optionsEn: [
      'A. Verbal informal telephone notification from the owner is sufficient',
      'B. Valid executed Estate Agency Agreement (Form 3 or Form 5) with express written marketing authorization',
      'C. Conducting a land search confers automatic authority to market publicly',
      'D. Internal verbal clearance from the agency branch director'
    ],
    answerIndex: 1,
    explanationZh: '《地產代理常規規例》第 9(1) 條嚴格規定：持牌人未獲業主書面授權（通常載於 Form 3/5 內）不得發佈物業廣告，否則構成違規吊銷牌照處分。',
    explanationEn: 'Under Cap. 511A s.9(1), marketing without prior written authorization from the vendor/landlord (via Form 3/5) is a statutory disciplinary breach.',
    statuteRefZh: '《地產代理常規規例》Cap. 511A 第 9(1) 條',
    statuteRefEn: 'Estate Agents Practice Regulations Cap. 511A s.9(1)'
  },
  {
    id: 15,
    part: 'I',
    topicZh: '個人資料私隱條例 (Cap. 486)',
    topicEn: 'Personal Data (Privacy) (Cap. 486)',
    questionZh: '地產代理使用查冊取得的業主電話或個人姓名進行未經同意的「冷知識推銷電話 (Cold Calling)」，直接違反香港哪一項法規原則？',
    questionEn: 'If an estate agent uses owner names or phone numbers retrieved from land search records for unsolicited marketing "cold calls", which statutory principle is breached?',
    optionsZh: [
      'A. 違反《個人資料（私隱）條例》(Cap. 486) 保障資料第 3 原則（不得將個人資料用於非原始收集目的）',
      'B. 違反《商品說明條例》',
      'C. 土地查冊資料屬公眾領域，代理可任意作商業促銷使用',
      'D. 違反《競爭條例》第一行為守則'
    ],
    optionsEn: [
      'A. Breaches Data Protection Principle 3 under Cap. 486 (Use of personal data for unrelated new purposes)',
      'B. Breaches the Trade Descriptions Ordinance',
      'C. Land Registry records are public domain and can be commercialized freely',
      'D. Breaches First Conduct Rule under the Competition Ordinance'
    ],
    answerIndex: 0,
    explanationZh: '土地查冊之法定目的為確認物業權益及防範欺詐。將查冊所得業主個人資料轉作直接促銷或推銷電話，嚴重違背 DPP 3，可遭私隱專員公署檢控及 EAA 紀律處分。',
    explanationEn: 'Using Land Registry personal data for unsolicited marketing breaches DPP 3 of Cap. 486, as marketing is outside the statutory purpose of the Land Register.',
    statuteRefZh: '《個人資料（私隱）條例》(Cap. 486) DPP 3 及 EAA 指引',
    statuteRefEn: 'Personal Data (Privacy) Ordinance Cap. 486 DPP 3'
  },
  {
    id: 16,
    part: 'I',
    topicZh: '競爭條例合規 (Cap. 619)',
    topicEn: 'Competition Ordinance (Cap. 619)',
    questionZh: '數間主要地產代理商經高層協商後，公開發布聯合通告規定全體二手住宅成交必須收取固定 2% 佣金，不得給予客戶折扣。此舉觸犯《競爭條例》哪一項規定？',
    questionEn: 'Several major real estate agencies agree through senior management to fix residential commissions at a mandatory 2% without discounts. Which prohibition is breached under Cap. 619?',
    optionsZh: [
      'A. 第一行為守則（嚴重反競爭合謀定價行為 Price Fixing）',
      'B. 第二行為守則（濫用市場權力）',
      'C. 合併守則',
      'D. 地產代理行業不受《競爭條例》管轄'
    ],
    optionsEn: [
      'A. First Conduct Rule (Serious anti-competitive collusive price-fixing)',
      'B. Second Conduct Rule (Abuse of substantial market power)',
      'C. Merger Rule',
      'D. The real estate agency sector is exempt from competition law'
    ],
    answerIndex: 0,
    explanationZh: '《競爭條例》(Cap. 619) 第一行為守則禁止競爭同業合謀定價 (Price Fixing) 或限制佣金寬免，屬於嚴重反競爭行為，可被判處巨額罰款。',
    explanationEn: 'Horizontal agreements among competitors to fix commissions constitute serious anti-competitive price-fixing under the First Conduct Rule of Cap. 619.',
    statuteRefZh: '《競爭條例》Cap. 619 第一行為守則',
    statuteRefEn: 'Competition Ordinance Cap. 619 First Conduct Rule'
  },
  {
    id: 17,
    part: 'I',
    topicZh: '失實陳述救濟 (Cap. 284)',
    topicEn: 'Misrepresentation Remedies (Cap. 284)',
    questionZh: '若代理明知物業曾發生兇殺案（非自然死亡命案），但在買家多次明確查問時斷然否認，誘使買方簽署合約。買方事後可根據《失實陳述條例》行使何種法定權利？',
    questionEn: 'If an agent falsely denies a known suicide/unnatural death in a flat despite repeated explicit queries from the purchaser, what statutory remedy can the purchaser claim?',
    optionsZh: [
      'A. 僅可向 EAA 投訴，不可撤銷買賣合約',
      'B. 構成欺詐性或疏忽失實陳述，買方可主張撤銷合約 (Rescission) 並要求退還訂金及賠償損失',
      'C. 合約一經簽署即不可推翻（Caveat Emptor 買家自負原則）',
      'D. 買方僅能要求差餉物業估價署減免差餉'
    ],
    optionsEn: [
      'A. Only administrative complaints to EAA are permitted; contract cannot be rescinded',
      'B. Constitutes fraudulent or negligent misrepresentation; buyer can rescind contract, recover deposit, and claim damages',
      'C. Caveat emptor applies unconditionally once contracts are signed',
      'D. The buyer is limited to requesting a rates reduction'
    ],
    answerIndex: 1,
    explanationZh: '積極失實陳述否定了「買家自負」原則。買方受欺詐或疏忽陳述誘導入約，有權依據 Cap. 284 要求撤銷合約 (Rescission) 及索償損害賠償。',
    explanationEn: 'Under the Misrepresentation Ordinance (Cap. 284), actionable misrepresentation entitles the innocent party to rescind the contract and claim damages.',
    statuteRefZh: '《失實陳述條例》(Cap. 284) 第 2 及 3 條',
    statuteRefEn: 'Misrepresentation Ordinance (Cap. 284) s.2 & s.3'
  },
  {
    id: 18,
    part: 'I',
    topicZh: '印花稅條例最新規定 (Cap. 117)',
    topicEn: 'Stamp Duty Regulations (Cap. 117)',
    questionZh: '根據香港《印花稅條例》(Cap. 117) 撤辣後的現行法規，香港永久性居民購買第一間住宅物業時，應按哪一附表稅率繳納從價印花稅 (AVD)？',
    questionEn: 'Under current Cap. 117 rules following market measure adjustments, which rate scale applies to HK permanent residents acquiring their sole residential property?',
    optionsZh: [
      'A. 第 1 標準第 1 部稅率（7.5%）',
      'B. 第 2 標準稅率（Scale 2，最高 4.25%）',
      'C. 一律免繳印花稅',
      'D. 劃一徵收 15% 買家印花稅 (BSD)'
    ],
    optionsEn: [
      'A. Scale 1 Part 1 Rate (7.5%)',
      'B. Scale 2 Standard Rates (Progressive up to 4.25%)',
      'C. Complete stamp duty exemption applies to all locals',
      'D. Uniform 15% Buyer Stamp Duty applies'
    ],
    answerIndex: 1,
    explanationZh: '香港永久性居民首置名下無其他住宅時，按第 2 標準稅率（Scale 2，舊稱第二標準）繳納 AVD，稅率由 100 元至最高 4.25% 不等。',
    explanationEn: 'HKPRs purchasing their only residential property pay ad valorem stamp duty at Scale 2 rates, progressively capped at 4.25%.',
    statuteRefZh: '《印花稅條例》(Cap. 117) 第 2 標準稅率',
    statuteRefEn: 'Stamp Duty Ordinance Cap. 117 Scale 2'
  },
  {
    id: 19,
    part: 'I',
    topicZh: '公契與大廈管理 (Cap. 344)',
    topicEn: 'Building Management (Cap. 344 & DMC)',
    questionZh: '業主立案法團 (Owners\' Corporation) 是依據香港法例哪一項條例註冊成立的法定法人組織？公契 (DMC) 對其全體業主具何種法律效力？',
    questionEn: 'Under which Ordinance is an Owners\' Corporation incorporated, and what legal effect does the Deed of Mutual Covenant (DMC) have on all owners?',
    optionsZh: [
      'A. 《建築物管理條例》(Cap. 344)；公契屬土地契約 (Covenant Running with Land)，對全體現有業主及繼承人均具絕對法律約束力',
      'B. 《公司條例》(Cap. 622)；公契僅約束最初一手買家',
      'C. 《社團條例》；公契屬自願指引，無強制約束力',
      'D. 《建築物條例》(Cap. 123)；法團無權執行公契條款'
    ],
    optionsEn: [
      'A. Building Management Ordinance (Cap. 344); DMC covenants run with the land and bind all current owners and successors in title',
      'B. Companies Ordinance (Cap. 622); DMC only binds original first-hand purchasers',
      'C. Societies Ordinance; DMC is voluntary guidance with no legal force',
      'D. Buildings Ordinance (Cap. 123); corporations cannot enforce DMC terms'
    ],
    answerIndex: 0,
    explanationZh: '法團依據 Cap. 344 成立；大廈公契是一份私人契約但其承諾隨土地轉移 (Run with the land)，對該地段全體不可分割份數共有人具永久約束力。',
    explanationEn: 'Owners Corporations are created under Cap. 344; DMC covenants run with the land, legally binding all current and successive undivided share owners.',
    statuteRefZh: '《建築物管理條例》(Cap. 344) 及 Cap. 219 s.41',
    statuteRefEn: 'Building Management Ordinance Cap. 344'
  },
  {
    id: 20,
    part: 'I',
    topicZh: '雙重代理披露責任 (Dual Agency)',
    topicEn: 'Dual Agency Disclosure (Cap. 511A s.13)',
    questionZh: '若同一地產代理在同一宗物業買賣中同時代表買賣雙方（Dual Agency），法律與 EAA 規例對佣金與身份披露有何嚴格要求？',
    questionEn: 'If an estate agent acts for both vendor and purchaser in the same transaction (Dual Agency), what statutory disclosure is mandated under Cap. 511A s.13?',
    optionsZh: [
      'A. 只要成交即自動合法，無需書面申報',
      'B. 代理必須在協議 Form 3 及 Form 4 內明確向雙方披露雙重代理身份，並披露向對家所收取的佣金金額或比率',
      'C. 代理不可向任何一方收取佣金',
      'D. 雙重代理在香港法律下屬絕對違法，代理會被直接吊銷牌照'
    ],
    optionsEn: [
      'A. Legal automatically upon closing without written notification',
      'B. Agent must disclose dual agency capacity in Form 3 and Form 4 to both parties and state the commission amount/rate charged to the counterparty',
      'C. The agent is prohibited from charging commissions to either principal',
      'D. Dual agency is illegal per se under HK law and triggers automatic revocation'
    ],
    answerIndex: 1,
    explanationZh: '《地產代理常規規例》第 13(1) 條規定：雙重代理必須在代理協議內書面披露，並必須向買賣雙方如實披露各自向對家收取的佣金款額。隱瞞雙重代理構成違反受信責任及紀律處分。',
    explanationEn: 'Under Cap. 511A s.13(1), dual agency is permitted only with full informed written consent and disclosure of commission payable by both sides.',
    statuteRefZh: '《地產代理常規規例》Cap. 511A 第 13 條',
    statuteRefEn: 'Estate Agents Practice Regulations Cap. 511A s.13'
  },

  // PART II - CASE 2 QUESTIONS (Paid / Admin Gated: Q21 - Q30)
  {
    id: 21,
    part: 'II',
    caseScenarioId: 'case-2',
    topicZh: '公司賣方雙重查冊 (Cap. 622)',
    topicEn: 'Corporate Charges & Dual Search (Cap. 622)',
    questionZh: '【Part II 個案題 - 個案二】在中環商業大廈個案中，賣方為 Apex Profits Limited。代理 Ken 僅進行了土地查冊而省略公司註冊處查冊。為何在香港物業買賣實務中，公司賣方必須遵循「雙重查冊原則 (Dual Search Rule)」？',
    questionEn: '[Part II Case Study - Case 2] In the Central Commercial Tower case, vendor is Apex Profits Limited. Ken only pulled land search and skipped Companies Registry search. Why is the "Dual Search Rule" mandatory for corporate vendors in HK conveyancing?',
    optionsZh: [
      'A. 因為公司註冊處收費比土地註冊處便宜',
      'B. 公司發行之浮動押記 (Floating Charge) 及未解除抵押負擔可能僅登記於公司註冊處，土地查冊無法顯示，浮動押記一旦結晶化將嚴重威脅買方業權',
      'C. 商業登記證 (BR) 可完全取代公司註冊處查冊',
      'D. 雙重查冊僅適用於住宅物業，商業物業無需進行'
    ],
    optionsEn: [
      'A. Companies Registry search fees are cheaper than the Land Registry',
      'B. Corporate floating charges and debentures may be registered solely at the Companies Registry without land registry registration; once crystallized, they severely impair title',
      'C. A Business Registration (BR) certificate automatically replaces the need for corporate search',
      'D. Dual searches apply only to domestic residential properties'
    ],
    answerIndex: 1,
    explanationZh: '根據《公司條例》(Cap. 622) 及 EAA 執業指引，有限公司的浮動押記（Floating Charge）在結晶化前通常不會在土地註冊處登記。若代理不查閱公司註冊處抵押登記冊，買方可能購入附帶未解除清償負擔的物業。',
    explanationEn: 'Under Cap. 622 and EAA Guidelines, corporate floating charges are recorded at the Companies Registry. Omitting this search exposes purchasers to encumbered titles upon debenture crystallization.',
    statuteRefZh: '《公司條例》(Cap. 622) 第 335 條及 EAA 執業指引',
    statuteRefEn: 'Companies Ordinance Cap. 622 s.335 & EAA Guidelines'
  },
  {
    id: 22,
    part: 'II',
    caseScenarioId: 'case-2',
    topicZh: '公司簽署契約法規 (Cap. 622 s.127)',
    topicEn: 'Execution by Company (Cap. 622 s.127)',
    questionZh: '【Part II 個案題 - 個案二】買方簽署正式合約前，買方律師需核實 Apex Profits Limited 的簽約授權。根據《公司條例》(Cap. 622) 第 127 條，有限公司在不使用公司印章 (Common Seal) 的情況下，可由何人有效代為簽立契約 (Deed)？',
    questionEn: '[Part II Case Study - Case 2] Under Cap. 622 s.127, in the absence of a common seal, how can a company validly execute a Deed under HK law?',
    optionsZh: [
      'A. 任何一名普通員工簽署均可',
      'B. 由該公司的兩名董事，或一名董事及一名公司秘書代表簽署（或若為單一董事公司則由該唯一董事簽署）',
      'C. 必須由公司全體股東一致簽名',
      'D. 地產代理可全權代表公司簽名代立'
    ],
    optionsEn: [
      'A. Any ordinary employee signature is legally sufficient',
      'B. Signed on behalf of the company by two directors, or one director and company secretary (or sole director if single-director company)',
      'C. Requires unanimous signatures from all registered shareholders',
      'D. The estate agent has statutory capacity to execute on behalf of the company'
    ],
    answerIndex: 1,
    explanationZh: '《公司條例》第 127(3) 條明訂：無印章之契約由 2 名董事或 1 名董事加公司秘書簽署即為法定有效簽立。',
    explanationEn: 'Under Cap. 622 s.127(3), a company validly executes a deed without seal if signed by two directors or by one director and company secretary.',
    statuteRefZh: '《公司條例》(Cap. 622) 第 127 條',
    statuteRefEn: 'Companies Ordinance Cap. 622 s.127'
  },
  {
    id: 23,
    part: 'II',
    caseScenarioId: 'case-2',
    topicZh: '浮動押記優先權 (Debentures)',
    topicEn: 'Floating Charge Priority (Cap. 622)',
    questionZh: '【Part II 個案題 - 個案二】若 Apex Profits Limited 在公司註冊處登記有一項包含「消極擔保條款 (Negative Pledge Clause)」的浮動押記，此條款對物業買賣有何重大法律後果？',
    questionEn: '[Part II Case Study - Case 2] If the floating charge includes a Negative Pledge Clause, what is the conveyancing impact on the transaction?',
    optionsZh: [
      'A. 買方完全不受影響，消極擔保僅屬內部通知',
      'B. 限制公司未經押記持有人同意出售或押記該物業；若買方律師已作查冊則被推定具推定知悉 (Constructive Notice)，物業業權可能受債權人追討',
      'C. 該物業地契年期自動縮短',
      'D. 買方無需繳付任何物業成交印花稅'
    ],
    optionsEn: [
      'A. The buyer is unaffected as negative pledges are purely internal matters',
      'B. Restricts disposal without debenture holder consent; registered search creates constructive notice, leaving title vulnerable to creditor enforcement',
      'C. The government lease automatically expires',
      'D. The purchaser is exempt from stamp duty obligations'
    ],
    answerIndex: 1,
    explanationZh: '消極擔保條款禁止公司處置物業或設定後續押記。經公司註冊處登記後，所有各方被視為具有法定知悉，違規出售無法向買家交付無產權負擔之良好業權 (Good Title)。',
    explanationEn: 'A registered negative pledge puts third parties on constructive notice. Conveying title without debenture consent breaches the vendor’s duty to give good title.',
    statuteRefZh: '《公司條例》(Cap. 622) 及普通法業權法理',
    statuteRefEn: 'Companies Ordinance Cap. 622'
  },
  {
    id: 24,
    part: 'II',
    caseScenarioId: 'case-2',
    topicZh: '商業物業佣金與表格適用 (Forms)',
    topicEn: 'Prescribed Forms for Non-Domestic Property',
    questionZh: '【Part II 個案題 - 個案二】中環商業大廈為純非住宅寫字樓。代理 Ken 在安排買賣時，是否必須使用法定 Form 3 或 Form 4 地產代理協議？',
    questionEn: '[Part II Case Study - Case 2] Central Commercial Tower is a non-domestic commercial property. Is agent Ken statutorily required to use Form 3 or Form 4 prescribed agreements?',
    optionsZh: [
      'A. 是，全香港所有物業買賣均強制使用 Form 3 / Form 4',
      'B. 否，《地產代理常規規例》第 3 條明訂法定表格一至六僅適用於住宅物業；非住宅物業可自由訂立普通法代理合約',
      'C. 商業物業禁止簽署任何地產代理協議',
      'D. 商業物業必須使用 Form CR109'
    ],
    optionsEn: [
      'A. Yes, all property sales in HK require Form 3 or 4 unconditionally',
      'B. No, Cap. 511A s.3 expressly limits Forms 1-6 to residential properties; commercial transactions use tailored non-statutory agency contracts',
      'C. Commercial properties are prohibited from using agency agreements',
      'D. Commercial sales mandate the use of Form CR109'
    ],
    answerIndex: 1,
    explanationZh: '核心考點：法定表格 1 至 6 嚴格僅適用於「香港住宅物業」。商業、工廈或農地不受法定 Form 限制，代理行可採用自訂之商業代理合約。',
    explanationEn: 'Under Cap. 511A s.3, prescribed Forms 1 to 6 apply exclusively to residential properties. Commercial transactions are not subject to statutory form requirements.',
    statuteRefZh: '《地產代理常規規例》Cap. 511A 第 3 條',
    statuteRefEn: 'Estate Agents Practice Regulations Cap. 511A s.3'
  },
  {
    id: 25,
    part: 'II',
    caseScenarioId: 'case-2',
    topicZh: '公司決議案驗證 (Board Resolution)',
    topicEn: 'Vendor Board Resolution Requirement',
    questionZh: '【Part II 個案題 - 個案二】代表買方洽購時，代理應促請買方律師索取賣方 Apex Profits Limited 的何種內部法定文件，以確認董事獲授權出售該高達 3800 萬的物業？',
    questionEn: '[Part II Case Study - Case 2] Which corporate governance document must the purchaser’s solicitor requisition to confirm director authority to sell the HK$38M asset?',
    optionsZh: [
      'A. 賣方董事會決議案 (Board Resolution) 批准出售並授權簽字人',
      'B. 公司員工通訊錄',
      'C. 只需要查看公司周年申報表 (NAR1)',
      'D. 商業登記證副本即可'
    ],
    optionsEn: [
      'A. Duly passed Board Resolution approving the disposal and empowering the signatories',
      'B. Corporate internal staff directory',
      'C. Annual Return (Form NAR1) alone is sufficient',
      'D. A copy of the Business Registration Certificate'
    ],
    answerIndex: 0,
    explanationZh: '物業轉易實務規定：處置公司主要固定資產必須通過董事會決議案 (Board Resolution) 明確授權，否則交易面臨超出權限 (Ultra Vires) 或股東挑戰風險。',
    explanationEn: 'Conveyancing practice requires a formal Board Resolution confirming approval of disposal and signatory authorization to establish good title.',
    statuteRefZh: '《公司條例》(Cap. 622) 及香港物業轉易實務守則',
    statuteRefEn: 'Companies Ordinance Cap. 622 & Conveyancing Practice'
  },

  // PART II - CASE 3 SAMPLES (Paid / Admin Gated: Q26 - Q30)
  {
    id: 26,
    part: 'II',
    caseScenarioId: 'case-3',
    topicZh: '海外授權書時效 (Cap. 31)',
    topicEn: 'Power of Attorney Validity (Cap. 31)',
    questionZh: '【Part II 個案題 - 個案三】在海景花園個案中，表妹李小姐持有陳先生的授權書簽約。代理 Rachel 指示買方直接將 100 萬訂金支票抬頭寫給李小姐個人。此做法有何重大法律與操守缺失？',
    questionEn: '[Part II Case Study - Case 3] In the Harborview Garden case, Ms. Li signed via Power of Attorney. Rachel instructed the buyer to draw a HK$1M cheque directly to Ms. Li. What is the fatal professional and legal flaw?',
    optionsZh: [
      'A. 表妹李小姐無權收取任何款項，除非授權書有明文特別授權 (Express Authority)，且因存在現存按揭及撤銷風險，訂金必須由賣方律師樓作為 Stakeholder 託管',
      'B. 支票必須抬頭寫給地產代理公司由代理轉發',
      'C. 授權書一旦登記在土地註冊處即永遠有效，無須理會按揭狀況',
      'D. 只要李小姐提供身份證，便可任意以個人名義收取所有樓價'
    ],
    optionsEn: [
      'A. An attorney has no implied authority to receive purchase monies personally unless expressly conferred; given the existing mortgage and revocation risk, deposits must be held by the vendor solicitor as stakeholder',
      'B. The cheque must be drawn payable to the estate agency company for onward transmission',
      'C. Registered powers of attorney remain valid indefinitely regardless of underlying mortgages',
      'D. Possessing an HKID card automatically confers full rights to collect sale proceeds personally'
    ],
    answerIndex: 0,
    explanationZh: '《授權書條例》(Cap. 31) 及 EAA 執業通告明確規定：獲授權人除非獲明文具體授權收取樓款，否則不可個人接收訂金。且物業尚有按揭登記 (UB71203)，所有訂金必須由賣方律師以保證金 (Stakeholder) 託管以確保能贖樓清繳。',
    explanationEn: 'Under Cap. 31 and EAA circulars, an attorney cannot receive monies personally without express power. With a subsisting mortgage, deposits must be held by the vendor solicitor as stakeholder.',
    statuteRefZh: '《授權書條例》(Cap. 31) 第 5 條及 EAA 執業通告',
    statuteRefEn: 'Powers of Attorney Ordinance (Cap. 31) s.5 & EAA Practice Circular'
  },
  {
    id: 27,
    part: 'II',
    caseScenarioId: 'case-3',
    topicZh: '授權書法定不撤銷誓章 (Statutory Declaration)',
    topicEn: 'Non-Revocation Statutory Declaration (Cap. 31)',
    questionZh: '【Part II 個案題 - 個案三】根據《授權書條例》(Cap. 31) 第 5 條，若授權書已簽立超過 12 個月，為保護買方免受授權人早已死亡或破產撤銷授權之風險，買方律師必須要求賣方提供何項法定文件？',
    questionEn: '[Part II Case Study - Case 3] Under Cap. 31 s.5, if a Power of Attorney is over 12 months old, which document must be provided to protect against revocation by death or bankruptcy?',
    optionsZh: [
      'A. 獲授權人簽署的「未撤銷法定誓章 (Statutory Declaration of Non-Revocation)」',
      'B. 授權人的出生證明書副本',
      'C. 授權人最新水電費單',
      'D. 獲授權人的工作履歷表'
    ],
    optionsEn: [
      'A. Statutory Declaration of Non-Revocation executed by the attorney',
      'B. Certified copy of the donor’s birth certificate',
      'C. Recent utility bill from the donor',
      'D. Curriculum vitae of the attorney'
    ],
    answerIndex: 0,
    explanationZh: '授權書簽署超過 12 個月時，買方必須取得授權人尚未撤銷該授權之法定誓章，否則無法證明授權有效，買方律師可提出業權質詢 (Requisition on Title)。',
    explanationEn: 'Under Cap. 31 s.5, if over 12 months have elapsed, a statutory declaration of non-revocation is essential to confer conclusive protection on purchasers.',
    statuteRefZh: '《授權書條例》(Cap. 31) 第 5 條',
    statuteRefEn: 'Powers of Attorney Ordinance Cap. 31 s.5'
  },
  {
    id: 28,
    part: 'II',
    caseScenarioId: 'case-3',
    topicZh: '破產查冊要求 (Bankruptcy Search Cap. 6)',
    topicEn: 'Bankruptcy Search Protocol (Cap. 6)',
    questionZh: '【Part II 個案題 - 個案三】代理 Rachel 未有替買方進行破產查冊 (Bankruptcy Search)。若登記業主陳先生在簽署臨時買賣合約前已被高等法院頒布破產令 (Bankruptcy Order)，該物業交易將產生何種法律後果？',
    questionEn: '[Part II Case Study - Case 3] Rachel omitted a Bankruptcy Search against Mr. Chan. If Mr. Chan was adjudicated bankrupt prior to the PASP, what is the legal consequence?',
    optionsZh: [
      'A. 交易不受影響，買方可直接接收物業',
      'B. 陳先生的所有物業業權已依法自動歸屬破產管理署署長 (Official Receiver) 或受託人；陳先生及李小姐均無權處置物業，該買賣合約完全無效',
      'C. 只要何先生支付了 100 萬訂金，何先生即自動成為法定業主',
      'D. 破產令只影響其銀行現金，不影響物業權益'
    ],
    optionsEn: [
      'A. The sale is completely unaffected and proceeds normally',
      'B. Title vests automatically in the Official Receiver/Trustee in Bankruptcy; both vendor and attorney have lost legal capacity, rendering the PASP void',
      'C. Paying HK$1M deposit automatically confers legal title onto the purchaser',
      'D. Bankruptcy orders only freeze cash deposits and have no bearing on landed real estate'
    ],
    answerIndex: 1,
    explanationZh: '《破產條例》(Cap. 6) 第 58 條明訂破產令頒布後，破產人全部財產即時歸屬受託人。未作破產查冊導致買方支付訂金予無權處置物業者，代理構成嚴重疏忽 (Professional Negligence)。',
    explanationEn: 'Under Cap. 6 s.58, bankruptcy divests the owner of title, vesting it in the Trustee. Omitting a bankruptcy search is gross negligence.',
    statuteRefZh: '《破產條例》(Cap. 6) 第 58 條及 EAA 執業指引',
    statuteRefEn: 'Bankruptcy Ordinance Cap. 6 s.58'
  },
  {
    id: 29,
    part: 'II',
    caseScenarioId: 'case-3',
    topicZh: '現存按揭與贖樓保證 (Mortgage Discharge)',
    topicEn: 'Existing Legal Charge & Stakeholder Duty',
    questionZh: '【Part II 個案題 - 個案三】查冊顯示物業尚有中銀香港按揭 (UB71203)。在香港標準臨時買賣合約條款中，為保障買方能順利取得「無產權負擔之業權」，訂金為何絕不能由賣方直接提取？',
    questionEn: '[Part II Case Study - Case 3] The Land Register displays an undischarged mortgage (UB71203). Why must all deposit monies be retained by the stakeholder rather than released to the vendor?',
    optionsZh: [
      'A. 保證律師樓有足夠利息收入',
      'B. 確保在正式成交時有足夠款項全數清繳現有銀行按揭欠款 (Redemption)，以取得法定解除按揭契約 (Discharge)，防止賣方挾款潛逃',
      'C. 銀行法例規定買家必須替賣方供款',
      'D. 商業合約並無此項慣例'
    ],
    optionsEn: [
      'A. To guarantee interest income for the stakeholder law firm',
      'B. To ensure sufficient funds are held in escrow to fully discharge the subsisting mortgage upon completion, safeguarding title from mortgagee repossession',
      'C. Banking regulations require purchasers to service the vendor’s mortgage',
      'D. There is no such stakeholder custom in Hong Kong conveyancing'
    ],
    answerIndex: 1,
    explanationZh: '物業有現存未清償按揭時，所有訂金必須由賣方律師樓作為 Stakeholder 託管，直至律師確認尾數足以贖樓為止，這是防止「負資產賣方挾訂逃遁」的關鍵法定保護。',
    explanationEn: 'Retaining deposits as stakeholder ensures sufficient funds exist to redeem the existing charge, protecting buyers from encumbered titles.',
    statuteRefZh: 'EAA 執業通告及香港律師會物業轉易指引',
    statuteRefEn: 'EAA Practice Circular & Law Society Conveyancing Guidelines'
  },
  {
    id: 30,
    part: 'II',
    caseScenarioId: 'case-3',
    topicZh: '海外簽署授權書公證 (Notarization)',
    topicEn: 'Overseas Power of Attorney Authentication',
    questionZh: '【Part II 個案題 - 個案三】業主陳先生長居加拿大溫哥華。該份授權書若要獲香港土地註冊處接納註冊及買方律師信納，通常必須經過何項海外公證驗證程序？',
    questionEn: '[Part II Case Study - Case 3] Mr. Chan signed the PoA in Vancouver, Canada. What overseas notarization or authentication is legally required for validity in Hong Kong?',
    optionsZh: [
      'A. 經當地公證人 (Notary Public) 公證簽署，並經中國駐當地使領館認證（或海牙公約海牙認證 Apostille）',
      'B. 只要寄普通平郵信件到香港即可',
      'C. 由加拿大地產經紀見證即可',
      'D. 加拿大簽署文件在香港一律無效'
    ],
    optionsEn: [
      'A. Attested by a Notary Public and apostilled under the Hague Apostille Convention or authenticated by consular seal',
      'B. Simple ordinary airmail transmission is legally sufficient',
      'C. Witnessing by a local Canadian real estate broker',
      'D. Documents executed in Canada have no legal recognition in Hong Kong'
    ],
    answerIndex: 0,
    explanationZh: '海外簽立之法律文書（如授權書）必須由當地合格公證人 (Notary Public) 見證，並附帶海牙加簽 (Apostille) 或使領館認證，以確立真確性。',
    explanationEn: 'Overseas powers of attorney require attestation by a Notary Public accompanied by an Apostille under the Hague Convention to be enforceable in HK.',
    statuteRefZh: '《授權書條例》(Cap. 31) 及香港土地註冊法規',
    statuteRefEn: 'Powers of Attorney Ordinance Cap. 31 & Land Registration practice'
  }
];

export async function GET(req: NextRequest) {
  try {
    // 1. Inspect Authorization Header or Session Cookie from client
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();

    // 2. Inspect Client User Email query/header if passed from Supabase client
    const clientUserEmail = req.headers.get('x-user-email') || '';

    // Check if the user is an authorized admin builder
    const isAdmin = ADMIN_EMAILS.includes(clientUserEmail.toLowerCase());

    // In a fully deployed Supabase auth system, verify JWT with SUPABASE_JWT_SECRET or supabase.auth.getUser()
    // For now: full access is granted if isAdmin is true or a valid token is provided
    const isProUser = isAdmin || token.length > 20;

    if (isProUser) {
      // Return the full 30 questions with complete details
      return NextResponse.json({
        success: true,
        userTier: isAdmin ? 'ADMIN_BUILDER' : 'PRO_SUBSCRIBER',
        totalAvailable: MASTER_QUESTIONS_SERVER.length,
        questions: MASTER_QUESTIONS_SERVER
      });
    }

    // FREE / GUEST TIER: Return Q1 - Q10 in full. For Q11 - Q30, return locked metadata stubs
    const sanitizedQuestions = MASTER_QUESTIONS_SERVER.map((q, idx) => {
      if (idx < 10) {
        // Questions 1 - 10: Fully visible
        return {
          ...q,
          isLocked: false
        };
      } else {
        // Questions 11 - 30: Locked teaser stubs (No questions, options, or answers leak to client)
        return {
          id: q.id,
          part: q.part,
          topicZh: q.topicZh,
          topicEn: q.topicEn,
          statuteRefZh: q.statuteRefZh,
          statuteRefEn: q.statuteRefEn,
          isLocked: true,
          // Placeholder stubs
          questionZh: '【PRO 專業版專屬考題】此題屬於 EAQE 資格考標準試題。請解鎖專業版以閱覽完整題幹、ABCD 選項及法規解析。',
          questionEn: '[PRO TIER EXCLUSIVE QUESTION] This official exam item is part of the complete standardized paper. Unlock PRO to inspect question stems, options, and statutory analysis.',
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
      }
    });

    return NextResponse.json({
      success: true,
      userTier: 'FREE_PREVIEW',
      freeLimit: 10,
      totalAvailable: MASTER_QUESTIONS_SERVER.length,
      questions: sanitizedQuestions
    });

  } catch (err: any) {
    console.error('Protected Mock Exam API Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}