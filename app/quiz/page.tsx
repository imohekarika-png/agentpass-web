// app/quiz/page.tsx
'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  BookOpen, 
  Award, 
  ChevronRight,
  Globe
} from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: { 'zh-HK': string; en: string };
  options: { 'zh-HK': string[]; en: string[] };
  correctIndex: number;
  explanation: { 'zh-HK': string; en: string };
  capReference: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Cap. 511 Ordinance',
    question: {
      'zh-HK': '根據《地產代理條例》(第511章)，雙重代理 (Dual Agency) 在何種情況下屬合法？',
      en: 'Under the Estate Agents Ordinance (Cap. 511), under what condition is Dual Agency considered lawful?'
    },
    options: {
      'zh-HK': [
        '只要地產代理不收取買方佣金即可',
        '必須向賣方及買方作出書面披露並取得雙方的書面同意',
        '雙重代理在香港住宅物業交易中一律被法律禁止',
        '只需口頭通知賣方及買方即可'
      ],
      en: [
        'As long as the agent does not collect commission from the purchaser',
        'Full written disclosure must be made and written consent obtained from both vendor and purchaser',
        'Dual agency is strictly illegal in all residential transactions in Hong Kong',
        'Verbal notification to both vendor and purchaser is sufficient'
      ]
    },
    correctIndex: 1,
    explanation: {
      'zh-HK': '根據第511章及EAA指引，代理如同時代表賣方及買方（雙重代理），必須分別透過 Form 3 及 Form 4（或相關法定協議）向雙方作出書面披露，並取得雙方簽署同意。',
      en: 'Under Cap. 511 and EAA guidelines, dual agency is only permitted if the agent discloses the relationship in writing to both parties (via Form 3 and Form 4) and obtains their signed written consent.'
    },
    capReference: 'Cap. 511 s. 36 & EAA Code of Ethics'
  },
  {
    id: 2,
    category: 'Statutory Forms',
    question: {
      'zh-HK': '地產代理在為住宅物業賣方提供服務時，必須使用以下哪份法定地產代理協議？',
      en: 'Which statutory estate agency agreement MUST an agent execute when acting for the vendor of a residential property?'
    },
    options: {
      'zh-HK': [
        'Form 1 (地產代理協議 - 出租)',
        'Form 3 (地產代理協議 - 出售住宅物業)',
        'Form 4 (地產代理協議 - 購買住宅物業)',
        'Form 5 (物業資料單)'
      ],
      en: [
        'Form 1 (Estate Agency Agreement for Leasing)',
        'Form 3 (Estate Agency Agreement for Sale of Residential Properties)',
        'Form 4 (Estate Agency Agreement for Purchase of Residential Properties)',
        'Form 5 (Property Information Statement)'
      ]
    },
    correctIndex: 1,
    explanation: {
      'zh-HK': 'Form 3 是地產代理與住宅物業賣方簽訂的法定協議。Form 4 用於買方，Form 1 及 Form 2 則用於物業資料單及租賃。',
      en: 'Form 3 is the mandatory prescribed agreement between an estate agent and a vendor for residential sale. Form 4 is used for buyers.'
    },
    capReference: 'Estate Agents Practice (General Duties and Hong Kong Residential Properties) Regulation'
  },
  {
    id: 3,
    category: 'Licensing Scheme',
    question: {
      'zh-HK': '持有營業員牌照 (Salesperson\'s Licence) 的人士，在執業時有何主要限制？',
      en: 'What is the primary operational restriction for a holder of a Salesperson\'s Licence?'
    },
    options: {
      'zh-HK': [
        '不能代表客戶簽署任何物業買賣合約',
        '必須受僱於獲牌照的地產代理 (Estate Agent)，不可獨立經營地產代理業務',
        '只可處理租賃交易，不可處理買賣交易',
        '每年最多只可簽署 10 份地產代理協議'
      ],
      en: [
        'Cannot sign any binding property purchase agreement on behalf of clients',
        'Must be employed by a licensed Estate Agent and cannot carry on estate agency business on their own account',
        'Can only handle leasing transactions, not sale and purchase transactions',
        'Can sign a maximum of 10 estate agency agreements per year'
      ]
    },
    correctIndex: 1,
    explanation: {
      'zh-HK': '營業員牌照持有人不可單獨經營地產代理業務或擔任獨資經營者/合夥人，必須受僱於持牌地產代理公司。',
      en: 'A Salesperson licensee is restricted to working as an employee of a licensed Estate Agent and cannot operate an independent estate agency business.'
    },
    capReference: 'Cap. 511 s. 15 & s. 16'
  }
];

