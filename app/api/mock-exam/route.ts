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

const MASTER_QUESTIONS: MockQuestionServer[] = [
  // --- PART I: STATUTORY MCQS (Q1 - Q30) ---
  {
    id: 1,
    part: 'I',
    trackApplicability: 'BOTH',
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
    trackApplicability: 'BOTH',
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
    trackApplicability: 'BOTH',
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
  {
    id: 4,
    part: 'I',
    trackApplicability: 'BOTH',
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
    trackApplicability: 'BOTH',
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
  {
    id: 6,
    part: 'I',
    trackApplicability: 'BOTH',
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
  {
    id: 7,
    part: 'I',
    trackApplicability: 'BOTH',
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
    trackApplicability: 'BOTH',
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
  {
    id: 9,
    part: 'I',
    trackApplicability: 'BOTH',
    topicZh: '廣告常規守則 (Cap. 511A s.9)',
    topicEn: 'Advertising Rules (Cap. 511A s.9)',
    questionZh: '持牌地產代理在刊登二手住宅物業廣告前，必須取得下列哪一項法定要件方為合法合規？',
    questionEn: 'Before publishing an advertisement for a second-hand residential property, which statutory requirement must the licensee obtain?',
    optionsZh: [
      'A. 業主口頭通知即足夠',
      'B. 經有效簽立之地產代理協議（Form 3）及業主的明確書面准許',
      'C. 僅需向地產代理監管局報備廣告標題',
      'D. 只需取得大廈物業管理處通行證'
    ],
    optionsEn: [
      'A. Verbal confirmation from the owner is legally sufficient',
      'B. A validly executed Estate Agency Agreement (Form 3) and express written authorization from the vendor',
      'C. Advance submission of advertisement headlines to EAA',
      'D. A building management pass issued by the estate manager'
    ],
    answerIndex: 1,
    explanationZh: '根據 Cap. 511A 第 9 條，發布任何出售物業廣告前必須已訂立有效 Form 3 出售協議並取得業主之書面指示與同意，且廣告刊登價格不得低於業主指定價。',
    explanationEn: 'Under Cap. 511A s.9, an agent must have a valid Form 3 agreement and express written consent from the vendor before advertising.',
    statuteRefZh: '《地產代理常規規例》第 9 條',
    statuteRefEn: 'Estate Agents Practice Regulations s.9'
  },
  {
    id: 10,
    part: 'I',
    trackApplicability: 'BOTH',
    topicZh: '臨時買賣合約效力 (Contract Law)',
    topicEn: 'PASP Legal Binding Nature (Contract Law)',
    questionZh: '在香港物業買賣實務中，買賣雙方簽署的「臨時買賣合約 (PASP)」具備何種法律效力？',
    questionEn: 'In Hong Kong conveyancing practice, what legal status does a Preliminary Agreement for Sale and Purchase (PASP) hold?',
    optionsZh: [
      'A. 僅屬沒有法律約束力的初步意向書 (Letter of Intent)',
      'B. 只要符合要約、承諾、對價及法律意圖四大要素，即構成具備完全法律約束力的合法合約',
      'C. 必須待正式買賣合約簽署後，臨時合約方產生法律效力',
      'D. 買賣雙方均可隨時無條件撤回而不負任何民事責任'
    ],
    optionsEn: [
      'A. Pure non-binding Letter of Intent with no legal enforceability',
      'B. A fully legally binding contract once offer, acceptance, consideration, and intention to create legal relations are present',
      'C. Legal effect is held in abeyance until execution of formal Agreement for Sale and Purchase',
      'D. Either party may retract unilaterally without civil liability'
    ],
    answerIndex: 1,
    explanationZh: '香港判例法確立：臨時買賣合約是完全具約束力的法律文件。除非合約明文載有 Escape Clause（如必買必賣或賠訂限制條款），否則受害方可向法庭申請強制履行合約 (Specific Performance)。',
    explanationEn: 'Under HK contract law, a PASP is a binding contract. Parties cannot withdraw freely unless an express escape clause applies.',
    statuteRefZh: '香港普通法合約原則及 EAA 執業指引',
    statuteRefEn: 'Hong Kong Common Law & EAA Practice Circulars'
  },
  {
    id: 11,
    part: 'I',
    trackApplicability: 'EAQE_ONLY',
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
    trackApplicability: 'EAQE_ONLY',
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
    trackApplicability: 'EAQE_ONLY',
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
    id: 14,
    part: 'I',
    trackApplicability: 'EAQE_ONLY',
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
    id: 15,
    part: 'I',
    trackApplicability: 'EAQE_ONLY',
    topicZh: '授權書有效性 (Cap. 31)',
    topicEn: 'Powers of Attorney (Cap. 31)',
    questionZh: '業主委託受權人簽立物業買賣契約。根據香港《授權書條例》(Cap. 31)，除非屬於不可撤銷之具對價授權書，一般授權書在下列何種法定情況下將自動即時失效？',
    questionEn: 'Under the Powers of Attorney Ordinance (Cap. 31), in which statutory circumstance is an ordinary power of attorney revoked by operation of law?',
    optionsZh: [
      'A. 授權人出國旅遊滿 14 天',
      'B. 授權人死亡、破產或精神無行為能力 (Mental Incapacity)',
      'C. 物業估價下跌超過 20%',
      'D. 買方委任之律師樓更換合夥人'
    ],
    optionsEn: [
      'A. Donor travels abroad for more than 14 days',
      'B. Donor dies, becomes bankrupt, or suffers mental incapacity',
      'C. Property market valuation drops by over 20%',
      'D. The purchaser changes solicitor representation'
    ],
    answerIndex: 1,
    explanationZh: '根據 Cap. 31，普通授權書在授權人身故、破產或失去精神行為能力時自動終止。地產代理安排簽約前必須確認授權書仍完全有效。',
    explanationEn: 'Under Cap. 31, an ordinary power of attorney terminates automatically upon the donor’s death, bankruptcy, or mental incapacity.',
    statuteRefZh: '《授權書條例》(Cap. 31) 第 5 條',
    statuteRefEn: 'Powers of Attorney Ordinance Cap. 31 s.5'
  },
  {
    id: 16,
    part: 'I',
    trackApplicability: 'SQE_ONLY',
    topicZh: '營業員從業權限 (Cap. 511 s.16)',
    topicEn: 'Salesperson Authority (Cap. 511 s.16)',
    questionZh: '持牌營業員 (Salesperson Licensee) 在香港地產代理日常執業過程中，下列哪一項行為屬於條例所明確禁止的越權行為？',
    questionEn: 'Under Cap. 511 s.16, which of the following acts is strictly prohibited for a licensed salesperson acting in that capacity?',
    optionsZh: [
      'A. 陪同準買家進行現場實地視察單位',
      'B. 以獨資經營人 (Sole Proprietor) 或合夥人身分自行經營地產代理業務',
      'C. 協助客戶填寫 Form 1 物業資料單',
      'D. 介紹二手租賃盤源予準租客'
    ],
    optionsEn: [
      'A. Accompanying prospective purchasers to conduct site inspections',
      'B. Carrying on estate agency business on one’s own account as a sole proprietor or partner',
      'C. Assisting clients to complete Form 1 Property Information Forms',
      'D. Introducing secondary rental listings to prospective tenants'
    ],
    answerIndex: 1,
    explanationZh: '《地產代理條例》第 16 條規定：營業員牌照持有人僅可受聘於持牌地產代理行工作，嚴禁以獨資或合夥人身分自立門戶經營地產代理業務。',
    explanationEn: 'Under Cap. 511 s.16, a salesperson is only permitted to perform estate agency work as an employee of a licensed agent and cannot practice on their own account.',
    statuteRefZh: '《地產代理條例》Cap. 511 第 16 條',
    statuteRefEn: 'Estate Agents Ordinance Cap. 511 s.16'
  },
  {
    id: 17,
    part: 'I',
    trackApplicability: 'SQE_ONLY',
    topicZh: '代理協議有效期 (Cap. 511A s.6)',
    topicEn: 'Validity of Agency Agreement (Cap. 511A s.6)',
    questionZh: '根據《地產代理常規規例》，地產代理與住宅物業買方或賣方所簽立的代理協議（Form 3 至 6），其法定有效期限最長不得超過多久？',
    questionEn: 'Under Cap. 511A s.6, what is the maximum statutory period of validity for prescribed residential agency agreements (Forms 3 to 6)?',
    optionsZh: ['A. 1 個月', 'B. 3 個月', 'C. 6 個月', 'D. 12 個月'],
    optionsEn: ['A. 1 Month', 'B. 3 Months', 'C. 6 Months', 'D. 12 Months'],
    answerIndex: 1,
    explanationZh: 'Cap. 511A 明確規定，地產代理協議（Form 3, 4, 5, 6）之有效期限最長為 3 個月。期滿若需續約，雙方必須重新簽署協議。',
    explanationEn: 'Under Cap. 511A, the statutory maximum duration of an estate agency agreement for residential property is 3 months.',
    statuteRefZh: '《地產代理常規規例》Cap. 511A 第 6 條',
    statuteRefEn: 'Estate Agents Practice Regulations Cap. 511A s.6'
  },
  {
    id: 18,
    part: 'I',
    trackApplicability: 'SQE_ONLY',
    topicZh: '看樓前簽約常規 (Cap. 511A)',
    topicEn: 'Pre-Inspection Agreement (Cap. 511A)',
    questionZh: '營業員在帶領準買家進入物業現場視察前，必須要求買家簽署哪一份法定表格，以確立委任代理關係並訂明佣金條款？',
    questionEn: 'Before leading a prospective buyer to inspect a residential property, which statutory agreement must the salesperson execute with the buyer?',
    optionsZh: [
      'A. 表格一 (Form 1)',
      'B. 表格四 (Form 4 - 購買香港住宅物業地產代理協議)',
      'C. 表格五 (Form 5)',
      'D. 僅需出示名片無需簽立任何表格'
    ],
    optionsEn: [
      'A. Form 1',
      'B. Form 4 (Estate Agency Agreement for Purchase of Residential Property)',
      'C. Form 5',
      'D. Business card presentation only with no written agreement'
    ],
    answerIndex: 1,
    explanationZh: '《地產代理常規規例》規定代理人在引導買家睇樓前，必須簽署 Form 4，清楚訂明佣金收費率、委託期限及雙重代理披露。',
    explanationEn: 'Under Cap. 511A, agents must execute Form 4 with buyers prior to property inspection.',
    statuteRefZh: '《地產代理常規規例》Cap. 511A 表格四',
    statuteRefEn: 'Estate Agents Practice Regulations Form 4'
  },
  {
    id: 19,
    part: 'I',
    trackApplicability: 'BOTH',
    topicZh: '破產條例與物業交易 (Cap. 6)',
    topicEn: 'Bankruptcy & Conveyancing (Cap. 6)',
    questionZh: '若賣方在簽署正式買賣合約前已被債權人提交破產呈請 (Bankruptcy Petition)。地產代理知悉後，最妥善之專業處理為何？',
    questionEn: 'If a vendor is subject to a pending Bankruptcy Petition prior to signing formal ASP, what is the agent’s correct professional duty?',
    optionsZh: [
      'A. 隱瞞該呈請並敦促買方即日繳付全數樓價',
      'B. 立即通知買方及律師，並建議所有訂金由買方律師託管，因破產呈請後的處置可能被破產管理署判定無效',
      'C. 代理可自行扣起 20% 作為佣金保障',
      'D. 破產呈請對物業產權毫無影響，無需處理'
    ],
    optionsEn: [
      'A. Conceal the petition and urge buyer to pay full price immediately',
      'B. Immediately notify buyer and solicitor; advise deposit stakeholding as dispositions post-petition are void against trustee in bankruptcy',
      'C. Agent unilaterally retains 20% commission safeguard',
      'D. Petitions bear no effect on conveyancing title'
    ],
    answerIndex: 1,
    explanationZh: '《破產條例》(Cap. 6) 規定破產呈請後債務人之財產處置可能無效。代理有受信責任提醒買方潛在業權陷阱並建議訂金由律師託管。',
    explanationEn: 'Under Cap. 6, dispositions after a petition are void against the trustee in bankruptcy. Stakeholding and title warnings are mandatory.',
    statuteRefZh: '《破產條例》(Cap. 6) 及 EAA 操守準則',
    statuteRefEn: 'Bankruptcy Ordinance Cap. 6 & EAA Code'
  },
  {
    id: 20,
    part: 'I',
    trackApplicability: 'BOTH',
    topicZh: '個人資料（私隱）條例 (Cap. 486)',
    topicEn: 'Personal Data Protection (Cap. 486)',
    questionZh: '地產代理收集準買家之身份證副本及入息證明後，下列哪一項行為違反《個人資料（私隱）條例》(Cap. 486)？',
    questionEn: 'Under the Personal Data (Privacy) Ordinance (Cap. 486), which of the following acts by an estate agent is illegal?',
    optionsZh: [
      'A. 僅供申請按揭用途使用',
      'B. 未得客戶明確書面同意，將客戶個人電話號碼轉售予裝修公司作直銷推廣',
      'C. 存放於設有密碼之代理行伺服器',
      'D. 交易完成後按法定要求妥善存檔保存'
    ],
    optionsEn: [
      'A. Use strictly for bank mortgage application',
      'B. Disclosing or selling client phone contacts to renovation contractors for direct marketing without explicit consent',
      'C. Encrypting data on agency secure servers',
      'D. Retaining records according to statutory rules'
    ],
    answerIndex: 1,
    explanationZh: 'Cap. 486 嚴禁在未經當事人明確同意下將個人資料用於直銷 (Direct Marketing) 或移轉第三方，違者屬嚴重刑事罪行。',
    explanationEn: 'Under Cap. 486, unauthorized disclosure of client personal data for direct marketing is a serious criminal offence.',
    statuteRefZh: '《個人資料（私隱）條例》Cap. 486 第 35 條',
    statuteRefEn: 'Personal Data (Privacy) Ordinance Cap. 486 s.35'
  },

  // --- PART II: CASE 1 (SMART MANSION PROBATE & BD S.24 ORDER - Q31 to Q40) ---
  {
    id: 31,
    part: 'II',
    trackApplicability: 'BOTH',
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
    id: 32,
    part: 'II',
    trackApplicability: 'BOTH',
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
  {
    id: 33,
    part: 'II',
    trackApplicability: 'BOTH',
    caseScenarioId: 'case-1',
    topicZh: '按揭代理解釋責任 (Cap. 219)',
    topicEn: 'Mortgage & Legal Charge Requisitions',
    questionZh: '【Part II 個案題 - 個案一】查冊中登記之恆生銀行按揭 (Memorial UB44012) 仍未解除。在簽立合約時，合約條款通常如何確保買方在成交時取得優良業權 (Good Title)？',
    questionEn: '[Part II Case Study - Case 1] Memorial UB44012 Legal Charge is undischarged. How does the contract ensure the purchaser receives good title upon completion?',
    optionsZh: [
      'A. 買方必須連同該未償還按揭一併承受',
      'B. 賣方承諾在完成交易當日或之前，出具由銀行簽立之解除法定押記契據 (Deed of Release / Receipt)',
      'C. 銀行按揭在簽約後自動宣告無效',
      'D. 買方需向土地註冊處直接支付代價'
    ],
    optionsEn: [
      'A. Purchaser must take title subject to existing legal charge',
      'B. Vendor undertakes to deliver a valid Deed of Release or receipt discharging the charge upon completion',
      'C. Charges void automatically upon execution of PASP',
      'D. Purchaser pays consideration directly to Land Registry'
    ],
    answerIndex: 1,
    explanationZh: '賣方有合約義務提供無產權負擔的優良業權，成交時必須提供有效 Deed of Release 解除按揭。',
    explanationEn: 'Vendors are contractually bound to deliver title free from encumbrances via an executed Deed of Release upon completion.',
    statuteRefZh: '《物業轉易及物業條例》(Cap. 219)',
    statuteRefEn: 'Conveyancing and Property Ordinance Cap. 219'
  },
  {
    id: 34,
    part: 'II',
    trackApplicability: 'BOTH',
    caseScenarioId: 'case-1',
    topicZh: '清拆令還原費用承擔 (Contract Terms)',
    topicEn: 'Apportionment of Rectification Costs',
    questionZh: '【Part II 個案題 - 個案一】合約若未有明文特約條款，對於簽約前已登記的屋宇署清拆令之還原工程費用，法律責任原則上歸於何方？',
    questionEn: '[Part II Case Study - Case 1] In the absence of an express special condition, who is legally responsible for rectification costs of a pre-existing registered s.24 order?',
    optionsZh: [
      'A. 賣方負全責在完成前清拆還原並註銷命令',
      'B. 買方在簽約後自動無條件承擔所有費用',
      'C. 地產代理承擔 50% 維修費',
      'D. 建築事務監督承擔全部工程開支'
    ],
    optionsEn: [
      'A. Vendor bears full legal responsibility to rectify and discharge prior to completion',
      'B. Purchaser assumes all expenses unconditionally upon signing',
      'C. Estate agency contributes 50% of remedial costs',
      'D. Building Authority finances the entire remediation'
    ],
    answerIndex: 0,
    explanationZh: '合約簽立前已存在的建築命令屬產權瑕疵，賣方有責任完成前清拆還原並向屋宇署取得滿意紙註銷命令，否則買方律師有權提出業權質詢 (Requisition on Title)。',
    explanationEn: 'Pre-existing building orders constitute defects in title; the vendor must remediate at their own cost to satisfy requisitions.',
    statuteRefZh: '普通法轉易原則及物業買賣標準條件',
    statuteRefEn: 'Standard Conditions of Sale & Title Law'
  },

  // --- PART II: CASE 2 (CENTRAL COMMERCIAL TOWER - Q41 to Q50) ---
  {
    id: 41,
    part: 'II',
    trackApplicability: 'EAQE_ONLY',
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
    id: 42,
    part: 'II',
    trackApplicability: 'EAQE_ONLY',
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
    id: 43,
    part: 'II',
    trackApplicability: 'EAQE_ONLY',
    caseScenarioId: 'case-2',
    topicZh: '商業物業印花稅及過戶 (Cap. 117)',
    topicEn: 'Stamp Duty on Non-Residential Property',
    questionZh: '【Part II 個案題 - 個案二】中環商業寫字樓成交價 3,800 萬港元。根據香港《印花稅條例》(Cap. 117)，買方律師在計算非住宅物業從價印花稅 (AVD Scale 2) 時，該契約應於何時交付印花稅署加蓋印花？',
    questionEn: '[Part II Case Study - Case 2] Purchase price is HK$38M. Under Cap. 117, when must the agreement be stamped?',
    optionsZh: [
      'A. 必須於簽署臨時買賣合約後 14 天內交付加蓋印花',
      'B. 正式買賣合約簽署後 30 天內加蓋印花',
      'C. 可延遲至交易完成後 1 年內',
      'D. 商業物業永久豁免加蓋印花稅'
    ],
    optionsEn: [
      'A. Within 14 days of PASP execution',
      'B. Within 30 days of formal agreement execution',
      'C. Deferred up to 1 year post-completion',
      'D. Non-residential properties are permanently exempt'
    ],
    answerIndex: 1,
    explanationZh: '非住宅物業買賣合約須於簽立後 30 天內交付印花稅署加蓋從價印花稅 (AVD Scale 2)。',
    explanationEn: 'Under Cap. 117, agreements for non-residential properties must be stamped within 30 days of execution.',
    statuteRefZh: '《印花稅條例》(Cap. 117) 第 19 條',
    statuteRefEn: 'Stamp Duty Ordinance Cap. 117 s.19'
  },
  {
    id: 44,
    part: 'II',
    trackApplicability: 'EAQE_ONLY',
    caseScenarioId: 'case-2',
    topicZh: '大廈公契商業用途限制 (DMC Permitted Use)',
    topicEn: 'DMC Permitted User Covenants',
    questionZh: '【Part II 個案題 - 個案二】買方擬將中環寫字樓改建為醫療診所或零售補習社。地產代理 Ken 在推介時最應查驗下列哪項法定文件，以防違反公契及法定用途限制？',
    questionEn: '[Part II Case Study - Case 2] Purchaser intends to convert office into medical clinic or retail tutoring. Which document must agent Ken verify regarding permitted user?',
    optionsZh: [
      'A. 僅需物業宣傳單張',
      'B. 查閱大廈公契 (DMC) 條款、入伙紙 (Occupation Permit) 及政府租契 (Government Lease) 之用途限制',
      'C. 鄰近商業大廈管業處通告',
      'D. 僅需查詢賣方口頭意向'
    ],
    optionsEn: [
      'A. Promotional brochures only',
      'B. Terms of the Deed of Mutual Covenant (DMC), Occupation Permit (OP), and Government Lease user clauses',
      'C. Notices issued by neighboring management offices',
      'D. Oral representations from the vendor'
    ],
    answerIndex: 1,
    explanationZh: '物業改動用途必須符合三重限制：政府租契、大廈公契 (DMC) 及入伙紙 (OP)。代理有責任查核相關條款並提醒買方申請指明牌照。',
    explanationEn: 'Permitted user is governed triple-fold by Government Lease, DMC, and Occupation Permit. Verification is an essential duty.',
    statuteRefZh: '《建築物條例》(Cap. 123) 及公契法規',
    statuteRefEn: 'Buildings Ordinance Cap. 123 & DMC Law'
  }
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedTrack = (searchParams.get('track') || 'EAQE').toUpperCase() as 'EAQE' | 'SQE';

    // 1. Inspect Authorization Header, Session Token, or Supabase Cookie
    const authHeader = req.headers.get('authorization') || '';
    const bearerToken = authHeader.replace('Bearer ', '').trim();

    // 2. Read explicit user email header passed from client
    const dynamicClientEmail = (req.headers.get('x-user-email') || '').toLowerCase().trim();

    // 3. Inspect user tier header passed from client
    const dynamicClaimedTier = (req.headers.get('x-user-tier') || '').toUpperCase().trim();

    // 4. Resolve Identity: Verify against Admin / Builder bypass list
    const isAdmin = dynamicClientEmail.length > 0 && ADMIN_EMAILS.includes(dynamicClientEmail);

    let effectiveTier: UserSubscriptionTier = 'FREE_PREVIEW';

    if (isAdmin) {
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

    // Determine authorization per track:
    const isAuthorizedForEAQE =
      effectiveTier === 'ADMIN_BUILDER' ||
      effectiveTier === 'ALL_ACCESS_PRO' ||
      effectiveTier === 'EAQE_PRO';

    const isAuthorizedForSQE =
      isAuthorizedForEAQE || effectiveTier === 'SQE_PRO';

    const isAuthorizedForRequestedTrack =
      requestedTrack === 'EAQE' ? isAuthorizedForEAQE : isAuthorizedForSQE;

    // Filter master questions relevant to requested track
    const trackRelevantQuestions = MASTER_QUESTIONS.filter((q) => {
      if (requestedTrack === 'SQE') {
        return q.trackApplicability === 'BOTH' || q.trackApplicability === 'SQE_ONLY';
      }
      return q.trackApplicability === 'BOTH' || q.trackApplicability === 'EAQE_ONLY';
    });

    // If fully authorized for this specific track (or Admin Builder), deliver all content unlocked
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

    // IF NOT AUTHORIZED (Free Preview Mode):
    // Deliver first 10 questions free as diagnostic preview; lock all questions 11+ with upgrade stubs
    const sanitizedQuestions = trackRelevantQuestions.map((q, idx) => {
      if (idx < 10) {
        return {
          ...q,
          isLocked: false
        };
      }

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
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}