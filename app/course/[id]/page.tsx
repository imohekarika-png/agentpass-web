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
  FileText
} from 'lucide-react';

interface LessonData {
  moduleZh: string;
  moduleEn: string;
  titleZh: string;
  titleEn: string;
  capRef: string;
  scenarioZh: string;
  scenarioEn: string;
  keyTakeawaysZh: string[];
  keyTakeawaysEn: string[];
  detailedContentZh: string;
  detailedContentEn: string;
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

const EAA_FULL_SYLLABUS_DB: Record<string, LessonData> = {
  // MODULE 1: ESTATE AGENCY PRACTICE & REGULATION
  'm1-l1': {
    moduleZh: '模組一：地產代理條例 (第511章) 及發牌規例',
    moduleEn: 'Module 1: Estate Agents Ordinance (Cap. 511) & Licensing Rules',
    titleZh: '第一講：牌照類別 (EAQE vs SQE) 及申請資格',
    titleEn: 'Lesson 1: License Types & Eligibility Requirements',
    capRef: 'Cap. 511 Section 15 & 16',
    scenarioZh: '陳先生持有營業員牌照 (SQE)，他擬與一位持有地產代理個人牌照 (EAQE) 的合夥人共同開辦一家地產代理公司，陳先生能否註冊為該合夥公司的合夥人 (Partner)？',
    scenarioEn: 'Mr. Chan holds an SQE license. He plans to open an agency with a partner holding an EAQE license. Can Mr. Chan be registered as a partner of the firm?',
    keyTakeawaysZh: [
      '獨資經營者或合夥人必須持有有效地產代理（個人）牌照 (EAQE)，SQE 持有人嚴禁擔任合夥人。',
      '每一間營業地點 (Branch) 必須由地產代理監管局批准的提名主管 (Nominated Manager) 負責管轄 (§38)。',
      '申請人必須符合「適當人選」(Fit and Proper Person) 測試，凡未解除破產者或因詐騙罪被定罪者均不符合資格。'
    ],
    keyTakeawaysEn: [
      'Sole Proprietors and Partners MUST hold an EAQE license. SQE holders are barred from acting as partners.',
      'Every place of business must be managed by an EAQE Nominated Manager approved by EAA (§38).',
      'Applicants must satisfy the "Fit and Proper Person" test; undischarged bankrupts or fraud convicts are disqualified.'
    ],
    detailedContentZh: '根據《地產代理條例》(Cap. 511) 第15及16條，法例嚴格區分地產代理個人牌照與營業員牌照。營業員 (SQE) 僅能作為僱員在持牌代理監管下進行代理工作。此外，根據第38條，經營地產代理業務的機構，其每一個營業地點均須由一名持有 EAQE 牌照的管轄主管管理。',
    detailedContentEn: 'Under Cap. 511 Sections 15 & 16, the law strictly distinguishes between EAQE and SQE licenses. Salespersons (SQE) must strictly act as employees under supervision. Under Section 38, each branch location must be managed by a nominated EAQE manager.',
    quiz: {
      questionZh: '根據《地產代理條例》第38條，經營地產代理公司之分行管轄主管 (Branch Manager) 必須符合下列哪項資格？',
      questionEn: 'Under Section 38 of Cap. 511, what qualification must a Branch Manager hold?',
      optionsZh: [
        '持有有效 SQE 營業員牌照並具備 3 年以上從業經驗',
        '持有有效 EAQE 地產代理（個人）牌照並獲監管局批准',
        '持有法律或工商管理學士學位即可',
        '任何經公司董事會委任之持牌員工'
      ],
      optionsEn: [
        'SQE license holder with over 3 years experience',
        'Valid EAQE license holder approved by the EAA',
        'Bachelor degree holder in Law or Business',
        'Any licensed employee appointed by the board'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。根據第38條，分行主管必須持有 EAQE 地產代理（個人）牌照，並獲監管局批准管理該營業地點。',
      explanationEn: 'Correct answer is B. Section 38 explicitly mandates that branch managers must hold an EAQE license.'
    }
  },
  'm1-l2': {
    moduleZh: '模組一：地產代理條例 (第511章) 及發牌規例',
    moduleEn: 'Module 1: Estate Agents Ordinance (Cap. 511) & Licensing Rules',
    titleZh: '第二講：持牌人常規及操守守則 (Code of Ethics)',
    titleEn: 'Lesson 2: Code of Ethics & Practice Rules',
    capRef: 'Cap. 511B Practice Rules',
    scenarioZh: '代理在處理一手樓盤銷售時，向買家承諾私人提供 2% 佣金回贈 (Rebate)，但未有以書面形式記錄。其後代理拒絕履行承諾，這是否違反監管局操守守則？',
    scenarioEn: 'An agent verbally promises a 2% commission rebate to a buyer for a new development, but fails to document it in writing. The agent later reneges. Is this an ethics violation?',
    keyTakeawaysZh: [
      '所有佣金回贈及優惠承諾必須在簽署合約前以書面形式向買家確認，並清晰列明條款。',
      '代理對客戶負有謹慎及忠誠責任 (Fiduciary Duty)，嚴禁作出虛假或誤導性陳述。',
      '維護客戶訂金安全：代理收取的客戶款項必須存入指定的客戶信託戶口 (Trust Account)。'
    ],
    keyTakeawaysEn: [
      'All rebate promises MUST be confirmed in writing prior to signing agreements.',
      'Agents owe a fiduciary duty of care and honesty, strictly prohibiting misrepresentation.',
      'Client money must be deposited into designated Client Trust Accounts without delay.'
    ],
    detailedContentZh: '依據《地產代理操守守則》第3.4.1條及監管局執業指引，代理在處理樓盤銷售時，若向買方給予折扣或回贈，必須填妥「回贈確認書」並由雙方簽署。任何口頭承諾而未載於書面紀錄之行為，均構成嚴重違規。',
    detailedContentEn: 'Under EAA Code of Ethics 3.4.1, rebate promises must be recorded in writing via rebate confirmation notes signed by both parties prior to execution. Verbal rebate promises constitute serious misconduct.',
    quiz: {
      questionZh: '地產代理向一手樓盤買家提供佣金回贈時，下列哪項做法符合監管局之執業指引？',
      questionEn: 'Which practice complies with EAA guidelines when offering a commission rebate to a primary market buyer?',
      optionsZh: [
        '僅以 WhatsApp 口頭訊息承諾即可',
        '在簽署臨時買賣合約前以書面形式確認回贈數額及條款',
        '待交易完成成交後由代理私下以現金發放且不作記錄',
        '要求買家簽署放棄追討回贈聲明書'
      ],
      optionsEn: [
        'Verbal WhatsApp promise only',
        'Confirming rebate details in writing prior to PASP execution',
        'Off-the-record cash payment post-completion',
        'Requiring buyer to sign a rebate waiver'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。監管局指引強制規定所有回贈必須於簽署臨約前以書面確認。',
      explanationEn: 'Correct answer is B. Written confirmation prior to PASP signing is mandatory under EAA rules.'
    }
  },

  // MODULE 2: LAND SEARCH & TITLE CONVEYANCING
  'm2-l1': {
    moduleZh: '模組二：土地查冊 (Land Search) 與業權實務',
    moduleEn: 'Module 2: Land Search & Title Conveyancing',
    titleZh: '第一講：如何解讀土地註冊處查冊紀錄',
    titleEn: 'Lesson 1: Reading Land Registry Search Reports',
    capRef: 'Cap. 128 Land Registration Ordinance',
    scenarioZh: '土地查冊顯示「等待註冊的契約」(Deeds Pending Registration) 欄有一項昨日送交的按揭文件，這對買家即將簽署的買賣合約有何法律影響？',
    scenarioEn: 'A Land Search shows a mortgage deed submitted yesterday in "Deeds Pending Registration". How does this affect the upcoming purchase agreement?',
    keyTakeawaysZh: [
      '土地登記冊四大組成部分：物業資料、業主資料、等待註冊契約、物業負擔欄。',
      '優先權原則 (Priority Rule)：文書於簽立後 1 個月內送交註冊，其優先權追溯至簽立之日。',
      '查核 Lis Pendens (未決訴訟) 及 Charging Orders (押記令) 是確保業權良好 (Good Title) 的核心。'
    ],
    keyTakeawaysEn: [
      'Land Register sections: Property Details, Owner Details, Deeds Pending Registration, Incumbrances.',
      'Priority Rule: Instruments registered within 1 month of execution take priority from execution date.',
      'Checking Lis Pendens and Charging Orders is essential to verify good title.'
    ],
    detailedContentZh: '依據《土地註冊條例》(Cap. 128)，香港實行契據註冊制度而非業權註冊制度。土地登記冊紀錄不保證業權無瑕疵，代理必須仔細閱讀負擔欄 (Incumbrances) 中的建築物條例警告令 (Section 24 Order)、法院押記令及未清還之按揭。',
    detailedContentEn: 'Under Cap. 128, Hong Kong operates a deeds registration system. Land registers do not guarantee title; agents must scrupulously inspect Incumbrances for Section 24 Orders, charging orders, and unreleased mortgages.',
    quiz: {
      questionZh: '若一項地產買賣合約於 5 月 10 日簽立，並於 6 月 5 日送交土地註冊處註冊，其法律優先權由何日開始計算？',
      questionEn: 'If a PASP is executed on May 10 and registered on June 5, from which date does its legal priority take effect?',
      optionsZh: [
        '5 月 10 日 (簽立之日)',
        '6 月 5 日 (註冊之日)',
        '5 月 1 日',
        '6 月 10 日'
      ],
      optionsEn: [
        'May 10 (Date of Execution)',
        'June 5 (Date of Registration)',
        'May 1',
        'June 10'
      ],
      correctIndex: 0,
      explanationZh: '正確答案為 A。於簽立後 1 個月內（5月10日至6月5日）完成註冊，優先權追溯至簽立當日 (5月10日)。',
      explanationEn: 'Correct answer is A. Registration within 1 month relates back priority to execution date under Cap. 128.'
    }
  },

  // MODULE 3: STATUTORY AGENCY AGREEMENTS & TENANCY
  'm3-l1': {
    moduleZh: '模組三：法定地產代理協議 (Form 1 - Form 6) 與租務實務',
    moduleEn: 'Module 3: Statutory Agency Agreements (Forms 1-6) & Tenancy',
    titleZh: '第一講：表格 1 至 6 (Forms 1-6) 填寫規範與法定要點',
    titleEn: 'Lesson 1: Statutory Forms 1-6 Mandatory Particulars',
    capRef: 'Cap. 511 Section 36 & Practice Regulation',
    scenarioZh: '代理在代表賣方簽署表格 3 (Form 3) 時，漏填協議有效期限及佣金條款，該地產代理協議是否具有法律約束力？',
    scenarioEn: 'An agent signs Form 3 with a seller but omits the validity period and commission terms. Is the agreement legally binding?',
    keyTakeawaysZh: [
      '表格 1 (Form 1) 至表格 6 (Form 6) 涵蓋住宅物業買賣與租賃代理協議。',
      '協議必須載明：有效期限、佣金金額或計算方式、雙重代理身份申報。',
      '未填妥法定必填事項 (Mandatory Particulars) 將導致協議無效，且代理無權追討佣金。'
    ],
    keyTakeawaysEn: [
      'Forms 1 to 6 govern residential purchase, sale, and tenancy representation.',
      'Mandatory particulars: validity period, commission rate/amount, and dual agency declaration.',
      'Omission of mandatory items renders the agreement void and forfeits commission entitlement.'
    ],
    detailedContentZh: '《地產代理條例》第36條規定，代理在為客戶處理住宅物業交易前，必須簽署法定地產代理協議。買賣住宅使用 Form 3 (賣方) 及 Form 4 (買方)；租賃使用 Form 5 (業主) 及 Form 6 (租客)。',
    detailedContentEn: 'Section 36 requires signed statutory agreements before representing residential clients: Form 3 (Vendor) / Form 4 (Purchaser) for sales, Form 5 (Landlord) / Form 6 (Tenant) for tenancies.',
    quiz: {
      questionZh: '地產代理代表住宅物業買方時，必須簽署下列哪一份法定地產代理協議？',
      questionEn: 'Which statutory agreement must be signed when representing a residential property purchaser?',
      optionsZh: [
        '表格 3 (Form 3)',
        '表格 4 (Form 4)',
        '表格 5 (Form 5)',
        '表格 6 (Form 6)'
      ],
      optionsEn: [
        'Form 3',
        'Form 4',
        'Form 5',
        'Form 6'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。表格 4 (Form 4) 為地產代理與買方簽署之法定協議。表格 3 為賣方協議。',
      explanationEn: 'Correct answer is B. Form 4 is the statutory agreement for purchasers.'
    }
  },

  // MODULE 4: VALUATION, BUILDINGS & MORTGAGES
  'm4-l4': {
    moduleZh: '模組四：物業估值、建築物條例與按揭融資',
    moduleEn: 'Module 4: Property Valuation, Buildings Ordinance & Mortgages',
    titleZh: '第四講：印花稅條例 (Cap. 117) 住宅稅率與最新規範',
    titleEn: 'Lesson 4: Stamp Duty Ordinance (Cap. 117) Rates & Rules',
    capRef: 'Cap. 117 Stamp Duty Ordinance',
    scenarioZh: '買家為香港永久性居民，名下無任何住宅物業，現購買價值港幣 600 萬元之住宅物業，應繳納哪一類印花稅？',
    scenarioEn: 'A Hong Kong Permanent Resident owning no other residential property purchases a residential flat for HK$6M. Which stamp duty rate applies?',
    keyTakeawaysZh: [
      '首置香港永久居民適用按第2標準稅率計算之從價印花稅 (AVD Scale 2)。',
      '非香港永久居民或名下已有住宅者之稅率規範及最新寬免政策。',
      '臨時買賣合約 (PASP) 必須於簽立後 30 天內送交印花稅署繳納印花稅。'
    ],
    keyTakeawaysEn: [
      'First-time HKPR buyers qualify for AVD Scale 2 rates.',
      'Non-HKPR or second-home buyer tax rates and relief schemes.',
      'PASP instruments must be stamped at the Stamp Office within 30 days of execution.'
    ],
    detailedContentZh: '根據《印花稅條例》(Cap. 117)，住宅物業買賣文書須繳納從價印花稅 (AVD)。代表客戶處理物業交易時，代理有責任提醒買方相關印花稅負擔及繳付期限，避免因逾期繳納而面臨高達 10 倍之罰款。',
    detailedContentEn: 'Under Cap. 117, residential conveyances are subject to Ad Valorem Stamp Duty (AVD). Agents must inform buyers of applicable tax liabilities and the 30-day stamping deadline to avoid late penalties up to 10x the duty.',
    quiz: {
      questionZh: '買賣住宅物業之臨時協議送交印花稅署蓋印之法定期限為簽立後多少天內？',
      questionEn: 'What is the statutory deadline for stamping a residential PASP after execution?',
      optionsZh: [
        '7 天內',
        '14 天內',
        '30 天內',
        '60 天內'
      ],
      optionsEn: [
        'Within 7 days',
        'Within 14 days',
        'Within 30 days',
        'Within 60 days'
      ],
      correctIndex: 2,
      explanationZh: '正確答案為 C。根據《印花稅條例》，買賣文書須於簽立後 30 天內完成蓋印。',
      explanationEn: 'Correct answer is C. The statutory stamping limit is within 30 days under Cap. 117.'
    }
  }
};

// Default Fallback Template
const DEFAULT_LESSON: LessonData = {
  moduleZh: 'EAA 核心牌照課程單元',
  moduleEn: 'EAA Core Licensing Module',
  titleZh: '章節專業講義與法規剖析',
  titleEn: 'Lesson Study Notes & Regulatory Analysis',
  capRef: 'Cap. 511 Provisions',
  scenarioZh: '持牌地產代理在進行物業交易過程中，必須嚴格遵守監管局的指引及法定披露責任。',
  scenarioEn: 'Licensed real estate agents must adhere strictly to statutory disclosure duties and EAA practice directions during transactions.',
  keyTakeawaysZh: [
    '掌握《地產代理條例》核心條款與法定表格之應用。',
    '嚴格履行對客戶的誠實與謹慎責任 (Duty of Care and Fiduciary Duty)。',
    '了解違規行為之懲處機制與個人牌照續期條件。'
  ],
  keyTakeawaysEn: [
    'Master the application of Cap. 511 core clauses and statutory forms.',
    'Strictly uphold duty of care and fiduciary duties owed to clients.',
    'Understand regulatory penalty mechanisms and license renewal rules.'
  ],
  detailedContentZh: '本單元針對香港地產代理監管局 (EAA) 之最新考試大綱編寫。深入解析法定條文、相關司法判例及地產代理操守指引，幫助學員全面建立考點邏輯。',
  detailedContentEn: 'This lesson aligns with the latest EAA examination syllabus. It covers statutory principles, judicial precedents, and ethical guidelines for maximum exam readiness.',
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

  const lesson = EAA_FULL_SYLLABUS_DB[lessonId] || {
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

        {/* SECTION 1: Pedagogical Hook & Practical Scenario */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <span>{isZh ? '【香港地產代理實務情境案例】' : '[HK Real Estate Case Study Scenario]'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
            "{isZh ? lesson.scenarioZh : lesson.scenarioEn}"
          </p>
        </div>

        {/* SECTION 2: Core Exam Takeaways */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>{isZh ? '監管局核心考點 (Statutory Exam Takeaways)' : 'EAA Statutory Exam Takeaways'}</span>
          </h2>
          <ul className="space-y-3">
            {(isZh ? lesson.keyTakeawaysZh : lesson.keyTakeawaysEn).map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  {idx + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 3: Detailed Legal Notes */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="h-5 w-5 text-indigo-400" />
            <span>{isZh ? '條例與法規詳細分析' : 'Detailed Legal & Regulatory Notes'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isZh ? lesson.detailedContentZh : lesson.detailedContentEn}
          </p>
        </div>

        {/* SECTION 4: Knowledge Check Quiz */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              {isZh ? '全真模擬隨堂測驗 (Knowledge Check)' : 'EAA Style Knowledge Check'}
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
            <span>{isZh ? '進入完整模擬試題庫' : 'Practice Question Bank'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
