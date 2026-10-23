// app/data/mockQuestions.ts

export type ExamDomainBatch =
  | 'CAP511'
  | 'CONVEYANCING'
  | 'TENANCY_BUILDINGS'
  | 'AGENCY_TORT'
  | 'POIM_CASE';

export interface MockQuestion {
  id: number;
  part: 'I' | 'II';
  trackApplicability?: 'BOTH' | 'EAQE_ONLY' | 'SQE_ONLY';
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
  isLocked?: boolean;
  lockReason?: 'REQUIRES_EAQE_UPGRADE' | 'REQUIRES_SUBSCRIPTION';
}

export interface CaseScenarioMeta {
  id: string;
  titleZh: string;
  titleEn: string;
  narrativeZh: string;
  narrativeEn: string;
  landSearch: {
    propertyZh: string[];
    propertyEn: string[];
    ownerZh: string[];
    ownerEn: string[];
    incumbrancesZh: string[];
    incumbrancesEn: string[];
  };
}

export const CASE_SCENARIOS: Record<string, CaseScenarioMeta> = {
  'case-1': {
    id: 'case-1',
    titleZh: '個案一：Smart Mansion 12 樓 B 室 (遺囑認證與清拆命令)',
    titleEn: 'Case 1: Flat B, 12/F, Smart Mansion (Probate & Removal Order)',
    narrativeZh: '業主何先生於 2023 年身故。其子溫先生以單獨遺囑執行人身分委託地產代理 Sunny 獨家放售。代理查冊發現有屋宇署第 24 條清拆命令，且露台存在未入則加建物。',
    narrativeEn: 'Registered owner passed away in 2023. Mr. Wan, acting as Sole Executor, instructs Sunny to sell. Land search reveals a Buildings Dept s.24 Removal Order and unauthorized balcony enclosure.',
    landSearch: {
      propertyZh: ['地段編號：IL 8920 (內地段第 8920 號)', '物業地址：九龍尖沙咀漆咸道 88 號 Smart Mansion 12 樓 B 室', '法定用途：住宅用途 (Domestic Purposes Only)', '不可分割份數：1/50th shares of IL 8920'],
      propertyEn: ['Lot No.: Inland Lot No. 8920', 'Address: Flat B, 12/F, Smart Mansion, 88 Chatham Road, TST, KLN', 'Permitted Use: Domestic Purposes Only', 'Undivided Shares: 1/50th parts or shares of and in IL 8920'],
      ownerZh: ['現任登記業主：溫先生 (Wan Chi Keung)', '身分性質：作為何先生遺產之單獨遺囑執行人 (As Sole Executor of Ho Estate)', '註冊摘要：Memorial UB99201 (Letters of Probate)', '代價款額：$0 (Transmission by Death)'],
      ownerEn: ['Current Registered Owner: Wan Chi Keung', 'Capacity: As Sole Executor of the Estate of Ho', 'Memorial: UB99201 (Letters of Probate)', 'Consideration: $0 (Transmission by Death)'],
      incumbrancesZh: ['1. 2018年5月10日 - 恆生銀行法定押記 (Memorial UB44012)', '2. 2022年9月15日 - 屋宇署第 24 條清拆命令 (UBW Balcony Enclosure, Memorial UB77341)'],
      incumbrancesEn: ['1. 10 May 2018 - Legal Charge in favour of Hang Seng Bank (Memorial UB44012)', '2. 15 Sep 2022 - Order under s.24 of Buildings Ordinance (UBW Balcony, Memorial UB77341)']
    }
  },
  'case-2': {
    id: 'case-2',
    titleZh: '個案二：中環商業中心 18 樓全層 (公司賣方與浮動押記)',
    titleEn: 'Case 2: 18/F, Central Commercial Tower (Corporate Vendor & Floating Charge)',
    narrativeZh: '業主為 Apex Profits Limited (香港註冊公司)，開價 3,800 萬出售。代理 Ken 查冊發現土地註冊處僅有渣打銀行按揭，但未查閱公司註冊處抵押登記冊。',
    narrativeEn: 'Vendor is Apex Profits Limited, asking HK$38M. Agent Ken conducted land registry search revealing a standard mortgage, but omitted Companies Registry search for floating charges.',
    landSearch: {
      propertyZh: ['地段編號：IL 1024 (內地段第 1024 號)', '物業地址：香港中環德輔道中 28 號 18 樓全層', '法定用途：非住宅/商業用途 (Commercial Office Only)', '不可分割份數：2/100th shares of IL 1024'],
      propertyEn: ['Lot No.: Inland Lot No. 1024', 'Address: 18/F, Central Commercial Tower, 28 Des Voeux Road, Central, HK', 'Permitted Use: Non-Domestic / Commercial Purposes Only', 'Undivided Shares: 2/100th parts or shares of and in IL 1024'],
      ownerZh: ['現任登記業主：Apex Profits Limited (頂點利潤有限公司)', '身分性質：法人團體 (Body Corporate)', '註冊摘要：Memorial UB88310', '代價款額：HK$32,000,000'],
      ownerEn: ['Current Registered Owner: Apex Profits Limited', 'Capacity: Body Corporate', 'Memorial: UB88310', 'Consideration: HK$32,000,000'],
      incumbrancesZh: ['1. 2019年3月22日 - 渣打銀行法定押記 (Memorial UB55123)', '2. 公司註冊處登記 - 浮動押記 (Floating Charge in favour of HSBC with Negative Pledge)'],
      incumbrancesEn: ['1. 22 Mar 2019 - Legal Charge in favour of Standard Commercial Bank (Memorial UB55123)', '2. Registered at Companies Registry - Debenture & Floating Charge with Negative Pledge Clause']
    }
  }
};

