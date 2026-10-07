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
  ArrowRight
} from 'lucide-react';

// Comprehensive Curriculum Database for EAA EAQE / SQE
const LESSON_DATABASE: Record<string, {
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
}> = {
  'm1-l1': {
    moduleZh: '模組一：地產代理條例 (第511章) 及發牌規例',
    moduleEn: 'Module 1: Estate Agents Ordinance (Cap. 511) & Licensing Rules',
    titleZh: '第一講：牌照類別 (EAQE vs SQE) 及申請資格',
    titleEn: 'Lesson 1: License Types & Eligibility',
    capRef: 'Cap. 511 Section 15 & 16',
    scenarioZh: '陳先生擬設立一家地產代理公司，但他僅考取了營業員資格 (SQE)。他能否擔任該公司的獨資經營者 (Sole Proprietor) 或主管 (Manager)？',
    scenarioEn: 'Mr. Chan wishes to set up a real estate agency firm, but he only holds a Salesperson License (SQE). Can he act as the Sole Proprietor or Manager of the firm?',
    keyTakeawaysZh: [
      '地產代理牌照 (EAQE / Individual) 允許獨立執業、開辦地產公司或擔任分行主管。',
      '營業員牌照 (SQE / Salesperson) 僅能作為受僱員工，在持牌地產代理監督下進行地產代理工作。',
      '牌照申請人必須符合「適當人選」(Fit and Proper Person) 測試，包括無未解除破產及無嚴重刑事前科。'
    ],
    keyTakeawaysEn: [
      'Estate Agent License (EAQE) permits independent practice, company setup, or acting as Branch Manager.',
      'Salesperson License (SQE) only allows employment under a licensed Estate Agent.',
      'Applicants must pass the "Fit and Proper Person" test, including no undischarged bankruptcy or serious convictions.'
    ],
    detailedContentZh: '根據《地產代理條例》第15及16條，地產代理個人牌照與營業員牌照存在法定職權劃分。獨資經營者或合夥人必須持有地產代理個人牌照 (EAQE)。若僅持有 SQE 牌照，嚴禁經營機構或簽署法定代理協議。',
    detailedContentEn: 'Under Cap. 511 Sections 15 & 16, there is a strict statutory boundary between Estate Agent and Salesperson licenses. A sole proprietor or partner MUST hold an Estate Agent License (EAQE). SQE holders cannot manage firms or sign agency agreements independently.',
    quiz: {
      questionZh: '下列哪一類人士有資格擔任地產代理分行的管轄主管 (Manager)？',
      questionEn: 'Which of the following individuals is qualified to act as the Manager of an estate agency branch?',
      optionsZh: [
        '持有有效 SQE 營業員牌照並有 5 年經驗者',
        '持有有效 EAQE 地產代理（個人）牌照者',
        '持有香港大學法律學士學位但無牌照者',
        '未解除破產之 EAQE 持牌人'
      ],
      optionsEn: [
        'Holder of SQE Salesperson License with 5 years experience',
        'Holder of valid EAQE Estate Agent (Individual) License',
        'LL.B. Graduate from HKU without a license',
        'Undischarged bankrupt holding an EAQE license'
      ],
      correctIndex: 1,
      explanationZh: '正確答案為 B。根據條例第38條，分行主管必須持有地產代理（個人）牌照 (EAQE)。SQE 持有人及未解除破產者均無資格擔任主管。',
      explanationEn: 'Correct Answer is B. Under Section 38, branch managers MUST hold an Estate Agent (Individual) License (EAQE). SQE holders and undischarged bankrupts are disqualified.'
    }
  },
  'm2-l1': {
    moduleZh: '模組二：土地查冊 (Land Search) 與業權實務',
    moduleEn: 'Module 2: Land Search & Title Conveyancing',
    titleZh: '第一講：如何解讀土地註冊處查冊紀錄',
    titleEn: 'Lesson 1: Reading Land Registry Search Reports',
    capRef: 'Cap. 128 Land Registration Ordinance',
    scenarioZh: '買家在查看土地查冊紀錄時，於「負擔欄」(Inumbrances) 發現一項「釘牌」(Order under S.24 of Buildings Ordinance)。代理應如何向買家解釋此紀錄對交易之風險？',
    scenarioEn: 'A buyer discovers an Order under Section 24 of the Buildings Ordinance in the Incumbrances section of the Land Register. How should the agent advise the buyer regarding transaction risks?',
    keyTakeawaysZh: [
      '土地登記冊分為四大段落：物業資料、業主資料、等待註冊的契約、及物業負擔欄。',
      '「優先權原則」(Priority Rule)：於簽立後 1 個月內註冊之文書，其優先權追溯至簽立之日。',
      '負擔欄中的 Orders (如 S.24 / S.26) 代表存在未遵從的法定命令，可能導致銀行拒絕批出按揭。'
    ],
    keyTakeawaysEn: [
      'Land Register comprises 4 sections: Property Details, Owner Details, Deeds Pending Registration, and Incumbrances.',
      'Priority Rule: Instruments registered within 1 month of execution take priority from the date of execution.',
      'Orders in Incumbrances (e.g., S.24 / S.26) signal unfulfilled statutory orders, which may cause mortgage rejection.'
    ],
    detailedContentZh: '土地查冊是買賣及租賃物業必不可少的程序。代理必須查核最新土地登記冊 (Land Register)，確認業主姓名與身份證一致、無未清還按揭或法律訴訟 (Lis Pendens)，並向買方提供土地查冊副本。',
    detailedContentEn: 'Land search is mandatory prior to signing agreements. Agents must verify that the seller matches the registered owner, check for unreleased mortgages or pending litigation (Lis Pendens), and provide a copy to the client.',
    quiz: {
      questionZh: '若一項地產買賣合約於 5 月 10 日簽立，並於 6 月 5 日送交土地註冊處註冊，其法律優先權由何日開始計算？',
      questionEn: 'If an Agreement for Sale and Purchase is executed on May 10 and registered at the Land Registry on June 5, from which date does its legal priority take effect?',
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
      explanationZh: '正確答案為 A。由於該文書於簽立後 1 個月內（5月10日至6月5日）完成註冊，根據《土地註冊條例》，其優先權追溯至簽立當日 (5月10日)。',
      explanationEn: 'Correct Answer is A. Since registration occurred within 1 month of execution, priority relates back to the execution date (May 10) under Cap. 128.'
    }
  }
};

