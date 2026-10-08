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

interface QuizData {
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationZh: string;
  explanationEn: string;
}

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
  trapsZh?: string[];
  trapsEn?: string[];
  quiz?: QuizData;
}

const DEFAULT_QUIZ: QuizData = {
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
};

const DEFAULT_TRAPS_ZH = ['⚠ 陷阱：混淆法定天數與監管局懲處權力界限。'];
const DEFAULT_TRAPS_EN = ['⚠ Trap: Confusing statutory timeframes with EAA disciplinary powers.'];

const EAA_LESSON_DATABASE: Record<string, LessonData> = {
  'm1-l1': {
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.1 EAO 立法原意與 EAA 四層監管架構',
    titleEn: '1.1 Why EAO Exists & EAA 4-Floor Regulatory Model',
    capRef: 'Cap. 511 Section 3 & 4',
    scenarioZh: '陳先生擬查詢地產代理監管局 (EAA) 的法定職能，並了解資格考試及註冊程序由何機構實際執行。',
    scenarioEn: 'Mr. Chan wants to clarify the statutory functions of the EAA and which authorities conduct the qualifying exams and registration.',
    memoryHookZh: {
      title: '記憶鉤：EAA 四層大樓 (LICENCE / REGULATE / DISCIPLINE / EDUCATE)',
      desc: '1樓發牌、2樓規管執業、3樓紀律處分、4樓專業教育。注意：考試由考評局 (HKEAA) 託管，PEAK 負責報名。'
    },
    memoryHookEn: {
      title: 'Memory Hook: EAA Four-Floor Building Model',
      desc: '1F Licence, 2F Regulate, 3F Discipline, 4F Educate. Note: Exams administered by HKEAA, registration via PEAK VTC.'
    },
    keyTakeawaysZh: [
      '✓ 地產代理監管局 (EAA) 是根據《地產代理條例》(Cap. 511) 設立的法定機構。',
      '✓ 資格考試由香港考試及評核局 (HKEAA) 代為舉行，報名由 Peak Exam Centre 處理。',
      '✓ 監管局四大主職：發牌、監管從業員操守、處理投訴及紀律處分、推動持續專業進修 (CPD)。'
    ],
    keyTakeawaysEn: [
      '✓ EAA is a statutory body established under the Estate Agents Ordinance (Cap. 511).',
      '✓ Qualifying examinations are administered by the HKEAA on behalf of the EAA; registration via PEAK.',
      '✓ Four main functions: Granting licences, regulating practice, disciplinary inquiries, and CPD education.'
    ],
    detailedContentZh: '《地產代理條例》(第511章) 旨在提高地產代理行業的專業水平及保障消費者權益。行業發展已由個人經營轉型為公司型及大型連鎖企業。EAA 執行程序包括由行政總裁 (CEO) 處理投訴及調查，並由紀律委員會 (Disciplinary Committee) 進行研訊。',
    detailedContentEn: 'Cap. 511 aims to enhance professionalism and protect consumers. EAA oversees industry development. The CEO handles complaints and investigations, while the Disciplinary Committee conducts formal inquiries.',
    trapsZh: ['⚠ 陷阱：宣稱「資格考試由地產代理監管局直接親自監考及舉辦」— 錯誤！考試是由考評局 (HKEAA) 代辦。'],
    trapsEn: ['⚠ Trap: Claims EAA directly holds and invigilates the qualifying exam — FALSE! HKEAA administers it.'],
    quiz: {
      questionZh: '下列關於地產代理監管局 (EAA) 職能的表述，哪項是完全正確的？',
      questionEn: 'Which statement regarding the functions of the EAA is correct?',
      optionsZh: [
        'EAA 是直接負責舉行資格考試的政府部門',
        'EAA 是根據 Cap. 511 成立的法定機構，負責發牌與行業監管',
        'EAA 可以對違規從業員處以港幣 10 萬元的刑事罰款',
        'EAA 負責為所有二手住宅交易提供免費物業估值'
      ],
      optionsEn: [
        'EAA is a government department that directly holds the exams',
        'EAA is a statutory body under Cap. 511 responsible for licensing and regulation',
        'EAA can directly impose a $100,000 criminal fine on licensees',
        'EAA provides free valuation services for secondary market properties'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。EAA 是 Cap. 511 設立的法定機構。考試由考評局代辦，EAA 無處以刑事罰款權利。',
      explanationEn: 'Correct answer is B. EAA is a statutory body under Cap. 511. Exams are held by HKEAA, and EAA cannot impose fines.'
    }
  },

  'm1-l2': {
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.2 牌照類別與申請資格 (18-5-12-F&P 及 3到1續期)',
    titleEn: '1.2 License Types & Eligibility (18-5-12-F&P & 3-to-1 Renewal)',
    capRef: 'Cap. 511 Section 15 & 16',
    scenarioZh: '一位 22 歲並持有 SQE 營業員牌照 3 年的持牌人，擬被委任為地產代理分行的管轄主管 (Manager)。這是否符合法例規定？',
    scenarioEn: 'A 22-year-old holding an SQE license for 3 years is nominated to be appointed as a Branch Manager. Is this compliant with EAA regulations?',
    memoryHookZh: {
      title: '記憶鉤：18 - 5 - 12 - F&P 及「3 到 1」續期法則',
      desc: '資格：18 歲、中五學歷、12 個月內考獲合格 (SQE 為 6 個月)、Fit and Proper。續期窗口：屆滿前 3 個月內至 1 個月前申請。'
    },
    memoryHookEn: {
      title: 'Memory Hook: 18 - 5 - 12 - F&P and 3-to-1 Renewal',
      desc: 'Eligibility: 18 yrs, Form 5, Exam passed within 12 mos (6 mos for SQE), Fit & Proper. Renewal: 3 mos to 1 mo before expiry.'
    },
    keyTakeawaysZh: [
      '✓ 三種牌照：地產代理個人牌照 (EAQE)、地產代理公司牌照、營業員牌照 (SQE)。',
      '✓ SQE 持有者嚴禁獨立經營業務，亦不得被委任為分行管轄主管 (Manager)。',
      '✓ 考試合格有效期：EAQE 為 12 個月，SQE 為 6 個月。「相關工作經驗」非發牌要件。',
      '✓ 未解除破產人或 18 個月前曾因欺詐罪被判監者均屬非「適當人選」(Fit and Proper)。'
    ],
    keyTakeawaysEn: [
      '✓ 3 licence types: Estate Agent (Individual), Estate Agent (Company), Salesperson (SQE).',
      '✓ SQE holders cannot carry on business and CANNOT be appointed branch managers.',
      '✓ Exam window: 12 months for EAQE, 6 months for SQE. Relevant work experience is NOT required.',
      '✓ Undischarged bankrupts and fraud convicts fail Fit & Proper; minor traffic fines do not.'
    ],
    detailedContentZh: '根據 Cap. 511 第15及16條，獨資經營者或合夥人必須持有 EAQE 牌照。依第38條，分行主管必須持有 EAQE 牌照並獲監管局批准。續期窗口為屆滿前不早於 3 個月及不遲於 1 個月。',
    detailedContentEn: 'Under Cap. 511 Sections 15 & 16, sole proprietors/partners MUST hold an EAQE licence. Under Section 38, branch managers must hold EAQE. Renewal applies between 3 months and 1 month prior to expiry.',
    trapsZh: [
      '⚠ 陷阱：宣稱「具備 3 年經驗的 22 歲 SQE 持所有人可擔任分行主管」— 錯誤！無 EAQE 牌照絕不能擔任。',
      '⚠ 陷阱：宣稱「相關工作經驗是申請地產代理牌照的必要條件」— 錯誤！工作經驗並非發牌條件。'
    ],
    trapsEn: [
      '⚠ Trap: Claims SQE holder with 3 years experience can manage a branch — FALSE! Must hold EAQE.',
      '⚠ Trap: Claims relevant work experience is required for licensing — FALSE! Not a requirement.'
    ],
    quiz: {
      questionZh: '營業員牌照 (SQE) 於 3 月 21 日屆滿，持牌人提交續期申請的法定時間窗口為何？',
      questionEn: 'A salesperson licence (SQE) expires on 21 March. What is the statutory renewal application window?',
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
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.3 法定表格 Forms 1 至 6 (單數賣、雙數買)',
    titleEn: '1.3 Prescribed Forms 1-6 (Odd Sells, Even Buys)',
    capRef: 'Cap. 511 Section 36',
    scenarioZh: '代理處理店舖 (Shop) 買賣、寫字樓租務或連同車位一同出售的住宅物業，哪些情況必須使用法定表格 Forms 1-6？',
    scenarioEn: 'Handling shop sales, office leases, or residential flats with a car park—which scenarios require prescribed Forms 1-6?',
    memoryHookZh: {
      title: '記憶鉤：單數賣、雙數買 (ODD SELLS, EVEN BUYS)',
      desc: 'Form 1&2 為資料表；Form 3&5 為賣方/業主協議(單數)；Form 4&6 為買方/租客協議(雙數)。'
    },
    memoryHookEn: {
      title: 'Memory Hook: Odd Sells, Even Buys',
      desc: 'Form 1 (Property Info), Form 2 (Leasing Info). Form 3 & 5: Vendor/Landlord (Odd). Form 4 & 6: Purchaser/Tenant (Even).'
    },
    keyTakeawaysZh: [
      '✓ Form 1 為物業資料表，Form 2 為租賃資料表。',
      '✓ Form 3 (賣方) 及 Form 5 (業主) 為單數；Form 4 (買方) 及 Form 6 (租客) 為雙數。',
      '✓ 表格 1 至 6 適用於住宅物業（包括連車位之住宅）；「不適用」於舖位買賣、寫字樓租務或非獨立住宅單位。',
      '✓ Form 3 代理職責：推廣、獲取物業資料、議價。不包括買家背景調查、破產查冊或物業估值。'
    ],
    keyTakeawaysEn: [
      '✓ Form 1 Property Info, Form 2 Leasing Info.',
      '✓ Form 3 (Vendor) & Form 5 (Landlord) are odd; Form 4 (Purchaser) & Form 6 (Tenant) are even.',
      '✓ Prescribed forms apply to residential property (including car parks); EXCLUDE shops, offices, non-self-contained flats.',
      '✓ Form 3 duties: Market, obtain info, negotiate. EXCLUDE purchaser background search, bankruptcy search, valuation.'
    ],
    detailedContentZh: '《地產代理條例》第36條強制規定住宅代理須簽署預設協議。未填妥必填事項 (Mandatory Particulars) 會導致協議無效並喪失佣金追討權。',
    detailedContentEn: 'Cap. 511 Section 36 mandates prescribed agreements for residential properties. Omission of mandatory items renders agreement void and forfeits commission.',
    trapsZh: ['⚠ 陷阱：宣稱「店舖買賣或寫字樓出租須使用 Form 3 或 Form 5」— 錯誤！法定預設表格僅適用於住宅。'],
    trapsEn: ['⚠ Trap: Claims shop sales or office leases require Form 3 or 5 — FALSE! Prescribed forms apply to residential only.'],
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

  'm1-l4': {
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.4 執業規例與客戶資金託管 (3-2-14-3 法則)',
    titleEn: '1.4 Practice Regulation & Client Money (3-2-14-3 Rule)',
    capRef: 'Cap. 511B Practice Regulation',
    scenarioZh: '代理收到買方交付的 $40,000 初始現金訂金，當時賣方不在香港。代理應如何存置該筆款項？',
    scenarioEn: 'An agent receives $40,000 cash initial deposit for a vendor who is out of Hong Kong. How must the money be deposited?',
    memoryHookZh: {
      title: '記憶鉤：3 - 2 - 14 - 3 資金法則',
      desc: '3 項許可用途 (信託/付客戶/依書面指示)、2 個收受方、14 天內開立書面收據、收據副本保存 3 年。'
    },
    memoryHookEn: {
      title: 'Memory Hook: 3 - 2 - 14 - 3 Money Rule',
      desc: '3 permitted uses (trust account/pay client/written instruction), 2 parties, written receipt within 14 days, keep copy 3 years.'
    },
    keyTakeawaysZh: [
      '✓ 客戶款項必須即時存入代理公司於銀行開設的「客戶信託戶口」(Trust Account)。',
      '✓ 廣告規範：必須取得賣方事前書面同意，列明牌照號碼/營業詳情說明書號碼，並按賣方指示列明售價（無須是「市場價」）。',
      '✓ 進行工作前，須告知客戶自己是持牌人及牌照號碼 (無須告知 SPOB 號碼、領牌年份或過去成交量)。'
    ],
    keyTakeawaysEn: [
      '✓ Client money must go into agency firm\'s bank Client Trust Account without delay.',
      '✓ Advertising: Prior written consent required; state licence/SPOB number; asking price per instruction (not "market price").',
      '✓ Prior to work: State licence status and licence number (NOT SPOB number, year licensed, or transaction count).'
    ],
    detailedContentZh: '依據《執業規例》，客戶款項嚴禁存入代理個人戶口或律師樓戶口。刊登住宅廣告前必須取得業主書面同意。',
    detailedContentEn: 'Under Practice Regulation, client money must never be deposited into personal or solicitor accounts. Prior written consent required for ads.'
  },

  'm1-l5': {
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.5 操守守則 (3H 原則、利益申報與公平對待)',
    titleEn: '1.5 Code of Ethics (3 H\'s & Disclosure Duties)',
    capRef: 'Code of Ethics 3.4.1',
    scenarioZh: '代理勸誘買家購買自己作為大股東的公司名下的物業，並故意隱瞞身份；或承諾 2% 回贈但未作書面紀錄。這違反了哪些操守？',
    scenarioEn: 'An agent induces a buyer to buy a flat owned by a company where the agent is a major shareholder, concealing this fact. What duties are breached?',
    memoryHookZh: {
      title: '記憶鉤：3H 原則 + 利益申報 + 公平對待',
      desc: 'Honesty (誠實忠誠)、Harm (避免損害行業聲譽)、Haste (盡責謹慎 Care & Diligence)。利益必須 Disclose，態度必須 Impartial。'
    },
    memoryHookEn: {
      title: 'Memory Hook: Three H\'s + Disclosure + Impartiality',
      desc: 'Honesty, Harm (avoid disrepute), Haste (exercise due care). MUST Disclose beneficial interest and remain Impartial.'
    },
    keyTakeawaysZh: [
      '✓ 隱瞞自己為賣方公司大股東違反：申報金錢/金益興趣之責任，以及公平公正對待各方之責任。',
      '✓ 申報權益責任同時訂明於《操守守則》及《地產代理條例》(非物業轉讓條例)。',
      '✓ 一手樓盤回贈承諾必須於簽臨約前以書面形式確認並由雙方簽署。'
    ],
    keyTakeawaysEn: [
      '✓ Concealing shareholder interest breaches duty to disclose pecuniary interest AND duty to act impartially.',
      '✓ Duty to disclose interest is stipulated in BOTH Code of Ethics AND Estate Agents Ordinance.',
      '✓ Primary market rebate promises must be in writing signed by both parties prior to PASP.'
    ],
    detailedContentZh: '《操守守則》強制要求誠實、忠誠及謹慎。未獲同意下不得向第三方轉交客戶個人資料以推廣其他服務。',
    detailedContentEn: 'Code of Ethics enforces honesty, fidelity, and due care. Never transfer client personal data to third parties without consent.'
  },

  'm1-l6': {
    moduleZh: 'Module 1：監管核心 (The Regulatory Core)',
    moduleEn: 'Module 1: The Regulatory Core & Licensing',
    titleZh: '1.6 調查、紀律處分 (ARSC)、上訴與佣金爭議',
    titleEn: '1.6 Investigations, Discipline (ARSC) & Appeals',
    capRef: 'Cap. 511 Section 28 & 44',
    scenarioZh: '當針對持牌人的投訴成立時，EAA 擁有什麼懲處權力？調查員依第28條調查時，持牌人有何義務？',
    scenarioEn: 'When a complaint is established, what disciplinary powers does the EAA have? What are the licensee\'s duties under s.28 investigation?',
    memoryHookZh: {
      title: '記憶鉤：ARSC 懲處權利及 PRODUCE & EXPLAIN 調查義務',
      desc: '紀律處分：Admonish (告誡), Reprimand (譴責), Suspend (吊銷), Condition/Revoke (附條件/撤銷)。注意：EAA 無權處以罰款！調查義務：提供檔案及解釋，無須搜查住宅或支付調查費。'
    },
    memoryHookEn: {
      title: 'Memory Hook: ARSC Disciplinary Powers & Produce & Explain',
      desc: 'ARSC: Admonish, Reprimand, Suspend, Condition/Revoke. (No $100k fine!). Investigation: Produce records & Explain (No home search).'
    },
    keyTakeawaysZh: [
      '✓ EAA 紀律處分權 (ARSC)：告誡、譴責、暫吊牌照、附條件或撤銷牌照。「處以 10 萬罰款」為標準干擾項！',
      '✓ 第28條調查義務：按要求提供相關紀錄 (Produce) 並作出解釋 (Explain)。無義務讓調查員搜查住宅或支付調查費用。',
      '✓ 未經賣方事前書面同意刊登廣告、使用未經登記的名銜、或提供虛假資料予調查員均屬刑事罪行。'
    ],
    keyTakeawaysEn: [
      '✓ EAA Disciplinary Powers (ARSC): Admonish, Reprimand, Suspend, Condition/Revoke. ($100k fine is a distractor!).',
      '✓ Section 28 duties: Produce records and Explain. NO duty to allow residence search or pay investigation costs.',
      '✓ Advertising without written consent, using unrecorded names, or giving false info to investigators are criminal offences.'
    ],
    detailedContentZh: '依據 Cap. 511，EAA 可依法懲處違規持牌人，但無刑事罰款權。僱用無牌人士進行地產代理工作可面臨紀律處分、民事索償及刑事追究。',
    detailedContentEn: 'Under Cap. 511, EAA exercises administrative discipline but no direct fines. Employing unlicensed staff triggers disciplinary, civil, and criminal liability.'
  },

  'm2-l1': {
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.1 法律三大來源與代理人權限 (O-A-C-I 合約要件)',
    titleEn: '2.1 Sources of Law & Contract Formation (O-A-C-I)',
    capRef: 'Common Law Principles',
    scenarioZh: '普通法下成立一份有效合約必須具備哪些要件？「爭議解決條款」是否為合約成立的必要條件？',
    scenarioEn: 'What are the required elements to form a valid contract at common law? Is a dispute resolution clause required?',
    memoryHookZh: {
      title: '記憶鉤：O - A - C - I 四大要件與草地上第五柱',
      desc: 'Offer (要約)、Acceptance (承諾)、Consideration (對價)、Intention (法律意圖)。爭議解決條款是獨立的，非成立要件！'
    },
    memoryHookEn: {
      title: 'Memory Hook: O-A-C-I and 5th Pillar on Grass',
      desc: 'Offer, Acceptance, Consideration, Intention. A dispute resolution clause is NOT a formation requirement.'
    },
    keyTakeawaysZh: [
      '✓ 合約成立四要件 (O-A-C-I)：要約、承諾、對價/代價、建立法律關係之意圖。',
      '✓ 「如何解決合約爭議的協議」並非合約成立的必要條件。',
      '✓ 代理權限分為明示權限 (Express) 及隱含權限 (Implied)。'
    ],
    keyTakeawaysEn: [
      '✓ 4 contract formation elements (O-A-C-I): Offer, Acceptance, Consideration, Intention to create legal relations.',
      '✓ An agreement on how contractual disputes are to be resolved is NOT required to form a contract.',
      '✓ Authority comprises express authority and implied authority.'
    ],
    detailedContentZh: '普通法、衡平法與制定法構成香港法律基礎。合約法要求 O-A-C-I 齊備方具約束力。',
    detailedContentEn: 'Common law, equity, and statutes form HK legal system. Contracts require full O-A-C-I for legal enforceability.'
  },

  'm2-l2': {
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.2 合約、失實陳述與疏忽 (「現狀 As Is」條款真義)',
    titleEn: '2.2 Misrepresentation & "As Is" Clause Scope',
    capRef: 'Misrepresentation Ordinance (Cap. 284)',
    scenarioZh: '臨約中訂明「現狀 (As Is)」購入物業，這是否代表賣方保證改建符合《建築物條例》，或買家須承擔現有租約？',
    scenarioEn: 'An "as is" clause is inserted in a PASP. Does this warrant that alterations comply with Buildings Ordinance?',
    memoryHookZh: {
      title: '記憶鉤：現狀條款 = 簽約當日之物理狀況照片',
      desc: '買家僅接受簽約時之物理狀態。絕不等於賣方保證改建合法，亦不等於買家自動承擔租約。'
    },
    memoryHookEn: {
      title: 'Memory Hook: "As Is" = Physical Dated Photograph',
      desc: '"As is" accepts physical state on signing date only. Does NOT warrant illegal works or bind to existing tenancy.'
    },
    keyTakeawaysZh: [
      '✓ 「現狀 (As Is)」條款指買家接受物業於簽臨約時之物理狀況。',
      '✓ 現狀條款「不代表」賣方保證所有改建符合《建築物條例》。',
      '✓ 現狀條款「不代表」買家接受或受限於現有的租賃協議。',
      '✓ 代理為誘使買家簽約而虛構有其他買家出更高價，屬失實陳述並違反操守。'
    ],
    keyTakeawaysEn: [
      '✓ "As is" clause means purchaser accepts physical state and condition at the time of agreement.',
      '✓ "As is" DOES NOT warrant that property alterations comply with the Buildings Ordinance.',
      '✓ "As is" DOES NOT mean purchaser accepts to be bound by an existing tenancy agreement.',
      '✓ Falsely claiming higher competing offers to induce signing constitutes misrepresentation and ethics breach.'
    ],
    detailedContentZh: '失實陳述可引致合約撤銷及損害賠償。代理須確保提供準確資訊，現狀條款不能豁免欺詐責任。',
    detailedContentEn: 'Misrepresentation renders contracts voidable with damages. "As is" terms do not shield fraudulent statements.'
  },

  'm2-l3': {
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.3 相關條例三大家族 (交易、房屋及行為守則)',
    titleEn: '2.3 Ordinance Families (Deal, Home, Behavior)',
    capRef: 'Cap. 201, 283, 486, 621',
    scenarioZh: '如何歸類及記憶 Conveyancing (Cap. 219)、Housing (Cap. 283)、Bribery (Cap. 201)、Privacy (Cap. 486) 及 First-hand Sales (Cap. 621)？',
    scenarioEn: 'How to classify Cap. 219, Cap. 283, Cap. 201, Cap. 486, and Cap. 621 into structured study families?',
    memoryHookZh: {
      title: '記憶鉤：三大家族 (交易契據、房屋資助、行為法規)',
      desc: '家族1【交易】: Cap. 219物業轉讓, Cap. 128土地註冊, Cap. 621一手樓。家族2【房屋】: Cap. 283居屋補地價。家族3【行為】: Cap. 201防貪, Cap. 284失實陳述, Cap. 486個人資料私隱。'
    },
    memoryHookEn: {
      title: 'Memory Hook: Three Ordinance Families',
      desc: 'Family 1 (Deal): Cap. 219, Cap. 128, Cap. 621. Family 2 (Home): Cap. 283 Housing. Family 3 (Behavior): Cap. 201 Bribery, Cap. 284 Misrepresentation, Cap. 486 Privacy.'
    },
    keyTakeawaysZh: [
      '✓ 一手住宅 Cap. 621「實用面積」(Saleable Area) 包含露台 (Balcony) 及工作平台 (Utility Platform)，排除窗台 (Bay Window) 及閣樓 (Cockloft)。',
      '✓ 毗鄰未開發土地的許用途途：應查閱 Outline Zoning Plan (分區計劃大綱圖) 或 Government Lease，而非毗鄰物業的土地查冊。',
      '✓ 個人資料私隱 (Cap. 486)：影印客戶身份證副本給保險經紀朋友或遺失副本，均違反私隱條例保障原則。'
    ],
    keyTakeawaysEn: [
      '✓ Saleable area under Cap. 621 includes balconies and utility platforms; EXCLUDES bay windows and cocklofts.',
      '✓ Permitted user of adjacent vacant land: Check Outline Zoning Plan or Government Lease, NOT property land search.',
      '✓ Privacy Ordinance (Cap. 486): Sharing ID card copies with insurance brokers or losing copies breaches data principles.'
    ],
    detailedContentZh: '三大法例家族簡化法例記憶。一手住宅物業銷售條例對實用面積有嚴格定義。',
    detailedContentEn: 'Grouping ordinances into three families enhances retention. Cap. 621 strictly defines saleable area components.'
  },

  'm2-l4': {
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.4 業權證明 (15 年業權鏈) 與訂金託管 (NEG-CHG-CONF)',
    titleEn: '2.4 Title Proof (15-Yr Chain) & Stakeholding (NEG-CHG-CONF)',
    capRef: 'Cap. 219 Conveyancing Ordinance',
    scenarioZh: '賣方須提供多少年的業權證明？在哪些特定風險情況下，代理應建議買家將訂金交律師樓作為託管人 (Stakeholder)？',
    scenarioEn: 'How many years of title proof must a vendor produce? When should an agent advise paying deposit to solicitors as stakeholders?',
    memoryHookZh: {
      title: '記憶鉤：15 年業權 + NEG - CHG - CONF 託管法則',
      desc: '業權證明：政府地契 + 15 年業權鏈 (由 Assignment 開始)。託管三狀況：NEGative equity (負資產按揭)、CHarGing order (押記令)、CONFirmor (確認人轉售)。'
    },
    memoryHookEn: {
      title: 'Memory Hook: 15-Year Chain & NEG - CHG - CONF Stakeholding',
      desc: 'Title proof: Gov lease + 15 years title chain from Assignment. Stakeholder deposit triggers: NEGative equity, CHarGing order, CONFirmor sale.'
    },
    keyTakeawaysZh: [
      '✓ 證明業權：賣方須提供政府地契及至少 15 年前的業權契據 (以 Assignment、Mortgage by Assignment 或 Legal Charge 為起點)。',
      '✓ 訂金託管三大觸發條件 (NEG-CHG-CONF)：負資產按揭、存在押記令、確認人 (Confirmor) 轉售。',
      '✓ 買方違約時，賣方可沒收訂金及解約重售，但「不得」向土地註冊處登記押記備忘錄 (Memorandum of Charge)。',
      '✓ 居屋 (HOS) 未補地價於公開市場出售，必須於「買賣合約」(ASP) 中訂明補地價條款 (28 天內付清)。'
    ],
    keyTakeawaysEn: [
      '✓ Proof of Title: Gov lease + title root commencing at least 15 years back starting with an Assignment or Legal Charge.',
      '✓ Stakeholding deposit triggers (NEG-CHG-CONF): Negative equity mortgage, Charging Order, Confirmor sub-sale.',
      '✓ If purchaser defaults, vendor may forfeit deposit and resell; vendor CANNOT register a Memorandum of Charge.',
      '✓ HOS flat unpaid premium sale: The Agreement for Sale and Purchase must state premium payment terms (within 28 days).'
    ],
    detailedContentZh: 'Cap. 219 第13條規定業權證明追溯期為 15 年。遇到 NEG-CHG-CONF 情況，訂金必須交由律師樓託管以保障資金安全。',
    detailedContentEn: 'Cap. 219 Section 13 mandates 15 years title chain. NEG-CHG-CONF situations require deposit stakeholding by solicitors.'
  },

  'm2-l5': {
    moduleZh: 'Module 2：法律工具箱 (The Legal Toolkit)',
    moduleEn: 'Module 2: The Legal Toolkit & Conveyancing',
    titleZh: '2.5 物業相關稅項 (印花稅計算與五大稅種)',
    titleEn: '2.5 Property Taxes & Stamp Duty Calculation',
    capRef: 'Cap. 117 Stamp Duty Ordinance',
    scenarioZh: '物業相關的五大稅種為何？租約 (Tenancy Agreement) 及其複本 (Counterpart) 應如何計算印花稅？',
    scenarioEn: 'What are the 5 property taxes? How is stamp duty calculated for a tenancy agreement and its counterpart?',
    memoryHookZh: {
      title: '記憶鉤：五隻手指五大稅 + 租約印花稅三步曲',
      desc: '五稅：印花稅 (Stamp)、物業稅 (Property)、地租 (Gov Rent)、差餉 (Rates)、利得稅 (Profits)。租約計算：計算平均年租 -> 向上取整至百位 -> 套用稅率。'
    },
    memoryHookEn: {
      title: 'Memory Hook: Five Taxes on Five Fingers & Tenancy Recipe',
      desc: '5 Taxes: Stamp Duty, Property Tax, Gov Rent, Rates, Profits Tax. Tenancy calculation: Average yearly rent -> Round UP to $100 -> Apply rate.'
    },
    keyTakeawaysZh: [
      '✓ 五大物業稅項：印花稅、物業稅、地租、差餉、利得稅。',
      '✓ 租約印花稅率：不超 1 年 0.25%；1 至 3 年 0.5%；超 3 年 1%。(以年租或平均年租計算，向上取整至百位)。',
      '✓ 免租期 (Rent-free period) 會拉低平均年租；續租權條款 (Option to renew) 需留意是否影響適用稅率期。'
    ],
    keyTakeawaysEn: [
      '✓ 5 Property Taxes: Stamp Duty, Property Tax, Government Rent, Rates, Profits Tax.',
      '✓ Tenancy stamp duty rates: <=1 yr 0.25%; >1-3 yrs 0.5%; >3 yrs 1% of yearly/average yearly rent (rounded up to $100).',
      '✓ Rent-free periods reduce average yearly rent; renewal options require term checking.'
    ],
    detailedContentZh: '《印花稅條例》(Cap. 117) 規範物業轉讓契及租約之印花稅繳納。逾期蓋印可面臨最高 10 倍罰款。',
    detailedContentEn: 'Cap. 117 governs stamping of conveyances and leases. Late stamping incurs penalties up to 10x the duty.'
  },

  'm3-l1': {
    moduleZh: 'Module 3：閱讀物業 (Reading the Property)',
    moduleEn: 'Module 3: Land Search, Buildings & Valuation',
    titleZh: '3.1 土地查冊四抽屜 (P-O-I-M) 與公司賣方雙重查冊',
    titleEn: '3.1 Land Search Structure (P-O-I-M) & Corporate Vendor',
    capRef: 'Cap. 128 Land Registration Ordinance',
    scenarioZh: '土地查冊分為哪四個段落？若賣方為香港註冊私人有限公司，單做土地註冊處查冊是否足夠？',
    scenarioEn: 'What are the 4 sections of a Land Search? If vendor is a private limited company, is Land Registry search enough?',
    memoryHookZh: {
      title: '記憶鉤：P - O - I - M 四個抽屜與公司賣方雙重查冊',
      desc: 'P (Property 物業資料)、O (Owner 業主資料)、I (Incumbrances 負擔欄)、M (Memorial 擬註冊契據)。公司賣方：必須查「土地註冊處 + 公司註冊處」！'
    },
    memoryHookEn: {
      title: 'Memory Hook: P-O-I-M Drawers & Two-Search Rule',
      desc: 'P (Property), O (Owner), I (Incumbrances), M (Memorial). Corporate Vendor: MUST search Land Registry AND Companies Registry!'
    },
    keyTakeawaysZh: [
      '✓ 土地登記冊四抽屜 (P-O-I-M)：物業資料、業主資料、物業負擔欄、等待註冊契據。',
      '✓ 公司賣方 (Corporate Vendor)：查核按揭或押記，必須做土地註冊處 AND 公司註冊處 (Companies Registry) 雙重查冊。公司章程 (M&A) 或商業登記 (BR) 均不會顯示按揭。',
      '✓ 入伙紙 (Occupation Permit) 記載單位的「擬定用途」(Permitted User)，「不記載」實用面積或總樓面面積。',
      '✓ 大廈公契 (DMC) 記載不可分割份數 (Undivided Shares)、公用地方 (Common Areas) 及管理費分攤。'
    ],
    keyTakeawaysEn: [
      '✓ Land Register 4 drawers (P-O-I-M): Property, Owner, Incumbrances, Memorials pending registration.',
      '✓ Corporate Vendor: To verify mortgages/charges, MUST search Land Registry AND Companies Registry. M&A or BR will NOT show charges.',
      '✓ Occupation Permit gives "Permitted User" of units; DOES NOT give saleable area or gross floor area.',
      '✓ DMC sets out undivided shares, common areas, and management fee liabilities.'
    ],
    detailedContentZh: '土地查冊是個案題 (Part II) 核心。公司賣方的浮動押記或固定押記須查閱公司註冊處檔案。',
    detailedContentEn: 'Land search dominates Part II case studies. Charges over company vendors require Companies Registry checks.'
  },

  'm3-l2': {
    moduleZh: 'Module 3：閱讀物業 (Reading the Property)',
    moduleEn: 'Module 3: Land Search, Buildings & Valuation',
    titleZh: '3.2 建築物條例、拆改結構牆規範與大廈公契 (DMC)',
    titleEn: '3.2 Buildings Ordinance, Structural Alterations & DMC',
    capRef: 'Cap. 123 Buildings Ordinance & Cap. 344',
    scenarioZh: '業主擬拆除私人物業內的一面結構牆 (Structural Wall)，正確的法定程序為何？',
    scenarioEn: 'An owner plans to demolish a structural wall inside a private flat. What is the proper statutory procedure?',
    memoryHookZh: {
      title: '記憶鉤：拆結構牆 = 委任認可人士 (AP) 向屋宇署 (BA) 呈交圖則',
      desc: '結構牆改動：委任 Authorized Person (AP) 依 Cap. 123 呈交圖則，由 Building Authority (BA) 批准。切勿聯絡地政總署或房屋署！'
    },
    memoryHookEn: {
      title: 'Memory Hook: Structural Wall = AP Submits to Building Authority',
      desc: 'Structural work: Appoint Authorized Person (AP) under Cap. 123 to submit plans for Building Authority (BA) approval. (NOT Lands or Housing Dept).'
    },
    keyTakeawaysZh: [
      '✓ 拆除結構牆程序：委任《建築物條例》(Cap. 123) 下的「認可人士」(Authorised Person) 繪製及呈交圖則，由「屋宇署署長」(Building Authority) 批准。',
      '✓ 車庫 (Garage) 擅自改作商店用途：屋宇署可發出命令要求中止用途，且該未經批准的用途改動會導致物業業權出現瑕疵 (Defective Title)。',
      '✓ 租客代理面對有多重押記及建築令的物業，應要求業主取得第一按揭銀行及第二押記人的同意書方可簽租約。'
    ],
    keyTakeawaysEn: [
      '✓ Demolishing structural wall: Appoint Authorised Person (AP) under Cap. 123 to submit plans for Building Authority approval.',
      '✓ Unauthorized change from garage to shop: Building Authority may order discontinuation, rendering title defective.',
      '✓ Tenant\'s agent handling encumbered flat should insist on landlord obtaining consent from 1st mortgagee & 2nd charge holder.'
    ],
    detailedContentZh: 'Cap. 123 規範建築物安全。未經批准改動結構牆屬違法，屋宇署可發出 S.24 命令要求還原。',
    detailedContentEn: 'Cap. 123 governs structural safety. Unauthorized works trigger Section 24 removal orders by Building Authority.'
  },

  'm3-l3': {
    moduleZh: 'Module 3：閱讀物業 (Reading the Property)',
    moduleEn: 'Module 3: Land Search, Buildings & Valuation',
    titleZh: '3.3 物業估值四大方法 (CIRP) 與地盤估值 (CRD)',
    titleEn: '3.3 Property Valuation (CIRP) & Site Methods (CRD)',
    capRef: 'Level 1 Valuation Principles',
    scenarioZh: '估值四大方法 (CIRP) 分別適用於什麼物業？估值報告通常包含哪些內容？',
    scenarioEn: 'What are the 4 property valuation methods (CIRP) and what does a valuation report usually contain?',
    memoryHookZh: {
      title: '記憶鉤：CIRP 四大物業估值 + CRD 三大地盤估值',
      desc: 'CIRP: Comparison (住宅住宅/成交多), Investment (已出租/收租物業), Profits (酒店/戲院/商業營運), Replacement (教堂/學校/無成交物業)。地盤 CRD: Comparative, Residual, DCF。'
    },
    memoryHookEn: {
      title: 'Memory Hook: CIRP Property Methods & CRD Site Methods',
      desc: 'CIRP: Comparison (flats), Investment (let property), Profits (hotels/cinemas), Replacement (churches/schools). Site CRD: Comparative, Residual, DCF.'
    },
    keyTakeawaysZh: [
      '✓ 四大估值法 (CIRP)：比較法 (Comparison - 普通住宅)、投資法 (Investment - 出租物業)、利潤法 (Profits - 酒店/戲院)、重置成本法 (Replacement - 教堂/特殊物業)。',
      '✓ 市場比較法最可靠條件：市場有持續及大量同類物業成交，且物業具高度物理相似性。',
      '✓ 估值報告通常包含：估值日期 (Date of Valuation) 及物業估值金額。不包含按揭利率水平或估值師收費。'
    ],
    keyTakeawaysEn: [
      '✓ 4 Valuation methods (CIRP): Comparison (flats), Investment (let property), Profits (hotels/cinemas), Replacement (special purpose).',
      '✓ Market Comparison is most reliable with steady, substantial transactions of highly similar properties.',
      '✓ Valuation report contains: Valuation Date and Valuation Amount. Excludes mortgage rates and valuer\'s fee.'
    ],
    detailedContentZh: 'Part 6 為 Level 1 概念 (EAQE 專有)。掌握 CIRP 匹配物業類型即可輕鬆取分。',
    detailedContentEn: 'Part 6 is Level 1 Awareness (EAQE only). Match CIRP method to property type for quick marks.'
  },

  'm3-l4': {
    moduleZh: 'Module 3：閱讀物業 (Reading the Property)',
    moduleEn: 'Module 3: Land Search, Buildings & Valuation',
    titleZh: '3.4 統計數據與官方資訊系統 (差餉物業估價署 RVD)',
    titleEn: '3.4 Housing Statistics & Official RVD Information',
    capRef: 'Rating & Valuation Department (RVD)',
    scenarioZh: '填寫物業資料表 (Form 1) 中的實務「實用面積」(Saleable Area) 時，官方正確查詢管道為何？',
    scenarioEn: 'When completing Form 1 for Saleable Area, what is the correct official online service to consult?',
    memoryHookZh: {
      title: '記憶鉤：四大部門四本帳簿 (差餉署 RVD 專管實用面積)',
      desc: '房屋署 (人口/公屋), 地政總署 (地契), 差餉物業估價署 RVD (實用面積/租金數據), 土地註冊處 (業權/登記檔案)。'
    },
    memoryHookEn: {
      title: 'Memory Hook: 4 Departments, 4 Ledgers (RVD = Saleable Area)',
      desc: 'Housing Dept (population), Lands Dept (lease), RVD (saleable area & rental statistics), Land Registry (title & charges).'
    },
    keyTakeawaysZh: [
      '✓ 查核 Form 1 實用面積 (Saleable Area) 的官方法定來源：差餉物業估價署的「物業資訊網」(Property Information Online)。',
      '✓ 入伙紙、大廈公契、轉讓契均「不是」獲取實用面積的正確官方途徑。',
      '✓ 土地註冊處提供買賣合約紀錄、物業平面圖及登記契約。'
    ],
    keyTakeawaysEn: [
      '✓ Official source for Form 1 Saleable Area: Rating and Valuation Department\'s "Property Information Online".',
      '✓ Occupation Permit, DMC, and Assignment deeds are NOT correct official sources for saleable area.',
      '✓ Land Registry provides S&P records, building plans, and registered instruments.'
    ],
    detailedContentZh: '利用官方資訊系統獲取準確數據。RVD 提供權威實用面積及租金統計。',
    detailedContentEn: 'Utilize official property information portals. RVD provides authorized saleable area data.'
  },

  'm4-l1': {
    moduleZh: 'Module 4：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    titleZh: '4.1 租務 2-2-2 鏡像法則、15 天沒收權與 CR109 申報',
    titleEn: '4.1 Tenancy 2-2-2 Mirror, 15-Day Forfeiture & CR109',
    capRef: 'Cap. 7 Landlord and Tenant Ordinance',
    scenarioZh: '租客欠繳租金且租約無明文沒收條款，業主須等候多少天方可沒收租賃？表格 CR109 適用於哪些情況？',
    scenarioEn: 'If tenant defaults on rent without express forfeiture clause, after how many days can landlord forfeit? When is CR109 required?',
    memoryHookZh: {
      title: '記憶鉤：租務 2 - 2 - 2 鏡像、15 天沒收及 CR109 規則',
      desc: '2-2-2 鏡像：租客 2 權 (專有佔用/平靜享受)、2 責 (交租/交還物業)；業主 2 權 (收租/收樓)、1 責 (維修結構外牆)。沒收租賃：欠租滿 15 天！CR109：住宅新租及續租向差餉署申報。'
    },
    memoryHookEn: {
      title: 'Memory Hook: Tenancy 2-2-2 Mirror, 15-Day Forfeiture & CR109',
      desc: '2-2-2 Mirror: Tenant 2 rights/2 duties; Landlord 2 rights/1 duty (structural & exterior repairs). Forfeiture: 15 days default! CR109: Residential new leases & renewals to RVD.'
    },
    keyTakeawaysZh: [
      '✓ 維修責任：業主負責「結構及外牆」維修；租客僅負責「內部」維修 (合理損耗除外)。要求租客維修外牆屬不常見條款！',
      '✓ 無明文沒收條款下，租客欠租滿 15 天，業主方可沒收租賃 (7、10、14 天均為干擾項)。',
      '✓ 表格 CR109：適用於住宅物業之「新租賃」及「續租」，須送交差餉物業估價署。退租或商業租務無須申報。',
      '✓ 保護 2 年期 + 2 年續租權租客：代理應建議租約須「蓋印花 (Stamped)」並於「土地註冊處註冊」。'
    ],
    keyTakeawaysEn: [
      '✓ Repair duty: Landlord repairs structure/exterior; Tenant maintains interior (fair wear & tear excepted). Tenant exterior repair is unusual!',
      '✓ In absence of express clause, landlord may forfeit for non-payment after 15 DAYS (not 7, 10, or 14).',
      '✓ Form CR109: Applies to RESIDENTIAL new lettings & renewals, lodged with RVD. Surrenders or commercial leases excluded.',
      '✓ Protecting tenant with 2+2 option: Advise tenancy be STAMPED and REGISTERED at Land Registry.'
    ],
    detailedContentZh: '《業主與租客(綜合)條例》(Cap. 7) 為考點重鎮 (占 Part I 22%)。必須熟記 15 天沒收期及 CR109 申報範圍。',
    detailedContentEn: 'Cap. 7 Landlord & Tenant Ordinance is heavily tested (~22% of Part I). Memorize 15-day forfeiture limit and CR109 rules.'
  },

  'm4-l2': {
    moduleZh: 'Module 4：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    titleZh: '4.2 有效機構管理 (P-M-D 通知、S-C-P-R 反洗錢與信頭規範)',
    titleEn: '4.2 Agency Management (P-M-D Notice, S-C-P-R AML)',
    capRef: 'Cap. 511 Section 38 & Practice Directions',
    scenarioZh: '開設新分行及委任主管時，機構須於多少天內通知 EAA？公函信頭須列明哪些事項？',
    scenarioEn: 'Opening a new branch and appointing a manager—within how many days must EAA be notified? What must appear on letterheads?',
    memoryHookZh: {
      title: '記憶鉤：P - M - D 通知 + S - C - P - R 反洗錢 + 信頭三要件',
      desc: '通知 EAA (P-M-D)：新僱用 Person、新 Branch Manager (31天內)、新 Director。內部調配無須通知！信頭三要件：牌照/SPOB號碼、營業名稱、營業地點 (均來自 SPOB，非商業登記 BR！)。'
    },
    memoryHookEn: {
      title: 'Memory Hook: P-M-D Notice + S-C-P-R AML + Letterhead Trio',
      desc: 'Notify EAA (P-M-D): Person employed, Manager appointed (within 31 days), Director appointed. Letterhead trio: Licence/SPOB no., business name, place of business (all from SPOB, not BR!).'
    },
    keyTakeawaysZh: [
      '✓ 須通知 EAA 事項 (P-M-D)：僱用營業員、委任分行管轄主管 (31 天內)、委任公司董事。持牌人於分行間的內部調配「無須通知」。',
      '✓ 反洗錢 (AML) 四要件 (S-C-P-R)：關注 FATF 高風險地區聲明、核實公司簽署人身份、臨約列明價格/物業/日期、協議副本保存 5 年。無須將協議交予警方備案！',
      '✓ 公函信頭必須列明：牌照號碼/SPOB號碼、營業名稱、營業地點 (資料均來自 SPOB 營業詳情說明書，非 BR 商業登記證)。'
    ],
    keyTakeawaysEn: [
      '✓ Notifiable events to EAA (P-M-D): Salesperson employed, Branch Manager appointed (within 31 days), Director appointed. Internal transfers NOT notifiable.',
      '✓ AML measures (S-C-P-R): FATF high-risk warnings, verify corporate signatory ID, state price/address/date, retain agreement 5 years. (NO duty to submit to police!).',
      '✓ Letterhead requirements: Licence/SPOB number, business name, place of business (all from SPOB statement, NOT Business Registration certificate).'
    ],
    detailedContentZh: '機構管理 (EAQE 專有) 強調有效控制。分行主管須於 31 天內通知 EAA。反洗錢協議須保存 5 年。',
    detailedContentEn: 'Agency management (EAQE only) mandates effective control. Branch manager appointments require 31 days notice. AML agreements kept 5 years.'
  },

  'm4-l3': {
    moduleZh: 'Module 4：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    titleZh: '4.3 十站交易記憶宮殿 (Transaction Memory Palace)',
    titleEn: '4.3 The 10-Station Transaction Memory Palace',
    capRef: 'Syllabus Sequence Method',
    scenarioZh: '如何運用十站式房屋空間記憶宮殿 (Memory Palace) 貫串整套地產代理監管條例及個案題交易順序？',
    scenarioEn: 'How to utilize the 10-Station Transaction Memory Palace to map out regulatory duties and Part II case study flow?',
    memoryHookZh: {
      title: '記憶鉤：從大門到後花園的十站式交易之旅',
      desc: '1大門(放盤委託) -> 2玄關(簽 Form 3/5) -> 3客廳(Form 1 物業資料) -> 4廚房(廣告同意) -> 5書房(睇樓陪同) -> 6樓梯(議價不收回扣) -> 7樓梯響(簽臨約/託管) -> 8睡房(資金信託) -> 9浴室(交吉/解押) -> 10後花園(售後/佣金爭議)。'
    },
    memoryHookEn: {
      title: 'Memory Hook: 10-Station Front Door to Back Garden Route',
      desc: '1 Front Door (Listing) -> 2 Hallway (Form 3/5) -> 3 Living Room (Form 1) -> 4 Kitchen (Ads) -> 5 Study (Inspection) -> 6 Stairs (Negotiation) -> 7 Landing (PASP/Stakeholding) -> 8 Bedroom (Trust money) -> 9 Bathroom (Completion) -> 10 Back Garden (Post-transaction).'
    },
    keyTakeawaysZh: [
      '✓ 站點 1 (大門)：放盤委託與開價 (依業主指示非市場價)。',
      '✓ 站點 2 (玄關)：簽署法定協議 (Form 3/5 單數賣，Form 4/6 雙數買)。',
      '✓ 站點 7 (樓梯響)：簽臨約，遇 NEG-CHG-CONF 訂金交律師樓託管。',
      '✓ 站點 8 (睡房)：客戶資金存入銀行信託戶口，14 天發收據，副本存 3 年。'
    ],
    keyTakeawaysEn: [
      '✓ Station 1 (Front Door): Listing & instructions (asking price per owner instruction).',
      '✓ Station 2 (Hallway): Sign prescribed agreements (Form 3/5 Odd, Form 4/6 Even).',
      '✓ Station 7 (Landing): Sign PASP; stakeholding deposit under NEG-CHG-CONF.',
      '✓ Station 8 (Bedroom): Client money into bank trust account, receipt in 14 days, keep copy 3 years.'
    ],
    detailedContentZh: '記憶宮殿方法將所有監管職責按交易時間軸排列，精準對應 Part II 個案題之提問順序。',
    detailedContentEn: 'Method of Loci maps regulatory duties onto a transaction timeline, directly matching Part II case question sequences.'
  },

  'm4-l4': {
    moduleZh: 'Module 4：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    titleZh: '4.4 Part II 個案研習技巧與審題「三行法則」',
    titleEn: '4.4 Part II Case Study Technique & 3-Line Method',
    capRef: 'Exam Technique & Land Search Annex',
    scenarioZh: 'EAQE Part II 占 20 題 (SQE 占 10 題) 個案題。面對隨附的土地查冊附件 (Annex)，正確的解題三行法則為何？',
    scenarioEn: 'Facing Part II case studies with Land Search Annex, what is the systematic 3-Line Method to answer questions efficiently?',
    memoryHookZh: {
      title: '記憶鉤：先看故事 -> 再看查冊 -> 草稿寫三行 -> 開始答題',
      desc: '草稿三行：1. Current Owner (現任業主/是否有死亡或遺囑)；2. Incumbrances (負擔欄/有無 S.24 命令或押記)；3. What Went Wrong (違規行為/無簽表格或私下回贈)。'
    },
    memoryHookEn: {
      title: 'Memory Hook: Read Story -> Read Search -> Write 3 Lines -> Answer',
      desc: 'Three lines on scratchpad: 1. Current Owner; 2. Subsisting Incumbrances (orders/charges); 3. What Went Wrong (agent breaches).'
    },
    keyTakeawaysZh: [
      '✓ 個案題切勿先看第一題再反覆翻閱背景故事，否則必定超時。',
      '✓ 查閱 Annex 土地查冊：現任業主姓名、未清還按揭、建築物條例令 (S.24 / S.26 Order)、未決訴訟 (Lis Pendens)。',
      '✓ EAQE Part II 需對 12 題 (24分/40分)，SQE Part II 需對 6 題 (12分/20分) 方達及格門檻。'
    ],
    keyTakeawaysEn: [
      '✓ Never read Question 1 first and repeatedly scan the case text; manage time strictly.',
      '✓ Inspect Annex Land Search: Current owner name, undischarged mortgages, Buildings Orders (S.24/S.26), Lis Pendens.',
      '✓ Pass threshold: EAQE Part II minimum 24/40 marks (12 questions); SQE Part II minimum 12/20 marks (6 questions).'
    ],
    detailedContentZh: '個案題測試實務應用能力 (Level 4)。開啟 Annex PDF 對照查冊是取分關鍵。',
    detailedContentEn: 'Part II tests practical application (Level 4). Cross-referencing Annex land search reports is vital.'
  },

  'm4-l5': {
    moduleZh: 'Module 4：租務實務、機構管理與應試技巧',
    moduleEn: 'Module 4: Tenancy, Management & Exam Mastery',
    titleZh: '4.5 1-3-7-16-35 溫習階梯與大師級考前陷阱冊',
    titleEn: '4.5 Spaced Repetition Ladder & Master Trap Register',
    capRef: 'Memory Engineering & Exam Strategy',
    scenarioZh: '如何運用 1 - 3 - 7 - 16 - 35 遺忘曲線複習階梯，並於考前最後一天進行高效備考？',
    scenarioEn: 'How to apply the 1 - 3 - 7 - 16 - 35 spaced repetition ladder and prepare on the final day before the examination?',
    memoryHookZh: {
      title: '記憶鉤：1 - 3 - 7 - 16 - 35 電話號碼式溫習階梯',
      desc: '第 1 天學習 -> 第 2 天檢索 -> 第 4 天檢索 -> 第 8 天檢索 -> 第 17 天全真模擬 -> 第 36 天總複習。考前最後一天：白紙默寫口訣、看一次陷阱冊、走一遍記憶宮殿，然後休息！切勿學新東西！'
    },
    memoryHookEn: {
      title: 'Memory Hook: 1-3-7-16-35 Spaced Repetition Ladder',
      desc: 'Day 1 learn, Day 2 retrieve, Day 4 retrieve, Day 8 retrieve, Day 17 practice exam, Day 36 review. Final day: Blank-page mnemonics, read trap register, walk palace, sleep. Learn NOTHING new!'
    },
    keyTakeawaysZh: [
      '✓ 及格門檻：總分達 60% 且 Part I 及 Part II 兩部分「同時及格」。(EAQE: 36/24分；SQE: 48/12分)。',
      '✓ 官方統計合格率：EAQE 僅約 27% - 39%，SQE 約 25% - 46%。絕大多數考生败在過度複習法律而忽視監管及租務。',
      '✓ 考前最後一天：默寫所有記憶鉤、瀏覽 Master Trap Register 陷阱冊、走一遍記憶宮殿、充足睡眠。'
    ],
    keyTakeawaysEn: [
      '✓ Pass requirements: 60% overall AND BOTH parts passed (EAQE: Part I >=36, Part II >=24; SQE: Part I >=48, Part II >=12).',
      '✓ Official pass rates: EAQE 27-39%, SQE 25-46%. Most candidates fail by over-studying general law and under-studying tenancy.',
      '✓ Final day routine: Blank-page mnemonics, read Master Trap Register once, walk the Memory Palace, sleep well.'
    ],
    detailedContentZh: '間隔重複 beats 重新閱讀。將錯題放入 1-3-7-16-35 階梯，考前專注審視常見錯項陷阱冊。',
    detailedContentEn: 'Spaced retrieval beats re-reading. Place wrong answers on the ladder and review trap register entries.'
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
  trapsZh: DEFAULT_TRAPS_ZH,
  trapsEn: DEFAULT_TRAPS_EN,
  quiz: DEFAULT_QUIZ
};

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams.id.toLowerCase();
  const { locale, language } = useLanguage();
  const isZh = locale ? locale === 'zh-HK' : language === 'ZH';

  const rawLesson = EAA_LESSON_DATABASE[lessonId];

  const lesson: LessonData = rawLesson ? {
    ...rawLesson,
    trapsZh: rawLesson.trapsZh || DEFAULT_TRAPS_ZH,
    trapsEn: rawLesson.trapsEn || DEFAULT_TRAPS_EN,
    quiz: rawLesson.quiz || DEFAULT_QUIZ
  } : {
    ...DEFAULT_LESSON,
    titleZh: `章節 ${lessonId.toUpperCase()} 講義與考點分析`,
    titleEn: `Lesson ${lessonId.toUpperCase()} Study Notes & Key Points`
  };

  const currentQuiz = lesson.quiz || DEFAULT_QUIZ;
  const currentTrapsZh = lesson.trapsZh || DEFAULT_TRAPS_ZH;
  const currentTrapsEn = lesson.trapsEn || DEFAULT_TRAPS_EN;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleQuizSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const isCorrect = selectedOption === currentQuiz.correctIndex;

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

        {/* SECTION 1: Memory Hook & Mnemonic */}
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
            {(isZh ? currentTrapsZh : currentTrapsEn).map((trap, idx) => (
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
              {isZh ? currentQuiz.questionZh : currentQuiz.questionEn}
            </p>

            <div className="space-y-2.5">
              {(isZh ? currentQuiz.optionsZh : currentQuiz.optionsEn).map((opt, idx) => {
                let btnStyle = "border-slate-800 bg-slate-800/50 hover:bg-slate-800 text-slate-300";
                
                if (selectedOption === idx) {
                  btnStyle = "border-indigo-500 bg-indigo-950/60 text-white font-semibold";
                }

                if (isSubmitted) {
                  if (idx === currentQuiz.correctIndex) {
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
                    {isSubmitted && idx === currentQuiz.correctIndex && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isSubmitted && selectedOption === idx && idx !== currentQuiz.correctIndex && (
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
                  {isZh ? currentQuiz.explanationZh : currentQuiz.explanationEn}
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