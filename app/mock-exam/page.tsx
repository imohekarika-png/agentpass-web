'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Building2,
  Flag,
  HelpCircle,
  BarChart3,
  ListOrdered,
  Eye,
  Check,
  ChevronRight,
  Globe
} from 'lucide-react';


export interface ExamQuestion {
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

export interface CaseScenario {
  id: string;
  titleZh: string;
  titleEn: string;
  badgeZh: string;
  badgeEn: string;
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


const CASE_SCENARIOS: Record<string, CaseScenario> = {
  'case-1': {
    id: 'case-1',
    titleZh: '個案一：遺囑執行人與屋宇署清拆令 (Smart Mansion)',
    titleEn: 'Case 1: Sole Executor & Buildings Dept Removal Order (Smart Mansion)',
    badgeZh: '遺產物業 / Cap. 123 s.24 違建',
    badgeEn: 'Probate Estate / Cap. 123 s.24 UBW',
    narrativeZh: 'Mr. Wan 作為旺角聰明大廈 (Smart Mansion) 12 樓 B 室單位之單獨遺囑執行人 (Sole Executor)，委託 Smart Agency 地產代理 Sunny 以 $8,000,000 出售該物業。買方 Polly 經 Sunny 視察物業。Sunny 在查冊中知悉陽台設有未經批准之違例建築工程 (UBW) 及屋宇署清拆令，但向 Polly 聲稱「大廈普遍皆有，銀行按揭一般不受影響」。',
    narrativeEn: 'Mr. Wan acts as the sole executor for Flat B, 12/F, Smart Mansion. Vendor instructed agent Sunny of Smart Agency to market the unit at $8,000,000. Purchaser Polly inspected the property via Sunny. Sunny noted an active Buildings Dept removal order for unauthorized balcony works on the land search, but represented to Polly that "everyone does it and banks rarely refuse mortgages".',
    landSearch: {
      propertyZh: [
        '地段編號：九龍內地段第 8842 號 (Kowloon Inland Lot No. 8842)',
        '物業地址：九龍旺角彌敦道 688 號聰明大廈 12 樓 B 室',
        '批約年期：自 1978 年 7 月 1 日起計 75 年 (附續期條款)'
      ],
      propertyEn: [
        'Lot No.: Kowloon Inland Lot No. 8842',
        'Address: Flat B, 12/F, Smart Mansion, 688 Nathan Road, Mong Kok, Kowloon',
        'Lease Term: 75 years from 1 July 1978 with right of renewal'
      ],
      ownerZh: [
        '登記業主：溫國強 (Wan Kwok Keung) — 以遺囑執行人身分登記',
        '註冊摘要編號：UB99201 (遺囑認證登記 Date of Probate: 15/03/2023)'
      ],
      ownerEn: [
        'Registered Owner: Wan Kwok Keung (as Sole Executor under Letters of Probate)',
        'Memorial No.: UB99201 (Date of Instrument: 15/03/2023)'
      ],
      incumbrancesZh: [
        '1. 法定押記/按揭：滙豐銀行有限公司 (The Hongkong and Shanghai Banking Corporation Ltd) — 摘要編號 UB44012',
        '2. 建築物命令：屋宇署署長依據《建築物條例》(Cap. 123) 第 24(1) 條發出之清拆令 (露台未經批准擴建物) — 摘要編號 UB88210'
      ],
      incumbrancesEn: [
        '1. Legal Charge / Mortgage: In favour of The Hongkong and Shanghai Banking Corporation Ltd (Memorial UB44012)',
        '2. Building Order: Order under section 24(1) of the Buildings Ordinance (Cap. 123) by Building Authority (Unauthorized Balcony Structure) — Memorial UB88210'
      ]
    }
  },
  'case-2': {
    id: 'case-2',
    titleZh: '個案二：有限公司賣方與雙重查冊法則 (Central Commercial Tower)',
    titleEn: 'Case 2: Corporate Vendor & Two-Search Rule (Central Commercial Tower)',
    badgeZh: '有限公司 / 浮動押記風險',
    badgeEn: 'Limited Company / Floating Charge',
    narrativeZh: '賣方為「Apex Profits Limited」(一間於香港註冊之私人有限公司)，委託代理 Ken 出售中環商業大廈單位。Ken 為買方取得土地註冊處之查冊紀錄，查冊顯示無任何未償還之按揭或法院命令。Ken 隨即促成雙方簽署臨時買賣合約並收取訂金。簽約後買方律師在公司註冊處 (Companies Registry) 發現該公司於兩週前向財務機構設立了一項涵蓋全體資產之浮動押記 (Floating Charge) 且已登記。',
    narrativeEn: 'Vendor is "Apex Profits Limited" (a private company incorporated in HK), instructing agent Ken to sell an office unit. Ken performed a Land Registry search showing clear title with no subsisting charges. Ken expedited PASP execution and deposit receipt. Afterwards, purchaser solicitors discovered an active corporate Floating Charge debenture registered at the Companies Registry.',
    landSearch: {
      propertyZh: [
        '地段編號：內地段第 102 號 (Inland Lot No. 102)',
        '物業地址：香港中環皇后大道中 88 號中環商業大廈 20 樓 01 室',
        '批約年期：999 年 (自 1865 年 12 月 25 日起算)'
      ],
      propertyEn: [
        'Lot No.: Inland Lot No. 102',
        'Address: Suite 01, 20/F, Central Commercial Tower, 88 Queen\'s Road Central, HK',
        'Lease Term: 999 years from 25 December 1865'
      ],
      ownerZh: [
        '登記業主：Apex Profits Limited',
        '代價：HK$38,000,000 (轉讓契約 Memorial No. UB77291)'
      ],
      ownerEn: [
        'Registered Owner: Apex Profits Limited',
        'Consideration: HK$38,000,000 (Assignment Memorial No. UB77291)'
      ],
      incumbrancesZh: [
        '【土地註冊處查冊無任何已登記之法定押記或產權負擔】'
      ],
      incumbrancesEn: [
        '[No subsisting legal charges or encumbrances registered at the Land Registry]'
      ]
    }
  }
};

const FULL_EXAM_QUESTIONS: ExamQuestion[] = [
  // --- PART I: STATUTORY OBJECTIVE QUESTIONS ---
  {
    id: 1,
    part: 'I',
    topicZh: 'Cap. 511 發牌資格與柱石',
    topicEn: 'Cap. 511 Licensing Qualifications',
    questionZh: '根據《地產代理條例》(Cap. 511) 第 15 條，下列哪一項「不屬於」申請個人地產代理牌照的法定先決資格？',
    questionEn: 'Under section 15 of the Estate Agents Ordinance (Cap. 511), which of the following is NOT a statutory prerequisite for an individual estate agent license?',
    optionsZh: [
      'A. 年滿 18 歲',
      'B. 完成中五學業或具同等學歷',
      'C. 具備至少 2 年持牌營業員 (Salesperson) 全職實務工作經驗',
      'D. 在緊接申請牌照前 12 個月內通過相關資格考試合格'
    ],
    optionsEn: [
      'A. Reached the age of 18 years',
      'B. Completed Form 5 secondary education or equivalent',
      'C. Possesses at least 2 years full-time practical experience as a licensed salesperson',
      'D. Passed the relevant qualifying licensing examination within 12 months prior to application'
    ],
    answerIndex: 2,
    explanationZh: '✓ EAA 牌照四大柱石為【18 歲、中五學歷、12 個月考試有效、Fit & Proper 妥當人選】。法例完全不要求工作經驗！考官常設陷阱宣稱需要經驗。',
    explanationEn: '✓ The 4 pillars of licensing are Age 18, Form 5 education, 12-month exam validity, and Fit & Proper status. Practical work experience is NOT a statutory condition.',
    statuteRefZh: '《地產代理條例》Cap. 511 s.15 & s.19',
    statuteRefEn: 'Estate Agents Ordinance Cap. 511 s.15 & s.19'
  },
  {
    id: 2,
    part: 'I',
    topicZh: '營業地點與 31 天規則',
    topicEn: 'Place of Business & 31-Day Rule',
    questionZh: '持牌地產代理開立新分行或變更其營業地點時，必須在多少天內以書面通知地產代理監管局 (EAA)？',
    questionEn: 'When an estate agent establishes a new branch or changes their place of business, within how many days must they notify the EAA in writing?',
    optionsZh: [
      'A. 7 天內',
      'B. 14 天內',
      'C. 31 天內',
      'D. 60 天內'
    ],
    optionsEn: [
      'A. Within 7 days',
      'B. Within 14 days',
      'C. Within 31 days',
      'D. Within 60 days'
    ],
    answerIndex: 2,
    explanationZh: '✓ 根據 Cap. 511 s.40，任何營業地址、公司董事或合夥人變更均有法定【31 天通知期】。注意：每間分行必須由持個人地產代理牌照之經理作獨立有效控制。',
    explanationEn: '✓ Under Cap. 511 s.40, any change of place of business, director, or partner must be notified to EAA in writing within 31 days.',
    statuteRefZh: '《地產代理條例》Cap. 511 s.40',
    statuteRefEn: 'Estate Agents Ordinance Cap. 511 s.40'
  },
  {
    id: 3,
    part: 'I',
    topicZh: '客戶款項與信託金庫 (3-2-14-3)',
    topicEn: 'Client Money & Trust Account',
    questionZh: '關於地產代理收取客戶訂金或款項的法定要求，下列哪項敘述「正確」？',
    questionEn: 'Regarding statutory requirements for client money received by an estate agent, which of the following statements is CORRECT?',
    optionsZh: [
      'A. 代理可將客戶訂金存入代理之一般公司營運戶口，只要賬目清晰即可',
      'B. 客戶款項必須存入在持牌銀行開設之獨立「客戶信託戶口」(Client Account)',
      'C. 收到款項後代理有 30 天寬限期發出正式收據',
      'D. 客戶款項收據副本只須在電腦存檔，無需保存紙本 3 年'
    ],
    optionsEn: [
      'A. Client money may be deposited into agency general operating accounts provided ledger is clear',
      'B. Client money must be deposited into a designated segregated "Client Account" in a licensed bank',
      'C. The agent has a 30-day grace period to issue an official receipt to the client',
      'D. Receipt copies only need computer filing without requiring 3 years retention'
    ],
    answerIndex: 1,
    explanationZh: '✓ 記憶口訣【3-2-14-3】：3種法定用途、2個可付對象、14天內發出收據、收據及賬目必須妥善保存至少 3 年。客戶款項絕對禁止與代理營業戶口混合！',
    explanationEn: '✓ Formula 3-2-14-3: 3 statutory purposes, 2 recipients, 14 days receipt issuance, 3 years record retention. Mingling client money with operating funds is strictly prohibited.',
    statuteRefZh: '《地產代理(客戶款項)規例》Cap. 511A',
    statuteRefEn: 'Estate Agents (Client Money) Regulation Cap. 511A'
  },
  {
    id: 4,
    part: 'I',
    topicZh: '法定協議 Form 3 至 Form 6',
    topicEn: 'Prescribed Agency Agreements',
    questionZh: '地產代理與客戶簽署法定代理協議時，下列哪一組表格配對完全正確？',
    questionEn: 'When executing prescribed estate agency agreements with clients, which form pairing is entirely accurate?',
    optionsZh: [
      'A. 出售住宅物業使用 Form 4；購買住宅物業使用 Form 3',
      'B. 出售住宅物業使用 Form 3；購買住宅物業使用 Form 4',
      'C. 出租商業寫字樓物業必須使用 Form 5',
      'D. 租賃住宅物業協議之法定有效期最長可設定為 12 個月'
    ],
    optionsEn: [
      'A. Form 4 for residential sale; Form 3 for residential purchase',
      'B. Form 3 for residential sale; Form 4 for residential purchase',
      'C. Leasing a commercial office requires mandatory Form 5',
      'D. Residential leasing agreement statutory validity may extend up to 12 months'
    ],
    answerIndex: 1,
    explanationZh: '✓ 口訣：【單數賣、雙數買】。Form 3 賣方、Form 4 買方、Form 5 業主出租、Form 6 租客承租。法定表格有效期上限均為 3 個月，且僅適用於住宅物業。',
    explanationEn: '✓ Mnemonic: Odd Sells, Even Buys. Form 3: Sale, Form 4: Purchase, Form 5: Landlord, Form 6: Tenant. Max validity is 3 months and applies solely to residential properties.',
    statuteRefZh: '《地產代理協議規例》Cap. 511C',
    statuteRefEn: 'Estate Agents (Agreements) Regulation Cap. 511C'
  },
  {
    id: 5,
    part: 'I',
    topicZh: '住宅租務與沒收權 (Cap. 7)',
    topicEn: 'Residential Tenancy & Forfeiture',
    questionZh: '在無任何明文租約條款約定下，住宅租客若拖欠租金達多少天，業主即享有法定權利沒收該租賃 (Forfeiture for Non-payment)？',
    questionEn: 'Absent express terms in a tenancy agreement, after how many days of unpaid rent does a landlord have statutory right to forfeit the lease?',
    optionsZh: [
      'A. 7 天',
      'B. 14 天',
      'C. 15 天',
      'D. 30 天'
    ],
    optionsEn: [
      'A. 7 days',
      'B. 14 days',
      'C. 15 days',
      'D. 30 days'
    ],
    answerIndex: 2,
    explanationZh: '✓ 根據《業主與租客(綜合)條例》第 7 章第 IV 部，欠租沒收權之法定門檻為【15 天】。注意：14 天是常設陷阱選項！住宅租約簽立後亦須於 1 個月內提交 Form CR109。',
    explanationEn: '✓ Under Cap. 7 Part IV, the statutory threshold for unpaid rent forfeiture is 15 days. 14 days is a classic exam distractor.',
    statuteRefZh: '《業主與租客(綜合)條例》Cap. 7 Part IV',
    statuteRefEn: 'Landlord and Tenant (Consolidation) Ordinance Cap. 7 Part IV'
  },

  // --- PART II: CASE STUDY POIM LAND SEARCH QUESTIONS ---
  {
    id: 6,
    part: 'II',
    caseScenarioId: 'case-1',
    topicZh: '個案一：產權審查與遺產代理',
    topicEn: 'Case 1: Title Verification & Probate',
    questionZh: '【Part II 個案題】參考聰明大廈土地查冊 (Annex)，本物業當前法定登記業主為溫先生。買方律師在查驗業權時，必須要求賣方提供下列哪一項核心文件以確立其合法出售權？',
    questionEn: '[Part II Case Study] Referring to the Smart Mansion Land Search (Annex), Mr. Wan is registered as sole executor. Which primary legal document must purchaser solicitors inspect to confirm his title to sell?',
    optionsZh: [
      'A. 原業主之死亡證 (Death Certificate) 正本即足夠，無需其他法庭文件',
      'B. 高等法院遺囑認證處頒發之遺囑認證書 (Letters of Probate) 及認證遺囑正本或官方法庭核證副本',
      'C. 溫先生個人之香港永久性居民身份證及商業登記證',
      'D. 溫先生與全體受益人簽署之家庭分配協議書'
    ],
    optionsEn: [
      'A. Original Death Certificate of the deceased owner is sufficient without court instruments',
      'B. Grant of Probate issued by the High Court probate registry together with official certified copy of the probated Will',
      'C. Mr. Wan personal HKID card and Business Registration Certificate',
      'D. Family deed of distribution executed by all named beneficiaries'
    ],
    answerIndex: 1,
    explanationZh: '✓ 當物業由遺囑執行人以個人名義登記時，必須出示高等法院正式頒發之遺囑認證書 (Grant of Probate) 證明執行人身分及處分遺產之法定權能。',
    explanationEn: '✓ Title verification for properties held by an executor mandates production of the High Court Grant of Probate establishing legal power to convey estate property.',
    statuteRefZh: '《遺囑認證及遺產管理條例》Cap. 10 & 土地查冊 P-O-I-M',
    statuteRefEn: 'Probate and Administration Ordinance Cap. 10 & POIM'
  },
  {
    id: 7,
    part: 'II',
    caseScenarioId: 'case-1',
    topicZh: '個案一：建築物清拆令與披露義務',
    topicEn: 'Case 1: Building Orders & Due Diligence',
    questionZh: '【Part II 個案題】查冊 Incumbrances 欄註冊有屋宇署依據《建築物條例》第 24 條發出的清拆令。代理 Sunny 向買方 Polly 聲稱「銀行按揭不受影響」，Sunny 的行為違反了 EAA 哪項規定？',
    questionEn: '[Part II Case Study] The Land Search Incumbrances section shows an active Building Authority order under section 24. Agent Sunny claimed mortgages would be unaffected. Sunny has breached which statutory duty?',
    optionsZh: [
      'A. 並無違規，因清拆令只屬屋宇署與業主之間的事務，不影響物業買賣',
      'B. 違反《操守守則》及未盡盡職審查 (Due Diligence) 義務，因未完成之清拆令屬物業瑕疵，直接影響銀行估價與按揭批核，代理不得作誤導性陳述',
      'C. 只要買賣雙方在臨約中加簽「按現狀 (As-is)」條款，代理即獲法律豁免',
      'D. 代理只要在簽約後 14 天內口頭告知買方律師即屬合規'
    ],
    optionsEn: [
      'A. No breach occurred as building orders only concern Landlord and BD without impacting conveyancing',
      'B. Breached Code of Ethics and due diligence obligations by making misleading representations regarding title incumbrances affecting bank mortgage valuations',
      'C. Executing an "As-Is" condition clause in the PASP automatically indemnifies the agent',
      'D. Providing verbal advice to buyer solicitors within 14 days post-signing satisfies compliance'
    ],
    answerIndex: 1,
    explanationZh: '✓ EAA 操守規約明確規定，代理必須查明並向買家準確披露清拆令等註冊產權負擔。未解除之命令可導致銀行拒批按揭甚至釘契，代理謊稱無影響構成嚴重專業失德。',
    explanationEn: '✓ Under EAA practice guidelines, failure to disclose subsisting section 24 orders or misrepresenting mortgage viability constitutes professional misconduct and misrepresentation.',
    statuteRefZh: '《地產代理常規(一般職責及香港住宅物業)規例》第 3 條',
    statuteRefEn: 'Estate Agents Practice (General Duties) Regulation s.3'
  },
  {
    id: 8,
    part: 'II',
    caseScenarioId: 'case-2',
    topicZh: '個案二：公司賣方與雙重查冊',
    topicEn: 'Case 2: Corporate Vendor & Two-Search Rule',
    questionZh: '【Part II 個案題】在個案二中，賣方為「Apex Profits Limited」。地產代理 Ken 僅進行了土地註冊處查冊而未進行公司註冊處查冊，導致買方簽約後才發現浮動押記。此情況下：',
    questionEn: '[Part II Case Study] In Case 2, the vendor is Apex Profits Limited. Agent Ken conducted only a Land Registry search and omitted the Companies Registry charge search. In this situation:',
    optionsZh: [
      'A. Ken 的做法完全合規，因地產代理條例只要求提供土地註冊處查冊',
      'B. Ken 違反了「雙重查冊法則 (Two-Search Rule)」，因有限公司之債權證浮動押記通常登記於公司註冊處，土地查冊無法顯示，代理必須同時查冊公司處',
      'C. 買方有義務自行查冊，代理無需承擔任何責任',
      'D. 該浮動押記只要未在土地註冊處登記，在法律上即對買方完全無效'
    ],
    optionsEn: [
      'A. Ken fully complied because the Estate Agents Ordinance only mandates Land Registry searches',
      'B. Ken breached the "Two-Search Rule" because corporate floating charges/debentures are registered at the Companies Registry and omitted from Land Registry records',
      'C. The buyer holds sole responsibility to conduct company searches; the agent incurs no liability',
      'D. Any floating charge not registered at the Land Registry is void against the buyer as a matter of law'
    ],
    answerIndex: 1,
    explanationZh: '✓ 【雙重查冊黃金法則】：當賣家為有限公司時，代理必須同時查閱【土地註冊處】與【公司註冊處】。浮動押記 (Floating Charge) 僅在公司處登記，一旦晶化 (crystallize) 即可對物業行使抵押權，威脅買方業權！',
    explanationEn: '✓ The Two-Search Golden Rule: Corporate vendors mandate searches at both Land Registry and Companies Registry. Debentures with floating charges are recorded at Companies Registry and bind corporate assets upon crystallization.',
    statuteRefZh: '《公司條例》(Cap. 622) s.335 及 EAA 執業通告',
    statuteRefEn: 'Companies Ordinance (Cap. 622) s.335 & EAA Practice Circular'
  }
];


export default function App() {
  const [isZh, setIsZh] = useState<boolean>(true);
  
  // Exam phases: 'briefing' | 'active' | 'review'
  const [examPhase, setExamPhase] = useState<'briefing' | 'active' | 'review'>('briefing');
  const [selectedTrack, setSelectedTrack] = useState<'EAQE' | 'SQE'>('EAQE');
  
  // Active questions subset based on track
  const currentQuestions = useMemo(() => {
    return FULL_EXAM_QUESTIONS;
  }, []);

  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<number>>(new Set());
  
  // Timer state: 3 Hours (10800 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(3 * 60 * 60);
  const [activeAnnexTab, setActiveAnnexTab] = useState<'search' | 'facts'>('search');

  // Filter tab for active exam: 'all' | 'part1' | 'part2'
  const [activePartFilter, setActivePartFilter] = useState<'ALL' | 'I' | 'II'>('ALL');

  const currentQ = currentQuestions[currentQIndex] || currentQuestions[0];
  const currentScenario = currentQ.caseScenarioId ? CASE_SCENARIOS[currentQ.caseScenarioId] : null;


  useEffect(() => {
    if (examPhase !== 'active') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setExamPhase('review');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examPhase]);

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (examPhase === 'review') return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  const toggleFlag = (id: number) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };


