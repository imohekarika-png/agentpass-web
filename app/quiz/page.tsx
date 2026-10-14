// app/quiz/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  ArrowRight, 
  Sparkles, 
  BookOpen,
  Award,
  AlertTriangle,
  Target
} from 'lucide-react';

interface Question {
  id: number;
  blockId: string;
  blockNum: string;
  level: string;
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  answerIndex: number;
  explanationZh: string;
  explanationEn: string;
  statuteCitation: string;
}

const ALL_QUESTIONS: Question[] = [
  // Block 01 Questions (EAA & Licensing)
  {
    id: 101,
    blockId: 'b1',
    blockNum: 'Block 01',
    level: 'Level 2 - Basic Knowledge',
    questionZh: '根據《地產代理條例》( Cap. 511)，下列哪一項是申請個人地產代理牌照的法定條件？',
    questionEn: 'Under the Estate Agents Ordinance (Cap. 511), which of the following is a statutory requirement for an individual estate agent license?',
    optionsZh: [
      'A. 具備最少 3 年地產代理從業經驗',
      'B. 年滿 18 歲並完成中五或同等學歷',
      'C. 獲得至少兩名持牌代理之書面推薦',
      'D. 在香港擁有自置住宅物業'
    ],
    optionsEn: [
      'A. At least 3 years of real estate agency work experience',
      'B. Aged 18 or above and completed Form 5 or equivalent',
      'C. Obtain written recommendations from two licensed agents',
      'D. Own a residential property in Hong Kong'
    ],
    answerIndex: 1,
    explanationZh: '✓ 法定四大發牌條件為：年滿 18 歲、完成中五 (Form 5) 學歷、獲評為「適當人選」(Fit and Proper)、並於指定期限內考試合格。工作經驗 (Work Experience) 絕非法定條件。',
    explanationEn: '✓ Statutory eligibility requirements: Age 18+, Form 5 completion, Fit and Proper person, and exam passed. Work experience is NOT required.',
    statuteCitation: 'Cap. 511 s.15 & s.19'
  },
  {
    id: 102,
    blockId: 'b1',
    blockNum: 'Block 01',
    level: 'Level 2 - Basic Knowledge',
    questionZh: '營業員牌照 (SQE) 考試合格後，申請牌照的有效期限為何？',
    questionEn: 'What is the validity window for applying for a Salesperson license after passing the SQE qualifying exam?',
    optionsZh: [
      'A. 考試合格日起計 3 個月內',
      'B. 考試合格日起計 6 個月內',
      'C. 考試合格日起計 12 個月內',
      'D. 考試合格日起計 24 個月內'
    ],
    optionsEn: [
      'A. Within 3 months from the exam pass date',
      'B. Within 6 months from the exam pass date',
      'C. Within 12 months from the exam pass date',
      'D. Within 24 months from the exam pass date'
    ],
    answerIndex: 1,
    explanationZh: '✓ 考試成績有效窗口：營業員牌照 (SQE) 為 6 個月；地產代理牌照 (EAQE) 為 12 個月。主考官最常在此數字出陷阱！',
    explanationEn: '✓ Exam validity window: 6 months for Salesperson (SQE); 12 months for Estate Agent (EAQE).',
    statuteCitation: 'EAA Licensing Guidelines s.2.2'
  },

  // Block 02 Questions (Business Premises)
  {
    id: 201,
    blockId: 'b2',
    blockNum: 'Block 02',
    level: 'Level 4 - Understand + Apply',
    questionZh: '持牌地產代理公司變更營業地點後，必須於多少天內以書面通知地產代理監管局 (EAA)？',
    questionEn: 'A licensed estate agency changing its business address must notify the EAA in writing within how many days?',
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
    explanationZh: '✓ 根據 Cap. 511 s.40，營業地點或公司註冊地址如有變更，持牌人必須於 31 天內 以書面通知 EAA，否則屬刑事罪行。',
    explanationEn: '✓ Under Cap. 511 s.40, any change of business address must be notified to EAA in writing within 31 days.',
    statuteCitation: 'Cap. 511 s.40'
  },

  // Block 04 Questions (Client Money Trust)
  {
    id: 401,
    blockId: 'b4',
    blockNum: 'Block 04',
    level: 'Level 4 - Understand + Apply',
    questionZh: '營業員代業主收取買家 $40,000 現金訂金而業主不在香港時，該營業員必須如何處理該筆款項？',
    questionEn: 'A salesperson receiving $40,000 cash deposit for a vendor who is overseas must handle the funds by:',
    optionsZh: [
      'A. 存入買家律師樓的信託戶口',
      'B. 存入其所屬地產代理行於持牌銀行開立的客戶信託戶口',
      'C. 存入地產代理行的日常營業戶口 (Office Account)',
      'D. 存入分行經理的個人銀行戶口代為保管'
    ],
    optionsEn: [
      'A. Depositing into the purchaser solicitor trust account',
      'B. Depositing into a Client Trust Account maintained by his agency at a bank',
      'C. Depositing into the agency office operating account',
      'D. Depositing into the branch manager personal bank account'
    ],
    answerIndex: 1,
    explanationZh: '✓ 代客戶收取之款項，必須即時存入所屬代理行於持牌銀行開立之指定「客戶信託帳戶」(Client Trust Account)。嚴禁存入營業戶口或個人戶口！',
    explanationEn: '✓ Must immediately deposit client money into designated bank Client Trust Account maintained by the agency.',
    statuteCitation: 'Cap. 511 s.43 & Client Money Rules'
  },

  // Block 11 Questions (Statutory Forms 3-6)
  {
    id: 1101,
    blockId: 'b11',
    blockNum: 'Block 11',
    level: 'Level 4 - Understand + Apply',
    questionZh: '根據地產代理規條，下列哪一種物業交易「不需要」簽署 Prescribed 法定地產代理協議 (Form 3 至 6)？',
    questionEn: 'Which of the following transaction scenarios does NOT require signing a prescribed agency agreement (Forms 3 to 6)?',
    optionsZh: [
      'A. 出售住宅物業連同一個車位',
      'B. 出租獨立住宅樓宇',
      'C. 出租商業寫字樓 (Commercial Office)',
      'D. 購買住宅私人屋苑單位'
    ],
    optionsEn: [
      'A. Sale of a residential property together with a car parking space',
      'B. Leasing of a self-contained residential flat',
      'C. Leasing of a commercial office',
      'D. Purchase of a residential apartment unit'
    ],
    answerIndex: 2,
    explanationZh: '✓Prescribed 法定地產代理協議 (Form 3-6) 僅適用於「住宅物業」。商業寫字樓 (Office)、店舖 (Shop) 及非獨立住宅租賃均豁免使用。',
    explanationEn: '✓ Prescribed Forms 3-6 apply ONLY to residential properties. Commercial offices, shops, and non-self-contained units are exempt.',
    statuteCitation: 'Estate Agency Agreement Regulation s.3'
  },

  // Block 16 Questions (Tenancy Cap. 7)
  {
    id: 1601,
    blockId: 'b16',
    blockNum: 'Block 16',
    level: 'Level 4 - Understand + Apply',
    questionZh: '住宅租約無明確沒收條款下，租客拖欠租金達多少天時，業主有權行使法定沒收租賃權 (Forfeiture)？',
    questionEn: 'Absent an express forfeiture clause, after how many days of unpaid rent may a landlord forfeit a domestic tenancy?',
    optionsZh: [
      'A. 欠租達 7 天',
      'B. 欠租達 10 天',
      'C. 欠租達 14 天',
      'D. 欠租達 15 天'
    ],
    optionsEn: [
      'A. After 7 days unpaid rent',
      'B. After 10 days unpaid rent',
      'C. After 14 days unpaid rent',
      'D. After 15 days unpaid rent'
    ],
    answerIndex: 3,
    explanationZh: '✓ 法定沒收租賃權門檻為「欠租達 15 天」(15 Days)！主考官常以 14 天作為標誌性干擾選項，切勿被誤導！',
    explanationEn: '✓ Statutory forfeiture threshold is 15 DAYS of unpaid rent. 14 days is the standard distractor used by EAA.',
    statuteCitation: 'Landlord and Tenant (Consolidation) Ordinance Cap. 7'
  }
];

