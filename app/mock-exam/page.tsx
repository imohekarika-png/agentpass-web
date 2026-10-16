'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Compass,
  Bookmark,
  Check,
  Eye,
  Loader2,
  Zap,
  Globe
} from 'lucide-react';

/* ========================================================
   DATA CONTRACTS & INTERFACES
   ======================================================== */
interface MockQuestion {
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

interface CaseScenario {
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
    memorialsZh: string[];
    memorialsEn: string[];
  };
}

/* ========================================================
   PART II POIM CASE SCENARIOS (LAND SEARCH ANNEX ENGINE)
   ======================================================== */
const CASE_SCENARIOS: Record<string, CaseScenario> = {
  'case-1': {
    id: 'case-1',
    titleZh: '個案一：遺囑認證與清拆命令 (Smart Mansion)',
    titleEn: 'Case 1: Probate Registration & UBW Removal Order (Smart Mansion)',
    narrativeZh: '溫國強先生作為 Smart Mansion 12 樓 B 室之單獨遺囑執行人（已故業主胞弟之遺產代理人），委託保成地產代理 Sunny 以 800 萬港元出售物業。買方鄧小姐經 Sunny 視察單位。Sunny 知悉露台存在違例建築工程 (UBW) 及屋宇署 Cap. 123 第 24 條清拆命令，但未有主動於成交前書面告知鄧小姐按揭風險。',
    narrativeEn: 'Mr. Wan acts as the sole executor for Flat B, 12/F, Smart Mansion. Vendor instructed agent Sunny of Poshing Agency to market the unit at HK$8,000,000. Purchaser Ms. Tang inspected the flat. Sunny knew of an unauthorized building work (UBW) on the balcony and a Cap. 123 s.24 removal order, but failed to warn Ms. Tang regarding mortgage restriction risks in writing prior to agreement.',
    landSearch: {
      propertyZh: [
        '地段編號：九龍內地段第 8842 號 (Kowloon Inland Lot No. 8842)',
        '物業地址：九龍旺角聰明大廈 12 樓 B 室',
        '批約年期：75 年自 1978 年起計（可續期）',
        '政府地稅：每年地稅已繳清'
      ],
      propertyEn: [
        'Lot No.: Kowloon Inland Lot No. 8842',
        'Property: Flat B, 12/F, Smart Mansion, Mong Kok, Kowloon',
        'Lease Term: 75 years renewable from 1978',
        'Government Rent: Fully cleared for current fiscal year'
      ],
      ownerZh: [
        '登記業主：溫國強 (Wan Kwok Keung) - 單獨遺囑執行人',
        '註冊代價：遺囑認證登記 (Letters of Probate)',
        '註冊摘要編號：UB99201'
      ],
      ownerEn: [
        'Registered Owner: Wan Kwok Keung (Sole Executor)',
        'Consideration: Registration of Letters of Probate',
        'Memorial No.: UB99201'
      ],
      incumbrancesZh: [
        '1. 法定押記：滙豐銀行有限公司按揭 (摘要編號 UB44012)',
        '2. 屋宇署命令：建築物條例 (Cap. 123) 第 24 條拆卸命令 (露台搭建物 UBW)'
      ],
      incumbrancesEn: [
        '1. Legal Charge: Mortgage in favour of HSBC Bank Ltd (Memorial No. UB44012)',
        '2. Building Order: Buildings Ordinance Cap. 123 s.24 Removal Order (Balcony UBW)'
      ],
      memorialsZh: [
        'UB99201 - 遺囑認證文書',
        'UB44012 - 法定押記 / 按揭',
        'UB77341 - 建築事務監督清拆命令'
      ],
      memorialsEn: [
        'UB99201 - Letters of Probate',
        'UB44012 - Legal Charge / Mortgage',
        'UB77341 - Building Authority Removal Order'
      ]
    }
  },
  'case-2': {
    id: 'case-2',
    titleZh: '個案二：有限公司賣方與雙重查冊 (Central Commercial Tower)',
    titleEn: 'Case 2: Company Vendor & Dual-Search Protocol (Central Commercial Tower)',
    narrativeZh: '賣方為「卓越投資有限公司 (Apex Profits Limited)」，委託代理 Ken 出售中環商業大廈 20 樓 01 室。土地查冊顯示物業無按揭登記。Ken 僅提供土地註冊處查冊紀錄，未有辦理公司註冊處 (Companies Registry) 查冊。買方簽訂臨時買賣合約後，始發現該公司存在未解除之浮動押記 (Floating Charge)。',
    narrativeEn: 'Vendor is "Apex Profits Limited", instructing agent Ken to sell Suite 01, 20/F, Central Commercial Tower. The Land Registry search shows no encumbrance. Ken provided only the land search without conducting a Companies Registry charge search. Buyer signed the PASP only to discover an outstanding floating charge debenture.',
    landSearch: {
      propertyZh: [
        '地段編號：海旁地段第 102 號 (Marine Lot No. 102)',
        '物業地址：香港中環皇后大道中 20 號中環商業大廈 20 樓 01 室',
        '批約年期：999 年自 1865 年起計'
      ],
      propertyEn: [
        'Lot No.: Marine Lot No. 102',
        'Property: Suite 01, 20/F, Central Commercial Tower, Central, HK',
        'Lease Term: 999 years from 1865'
      ],
      ownerZh: [
        '登記業主：Apex Profits Limited (卓越投資有限公司)',
        '代價：HK$38,000,000',
        '註冊摘要編號：UB88102'
      ],
      ownerEn: [
        'Registered Owner: Apex Profits Limited',
        'Consideration: HK$38,000,000',
        'Memorial No.: UB88102'
      ],
      incumbrancesZh: [
        '【土地註冊處無未結清押記或命令登記紀錄】'
      ],
      incumbrancesEn: [
        '[No encumbrance or court order registered in Land Registry]'
      ],
      memorialsZh: [
        'UB88102 - 轉讓契約 (Assignment)'
      ],
      memorialsEn: [
        'UB88102 - Deed of Assignment'
      ]
    }
  }
};