const PART_I_UNIQUE_DATA = [
  { qZh: "持牌地產代理變更營業地址或經理姓名後，須於幾多天內以書面通知 EAA？", qEn: "Within how many days must a licensed estate agent notify EAA of a business address or manager change?", optsZh: ["A. 7 天", "B. 14 天", "C. 31 天", "D. 60 天"], optsEn: ["A. 7 Days", "B. 14 Days", "C. 31 Days", "D. 60 Days"], ans: 2, refZh: "《地產代理條例》Cap. 511 s.40", refEn: "Cap. 511 s.40" },
  { qZh: "地產代理行收到客戶存款後，須於幾多天內開具收據並妥善保存紀錄幾多年？", qEn: "Within how many days must a deposit receipt be issued, and for how long must trust records be kept?", optsZh: ["A. 14 天內開收據，保存 3 年", "B. 7 天內開收據，保存 1 年", "C. 21 天內開收據，保存 5 年", "D. 30 天內開收據，保存 7 年"], optsEn: ["A. 14 days receipt, 3 years retention", "B. 7 days receipt, 1 year retention", "C. 21 days receipt, 5 years retention", "D. 30 days receipt, 7 years retention"], ans: 0, refZh: "《地產代理(客戶款項)規例》Cap. 511B", refEn: "Cap. 511B" },
  { qZh: "代理在向二手住宅物業準買家推介單位前，必須向買家提供並解釋哪一份法定表格？", qEn: "Which prescribed form must an agent provide and explain to a prospective buyer before property introduction?", optsZh: ["A. 表格一 (Form 1)", "B. 表格三 (Form 3)", "C. 表格四 (Form 4)", "D. 表格六 (Form 6)"], optsEn: ["A. Form 1", "B. Form 3", "C. Form 4", "D. Form 6"], ans: 0, refZh: "《地產代理常規規例》Cap. 511A", refEn: "Cap. 511A Form 1" },
  { qZh: "住宅租客拖欠租金達幾多天時，業主可根據法定隱含條件行使沒收租賃權 (Forfeiture)？", qEn: "After how many days of unpaid rent can a landlord exercise statutory implied forfeiture?", optsZh: ["A. 7 天", "B. 14 天", "C. 15 天", "D. 30 天"], optsEn: ["A. 7 Days", "B. 14 Days", "C. 15 Days", "D. 30 Days"], ans: 2, refZh: "《業主與租客(綜合)條例》Cap. 7", refEn: "Cap. 7 Part IV" },
  { qZh: "劏房規管租賃首期 2 年屆滿後，次期 2 年續租租金加幅上限為何？", qEn: "What is the ceiling cap for rent increase upon renewal of regulated subdivided unit tenancy?", optsZh: ["A. 5%", "B. 10% 或差估署私樓租金指數變動（以較低者為準）", "C. 15%", "D. 由業主隨意決定"], optsEn: ["A. 5%", "B. 10% or RVD index, whichever is lower", "C. 15%", "D. Discretionary"], ans: 1, refZh: "《業主與租客(綜合)條例》Part IVA", refEn: "Cap. 7 Part IVA" },
  { qZh: "甲、乙以「聯權共有」持有一單位，甲未經乙同意將其份額轉讓予丙。結果為何？", qEn: "A and B hold as Joint Tenants. A assigns share to C without B's consent. What is the result?", optsZh: ["A. 轉讓無效", "B. Severance 為分權共有 (Tenancy in Common)", "C. 乙獨佔全數業權", "D. 聯權共有維持"], optsEn: ["A. Void", "B. Severance into Tenancy in Common", "C. B absorbs sole title", "D. Joint tenancy remains"], ans: 1, refZh: "《物業轉易及物業條例》Cap. 219", refEn: "Cap. 219" },
  { qZh: "契約若在簽立後幾多個月內交付土地註冊處註冊，其優先權可追溯至簽立日生效？", qEn: "If a deed is registered within how many months of execution does priority relate back to execution date?", optsZh: ["A. 1 個月", "B. 2 個月", "C. 3 個月", "D. 6 個月"], optsEn: ["A. 1 Month", "B. 2 Months", "C. 3 Months", "D. 6 Months"], ans: 0, refZh: "《土地註冊條例》Cap. 128 s.5", refEn: "Cap. 128 s.5" },
  { qZh: "代理未得主事人事前書面同意，私下向對家收取非法回佣，觸犯哪項刑事罪行？", qEn: "Accepting secret commission from counterparty without principal consent breaches which Ordinance?", optsZh: ["A. 《防止賄賂條例》Cap. 201 s.9", "B. 盜竊罪", "C. 民事違約", "D. 行政罰款"], optsEn: ["A. Cap. 201 s.9 Corrupt transactions", "B. Theft Ordinance", "C. Civil breach", "D. Administrative fine"], ans: 0, refZh: "《防止賄賂條例》Cap. 201 s.9", refEn: "Cap. 201 s.9" },
  { qZh: "發展商開售一手住宅前，售樓說明書及價單分別須提前至少幾多天公佈？", qEn: "At least how many days before sale must first-hand sales brochures and price lists be made available?", optsZh: ["A. 售樓書 7 天前，價單 3 天前", "B. 售樓書 14 天前，價單 7 天前", "C. 售樓書 3 天前，價單 1 天前", "D. 30 天前"], optsEn: ["A. Sales brochure 7 days; Price list 3 days", "B. Sales brochure 14 days; Price list 7 days", "C. Sales brochure 3 days; Price list 1 day", "D. 30 days"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621", refEn: "Cap. 621" },
  { qZh: "簽署一手樓 PASP 後 5 個工作天內撤回交易，賣方最多可沒收幾多訂金？", qEn: "If buyer withdraws within 5 working days after signing a PASP, how much deposit can be forfeited?", optsZh: ["A. 樓價 5% 臨時訂金", "B. 全數 10%", "C. 無權沒收", "D. 2.5%"], optsEn: ["A. Forfeit 5% preliminary deposit only", "B. Forfeit full 10%", "C. No forfeiture", "D. 2.5%"], ans: 0, refZh: "《一手住宅物業銷售條例》Cap. 621 s.53", refEn: "Cap. 621 s.53" }
];

const PART_II_20_UNIQUE = [
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q81】審視 Smart Mansion 土地查冊報告。代理 Sunny 發現屋宇署第 24 條清拆命令，賣方指示隱瞞。Sunny 最符合法規的做法為何？", qEn: "[Part II Case 1 • Q81] Inspecting Smart Mansion Land Search. Sunny finds a s.24 Removal Order. Vendor instructs non-disclosure. What is Sunny's duty?", optsZh: ["A. 遵從賣方指示不予披露", "B. 必須向買方全面披露清拆令並於臨約特別條款記載", "C. 建議買方自行評估風險", "D. 私下為賣方拆除僭建"], optsEn: ["A. Comply with vendor", "B. Mandatory disclosure to purchaser in PASP", "C. Advise buyer self-assessment", "D. Privately dismantle UBW"], ans: 1, refZh: "《地產代理常規規例》Cap. 511A s.9", refEn: "Cap. 511A s.9" },
  { scenarioId: 'case-1', qZh: "【Part II 個案一 • Q82】溫先生以單獨遺囑執行人身分簽臨約。買方律師要求查閱 Letters of Probate 主要目的為何？", qEn: "[Part II Case 1 • Q82] Mr. Wan signs as Sole Executor. Why does buyer's solicitor require Letters of Probate?", optsZh: ["A. 核實溫先生具備處置物業之合法遺產管理權限", "B. 核實死亡證真偽", "C. 檢查遺產扣稅額", "D. 評估印花稅"], optsEn: ["A. Confirm legal authority to dispose estate property", "B. Verify death certificate", "C. Inspect tax deduction", "D. Calculate stamp duty"], ans: 0, refZh: "《遺囑認證及遺產管理條例》Cap. 10", refEn: "Cap. 10" },
  { scenarioId: 'case-2', qZh: "【Part II 個案二 • Q91】賣方 Apex Profits Limited 屬公司。代理 Ken 僅進行土地查冊，遺漏公司註冊處 (CR) 查冊，有何風險？", qEn: "[Part II Case 2 • Q91] Vendor is a company. Agent Ken omitted Companies Registry search. What risk is exposed?", optsZh: ["A. 遺漏未於土地註冊處登記之浮動押記 (Floating Charge) 及 Negative Pledge 限制", "B. 遺漏差餉紀錄", "C. 遺漏水電費紀錄", "D. 無任何風險"], optsEn: ["A. Omission of unregistered Floating Charge with Negative Pledge at Land Registry", "B. Omission of rates", "C. Omission of utility bills", "D. No risk"], ans: 0, refZh: "《公司條例》Cap. 622", refEn: "Cap. 622" }
];

export const CLIENT_FALLBACK_QUESTIONS: MockQuestion[] = [
  ...PART_I_UNIQUE_DATA.map((item, idx) => ({
    id: idx + 1,
    part: 'I' as const,
    trackApplicability: ((idx + 1) % 3 === 0 ? 'EAQE_ONLY' : 'BOTH') as 'EAQE_ONLY' | 'BOTH',
    topicZh: item.refZh,
    topicEn: item.refEn,
    questionZh: item.qZh,
    questionEn: item.qEn,
    optionsZh: item.optsZh,
    optionsEn: item.optsEn,
    answerIndex: item.ans,
    explanationZh: `根據香港相關法例（${item.refZh}），此題答案為 ${item.optsZh[item.ans]}。`,
    explanationEn: `Under Hong Kong property law (${item.refEn}), the correct statutory answer is ${item.optsEn[item.ans]}.`,
    statuteRefZh: item.refZh,
    statuteRefEn: item.refEn,
    isLocked: false
  })),
  ...PART_II_20_UNIQUE.map((item, idx) => ({
    id: idx + 81,
    part: 'II' as const,
    trackApplicability: 'BOTH' as const,
    caseScenarioId: item.scenarioId,
    topicZh: item.refZh,
    topicEn: item.refEn,
    questionZh: item.qZh,
    questionEn: item.qEn,
    optionsZh: item.optsZh,
    optionsEn: item.optsEn,
    answerIndex: item.ans,
    explanationZh: `根據土地查冊紀錄及法規依據（${item.refZh}），此題答案為 ${item.optsZh[item.ans]}。`,
    explanationEn: `Based on Land Search records and statutory authority (${item.refEn}), the correct answer is ${item.optsEn[item.ans]}.`,
    statuteRefZh: item.refZh,
    statuteRefEn: item.refEn,
    isLocked: false
  }))
];