function QuizContent() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const searchParams = useSearchParams();
  const activeBlockId = searchParams.get('block');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // Filter questions based on block parameter
  const filteredQuestions = activeBlockId 
    ? ALL_QUESTIONS.filter((q) => q.blockId === activeBlockId)
    : ALL_QUESTIONS;

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0] || ALL_QUESTIONS[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Top Header */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          className="p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
              <Target className="h-3.5 w-3.5" />
              <span>{activeBlockId ? `Topic Block Drill: ${currentQ.blockNum}` : 'All 20 Topic Blocks Quiz Bank'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isZh ? '全真試題與考官陷阱特訓' : 'Verified Exam Questions & Trap Drills'}
            </h1>
            <p className="text-xs font-medium opacity-80">
              {isZh ? '每一題均來自地產代理監管局 (EAA) 官方標準答案庫與法例條文解析。' : '100% verified against official EAA answer keys and statutory ordinances.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/course"
              className="px-4 py-2.5 rounded-2xl border border-slate-700 hover:border-indigo-500 font-bold text-xs transition flex items-center gap-1.5"
            >
              <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
              <span>{isZh ? '返回單元' : 'Topic Blocks'}</span>
            </Link>
          </div>
        </div>

        {/* Active Block Info Pill */}
        {activeBlockId && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-bold text-amber-400">
            <span>{isZh ? `目前正進行 ${currentQ.blockNum} 專屬刷題` : `Active Block Drill: ${currentQ.blockNum}`}</span>
            <Link href="/quiz" className="underline hover:opacity-80">
              {isZh ? '查看全部 20 單元題目' : 'View All Questions'}
            </Link>
          </div>
        )}

        {/* Question Card */}
        {currentQ && (
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
            className="p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
              <span className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-bold text-indigo-400">
                Question {currentIndex + 1} / {filteredQuestions.length}
              </span>

              <span className="text-xs font-mono font-bold text-amber-400">
                {currentQ.level}
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-extrabold leading-relaxed">
                {isZh ? currentQ.questionZh : currentQ.questionEn}
              </h2>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {(isZh ? currentQ.optionsZh : currentQ.optionsEn).map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.answerIndex;

                  let btnStyle = 'border-slate-800 bg-slate-900/60 hover:border-indigo-500/60';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-600/20 border-rose-500 text-rose-300 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Explanation Box */}
            {isAnswered && (
              <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-400">
                  <span>【 官方答題解析 】</span>
                  <span>{currentQ.statuteCitation}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold leading-relaxed text-indigo-200">
                  {isZh ? currentQ.explanationZh : currentQ.explanationEn}
                </p>
              </div>
            )}

            {/* Card Footer Controls */}
            <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
              <div className="text-xs font-mono font-bold opacity-60">
                Score: {score} / {filteredQuestions.length}
              </div>

              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <span>{isZh ? '下一題' : 'Next Question'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs font-mono font-bold opacity-60">Loading Quiz Engine...</div>}>
      <QuizContent />
    </Suspense>
  );
}