/* ========================================================
   MASTER EXAM QUESTION REPOSITORY
   ======================================================== */
const MASTER_QUESTIONS: MockQuestion[] = [
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
    topicZh: '租務法定權益 (Cap. 7)',
    topicEn: 'Landlord & Tenant Rights (Cap. 7)',
    questionZh: '在雙方未有明訂沒收條款的情況下，住宅租客拖欠租金達多少天時，業主可根據法定隱含條件行使沒收租賃權 (Forfeiture for Non-Payment of Rent)？',
    questionEn: 'In the absence of an express forfeiture clause, after how many days of unpaid domestic rent can a landlord exercise the statutory implied right of forfeiture?',
    optionsZh: ['A. 7 天', 'B. 14 天', 'C. 15 天', 'D. 30 天'],
    optionsEn: ['A. 7 Days', 'B. 14 Days', 'C. 15 Days', 'D. 30 Days'],
    answerIndex: 2,
    explanationZh: '《業主與租客（綜合）條例》(Cap. 7) 第 IV 部規定，住宅租賃中拖欠租金的法定沒收權門檻為 15 天（商用物業一般為 21 天，須依合約或普通法判定）。',
    explanationEn: 'Under Cap. 7 Part IV, the statutory implied forfeiture threshold for non-payment of domestic rent is 15 days.',
    statuteRefZh: '《業主與租客（綜合）條例》Cap. 7 Part IV',
    statuteRefEn: 'Landlord & Tenant (Consolidation) Ordinance Cap. 7'
  },
  {
    id: 3,
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
    id: 4,
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
  {
    id: 5,
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
    id: 6,
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
  {
    id: 7,
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
  }
];

/* ========================================================
   MAIN COMPONENT: FULL MOCK EXAM SUITE
   ======================================================== */
export default function MockExamPage() {
  const [isZh, setIsZh] = useState<boolean>(true);
  const [examStage, setExamStage] = useState<'briefing' | 'simulation' | 'report'>('briefing');
  const [track, setTrack] = useState<'EAQE' | 'SQE'>('EAQE');
  const [activePartFilter, setActivePartFilter] = useState<'ALL' | 'I' | 'II'>('ALL');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(180 * 60);
  const [activeAnnexTab, setActiveAnnexTab] = useState<'property' | 'owner' | 'incumbrances' | 'narrative'>('incumbrances');

  // AI Cognitive Synthesizer state
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [aiGenerating, setAiGenerating] = useState<boolean>(false);
  const [aiTopic, setAiTopic] = useState<string>('Cap. 511 & Form 1-6');
  const [aiTargetPart, setAiTargetPart] = useState<'I' | 'II'>('I');
  const [aiError, setAiError] = useState<string | null>(null);
  const [questionsList, setQuestionsList] = useState<MockQuestion[]>(MASTER_QUESTIONS);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /* Filter questions based on active part filter */
  const activeQuestions = questionsList.filter((q) => {
    if (activePartFilter === 'ALL') return true;
    return q.part === activePartFilter;
  });

  const currentQ = activeQuestions[currentQIndex] || activeQuestions[0];
  const activeScenario = currentQ?.caseScenarioId ? CASE_SCENARIOS[currentQ.caseScenarioId] : null;

  /* Timer logic */
  useEffect(() => {
    if (examStage === 'simulation') {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setExamStage('report');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStage]);

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId: number, optIndex: number) => {
    if (examStage !== 'simulation') return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const toggleFlag = (qId: number) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const calculateResults = () => {
    let correctCount = 0;
    let partICorrect = 0;
    let partITotal = 0;
    let partIICorrect = 0;
    let partIITotal = 0;

    questionsList.forEach((q) => {
      const isCorrect = userAnswers[q.id] === q.answerIndex;
      if (isCorrect) correctCount++;

      if (q.part === 'I') {
        partITotal++;
        if (isCorrect) partICorrect++;
      } else {
        partIITotal++;
        if (isCorrect) partIICorrect++;
      }
    });

    const totalQuestions = questionsList.length;
    const scorePct = Math.round((correctCount / totalQuestions) * 100);
    const isPassed = scorePct >= 60;

    return {
      correctCount,
      totalQuestions,
      scorePct,
      isPassed,
      partICorrect,
      partITotal,
      partIICorrect,
      partIITotal
    };
  };

  /* AI Synthesizer trigger via backend OpenRouter API */
  const handleGenerateAiQuestions = async () => {
    setAiGenerating(true);
    setAiError(null);

    try {
      const response = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track,
          part: aiTargetPart,
          count: 3,
          topic: aiTopic,
          isZh
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        const formattedQs: MockQuestion[] = data.questions.map((q: any, i: number) => ({
          id: Date.now() + i,
          part: aiTargetPart,
          caseScenarioId: aiTargetPart === 'II' ? 'case-1' : undefined,
          topicZh: q.topicZh || aiTopic,
          topicEn: q.topicEn || aiTopic,
          questionZh: q.questionZh,
          questionEn: q.questionEn,
          optionsZh: q.optionsZh,
          optionsEn: q.optionsEn,
          answerIndex: typeof q.answerIndex === 'number' ? q.answerIndex : 0,
          explanationZh: q.explanationZh || '依據香港地產代理條例及執業指引核定。',
          explanationEn: q.explanationEn || 'Determined under HK Estate Agents Ordinance & regulatory circulars.',
          statuteRefZh: q.statuteRefZh || '《地產代理條例》Cap. 511',
          statuteRefEn: q.statuteRefEn || 'Estate Agents Ordinance Cap. 511'
        }));

        setQuestionsList((prev) => [...prev, ...formattedQs]);
        setShowAiModal(false);
      } else {
        throw new Error('No valid questions received from synthesis engine.');
      }
    } catch (err: any) {
      setAiError(err.message || 'Failed to synthesize questions. Please check API Key configuration.');
    } finally {
      setAiGenerating(false);
    }
  };

  /* ========================================================
     MODAL: AI QUESTION SYNTHESIZER
     ======================================================== */
  const renderAiModal = () => {
    if (!showAiModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-black text-amber-800 uppercase px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">
                COGNITIVE EXAM SYNTHESIZER
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                {isZh ? '動態法規試題生成引擎' : 'Cognitive Exam Synthesizer'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowAiModal(false);
                setAiError(null);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                {isZh ? '選取試卷部分 (Exam Part)' : 'Target Examination Part'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAiTargetPart('I')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    aiTargetPart === 'I'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>{isZh ? 'Part I 法規選擇題' : 'Part I Statutory MCQs'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAiTargetPart('II')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    aiTargetPart === 'II'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>{isZh ? 'Part II 查冊實務題' : 'Part II POIM Case Qs'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                {isZh ? '核心法規主題 (Statutory Topic)' : 'Statutory Topic Domain'}
              </label>
              <select
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Cap. 511 & Form 1-6">Cap. 511 地產代理條例與法定協議表格 (Form 1-6)</option>
                <option value="Cap. 128 Land Registration & POIM">Cap. 128 土地註冊條例與 POIM 查冊分析</option>
                <option value="Cap. 7 Landlord and Tenant & Part IVA">Cap. 7 業主與租客條例及劏房租管</option>
                <option value="Cap. 123 Buildings Ordinance & UBW Orders">Cap. 123 建築物條例第 24 條清拆命令與僭建</option>
                <option value="Cap. 622 Companies Ordinance Floating Charges">Cap. 622 公司條例與浮動押記雙重查冊</option>
              </select>
            </div>

            {aiError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{aiError}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAiModal(false)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer transition"
            >
              {isZh ? '取消' : 'Cancel'}
            </button>
            <button
              type="button"
              disabled={aiGenerating}
              onClick={handleGenerateAiQuestions}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {aiGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                  <span>{isZh ? '正在調用引擎生成中...' : 'Synthesizing Questions...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-slate-950" />
                  <span>{isZh ? '開始動態生成 (3 題)' : 'Synthesize 3 Questions'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ========================================================
     STAGE 1: BRIEFING & PRE-EXAM CONFIGURATION
     ======================================================== */
  if (examStage === 'briefing') {
    return (
      <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
        {renderAiModal()}
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-900">
                  <Award className="h-3.5 w-3.5 text-amber-600" />
                  <span>EAA Official Simulation Mode</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsZh(!isZh)}
                  className="px-3 py-1 rounded-full text-xs font-bold border border-slate-200 bg-slate-50 text-slate-800 hover:border-amber-500 transition cursor-pointer flex items-center gap-1"
                >
                  <Globe className="h-3 w-3 text-amber-600" />
                  <span>{isZh ? 'EN' : '繁體中文'}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {isZh ? '香港地產代理資格全真模擬試場' : 'HK EAA Professional Licensing Mock Suite'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {isZh
                  ? '官方雙階段計分架構：Part I 法規選擇題 + Part II 土地查冊個案實務題。'
                  : 'Official dual-part exam architecture: Part I Statutory MCQs & Part II POIM Case Studies.'}
              </p>
            </div>

            <a
              href="/course"
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <span>{isZh ? '返回課程' : 'Syllabus'}</span>
            </a>
          </div>

          {/* Track Selection Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                {isZh ? 'STEP 1: 選擇應考牌照級別' : 'STEP 1: Select Examination Track'}
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                {isZh ? '地產代理 (大牌 EAQE) 或 營業員 (細牌 SQE)' : 'Estate Agent (EAQE) or Salesperson (SQE)'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTrack('EAQE')}
                className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                  track === 'EAQE'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${
                    track === 'EAQE' ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    FULL AGENT • EAQE
                  </span>
                  <Building2 className={`h-5 w-5 ${track === 'EAQE' ? 'text-slate-950' : 'text-amber-600'}`} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold">{isZh ? '地產代理資格考試 (EAQE)' : 'Estate Agent Qualifying Exam'}</h3>
                  <p className={`text-xs mt-1 ${track === 'EAQE' ? 'text-slate-900' : 'text-slate-500'}`}>
                    {isZh ? '共 100 題（Part I 80 題 + Part II 20 題查冊個案）' : '100 Questions (Part I 80 Qs + Part II 20 Qs)'}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTrack('SQE')}
                className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                  track === 'SQE'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${
                    track === 'SQE' ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    SALESPERSON • SQE
                  </span>
                  <ShieldCheck className={`h-5 w-5 ${track === 'SQE' ? 'text-slate-950' : 'text-indigo-600'}`} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold">{isZh ? '營業員資格考試 (SQE)' : 'Salesperson Qualifying Exam'}</h3>
                  <p className={`text-xs mt-1 ${track === 'SQE' ? 'text-slate-900' : 'text-slate-500'}`}>
                    {isZh ? '共 60 題（Part I 50 題 + Part II 10 題查冊個案）' : '60 Questions (Part I 50 Qs + Part II 10 Qs)'}
                  </p>
                </div>
              </button>
            </div>

            {/* Exam Parameters Overview */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono">{isZh ? '考試時限' : 'Time Allowed'}</span>
                <span className="font-extrabold text-slate-900 text-sm">3 小時 (180 分鐘)</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono">{isZh ? '及格標準' : 'Passing Mark'}</span>
                <span className="font-extrabold text-emerald-700 text-sm">60% 及格率</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono">{isZh ? '倒扣機制' : 'Negative Marking'}</span>
                <span className="font-extrabold text-slate-900 text-sm">{isZh ? '無答錯倒扣' : 'None (No penalty)'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block font-mono">{isZh ? '查冊附件' : 'Land Search Annex'}</span>
                <span className="font-extrabold text-amber-800 text-sm">{isZh ? '官方 IRIS 樣式' : 'Official IRIS'}</span>
              </div>
            </div>

            {/* AI Synthesizer Promo Box */}
            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-mono text-amber-800 font-bold block">
                    {isZh ? '智能試題生成引擎' : 'Cognitive Exam Synthesizer'}
                  </span>
                  <span className="text-slate-900 font-black block">
                    {isZh ? '動態生成 Part I / Part II 最新真題' : 'Synthesize Authentic Part I & Part II Questions'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAiModal(true)}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isZh ? '啟動智能生成' : 'Launch Synthesizer'}</span>
                </button>
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  setTimeLeftSeconds(180 * 60);
                  setCurrentQIndex(0);
                  setUserAnswers({});
                  setFlaggedQuestions({});
                  setExamStage('simulation');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isZh ? '進入全真模擬考場 (Start Simulation)' : 'Enter Timed Simulation'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* ========================================================
     STAGE 2: ACTIVE EXAM SIMULATION
     ======================================================== */
  if (examStage === 'simulation') {
    const isCurrentFlagged = !!flaggedQuestions[currentQ.id];
    const totalAnswered = Object.keys(userAnswers).length;

    return (
      <div className="min-h-screen py-5 px-3 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
        {renderAiModal()}
        <div className="max-w-7xl mx-auto space-y-4">

          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                    {track} • {currentQ.part === 'I' ? 'Part I Statutory' : 'Part II POIM Case'}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {isZh ? `第 ${currentQIndex + 1} / ${activeQuestions.length} 題` : `Q ${currentQIndex + 1} of ${activeQuestions.length}`}
                  </span>
                </div>
                <div className="text-xs font-extrabold text-slate-800">
                  {isZh ? currentQ.topicZh : currentQ.topicEn}
                </div>
              </div>

              {/* Part Filter Toggles */}
              <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs">
                {(['ALL', 'I', 'II'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setActivePartFilter(p);
                      setCurrentQIndex(0);
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                      activePartFilter === p
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {p === 'ALL' ? (isZh ? '全部' : 'All') : `Part ${p}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer & Submit Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs font-bold">
                <Clock className="h-4 w-4 text-amber-600" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>

              <button
                type="button"
                onClick={() => toggleFlag(currentQ.id)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isCurrentFlagged
                    ? 'bg-amber-500 text-slate-950 border-amber-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>{isZh ? (isCurrentFlagged ? '已標記' : '標記覆查') : (isCurrentFlagged ? 'Flagged' : 'Flag')}</span>
              </button>

              <button
                type="button"
                onClick={() => setExamStage('report')}
                className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs shadow-sm transition cursor-pointer"
              >
                {isZh ? '提早交卷' : 'Submit Exam'}
              </button>
            </div>
          </div>

          {/* Main Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* Left 7 Columns: Question Engine or Split Annex */}
            <div className={`${currentQ.part === 'II' ? 'lg:col-span-8' : 'lg:col-span-8'} space-y-4`}>

              {/* Part II Land Search Annex Box */}
              {currentQ.part === 'II' && activeScenario && (
                <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono font-bold text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
                        LAND SEARCH ANNEX (IRIS 查冊附件)
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {isZh ? activeScenario.titleZh : activeScenario.titleEn}
                      </h4>
                    </div>

                    {/* Annex View Tabs */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setActiveAnnexTab('incumbrances')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          activeAnnexTab === 'incumbrances' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        (I) Incumbrances
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveAnnexTab('owner')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          activeAnnexTab === 'owner' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        (O) Owner
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveAnnexTab('property')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          activeAnnexTab === 'property' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        (P) Property
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveAnnexTab('narrative')}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                          activeAnnexTab === 'narrative' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        {isZh ? '個案情節' : 'Facts'}
                      </button>
                    </div>
                  </div>

                  {/* Annex Content Viewer */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono leading-relaxed space-y-2">
                    {activeAnnexTab === 'incumbrances' && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-rose-700 block">SECTION (I): INCUMBRANCES (產權負擔與命令)</span>
                        {(isZh ? activeScenario.landSearch.incumbrancesZh : activeScenario.landSearch.incumbrancesEn).map((item, idx) => (
                          <p key={idx} className="text-slate-800 font-semibold">• {item}</p>
                        ))}
                      </div>
                    )}

                    {activeAnnexTab === 'owner' && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-amber-800 block">SECTION (O): OWNER PARTICULARS (業主欄位)</span>
                        {(isZh ? activeScenario.landSearch.ownerZh : activeScenario.landSearch.ownerEn).map((item, idx) => (
                          <p key={idx} className="text-slate-800 font-semibold">• {item}</p>
                        ))}
                      </div>
                    )}

                    {activeAnnexTab === 'property' && (
                      <div className="space-y-1.5">
                        <span className="font-bold text-indigo-800 block">SECTION (P): PROPERTY PARTICULARS (物業資料)</span>
                        {(isZh ? activeScenario.landSearch.propertyZh : activeScenario.landSearch.propertyEn).map((item, idx) => (
                          <p key={idx} className="text-slate-800 font-semibold">• {item}</p>
                        ))}
                      </div>
                    )}

                    {activeAnnexTab === 'narrative' && (
                      <div className="font-sans space-y-1">
                        <span className="font-bold text-slate-900 block font-mono text-xs">{isZh ? '個案情節與事實：' : 'Case Narrative & Facts:'}</span>
                        <p className="text-slate-700 font-medium">{isZh ? activeScenario.narrativeZh : activeScenario.narrativeEn}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Main Question Card */}
              <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {isZh ? `試題序號 #${currentQ.id}` : `Question ID #${currentQ.id}`}
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-700 px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                      {isZh ? currentQ.statuteRefZh : currentQ.statuteRefEn}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                    {isZh ? currentQ.questionZh : currentQ.questionEn}
                  </h3>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {(isZh ? currentQ.optionsZh : currentQ.optionsEn).map((optionText, optIdx) => {
                    const isSelected = userAnswers[currentQ.id] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm ring-1 ring-amber-400'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-slate-50'
                        }`}
                      >
                        <span>{optionText}</span>
                        {isSelected && <Check className="h-4 w-4 shrink-0 text-slate-950" />}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{isZh ? '上一題' : 'Previous'}</span>
                  </button>

                  <span className="text-xs font-mono text-slate-500 font-semibold">
                    {currentQIndex + 1} / {activeQuestions.length}
                  </span>

                  <button
                    type="button"
                    disabled={currentQIndex === activeQuestions.length - 1}
                    onClick={() => setCurrentQIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
                    className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isZh ? '下一題' : 'Next'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right 4 Columns: Question Palette Matrix */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                    {isZh ? '試題導覽調色板 (Matrix)' : 'Question Palette Matrix'}
                  </h4>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {totalAnswered}/{questionsList.length}
                  </span>
                </div>

                {/* Grid Numbers */}
                <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-2">
                  {activeQuestions.map((q, idx) => {
                    const isAnswered = typeof userAnswers[q.id] === 'number';
                    const isFlagged = !!flaggedQuestions[q.id];
                    const isCurrent = idx === currentQIndex;

                    let bgClass = 'bg-slate-100 text-slate-700 border-slate-200';
                    if (isCurrent) {
                      bgClass = 'bg-slate-950 text-white border-slate-950 ring-2 ring-amber-400';
                    } else if (isFlagged) {
                      bgClass = 'bg-amber-400 text-slate-950 border-amber-500 font-extrabold';
                    } else if (isAnswered) {
                      bgClass = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentQIndex(idx)}
                        className={`h-9 rounded-xl border text-xs font-mono transition flex items-center justify-center cursor-pointer ${bgClass}`}
                        title={`Question ${idx + 1}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>{isZh ? '已作答' : 'Answered'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span>{isZh ? '已標記' : 'Flagged'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-950"></span>
                    <span>{isZh ? '當前題目' : 'Current'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300"></span>
                    <span>{isZh ? '未作答' : 'Empty'}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  /* ========================================================
     STAGE 3: COMPREHENSIVE SCORE REPORT & DIAGNOSTIC
     ======================================================== */
  const results = calculateResults();

  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Score Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-900">
              <Award className="h-3.5 w-3.5 text-amber-600" />
              <span>Diagnostic Performance Radar</span>
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {results.isPassed
                ? (isZh ? '恭喜及格！達到法定持牌標準' : 'Congratulations! Passed Requirement')
                : (isZh ? '未達及格門檻，請針對弱項加強複習' : 'Below Passing Threshold, Needs Review')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              {isZh
                ? `及格門檻為 60%。你獲得了 ${results.scorePct}%，共答對 ${results.correctCount} / ${results.totalQuestions} 題。`
                : `Passing mark is 60%. You achieved ${results.scorePct}% (${results.correctCount}/${results.totalQuestions} correct).`}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 text-center min-w-[150px]">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">FINAL SCORE</span>
            <div className={`text-4xl font-black ${results.isPassed ? 'text-emerald-700' : 'text-rose-700'}`}>
              {results.scorePct}%
            </div>
            <span className={`text-xs font-extrabold ${results.isPassed ? 'text-emerald-700' : 'text-rose-700'}`}>
              {results.isPassed ? 'QUALIFIED (合格)' : 'NOT YET PASSED'}
            </span>
          </div>
        </div>

        {/* Breakdown by Parts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-800">Part I Statutory Law MCQs</span>
              <span className="font-mono font-bold text-slate-500">
                {results.partICorrect}/{results.partITotal}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${results.partITotal > 0 ? (results.partICorrect / results.partITotal) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-800">Part II POIM Land Search Case Study</span>
              <span className="font-mono font-bold text-slate-500">
                {results.partIICorrect}/{results.partIITotal}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${results.partIITotal > 0 ? (results.partIICorrect / results.partIITotal) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setExamStage('simulation');
              setCurrentQIndex(0);
            }}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 text-indigo-600" />
            <span>{isZh ? '檢視所有答卷' : 'Review Answers'}</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href="/dashboard"
              className="px-5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 transition"
            >
              {isZh ? '學員進度儀表板' : 'Dashboard'}
            </a>
            <button
              type="button"
              onClick={() => {
                setExamStage('briefing');
                setUserAnswers({});
                setFlaggedQuestions({});
              }}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-sm transition"
            >
              {isZh ? '重設並重新應試' : 'Retake New Exam'}
            </button>
          </div>
        </div>

        {/* Detailed Item-by-Item Review */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-mono font-bold text-slate-700 uppercase tracking-wider">
            {isZh ? '試題逐題法規深度分析 (Item Analysis):' : 'Item-by-Item Legal Analysis:'}
          </h3>

          <div className="space-y-4">
            {questionsList.map((q, idx) => {
              const userOpt = userAnswers[q.id];
              const isCorrect = userOpt === q.answerIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-3xl border bg-white shadow-sm space-y-3 ${
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      #{idx + 1} • Part {q.part} • {isZh ? q.topicZh : q.topicEn}
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-700 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                      {isZh ? q.statuteRefZh : q.statuteRefEn}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    {isZh ? q.questionZh : q.questionEn}
                  </h4>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500">{isZh ? '你的回答:' : 'Your Answer:'}</span>
                      <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {typeof userOpt === 'number'
                          ? (isZh ? q.optionsZh[userOpt] : q.optionsEn[userOpt])
                          : (isZh ? '未作答' : 'Not answered')}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-500">{isZh ? '法定正確答案:' : 'Correct Statutory Answer:'}</span>
                        <span className="font-bold text-emerald-700">
                          {isZh ? q.optionsZh[q.answerIndex] : q.optionsEn[q.answerIndex]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Legal Explanation */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed">
                    <span className="font-bold block text-amber-900 uppercase font-mono text-[10px] mb-1">
                      {isZh ? '【 官方評分依據與條例解析 】' : '[ Statutory Explanation ]'}
                    </span>
                    <p>{isZh ? q.explanationZh : q.explanationEn}</p>
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