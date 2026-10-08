// app/course/[id]/page.tsx
'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Lightbulb, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight,
  Scale,
  FileText,
  AlertTriangle,
  BrainCircuit
} from 'lucide-react';

interface LessonData {
  moduleZh: string;
  moduleEn: string;
  titleZh: string;
  titleEn: string;
  capRef: string;
  scenarioZh: string;
  scenarioEn: string;
  memoryHookZh: { title: string; desc: string };
  memoryHookEn: { title: string; desc: string };
  keyTakeawaysZh: string[];
  keyTakeawaysEn: string[];
  detailedContentZh: string;
  detailedContentEn: string;
  trapsZh: string[];
  trapsEn: string[];
  quiz: {
    questionZh: string;
    questionEn: string;
    optionsZh: string[];
    optionsEn: string[];
    correctIndex: number;
    explanationZh: string;
    explanationEn: string;
  };
}

const EAA_COMPREHENSIVE_DB: Record<string, LessonData> = {
  // MODULE 1: THE REGULATORY CORE
  'm1-l1': {
    moduleZh: '模組一：地產代理監管條例與牌照規範',
    moduleEn: 'Module 1: The Regulatory Core & Licensing Rules',
    titleZh: '第一講：牌照類別、申請資格與四層監管架構',
    titleEn: 'Lesson 1: License Types, Eligibility & The Four-Floor EAA Structure',
    capRef: 'Cap. 511 Section 15 & 16',
    scenarioZh: '一位 22 歲並持有 SQE 營業員牌照 3 年的持牌人，擬被委任為地產代理分行的管轄主管 (Manager)。這是否符合法例規定？',
    scenarioEn: 'A 22-year-old holding an SQE license for 3 years is nominated to be appointed as a Branch Manager. Is this compliant with EAA regulations?',
    memoryHookZh: {
      title: '記憶鉤：18 - 5 - 12 - F&P 及「3 到 1」續期法則',
      desc: '資格：年滿 18 歲、中五學歷、12 個月內考獲合格 (SQE 為 6 個月)、符合 Fit and Proper (適當人選)。續期窗口：屆滿前 3 個月內至 1 個月前申請。'
    },
    memoryHookEn: {
      title: 'Memory Hook: 18 - 5 - 12 - F&P and 3-to-1 Renewal',
      desc: 'Eligibility: 18 years old, Form 5, Exam passed within 12 months (6 months for SQE), Fit & Proper. Renewal window: No earlier than 3 months, no later than 1 month before expiry.'
    },
    keyTakeawaysZh: [
      '✓ 地產代理（個人）牌照 (EAQE) 可獨立經營或任分行主管；營業員牌照 (SQE) 僅可受僱執行工作。',
      '✓ 獨資經營者或合夥人必須持有 EAQE 牌照，SQE 持有人嚴禁擔任主管或合夥人。',
      '✓ 考獲資格窗口：EAQE 為 12 個月內，SQE 為 6 個月內。「工作經驗」並非牌照申請資格之一。',
      '✓ 未解除破產者或 18 個月前曾因欺詐罪被判監者不符合 Fit and Proper；普通交通罰款不影響。'
    ],
    keyTakeawaysEn: [
      '✓ EAQE allows sole proprietorship, partnership, or branch management; SQE allows employment only.',
      '✓ Sole proprietors and partners MUST hold an EAQE license; SQE holders are barred from these roles.',
      '✓ Exam validity window: 12 months for EAQE, 6 months for SQE. Relevant work experience is NOT a requirement.',
      '✓ Undischarged bankrupts and fraud convicts fail Fit & Proper test; minor traffic fines do not disqualify.'
    ],
    detailedContentZh: '根據《地產代理條例》(Cap. 511) 第15及16條，營業員牌照持有人不能經營業務，亦不得被委任為分行主管。分行主管必須持有 EAQE 牌照，並依第38條由監管局批准。監管局四大職能層級：發牌 (Licence)、監管 (Regulate)、懲處 (Discipline)、教育 (Educate)。',
    detailedContentEn: 'Under Cap. 511 Sections 15 & 16, SQE holders cannot carry on business or act as branch managers. Under Section 38, branch managers must hold an EAQE license and be approved by the EAA. The EAA four-floor model: Licence, Regulate, Discipline, Educate.',
    trapsZh: [
      '⚠ 陷阱：常考誤導項宣稱「具備 3 年經驗的 SQE 持有人可擔任分行主管」— 錯誤！無 EAQE 牌照絕不能擔任。',
      '⚠ 陷阱：宣稱「監管局可以對違規持牌人處以港幣 10 萬元罰款」— 錯誤！監管局的懲處權（ARSC）不包括直接罰款。'
    ],
    trapsEn: [
      '⚠ Trap: Distractor claims an SQE holder with 3 years experience can manage a branch — FALSE! Must hold EAQE.',
      '⚠ Trap: Claims EAA can impose a $100,000 fine on licensees — FALSE! Disciplinary powers (ARSC) do not include fines.'
    ],
    quiz: {
      questionZh: '一名營業員牌照 (SQE) 持有人（屆滿日為 3 月 21 日），最早及最遲應於何時提交續期申請？',
      questionEn: 'A salesperson license (SQE) expires on 21 March. What are the earliest and latest dates to apply for renewal?',
      optionsZh: [
        '屆滿前 6 個月內至 3 個月前',
        '最早為 12 月 22 日，最遲為 2 月 21 日 (屆滿前 3 個月至 1 個月)',
        '屆滿前 30 天內至屆滿當天',
        '隨時提交，無時間限制'
      ],
      optionsEn: [
        'Between 6 months and 3 months prior to expiry',
        'Earliest 22 December, latest 21 February (3 months to 1 month prior)',
        'Within 30 days prior to expiry',
        'Anytime without restriction'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。續期窗口為屆滿前「不早於 3 個月，不遲於 1 個月」(3 to 1 window)。',
      explanationEn: 'Correct answer is B. Renewal applications must be lodged no earlier than 3 months and no later than 1 month before expiry.'
    }
  },

  'm1-l3': {
    moduleZh: '模組一：地產代理監管條例與牌照規範',
    moduleEn: 'Module 1: The Regulatory Core & Licensing Rules',
    titleZh: '第三講：法定表格 (Forms 1 - 6) 區分與客戶託管款項處理',
    titleEn: 'Lesson 3: Prescribed Forms (Forms 1-6) & Client Money Rules',
    capRef: 'Cap. 511 Section 36 & Practice Regulation',
    scenarioZh: '代理收到買方交付的 $40,000 臨時訂金現金，當時賣方不在香港。代理應如何處理該筆款項？',
    scenarioEn: 'An agent receives $40,000 cash as initial deposit for the vendor who is out of Hong Kong. How must the agent handle this money?',
    memoryHookZh: {
      title: '記憶鉤：單數賣、雙數買，及 3 - 2 - 14 - 3 資金法則',
      desc: 'Form 1&2 為物業/租務資料表；Form 3&5 為賣方/業主協議(單數)；Form 4&6 為買方/租客協議(雙數)。款項處理：3 項許可用途、2 個收受方、14 天內發收據、收據副本保存 3 年。'
    },
    memoryHookEn: {
      title: 'Memory Hook: Odd Sells, Even Buys & 3 - 2 - 14 - 3 Money Rule',
      desc: 'Form 1&2 Information; Form 3&5 Vendor/Landlord (Odd); Form 4&6 Purchaser/Tenant (Even). Money: 3 permitted uses, 2 parties, written receipt within 14 days, keep copy for 3 years.'
    },
    keyTakeawaysZh: [
      '✓ 賣方代理 Form 3 的法定職責：宣傳推廣、獲取物業資料、進行議價。不包括背景調查、破產查冊、物業估值。',
      '✓ 收取的客戶訂金必須即時存入代理公司於銀行開設的「客戶信託戶口」(Trust Account)。',
      '✓ 鋪位買賣、寫字樓租務、非獨立住宅單位（無獨立廚廁）均不適用法定預設表格 1 至 6。'
    ],
    keyTakeawaysEn: [
      '✓ Form 3 duties: marketing, obtaining property info, negotiating. Excludes background checks, bankruptcy search, valuation.',
      '✓ Client money received must be deposited immediately into the agency firm\'s bank Client Trust Account.',
      '✓ Prescribed Forms 1-6 do NOT apply to shop sales, office leases, or non-self-contained residential units.'
    ],
    detailedContentZh: '根據《地產代理條例》(Cap. 511) 第36條及《執業規例》，代理收取客戶款項必須存入獨立信託戶口，並於 14 天內開立收據，收據副本須保存至少 3 年。嚴禁存入代理個人戶口或律師樓戶口。',
    detailedContentEn: 'Under Cap. 511 Section 36 & Practice Regulations, client funds must go into a bank trust account. Issued receipt within 14 days; retain copy for at least 3 years. Never deposit into personal or solicitor accounts.',
    trapsZh: [
      '⚠ 陷阱：宣稱「現金訂金應存入賣方律師樓的信託戶口」— 錯誤！必須存入地產代理公司自身的客戶信託戶口。',
      '⚠ 陷阱：宣稱「未獲賣方特別指示禁止前，代理可自行刊登廣告」— 錯誤！必須先取得賣方事先書面同意。'
    ],
    trapsEn: [
      '⚠ Trap: Claims cash deposit should go to seller\'s solicitor trust account — FALSE! Must enter agency\'s own bank trust account.',
      '⚠ Trap: Claims agent may advertise unless seller specifically forbids — FALSE! Prior written consent is mandatory.'
    ],
    quiz: {
      questionZh: '下列哪種物業交易情況「不適用」法定預設地產代理協議表格 (Forms 1-6)？',
      questionEn: 'For which of the following property transactions are prescribed forms (Forms 1-6) NOT required?',
      optionsZh: [
        '連同車位一同出售之住宅物業',
        '獨立住宅單位之租賃',
        '店舖 (Shop) 之買賣或寫字樓 (Office) 之租賃',
        '連同車位一同出租之住宅物業'
      ],
      optionsEn: [
        'Sale of residential property together with a car park',
        'Leasing of a self-contained residential unit',
        'Sale of a shop or leasing of an office',
        'Leasing of residential property together with a car park'
      ],
      correctIndex: 2,
      explanationZh: '正確答案為 C。法定表格僅適用於住宅物業。店舖買賣及寫字樓租賃均不適用 Forms 1-6。',
      explanationEn: 'Correct answer is C. Prescribed forms apply strictly to residential properties, not commercial shops or offices.'
    }
  },

  // MODULE 2: THE LEGAL TOOLKIT
  'm2-l4': {
    moduleZh: '模組二：法律工具箱 (契約、轉讓與稅務)',
    moduleEn: 'Module 2: Legal Toolkit (Contracts, Conveyancing & Taxes)',
    titleZh: '第四講：業權證明規範 (15 年業權鏈)、訂金託管與印花稅計算',
    titleEn: 'Lesson 4: Proof of Title (15-Year Chain), Stakeholding & Stamp Duty',
    capRef: 'Cap. 219 Conveyancing Ordinance & Cap. 117 Stamp Duty',
    scenarioZh: '若物業存在負資產按揭、押記令 (Charging Order) 或屬確認人 (Confirmor) 轉售，代理應如何指引買家處置訂金？',
    scenarioEn: 'If a property is in negative equity, subject to a charging order, or sold by a confirmor, how should the agent advise the deposit payment?',
    memoryHookZh: {
      title: '記憶鉤：業權 15 年及 NEG - CHG - CONF 託管法則',
      desc: '業權證明：政府地契 + 15 年業權鏈 (由轉讓契/法定押記開始)。託管三情況：NEGative equity (負資產)、CHarGing order (押記令)、CONFirmor (確認人轉售) 必須交律師樓託管 (Stakeholder)。'
    },
    memoryHookEn: {
      title: 'Memory Hook: 15-Year Title Chain & NEG - CHG - CONF Stakeholding',
      desc: 'Title proof: Gov lease + 15 years title chain. Stakeholder deposit triggers: NEGative equity, CHarGing order, CONFirmor sale.'
    },
    keyTakeawaysZh: [
      '✓ 證明良好業權 (Good Title)：賣方須提供政府地契及至少 15 年前的業權契據 (以 Assignment 等為起點)。',
      '✓ 現狀 (As Is) 條款：指買家接受簽約時物業之物理現狀，絕不代表認可違例建築或承擔現有租約。',
      '✓ 買方違約時，賣方可沒收訂金及解約重售，但「不得」向土地註冊處登記押記備忘錄 (Memorandum of Charge)。'
    ],
    keyTakeawaysEn: [
      '✓ Proof of Title: Gov lease + title root commencing at least 15 years back with an Assignment/Legal Charge.',
      '✓ "As is" clause: Buyer accepts physical state on signing date; does NOT warrant Building Ordinance compliance.',
      '✓ If buyer defaults, vendor can forfeit deposit and resell; vendor CANNOT register a Memorandum of Charge.'
    ],
    detailedContentZh: '依據《物業轉讓及物業條例》(Cap. 219) 第13條，業權證明須追溯至至少 15 年前的轉讓契。遇到 NEG-CHG-CONF 情況，訂金必須由律師樓作為託管人 (Stakeholder) 託管，防止賣方捲款離場。',
    detailedContentEn: 'Under Cap. 219 Section 13, title proof requires a 15-year chain of title. Under NEG-CHG-CONF scenarios, deposits must be held by solicitors as stakeholders to protect buyer funds.',
    trapsZh: [
      '⚠ 陷阱：宣稱「業權證明須追溯 10 年或 20 年」或「以入伙紙為起點」— 錯誤！法例標準為 15 年並以 Assignment 為起點。',
      '⚠ 陷阱：宣稱「買方違約時賣方可在土地註冊處登記押記備忘錄」— 錯誤！賣方無權登記此備忘錄。'
    ],
    trapsEn: [
      '⚠ Trap: Claims title proof requires 10 or 20 years, or starts at Occupation Permit — FALSE! Strictly 15 years starting at Assignment.',
      '⚠ Trap: Claims vendor can register a Memorandum of Charge on buyer default — FALSE! Vendor has no such remedy.'
    ],
    quiz: {
      questionZh: '下列哪種情況下，地產代理「無須」建議買家將訂金交予律師樓作為託管人 (Stakeholder)？',
      questionEn: 'In which scenario is an agent NOT required to advise paying the deposit to solicitors as stakeholders?',
      optionsZh: [
        '物業設有按揭且處於負資產 (Negative Equity)',
        '物業已被土地註冊處登記押記令 (Charging Order)',
        '物業由確認人 (Confirmor) 以轉售合約形式出售',
        '物業連同現有租約 (Existing Tenancy) 一同出售'
      ],
      optionsEn: [
        'Property is under mortgage and in negative equity',
        'Property is subject to a registered Charging Order',
        'Property is sold by a confirmor via sub-sale agreement',
        'Property is sold subject to an existing tenancy'
      ],
      correctIndex: 3,
      explanationZh: '正確答案為 D。連同現有租約出售並非必須將訂金交律師樓託管的法定三種情況之一 (NEG-CHG-CONF)。',
      explanationEn: 'Correct answer is D. Existing tenancy is not one of the three core stakeholder trigger conditions (NEG-CHG-CONF).'
    }
  },

  // MODULE 3: LAND SEARCH & BUILDINGS
  'm3-l1': {
    moduleZh: '模組三：土地查冊與建築物條例',
    moduleEn: 'Module 3: Land Search, Buildings & Valuation',
    titleZh: '第一講：土地登記冊四抽屜 (P-O-I-M) 與公司賣方雙重查冊',
    titleEn: 'Lesson 1: Land Search Structure (P-O-I-M) & Corporate Vendor Rule',
    capRef: 'Cap. 128 Land Registration Ordinance',
    scenarioZh: '賣方為一家香港註冊的私人有限公司。代理只做了土地註冊處查冊，是否足以確認該公司物業的按揭負擔？',
    scenarioEn: 'The vendor is a private limited company. Is a Land Registry search alone sufficient to verify all charges on the property?',
    memoryHookZh: {
      title: '記憶鉤：P - O - I - M 抽屜及公司賣方雙重查冊法則',
      desc: '土地查冊四抽屜：Property (物業細節)、Owner (業主資料)、Incumbrances (負擔欄)、Memorial (擬註冊契據)。公司賣方金科玉律：必須做「土地註冊處 + 公司註冊處」雙重查冊！'
    },
    memoryHookEn: {
      title: 'Memory Hook: P-O-I-M Drawers & Two-Search Corporate Rule',
      desc: 'Land search drawers: Property, Owner, Incumbrances, Memorial details. Company Vendor Rule: MUST conduct BOTH Land Registry AND Companies Registry searches!'
    },
    keyTakeawaysZh: [
      '✓ 土地登記冊四大段落：物業資料 (Property)、業主資料 (Owner)、物業負擔 (Incumbrances)、等待註冊契據 (Memorial)。',
      '✓ 公司賣方：查核按揭或押記，必須查閱土地註冊處及公司註冊處 (Companies Registry) 的登記檔案。',
      '✓ 入伙紙 (Occupation Permit) 僅記載物業單位的「擬定用途」(Permitted User)，不記載實用面積或總樓面面積。'
    ],
    keyTakeawaysEn: [
      '✓ Land Register comprises 4 sections: Property, Owner, Incumbrances, Memorial details.',
      '✓ Corporate Vendor: To verify mortgages/charges, MUST search Land Registry AND Companies Registry.',
      '✓ Occupation Permit states "Permitted User" only; does NOT state saleable area or gross floor area.'
    ],
    detailedContentZh: '依據《土地註冊條例》(Cap. 128)，香港實行契據註冊制度。若業主為有限公司，公司的章程細則 (M&A) 或商業登記證 (BR) 均不會顯示按揭負擔，必須於公司註冊處查閱 Statement of Particulars of Charge。',
    detailedContentEn: 'Under Cap. 128 deeds registration system, M&A or Business Registration Certificates do NOT reveal property charges. Agents must search the Companies Registry for Statement of Particulars of Charge.',
    trapsZh: [
      '⚠ 陷阱：宣稱「查閱公司賣方的商業登記證或公司章程即可獲悉其按揭負擔」— 錯誤！必須做公司註冊處押記查冊。',
      '⚠ 陷阱：宣稱「入伙紙會列出物業的實用面積」— 錯誤！實用面積須由差餉物業估價署 Property Information Online 獲取。'
    ],
    trapsEn: [
      '⚠ Trap: Claims Business Registration or M&A reveals company mortgages — FALSE! Must search Companies Registry.',
      '⚠ Trap: Claims Occupation Permit shows saleable area — FALSE! Saleable area comes from RVD Property Information Online.'
    ],
    quiz: {
      questionZh: '若需要獲取住宅物業的官方「實用面積」(Saleable Area) 以填寫 Form 1，正確的資料來源為何？',
      questionEn: 'Which is the correct official source to obtain the Saleable Area of a property for Form 1?',
      optionsZh: [
        '建築物入伙紙 (Occupation Permit)',
        '大廈公契 (Deed of Mutual Covenant)',
        '差餉物業估價署的「物業資訊網」(Property Information Online)',
        '業權轉讓契 (Assignment)'
      ],
      optionsEn: [
        'Occupation Permit',
        'Deed of Mutual Covenant (DMC)',
        'Rating and Valuation Department\'s "Property Information Online"',
        'Assignment Deed'
      ],
      correctIndex: 2,
      explanationZh: '正確答案為 C。實用面積官方法定來源為差餉物業估價署之物業資訊網 (RVD Property Information Online)。',
      explanationEn: 'Correct answer is C. Official saleable area data is obtained via RVD Property Information Online.'
    }
  },

  // MODULE 4: TENANCY & MANAGEMENT
  'm4-l1': {
    moduleZh: '模組四：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Leasing, Agency Management & Exam Mastery',
    titleZh: '第一講：租務 2-2-2 鏡像法則、15 天沒收權與 CR109 申報',
    titleEn: 'Lesson 1: Tenancy 2-2-2 Mirror Rule, 15-Day Forfeiture & CR109',
    capRef: 'Cap. 7 Landlord and Tenant Ordinance',
    scenarioZh: '租客欠繳租金，且租約中沒有訂明沒收租賃條款。業主需於租客欠租多少天後方可依法沒收租賃？',
    scenarioEn: 'A tenant fails to pay rent under a lease containing no express forfeiture clause. After how many days of default may the landlord forfeit?',
    memoryHookZh: {
      title: '記憶鉤：租務 2 - 2 - 2 鏡像、15 天沒收及 CR109 規則',
      desc: '2-2-2 鏡像：租客 2 權(專有佔用/平靜享受)、2 責(交租/交還物業)；業主 2 權(收租/收樓)、1 責(維修結構外牆)。沒收租賃：欠租 15 天！CR109：住宅新租及續租向差餉物業估價署申報。'
    },
    memoryHookEn: {
      title: 'Memory Hook: Tenancy 2-2-2 Mirror, 15-Day Forfeiture & CR109',
      desc: '2-2-2 Mirror: Tenant 2 rights/2 duties; Landlord 2 rights/1 duty (structural & exterior repairs). Forfeiture: 15 days default! CR109: Residential new leases & renewals to RVD.'
    },
    keyTakeawaysZh: [
      '✓ 維修分工：業主負責結構與外牆維修；租客僅負責內部維修 (合理損耗除外)。',
      '✓ 無明文沒收條款下，租客欠租滿 15 天，業主方可沒收租賃 (7、10、14 天均為常考干擾項)。',
      '✓ CR109 表格：僅適用於住宅物業之「新租賃」及「續租」，須送交差餉物業估價署。退租或商業租務無須申報。',
      '✓ 機構管理通知：新委任分行主管須於 31 天內通知監管局；內部員工跨分行調配無須通知。'
    ],
    keyTakeawaysEn: [
      '✓ Repair duty: Landlord repairs structure/exterior; Tenant maintains interior (fair wear & tear excepted).',
      '✓ In absence of express clause, landlord may forfeit for non-payment after 15 DAYS (not 7, 10, or 14).',
      '✓ Form CR109: Applies to RESIDENTIAL new lettings & renewals, lodged with RVD. Surrender or commercial leases excluded.',
      '✓ EAA notification: Appointing a branch manager requires notification within 31 days; internal staff transfers do NOT.'
    ],
    detailedContentZh: '依據《業主與租客(綜合)條例》(Cap. 7)，住宅租約常見條款中，要求租客負責「外牆及結構維修」屬不常見條款。欠租沒收法定寬限期為 15 天。CR109 表格未於 1 個月內提交會影響日後採取法律行動。',
    detailedContentEn: 'Under Cap. 7 Landlord & Tenant Ordinance, requiring tenants to maintain structural/exterior parts is unusual. Statutory non-payment forfeiture period is 15 days. CR109 must be lodged with RVD.',
    trapsZh: [
      '⚠ 陷阱：宣稱「業主可在欠租 14 天後沒收租賃」— 錯誤！法定天數為 15 天。',
      '⚠ 陷阱：宣稱「住宅租客退租 (Surrender) 或商業樓宇出租時須提交 CR109」— 錯誤！僅限住宅新租與續租。'
    ],
    trapsEn: [
      '⚠ Trap: Claims landlord can forfeit after 14 days of unpaid rent — FALSE! Statutory requirement is 15 days.',
      '⚠ Trap: Claims CR109 is required for tenancy surrenders or commercial leases — FALSE! Residential new leases and renewals only.'
    ],
    quiz: {
      questionZh: '關於表格 CR109 的申報規定，下列哪種情況「必須」向差餉物業估價署提交？',
      questionEn: 'In which scenario MUST a Form CR109 be lodged with the Rating and Valuation Department?',
      optionsZh: [
        '住宅物業簽立新租賃協議或辦理續租時',
        '租客提前退租 (Surrender) 時',
        '寫字樓 (Commercial Office) 簽立新租約時',
        '業主與租客同意終止租約時'
      ],
      optionsEn: [
        'New letting or renewal of a residential tenancy',
        'Early surrender of a tenancy by the tenant',
        'New tenancy of a commercial office space',
        'Mutual agreement to terminate a lease'
      ],
      correctIndex: 0,
      explanationZh: '正確答案為 A。CR109 僅適用於住宅物業之「新租」及「續租」。退租及商業租約均無須申報。',
      explanationEn: 'Correct answer is A. Form CR109 applies strictly to new lettings and renewals of residential premises.'
    }
  }
};

const DEFAULT_LESSON: LessonData = {
  moduleZh: 'EAA 核心牌照課程單元',
  moduleEn: 'EAA Core Licensing Module',
  titleZh: '章節專業講義與法規剖析',
  titleEn: 'Lesson Study Notes & Regulatory Analysis',
  capRef: 'Cap. 511 Provisions',
  scenarioZh: '持牌地產代理在進行物業交易過程中，必須嚴格遵守監管局的指引及法定披露責任。',
  scenarioEn: 'Licensed real estate agents must adhere strictly to statutory disclosure duties and EAA practice directions during transactions.',
  memoryHookZh: {
    title: '記憶鉤：條例重點記憶法',
    desc: '熟記法定條文、恪守雙重代理申報及客戶資金信託處理。'
  },
  memoryHookEn: {
    title: 'Memory Hook: Core Statute Rule',
    desc: 'Master statutory clauses, dual agency disclosures, and trust accounting.'
  },
  keyTakeawaysZh: [
    '✓ 掌握《地產代理條例》核心條款與法定表格之應用。',
    '✓ 嚴格履行對客戶的誠實與謹慎責任 (Duty of Care and Fiduciary Duty)。',
    '✓ 了解違規行為之懲處機制與個人牌照續期條件。'
  ],
  keyTakeawaysEn: [
    '✓ Master the application of Cap. 511 core clauses and statutory forms.',
    '✓ Strictly uphold duty of care and fiduciary duties owed to clients.',
    '✓ Understand regulatory penalty mechanisms and license renewal rules.'
  ],
  detailedContentZh: '本單元針對香港地產代理監管局 (EAA) 之最新考試大綱編寫。深入解析法定條文、相關司法判例及地產代理操守指引，幫助學員全面建立考點邏輯。',
  detailedContentEn: 'This lesson aligns with the latest EAA examination syllabus. It covers statutory principles, judicial precedents, and ethical guidelines for maximum exam readiness.',
  trapsZh: [
    '⚠ 陷阱：混淆法定天數與監管局懲處權力界限。'
  ],
  trapsEn: [
    '⚠ Trap: Confusing statutory timeframes with EAA disciplinary powers.'
  ],
  quiz: {
    questionZh: '持牌地產代理在處理物業交易時，最基本的法定責任是什麼？',
    questionEn: 'What is the primary statutory duty of a licensed estate agent when handling a property transaction?',
    optionsZh: [
      '盡力保障客戶利益並向客戶披露所有已知的重要事實',
      '確保交易價格達到市場最高價',
      '替買賣雙方決定最終成交金額',
      '提供免費法律諮詢服務'
    ],
    optionsEn: [
      'Act in the best interest of the client and disclose all material facts',
      'Ensure the highest transaction price possible',
      'Unilaterally determine the final transaction amount',
      'Provide free legal representation'
    ],
    correctIndex: 0,
    explanationZh: '正確答案為 A。地產代理對客戶負有謹慎及忠誠責任，必須及時披露所有重大資料。',
    explanationEn: 'Correct answer is A. Agents owe a fiduciary duty and duty of care to disclose all material facts to their principal.'
  }
};

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams.id.toLowerCase();
  const { locale, language } = useLanguage();
  const isZh = locale ? locale === 'zh-HK' : language === 'ZH';

  const lesson = EAA_COMPREHENSIVE_DB[lessonId] || {
    ...DEFAULT_LESSON,
    titleZh: `章節 ${lessonId.toUpperCase()} 講義與考點分析`,
    titleEn: `Lesson ${lessonId.toUpperCase()} Study Notes & Key Points`
  };

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleQuizSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const isCorrect = selectedOption === lesson.quiz.correctIndex;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-400 hover:text-indigo-300 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isZh ? '返回課程大綱' : 'Back to Syllabus'}</span>
          </Link>
          <span className="rounded-full bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 text-[11px] font-mono text-indigo-300 flex items-center gap-1.5">
            <Scale className="h-3.5 w-3.5 text-indigo-400" />
            <span>{lesson.capRef}</span>
          </span>
        </div>

        {/* Lesson Titles */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {isZh ? lesson.moduleZh : lesson.moduleEn}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {isZh ? lesson.titleZh : lesson.titleEn}
          </h1>
        </div>

        {/* SECTION 1: Memory Hook & Mnemonic (Dual Coding) */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <BrainCircuit className="h-5 w-5 text-amber-400" />
            <span>{isZh ? lesson.memoryHookZh.title : lesson.memoryHookEn.title}</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
            {isZh ? lesson.memoryHookZh.desc : lesson.memoryHookEn.desc}
          </p>
        </div>

        {/* SECTION 2: Pedagogical Hook & Practical Scenario */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <span>{isZh ? '【香港 EAA 實務情境思考】' : '[EAA Practical Case Scenario]'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
            "{isZh ? lesson.scenarioZh : lesson.scenarioEn}"
          </p>
        </div>

        {/* SECTION 3: Verified Exam Takeaways */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>{isZh ? '試題庫核實考點 (Syllabus Verified Notes ✓)' : 'Syllabus Verified Notes ✓'}</span>
          </h2>
          <ul className="space-y-3">
            {(isZh ? lesson.keyTakeawaysZh : lesson.keyTakeawaysEn).map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  ✓
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 4: Trap Register (Exam Traps & Distractor Alert) */}
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm border-b border-rose-500/20 pb-2">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
            <span>{isZh ? '考官陷阱與干擾項拆解 (Exam Trap Register ⚠)' : 'Exam Trap Register ⚠'}</span>
          </div>
          <ul className="space-y-2">
            {(isZh ? lesson.trapsZh : lesson.trapsEn).map((trap, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                {trap}
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 5: Detailed Legal Notes */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="h-5 w-5 text-indigo-400" />
            <span>{isZh ? '條例與法規詳細分析' : 'Detailed Legal Notes'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isZh ? lesson.detailedContentZh : lesson.detailedContentEn}
          </p>
        </div>

        {/* SECTION 6: Knowledge Check Quiz */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              {isZh ? '全真檢索測試 (Active Retrieval Question)' : 'Active Retrieval Question'}
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
              {isZh ? lesson.quiz.questionZh : lesson.quiz.questionEn}
            </p>

            <div className="space-y-2.5">
              {(isZh ? lesson.quiz.optionsZh : lesson.quiz.optionsEn).map((opt, idx) => {
                let btnStyle = "border-slate-800 bg-slate-800/50 hover:bg-slate-800 text-slate-300";
                
                if (selectedOption === idx) {
                  btnStyle = "border-indigo-500 bg-indigo-950/60 text-white font-semibold";
                }

                if (isSubmitted) {
                  if (idx === lesson.quiz.correctIndex) {
                    btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200 font-bold";
                  } else if (selectedOption === idx) {
                    btnStyle = "border-rose-500 bg-rose-950/50 text-rose-200";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && idx === lesson.quiz.correctIndex && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isSubmitted && selectedOption === idx && idx !== lesson.quiz.correctIndex && (
                      <XCircle className="h-4 w-4 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {!isSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={selectedOption === null}
                className="mt-4 flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition disabled:opacity-50 cursor-pointer"
              >
                <span>{isZh ? '核對答案' : 'Submit Answer'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <div className={`p-4 rounded-xl border space-y-2 ${isCorrect ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-rose-950/30 border-rose-500/40'}`}>
                <div className="flex items-center gap-2 text-xs font-bold">
                  {isCorrect ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> {isZh ? '回答正確！' : 'Correct Answer!'}
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> {isZh ? '回答錯誤，請參閱解析' : 'Incorrect. See explanation below.'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isZh ? lesson.quiz.explanationZh : lesson.quiz.explanationEn}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isZh ? '返回大綱' : 'Syllabus'}</span>
          </Link>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
          >
            <span>{isZh ? '進入完整全真試題庫' : 'Practice Question Bank'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}