  const scoreStats = useMemo(() => {
    let totalScore = 0;
    let part1Score = 0;
    let part2Score = 0;
    let part1Total = 0;
    let part2Total = 0;

    currentQuestions.forEach((q) => {
      const isCorrect = userAnswers[q.id] === q.answerIndex;
      if (q.part === 'I') {
        part1Total += 1;
        if (isCorrect) part1Score += 1;
      } else {
        part2Total += 1;
        if (isCorrect) part2Score += 1;
      }
      if (isCorrect) totalScore += 1;
    });

    const percent = Math.round((totalScore / currentQuestions.length) * 100);
    const isPass = percent >= 60;

    return {
      totalScore,
      totalCount: currentQuestions.length,
      part1Score,
      part1Total,
      part2Score,
      part2Total,
      percent,
      isPass
    };
  }, [currentQuestions, userAnswers]);


  if (examPhase === 'briefing') {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-900">
                  <Award className="h-4 w-4 text-amber-600" />
                  <span>EAA Official Simulation Architecture</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsZh(!isZh)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 bg-slate-50 text-slate-800 hover:border-amber-500 hover:text-amber-700 transition cursor-pointer"
                >
                  <Globe className="h-3.5 w-3.5 text-amber-600" />
                  <span>{isZh ? 'EN' : '繁體中文'}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {isZh ? '全真模擬考試準備考場' : 'Official Full Mock Examination Suite'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {isZh 
                  ? '雙卷全真計時考核：Part I 客觀選擇題 + Part II 土地查冊個案實務題。及格分數線為 60%。'
                  : 'Full 3-hour dual-part simulation: Part I Statutory Multiple Choice + Part II POIM Case Studies. Passing mark: 60%.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/course"
                className="px-5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 shadow-sm transition flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-indigo-600" />
                <span>{isZh ? '返回課程大綱' : 'Syllabus'}</span>
              </a>
            </div>
          </div>

          {/* Exam Configuration Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
              <span>{isZh ? '選擇報考考試類別與規則' : 'Select Examination Track & Settings'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setSelectedTrack('EAQE')}
                className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between gap-3 ${
                  selectedTrack === 'EAQE'
                    ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-1 ring-amber-400'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-md bg-amber-200/80 text-amber-950">
                    EAQE (Estate Agent)
                  </span>
                  <CheckCircle2 className={`h-5 w-5 ${selectedTrack === 'EAQE' ? 'text-amber-600' : 'text-slate-300'}`} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    {isZh ? '地產代理資格考試 (EAQE 大牌)' : 'Estate Agent Qualifying Exam'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {isZh ? '涵蓋 20 個完整單元，包括 Part II 土地查冊雙重查冊與浮動押記深度考核。' : 'Covers full 20 Topic Blocks including advanced POIM corporate charges.'}
                  </p>
                </div>
              </div>

              <div 
                onClick={() => setSelectedTrack('SQE')}
                className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between gap-3 ${
                  selectedTrack === 'SQE'
                    ? 'border-indigo-500 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-400'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-md bg-indigo-200/80 text-indigo-950">
                    SQE (Salesperson)
                  </span>
                  <CheckCircle2 className={`h-5 w-5 ${selectedTrack === 'SQE' ? 'text-indigo-600' : 'text-slate-300'}`} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    {isZh ? '營業員資格考試 (SQE 細牌)' : 'Salesperson Qualifying Exam'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {isZh ? '涵蓋 16 個重點實務單元，重點測試法定表格簽署與客戶訂金信託。' : 'Focuses on 16 core syllabus modules, statutory forms, and client trust rules.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Exam Parameters Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <span className="text-[11px] font-mono text-slate-500 font-bold block">{isZh ? '考試時限' : 'Duration'}</span>
                <span className="text-lg font-black text-slate-900">180 {isZh ? '分鐘' : 'Mins'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <span className="text-[11px] font-mono text-slate-500 font-bold block">{isZh ? '考核題數' : 'Questions'}</span>
                <span className="text-lg font-black text-slate-900">{currentQuestions.length} {isZh ? '題精選' : 'Qs'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <span className="text-[11px] font-mono text-slate-500 font-bold block">{isZh ? '及格標準' : 'Passing Mark'}</span>
                <span className="text-lg font-black text-emerald-700">60%</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <span className="text-[11px] font-mono text-slate-500 font-bold block">{isZh ? '計分規則' : 'Scoring'}</span>
                <span className="text-lg font-black text-slate-900">{isZh ? '答錯不倒扣' : 'No Negative'}</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                {isZh ? '※ 進入考場後計時器將立即啟動' : '※ The 3-hour timer starts immediately upon clicking'}
              </span>

              <button
                type="button"
                onClick={() => {
                  setTimeLeft(3 * 60 * 60);
                  setExamPhase('active');
                }}
                className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isZh ? '開始全真模擬考試' : 'Launch Mock Examination'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }


  if (examPhase === 'review') {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Results Summary Banner */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold border border-slate-200 bg-slate-50">
                <BarChart3 className="h-4 w-4 text-indigo-600" />
                <span>{isZh ? '官方全真模擬考試成績報告' : 'Official Performance Diagnostic Report'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {scoreStats.isPass 
                  ? (isZh ? '恭喜考試合格！具備高分通關實力' : 'Congratulations! Passed with Distinction') 
                  : (isZh ? '未達合格標準，請針對弱項單元重點複習' : 'Did Not Pass - Targeted Review Required')}
              </h1>
              <p className="text-xs text-slate-600">
                {isZh 
                  ? `及格標準為 60%。本次得分：${scoreStats.percent}% (${scoreStats.totalScore} / ${scoreStats.totalCount} 題)` 
                  : `Passing Mark is 60%. Your Score: ${scoreStats.percent}% (${scoreStats.totalScore} / ${scoreStats.totalCount} Qs)`}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className={`p-5 rounded-3xl border text-center min-w-[130px] ${
                scoreStats.isPass 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                <span className="text-xs font-bold uppercase block">{isZh ? '考試合格狀態' : 'Result'}</span>
                <span className="text-3xl font-black">{scoreStats.percent}%</span>
                <span className="text-[11px] font-bold block mt-0.5">
                  {scoreStats.isPass ? (isZh ? '✓ 合格 PASS' : '✓ PASS') : (isZh ? '✗ 未達標 FAIL' : '✗ FAIL')}
                </span>
              </div>
            </div>
          </div>

          {/* Part I vs Part II Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                <span>Part I 客觀選擇題 (Statutory Law)</span>
                <span className="text-slate-900 font-extrabold">{scoreStats.part1Score} / {scoreStats.part1Total}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.round((scoreStats.part1Score / scoreStats.part1Total) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {isZh ? '涵蓋 Cap. 511 發牌柱石、31天分行管理、客戶信託及租賃條例。' : 'Covers Cap. 511, licensing, 31-day notice, client money, and tenancy rules.'}
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                <span>Part II 土地查冊個案實務 (POIM Case Studies)</span>
                <span className="text-slate-900 font-extrabold">{scoreStats.part2Score} / {scoreStats.part2Total}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.round((scoreStats.part2Score / scoreStats.part2Total) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {isZh ? '涵蓋遺產遺囑執行人身分核對、違建清拆令及公司賣家雙重查冊。' : 'Covers probate verification, UBW removal orders, and corporate charge searches.'}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setUserAnswers({});
                setFlaggedIds(new Set());
                setTimeLeft(3 * 60 * 60);
                setCurrentQIndex(0);
                setExamPhase('active');
              }}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{isZh ? '重新挑戰全真模考' : 'Retake Full Mock Exam'}</span>
            </button>

            <div className="flex items-center gap-2">
              <a
                href="/memory-palace"
                className="px-5 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 shadow-sm transition flex items-center gap-2"
              >
                <Compass className="h-4 w-4 text-amber-600" />
                <span>{isZh ? '進入記憶宮殿複習' : 'Memory Palace'}</span>
              </a>

              <a
                href="/case-study"
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-slate-950" />
                <span>{isZh ? '專項加強 Part II 查冊' : 'Part II POIM Drills'}</span>
              </a>
            </div>
          </div>

          {/* Question Breakdown Analysis List */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              {isZh ? '試題逐題深度診斷與官方解析' : 'Question-by-Question Analysis & Statutory References'}
            </h2>

            <div className="space-y-6">
              {currentQuestions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.answerIndex;

                return (
                  <div key={q.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${
                          isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                        }`}>
                          {isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
                        </span>
                        <span className="text-xs font-mono text-slate-500 font-bold">
                          Q{idx + 1} • {isZh ? q.topicZh : q.topicEn}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-500 font-bold">
                        {isZh ? q.statuteRefZh : q.statuteRefEn}
                      </span>
                    </div>

                    <p className="text-sm font-extrabold text-slate-900">
                      {isZh ? q.questionZh : q.questionEn}
                    </p>

                    <div className="space-y-1.5 text-xs">
                      {(isZh ? q.optionsZh : q.optionsEn).map((opt, oIdx) => {
                        const isSelected = userChoice === oIdx;
                        const isAnswer = oIdx === q.answerIndex;

                        return (
                          <div 
                            key={oIdx}
                            className={`p-2.5 rounded-xl border flex items-center justify-between ${
                              isAnswer
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                : isSelected
                                ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>{opt}</span>
                            {isAnswer && <span className="text-[10px] font-bold text-emerald-700 uppercase">正確答案 Correct Answer</span>}
                            {isSelected && !isAnswer && <span className="text-[10px] font-bold text-rose-700 uppercase">考生作答 Your Answer</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed">
                      <span className="font-bold block mb-1">💡 {isZh ? '官方解析與法律考點：' : 'Statutory Rationale:'}</span>
                      {isZh ? q.explanationZh : q.explanationEn}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Top Floating Control Bar */}
        <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-extrabold">
              {selectedTrack} {isZh ? '全真考試中' : 'Exam Active'}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              <span>{isZh ? '倒數計時: ' : 'Time Left: '}</span>
              <span className="text-slate-950 font-black">{formatTimer(timeLeft)}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsZh(!isZh)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold border border-slate-200 bg-slate-50 text-slate-800 hover:border-amber-500 cursor-pointer"
            >
              <Globe className="h-3 w-3 text-amber-600" />
              <span>{isZh ? 'EN' : '繁中'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => toggleFlag(currentQ.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                flaggedIds.has(currentQ.id)
                  ? 'bg-rose-50 border-rose-300 text-rose-700 font-extrabold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Flag className={`h-3.5 w-3.5 ${flaggedIds.has(currentQ.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              <span>{flaggedIds.has(currentQ.id) ? (isZh ? '已標記覆核' : 'Flagged') : (isZh ? '標記本題' : 'Flag Question')}</span>
            </button>

            <button
              type="button"
              onClick={() => setExamPhase('review')}
              className="px-5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="h-4 w-4 text-slate-950" />
              <span>{isZh ? '交卷 (Submit)' : 'Submit Exam'}</span>
            </button>
          </div>
        </div>

        {/* Split Screen Workspace: Left (Content/POIM), Right (Palette & Nav) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Main Question & Content Card (8 Columns) */}
          <div className="lg:col-span-8 space-y-5">

            {/* If Part II, Embed the Full POIM Split-Viewer */}
            {currentQ.part === 'II' && currentScenario && (
              <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveAnnexTab('search')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        activeAnnexTab === 'search'
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isZh ? '土地查冊附件 (Annex PDF)' : 'Land Search Annex'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAnnexTab('facts')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        activeAnnexTab === 'facts'
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isZh ? '個案事實背景' : 'Transaction Facts'}
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-amber-800 font-bold px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">
                    {isZh ? currentScenario.badgeZh : currentScenario.badgeEn}
                  </span>
                </div>

                {activeAnnexTab === 'search' ? (
                  <div className="space-y-3 text-xs font-mono">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-amber-800 font-bold block">(P) PROPERTY PARTICULARS 物業資料</span>
                      {(isZh ? currentScenario.landSearch.propertyZh : currentScenario.landSearch.propertyEn).map((line, i) => (
                        <p key={i} className="text-slate-700">{line}</p>
                      ))}
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-amber-800 font-bold block">(O) OWNER PARTICULARS 業主資料</span>
                      {(isZh ? currentScenario.landSearch.ownerZh : currentScenario.landSearch.ownerEn).map((line, i) => (
                        <p key={i} className="text-slate-700">{line}</p>
                      ))}
                    </div>
                    <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
                      <span className="text-rose-900 font-bold block">(I) INCUMBRANCES 產權負擔 (關鍵考點)</span>
                      {(isZh ? currentScenario.landSearch.incumbrancesZh : currentScenario.landSearch.incumbrancesEn).map((line, i) => (
                        <p key={i} className="text-rose-950 font-bold">{line}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed space-y-2">
                    <h4 className="font-extrabold text-slate-900">
                      {isZh ? currentScenario.titleZh : currentScenario.titleEn}
                    </h4>
                    <p>{isZh ? currentScenario.narrativeZh : currentScenario.narrativeEn}</p>
                  </div>
                )}
              </div>
            )}

            {/* Current Question Box */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-mono font-extrabold">
                    {currentQ.part === 'I' ? 'Part I 客觀選擇題' : 'Part II POIM 個案題'} • Q{currentQIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    {isZh ? currentQ.topicZh : currentQ.topicEn}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 font-bold">
                  {isZh ? currentQ.statuteRefZh : currentQ.statuteRefEn}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                {isZh ? currentQ.questionZh : currentQ.questionEn}
              </h2>

              {/* Options Stack */}
              <div className="space-y-3">
                {(isZh ? currentQ.optionsZh : currentQ.optionsEn).map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQ.id] === oIdx;

                  return (
                    <button
                      type="button"
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold shadow-sm ring-1 ring-indigo-500'
                          : 'border-slate-200 bg-slate-50/60 text-slate-800 hover:border-slate-300 hover:bg-slate-100/60'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-600 text-white' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  className="px-5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{isZh ? '上一題' : 'Previous'}</span>
                </button>

                <button
                  type="button"
                  disabled={currentQIndex === currentQuestions.length - 1}
                  onClick={() => setCurrentQIndex((prev) => Math.min(currentQuestions.length - 1, prev + 1))}
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isZh ? '下一題' : 'Next Question'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Question Palette & Navigator (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">

            <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ListOrdered className="h-4 w-4 text-indigo-600" />
                  <span>{isZh ? '試題答題矩陣 (Question Palette)' : 'Question Palette Matrix'}</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500 font-bold">
                  {Object.keys(userAnswers).length} / {currentQuestions.length} {isZh ? '已完成' : 'Done'}
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono font-semibold text-slate-600 pb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-indigo-600 inline-block" />
                  <span>{isZh ? '已答' : 'Done'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-rose-100 border border-rose-300 inline-block" />
                  <span>{isZh ? '標記' : 'Flag'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200 inline-block" />
                  <span>{isZh ? '未答' : 'Empty'}</span>
                </div>
              </div>

              {/* Number Buttons Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {currentQuestions.map((q, idx) => {
                  const isCurrent = idx === currentQIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isFlagged = flaggedIds.has(q.id);

                  let cellStyle = 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300';
                  if (isCurrent) {
                    cellStyle = 'bg-amber-500 text-slate-950 border-amber-500 font-black shadow-md scale-105';
                  } else if (isFlagged) {
                    cellStyle = 'bg-rose-50 text-rose-800 border-rose-300 font-bold';
                  } else if (isAnswered) {
                    cellStyle = 'bg-indigo-600 text-white border-indigo-600 font-bold';
                  }

                  return (
                    <button
                      type="button"
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-10 rounded-xl border text-xs font-mono transition flex items-center justify-center relative cursor-pointer ${cellStyle}`}
                    >
                      <span>Q{idx + 1}</span>
                      {isFlagged && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Track Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-700">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Part I 客觀選擇題:</span>
                  <span>5 題</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Part II 土地查冊題:</span>
                  <span>3 題 (雙個案)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-medium leading-relaxed">
                  {isZh 
                    ? '隨時點選題目編號跳題。交卷前可透過「標記」過濾不確定的答案。' 
                    : 'Jump to any question anytime. Flagged items can be reviewed before submitting.'}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}