// Default Fallback Template for dynamic routes without pre-built scenarios
const DEFAULT_LESSON = {
  moduleZh: 'EAA 核心牌照課程單元',
  moduleEn: 'EAA Core Licensing Module',
  titleZh: '章節專業講義與法規剖析',
  titleEn: 'Lesson Study Notes & Regulatory Analysis',
  capRef: 'Cap. 511 Provisions',
  scenarioZh: '這是一份模擬實務情境。持牌地產代理在進行物業交易過程中，必須嚴格遵守監管局的指引及法定披露責任。',
  scenarioEn: 'Practical case study scenario. Licensed real estate agents must adhere strictly to statutory disclosure duties and EAA practice directions during transactions.',
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
    explanationEn: 'Correct Answer is A. Agents owe a fiduciary duty and duty of care to disclose all material facts to their principal.'
  }
};

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const lessonId = resolvedParams.id.toLowerCase();
  const { locale, language } = useLanguage();
  const isZh = locale ? locale === 'zh-HK' : language === 'ZH';

  const lesson = LESSON_DATABASE[lessonId] || {
    ...DEFAULT_LESSON,
    titleZh: `章節 ${lessonId.toUpperCase()} 講義與考點分析`,
    titleEn: `Lesson ${lessonId.toUpperCase()} Study Notes & Key Points`
  };

  // Inline Quiz State
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
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-400 hover:text-indigo-300 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isZh ? '返回課程大綱' : 'Back to Syllabus'}</span>
          </Link>
          <span className="rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-[11px] font-mono text-indigo-300">
            {lesson.capRef}
          </span>
        </div>

        {/* Lesson Header */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {isZh ? lesson.moduleZh : lesson.moduleEn}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {isZh ? lesson.titleZh : lesson.titleEn}
          </h1>
        </div>

        {/* SECTION 1: Pedagogical Hook / Real World Scenario */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <span>{isZh ? '【實務案例思考】' : '[Case Study & Scenario]'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
            "{isZh ? lesson.scenarioZh : lesson.scenarioEn}"
          </p>
        </div>

        {/* SECTION 2: Core Takeaways Grid */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>{isZh ? '法定核心考點 (Key Exam Takeaways)' : 'Statutory Key Exam Takeaways'}</span>
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

        {/* SECTION 3: Detailed Notes */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <span>{isZh ? '詳細法規講義' : 'Detailed Legal Notes'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isZh ? lesson.detailedContentZh : lesson.detailedContentEn}
          </p>
        </div>

        {/* SECTION 4: Interactive Knowledge Check (Quiz) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              {isZh ? '即時隨堂測驗 (Knowledge Check)' : 'Interactive Knowledge Check'}
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

        {/* Footer Navigation Buttons */}
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
            <span>{isZh ? '進入完整全真測驗' : 'Take Full Quiz'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}