export default function PracticeQuizPage() {
  const [locale, setLocale] = useState<'zh-HK' | 'en'>('zh-HK');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const isZh = locale === 'zh-HK';
  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">
                {isZh ? 'EAQE / SQE 模擬試題練習' : 'EAQE / SQE Practice Quiz'}
              </h1>
              <p className="text-xs text-slate-400">
                {isZh ? '香港地產代理條例 Cap. 511 考點測驗' : 'Hong Kong Property Ordinance Practice'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setLocale(isZh ? 'en' : 'zh-HK')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500 transition"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{isZh ? 'English' : '繁體中文'}</span>
          </button>
        </div>

        {/* Quiz Body */}
        {!quizCompleted ? (
          <div>
            {/* Progress & Category */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 font-medium">
                {currentQ.category}
              </span>
              <span>
                {isZh ? `第 ${currentIndex + 1} 題 / 共 ${QUIZ_QUESTIONS.length} 題` : `Question ${currentIndex + 1} of ${QUIZ_QUESTIONS.length}`}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-sm sm:text-base font-semibold text-slate-100 mb-6 leading-relaxed">
              {currentQ.question[locale]}
            </h2>

            {/* Options List */}
            <div className="space-y-2.5 mb-6">
              {currentQ.options[locale].map((optionText, idx) => {
                let btnStyle = 'border-slate-800 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:border-slate-700';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 font-medium';
                  } else if (idx === selectedOption) {
                    btnStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200';
                  } else {
                    btnStyle = 'border-slate-800/50 bg-slate-900/50 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="font-bold shrink-0 mt-0.5 opacity-70">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="flex-1 leading-relaxed">{optionText}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                      <XCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Explanation Box */}
            {isAnswered && (
              <div className="rounded-xl border border-indigo-900/60 bg-indigo-950/30 p-4 mb-6 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                  <HelpCircle className="h-4 w-4" />
                  <span>{isZh ? '解題分析与法例依據' : 'Explanatory Analysis & Legal Reference'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQ.explanation[locale]}
                </p>
                <div className="text-[11px] text-indigo-400 font-mono pt-1">
                  {isZh ? '條例出處：' : 'Reference: '} {currentQ.capReference}
                </div>
              </div>
            )}

            {/* Next / Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={!isAnswered}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
              >
                <span>
                  {currentIndex === QUIZ_QUESTIONS.length - 1
                    ? (isZh ? '查看測驗結果' : 'View Final Results')
                    : (isZh ? '下一題' : 'Next Question')}
                </span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Completion Summary View */
          <div className="text-center py-6 space-y-6">
            <div className="h-16 w-16 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
              <Award className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                {isZh ? '測驗完成！' : 'Quiz Completed!'}
              </h2>
              <p className="text-xs text-slate-400">
                {isZh ? '您的答案得分及合格評估如下：' : 'Your final score and pass assessment:'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-850 inline-block min-w-[200px]">
              <div className="text-3xl font-extrabold text-indigo-400">
                {score} / {QUIZ_QUESTIONS.length}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {Math.round((score / QUIZ_QUESTIONS.length) * 100)}% {isZh ? '正確率' : 'Accuracy'}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleRestartQuiz}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 transition"
              >
                <RotateCcw className="h-4 w-4" />
                <span>{isZh ? '重新練習' : 'Restart Quiz'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}