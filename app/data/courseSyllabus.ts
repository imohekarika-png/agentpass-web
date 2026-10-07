// app/data/courseSyllabus.ts

export interface Lesson {
  id: string;
  title: { 'zh-HK': string; en: string };
  summary: { 'zh-HK': string; en: string };
  capReference?: string;
  promptTopic: string;
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: { 'zh-HK': string; en: string };
  description: { 'zh-HK': string; en: string };
  lessons: Lesson[];
}

export const EAA_COURSE_SYLLABUS: CourseModule[] = [
  {
    id: 'module-1',
    moduleNumber: 1,
    title: {
      'zh-HK': '模組一：《地產代理條例》(第511章) 及附屬法例',
      en: 'Module 1: Estate Agents Ordinance (Cap. 511) & Subsidiary Legislation',
    },
    description: {
      'zh-HK': '深入理解地產代理監管局 (EAA) 的法定職能、發牌制度及違例處分。',
      en: 'In-depth coverage of EAA statutory powers, licensing regimes, and disciplinary procedures.',
    },
    lessons: [
      {
        id: 'm1-l1',
        title: {
          'zh-HK': '地產代理監管局 (EAA) 的設立與職能',
          en: 'Establishment and Functions of the Estate Agents Authority',
        },
        summary: {
          'zh-HK': '根據《地產代理條例》於 1997 年成立，負責監管行業、頒布執業指引及處理投訴。',
          en: 'Established in 1997 under Cap. 511 to regulate industry practice, issue circulars, and handle consumer complaints.',
        },
        capReference: 'Cap. 511 s. 4 & s. 5',
        promptTopic: '請詳細解釋地產代理監管局 (EAA) 的法定職能，以及其根據第511章擁有的執法及懲處權力。',
      },
      {
        id: 'm1-l2',
        title: {
          'zh-HK': '牌照分類：地產代理牌照與營業員牌照',
          en: 'Licensing Categories: Estate Agent vs. Salesperson',
        },
        summary: {
          'zh-HK': '區分公司/個人代理牌照與受僱營業員牌照的資格要求與執業限制。',
          en: 'Distinguish qualifications, duties, and restrictions between Estate Agent\'s Licence and Salesperson\'s Licence.',
        },
        capReference: 'Cap. 511 s. 15, s. 16 & s. 17',
        promptTopic: '請比較營業員牌照 (Salesperson) 與地產代理牌照 (Estate Agent) 在營業權限及受僱要求上的主要分別。',
      },
      {
        id: 'm1-l3',
        title: {
          'zh-HK': '違規行為與紀律處分程序',
          en: 'Disciplinary Procedures & Penalties',
        },
        summary: {
          'zh-HK': '了解紀律委員會的調查程序、訓示、罰款、暫停或撤銷牌照等罰則。',
          en: 'Understand Disciplinary Committee inquiry processes, reprimands, fines, and license suspension or revocation.',
        },
        capReference: 'Cap. 511 s. 28 - s. 30',
        promptTopic: '若持牌人違反 EAA 操守守則，紀律委員會有何處分權限？請列出最高罰則及程序。',
      },
    ],
  },
  {
    id: 'module-2',
    moduleNumber: 2,
    title: {
      'zh-HK': '模組二：土地法、轉讓業權實務及查冊解讀',
      en: 'Module 2: Land Law, Conveyancing Practice & Land Search Interpretation',
    },
    description: {
      'zh-HK': '掌握香港土地契據制度、查冊 (Land Search) 解讀技巧及違建/潛建物檢視。',
      en: 'Master the HK deeds registration system, Land Registry search reading, and unauthorized building works (UBWs).',
    },
    lessons: [
      {
        id: 'm2-l1',
        title: {
          'zh-HK': '香港土地官契制度與不可分割份數',
          en: 'Government Leases & Undivided Shares',
        },
        summary: {
          'zh-HK': '理解香港土地租契 (Government Lease) 制度、地段編號及大廈公契 (DMC) 機制。',
          en: 'Understand Government Lease conditions, Lot numbers, and Deed of Mutual Covenant (DMC) framework.',
        },
        capReference: 'Land Registration Ordinance (Cap. 128)',
        promptTopic: '請解釋香港土地租契 (Government Lease) 及大廈公契 (DMC) 對業主及地產代理的法律約束力。',
      },
      {
        id: 'm2-l2',
        title: {
          'zh-HK': '土地註冊處查冊 (Land Search) 深度解讀',
          en: 'Interpreting Land Registry Searches',
        },
        summary: {
          'zh-HK': '學習閱讀查冊四大部分：業權人、物業資料、按揭 (Mortgage) 及釘契 (Encumbrances)。',
          en: 'Read the four sections of a Land Search: Owner details, Property Particulars, Mortgages, and Encumbrances.',
        },
        capReference: 'EAA Practice Circular C-02-01',
        promptTopic: '如何閱讀土地查冊 (Land Search) 中的「釘契」(Encumbrances)？代理需向買方披露哪些常見提示項？',
      },
      {
        id: 'm2-l3',
        title: {
          'zh-HK': '違例建築工程 (UBWs) 與業權瑕疵',
          en: 'Unauthorized Building Works (UBWs) & Title Defects',
        },
        summary: {
          'zh-HK': '識別清拆令 (Section 24 Order) 及其對物業買賣及按揭申請的影響。',
          en: 'Identify Buildings Department S.24 demolition orders and their impact on property title and mortgage approval.',
        },
        capReference: 'Buildings Ordinance (Cap. 123)',
        promptTopic: '若物業被屋宇署發出第24條清拆令 (S.24 Order)，代理在安排買賣時有哪些法定披露責任？',
      },
    ],
  },
  {
    id: 'module-3',
    moduleNumber: 3,
    title: {
      'zh-HK': '模組三：地產代理實務、操守守則及法定表格 (Form 1 - 6)',
      en: 'Module 3: Agency Practice, Code of Ethics & Statutory Forms (Forms 1-6)',
    },
    description: {
      'zh-HK': '掌握六項法定地產代理協議、雙重代理披露及客戶訂金託管規範。',
      en: 'Master the 6 statutory agency agreements, dual agency rules, and client stakeholder money handling.',
    },
    lessons: [
      {
        id: 'm3-l1',
        title: {
          'zh-HK': '法定表格 (Form 1 至 Form 6) 的強制使用',
          en: 'Statutory Prescribed Forms (Forms 1 to 6)',
        },
        summary: {
          'zh-HK': '對比住宅買賣及租賃之法定協議（Form 3 賣方、Form 4 買方、Form 5/6 租賃）。',
          en: 'Compare statutory forms for residential sale and leasing (Form 3 Vendor, Form 4 Buyer, Form 5/6 Leasing).',
        },
        capReference: 'Estate Agents Practice Regulation',
        promptTopic: '請整理並比較地產代理法定表格 (Form 1 至 Form 6) 的適用場景、簽署時機及法例要點。',
      },
      {
        id: 'm3-l2',
        title: {
          'zh-HK': '雙重代理 (Dual Agency) 與權益披露',
          en: 'Dual Agency & Conflict of Interest Disclosure',
        },
        summary: {
          'zh-HK': '規範代理同時代表買賣雙方時的書面同意要求及佣金收取準則。',
          en: 'Mandatory written consent and disclosure rules when acting for both vendor and purchaser in a single deal.',
        },
        capReference: 'Cap. 511 s. 36',
        promptTopic: '地產代理在處理雙重代理 (Dual Agency) 時，若未有妥善披露，會承擔哪些法律及紀律後果？',
      },
      {
        id: 'm3-l3',
        title: {
          'zh-HK': '傳達要約 (Conveying Offers) 與訂金處理',
          en: 'Conveying Offers & Stakeholder Deposit Handling',
        },
        summary: {
          'zh-HK': '履行將所有要約（包括口頭出價）即時傳達予賣方的法定責任。',
          en: 'Fulfill the statutory duty to convey all purchase offers (including verbal) immediately to the vendor.',
        },
        capReference: 'EAA Code of Ethics',
        promptTopic: '地產代理收到買家的口頭出價 (Verbal Offer) 後，是否有責任傳達給業主？EAA 有何規定？',
      },
    ],
  },
  {
    id: 'module-4',
    moduleNumber: 4,
    title: {
      'zh-HK': '模組四：物業估值、建築知識、按揭及印花稅條例',
      en: 'Module 4: Valuation, Building Knowledge, Mortgages & Stamp Duty',
    },
    description: {
      'zh-HK': '涵蓋實用面積定義、按揭成數上限 (LTV)、供款與入息比率 (DSR) 及印花稅 (Cap. 117)。',
      en: 'Covers Saleable Area, Loan-to-Value (LTV) limits, Debt Servicing Ratios (DSR), and Stamp Duty Duty Duty Duty Cap. 117.',
    },
    lessons: [
      {
        id: 'm4-l1',
        title: {
          'zh-HK': '物業估值與實用面積 (Saleable Area) 定義',
          en: 'Property Valuation & Saleable Area Definitions',
        },
        summary: {
          'zh-HK': '掌握實用面積 (Saleable Area) 規範、直接比較估值法及影響物業價值的因素。',
          en: 'Master Saleable Area statutory rules under Cap. 621, direct comparison valuation, and property pricing factors.',
        },
        capReference: 'Cap. 621 & EAA Practice Circular',
        promptTopic: '請解釋根據一手住宅物業銷售條例，實用面積 (Saleable Area) 的法定定義及估值比較要點。',
      },
      {
        id: 'm4-l2',
        title: {
          'zh-HK': '按揭貸款實務：按揭成數 (LTV) 與供款比率 (DSR)',
          en: 'Mortgage Practice: LTV Limits & Debt Servicing Ratio',
        },
        summary: {
          'zh-HK': '理解金管局 (HKMA) 按揭上限、H按與P按差別及按揭保險計劃 (MIP) 申請條件。',
          en: 'Understand HKMA maximum LTV guidelines, H-rate vs P-rate mortgages, and Mortgage Insurance Programme (MIP) rules.',
        },
        capReference: 'HKMA Prudential Measures',
        promptTopic: '請說明香港金管局 (HKMA) 對住宅物業按揭成數 (LTV) 及供款與入息比率 (DSR) 的最新監管指引。',
      },
      {
        id: 'm4-l3',
        title: {
          'zh-HK': '《印花稅條例》(第117章) 與買賣交易稅率',
          en: 'Stamp Duty Ordinance (Cap. 117) & Transaction Duties',
        },
        summary: {
          'zh-HK': '掌握從價印花稅 (AVD)、買家印花稅 (BSD) 及額外印花稅 (SSD) 的計算與代理提示責任。',
          en: 'Calculate Ad Valorem Stamp Duty (AVD), Buyer\'s Stamp Duty (BSD), and Special Stamp Duty (SSD) liabilities.',
        },
        capReference: 'Stamp Duty Ordinance (Cap. 117)',
        promptTopic: '請詳細說明香港《印花稅條例》(第117章) 下的從價印花稅 (AVD) 計算方式及地產代理的提醒責任。',
      },
    ],
  },
];