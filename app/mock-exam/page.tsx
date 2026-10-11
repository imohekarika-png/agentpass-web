// app/mock-exam/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  Timer, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award,
  BarChart3,
  ArrowRight,
  BookOpen,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';

interface Question {
  id: number;
  part: 1 | 2;
  topic: string;
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationZh: string;
  explanationEn: string;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    part: 1,
    topic: 'Cap. 511 Licensing Regulation',
    questionZh: '根據《地產代理條例》(Cap. 511)，持牌持有人在更換其主要營業地址後，必須在多少天內書面通知地產代理監管局 (EAA)？',
    questionEn: 'Under Cap. 511, within how many days must a licensee notify the EAA in writing after changing their principal place of business?',
    optionsZh: ['7 天', '14 天', '21 天', '30 天'],
    optionsEn: ['7 days', '14 days', '21 days', '30 days'],
    correctIndex: 3,
    explanationZh: 'Cap. 511 s.40 規定持牌人變更營業地址必須於 30 天內通知 EAA。',
    explanationEn: 'Under Cap. 511 s.40, any change of business address must be reported to EAA within 30 days.'
  },
  {
    id: 2,
    part: 1,
    topic: 'Land Search & Encumbrances',
    questionZh: '土地註冊處查冊紀錄中，若出現「Notice under Section 24 of Buildings Ordinance」(屋宇署第24條命令)，代表什麼？',
    questionEn: 'In a Land Registry search record, what does a "Notice under Section 24 of Buildings Ordinance" signify?',
    optionsZh: ['物業已被法院收回', '未清繳地租', '屋宇署發出的拆卸違例建築物(僭建)命令', '業主立案法團查封'],
    optionsEn: ['Property repossessed', 'Unpaid Government rent', 'Order to demolish unauthorized building works (UBW)', 'Property impounded'],
    correctIndex: 2,
    explanationZh: '屋宇署 s.24 命令屬於常見的建築物違例/僭建物清拆令。',
    explanationEn: 'Section 24 Order refers to mandatory demolition of UBW.'
  },
  {
    id: 3,
    part: 1,
    topic: 'Cap. 511A Licensing Rules',
    questionZh: '營業員牌照 (Salesperson License) 持有人可否以獨立承辦商身份單獨簽署地產代理協議？',
    questionEn: 'Can a Salesperson License holder independently sign an estate agency agreement?',
    optionsZh: ['可以', '不可以，必須在持牌地產代理監督下進行', '只要獲得買方同意即可', '只限於住宅租務交易'],
    optionsEn: ['Yes', 'No, must act under supervision of a licensed Estate Agent', 'Yes, if buyer agrees', 'Limited to residential tenancies'],
    correctIndex: 1,
    explanationZh: '營業員必須在持牌地產代理管理及監督下行事。',
    explanationEn: 'Salespersons must operate under direct supervision of a licensed Estate Agent.'
  },
  {
    id: 4,
    part: 1,
    topic: 'Cap. 7 Landlord & Tenant',
    questionZh: '根據《業主與租客(綜合)條例》(Cap. 7) 住宅租賃第 IVA 部，租客享有為期多久的租務保障期？',
    questionEn: 'Under Part IVA of Cap. 7 for regulated tenancies, how long is the tenancy security of tenure?',
    optionsZh: ['1 年', '2 年', '4 年 (2年 + 2年續租權)', '5 年'],
    optionsEn: ['1 year', '2 years', '4 years (2+2 right of renewal)', '5 years'],
    correctIndex: 2,
    explanationZh: '分租房及規管租賃提供 4 年租務保障期（首期2年+次期2年優先續租權）。',
    explanationEn: 'Part IVA provides a 4-year security of tenure (2+2 structure).'
  },
  {
    id: 5,
    part: 1,
    topic: 'Code of Ethics & POIM',
    questionZh: '地產代理在向買家提供物業查冊資料時，查冊結果的有效日期不得超過多久？',
    questionEn: 'When providing a land search copy to a buyer, the search date must not exceed how many days?',
    optionsZh: ['1 天', '3 天', '7 天', '14 天'],
    optionsEn: ['1 day', '3 days', '7 days', '14 days'],
    correctIndex: 0,
    explanationZh: '依據 EAA 執業通告，提供予買家之土地查冊必須為交易當日或前一日之最新紀錄。',
    explanationEn: 'Land search provided to purchasers must be conducted on the day or immediate working day prior.'
  },
  {
    id: 6,
    part: 2,
    topic: 'Case Study: Form 6 Omission',
    questionZh: '【個案題 1】代理 Chan 安排租客簽署表格 6 (Form 6)，但漏填了地產代理佣金金額及支付日期。該協議效力如何？',
    questionEn: '[Case Study 1] Agent Chan arranged Form 6 but omitted commission details. Is it valid?',
    optionsZh: [
      '完全有效，可於事後口頭追討',
      '無效且違反監管規例，代理可能面臨 EAA 紀律處分',
      '自動轉為標準 1 個月租金',
      '只需租客單方面補簽即可生效'
    ],
    optionsEn: [
      'Fully valid',
      'Invalid and breaches EAA regulations; faces disciplinary action',
      'Defaults to 1 month rent',
      'Valid if tenant signs supplementary note'
    ],
    correctIndex: 1,
    explanationZh: '地產代理協議必要條款未填妥即屬違規。',
    explanationEn: 'Essential terms must be completed prior to execution.'
  },
  {
    id: 7,
    part: 2,
    topic: 'Case Study: Dual Agency Disclosure',
    questionZh: '【個案題 2】代理 Lee 同時代表業主與買家 (Dual Agency)，但未有向雙方披露該雙重代理身份。Lee 的行為違反了甚麼？',
    questionEn: '[Case Study 2] Agent Lee acts for both landlord and tenant without written disclosure. What is breached?',
    optionsZh: [
      '普通法受託人職責 (Fiduciary Duty) 及 EAA 操守守則',
      '只違反《香港法例》Cap. 210',
      '無任何違反，雙重代理在香港屬常態',
      '僅需向買家退回半數佣金'
    ],
    optionsEn: [
      'Fiduciary duty under Common Law and EAA Code of Ethics',
      'Only breaches Cap. 210',
      'No breach',
      'Must refund half commission only'
    ],
    correctIndex: 0,
    explanationZh: '代理必須書面披露雙重代理身份，否則構成利益衝突並違反普通法受託責任。',
    explanationEn: 'Dual agency requires explicit written consent from both parties.'
  },
  {
    id: 8,
    part: 2,
    topic: 'Case Study: Deposit Stakeholding',
    questionZh: '【個案題 3】臨約中註明「訂金由業主律師以託管人身份 (Stakeholder) 持有」。若物業出現業權瑕疵，律師應如何處理？',
    questionEn: '[Case Study 3] PASP states deposit is held by vendor lawyer as Stakeholder. If title defect arises, what should the lawyer do?',
    optionsZh: [
      '立即轉交業主',
      '繼續託管訂金直至業權問題解決或法庭發出命令',
      '退還給地產代理公司',
      '扣除律師費後退回業主'
    ],
    optionsEn: [
      'Transfer to vendor immediately',
      'Hold deposit until title issue is resolved or court orders',
      'Return to agency',
      'Deduct legal fee then return to vendor'
    ],
    correctIndex: 1,
    explanationZh: '託管人 (Stakeholder) 身份意味著律師不能在業權爭議未決前將款項發放予業主。',
    explanationEn: 'A stakeholder holds funds impartially until title requirements are satisfied.'
  },
  {
    id: 9,
    part: 2,
    topic: 'Case Study: Misrepresentation',
    questionZh: '【個案題 4】代理在宣傳單張中宣稱物業「保證可作商業用途」，但該物業實為純住宅用途。買家購入後無法開辦公司。代理需負何法律責任？',
    questionEn: '[Case Study 4] Agent advertises property as "Guaranteed Commercial" but is residential. What is the agent liability?',
    optionsZh: [
      '失實陳述 (Misrepresentation) 及發布誤導性廣告之違規責任',
      '免責，廣告屬於商業誇張 (Puffery)',
      '買家應自負風險 (Caveat Emptor)，代理無責',
      '只需更正廣告即可免責'
    ],
    optionsEn: [
      'Misrepresentation and EAA disciplinary breach',
      'Exempt as sales puffery',
      'Caveat emptor applies; agent not liable',
      'Exempt by amending advertisement'
    ],
    correctIndex: 0,
    explanationZh: '代理發布與用途不符之誤導陳述需承擔失實陳述民事賠償及監管局處分。',
    explanationEn: 'False property description creates liability for misrepresentation.'
  },
  {
    id: 10,
    part: 2,
    topic: 'Case Study: Property Search & Form 1',
    questionZh: '【個案題 5】代理在填寫物業資料表格 (Form 1) 時，未有核實物業是否存在未解除之法院押記令 (Court Order)。該行為是否構成疏忽？',
    questionEn: '[Case Study 5] Agent fails to verify court charge on Form 1. Does this constitute negligence?',
    optionsZh: [
      '構成專業疏忽，未履行合理謹慎責任 (Duty of Care)',
      '不構成疏忽，查冊由買家律師全權負責',
      '若買家最終撤銷交易，代理即無責',
      '只需補填 Form 1 即可免責'
    ],
    optionsEn: [
      'Constitutes professional negligence',
      'Not negligent; sole duty lies with buyer solicitor',
      'Agent exempt if transaction cancels',
      'Exempt if Form 1 is re-issued'
    ],
    correctIndex: 0,
    explanationZh: '地產代理填寫物業資料表格時必須進行土地查冊並披露已知負擔。',
    explanationEn: 'Agent owes a duty of care to perform land search and disclose encumbrances on Form 1.'
  }
];

export default function MockExamPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number>(1800);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleGenerateAiPaper = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 10, language: currentLang })
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setAnswers({});
        setTimeLeft(1800);
        setIsSubmitted(false);
      }
    } catch (err) {
      console.error('AI Paper Generation Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const part1Questions = questions.filter((q) => q.part === 1);
  const part2Questions = questions.filter((q) => q.part === 2);

  const part1Correct = part1Questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const part2Correct = part2Questions.filter((q) => answers[q.id] === q.correctIndex).length;

  const part1ScorePct = Math.round((part1Correct / (part1Questions.length || 1)) * 100);
  const part2ScorePct = Math.round((part2Correct / (part2Questions.length || 1)) * 100);
  
  const overallPassed = part1ScorePct >= 60 && part2ScorePct >= 60;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-300 mb-2">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>{isZh ? 'EAA 全真模擬考試考場' : 'Official EAQE/SQE Timed Exam Simulator'}</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              {isZh ? '地產代理資格全真模擬測驗 (10 題完整組卷)' : 'Full 10-Question Exam Simulator'}
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleGenerateAiPaper}
              disabled={isGenerating}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:opacity-90 font-bold text-xs text-white transition flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? (isZh ? 'AI 生成試卷中...' : 'Generating...') : (isZh ? '生成最新 AI 真題試卷' : 'Generate AI Paper')}</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
              <Timer className={`h-5 w-5 ${timeLeft < 300 ? 'text-rose-400 animate-pulse' : 'text-indigo-400'}`} />
              <span className="font-mono text-base font-black text-white">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Exam Results Modal */}
        {isSubmitted && (
          <div ref={resultRef} className={`p-6 sm:p-8 rounded-2xl border ${overallPassed ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-rose-950/30 border-rose-500/50'} space-y-6 shadow-2xl`}>
            <div className="flex items-center gap-3">
              {overallPassed ? (
                <CheckCircle2 className="h-8 w-8 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="h-8 w-8 text-rose-400 shrink-0" />
              )}
              <div>
                <h2 className="text-xl font-black text-white">
                  {overallPassed
                    ? (isZh ? '🎉 恭喜！您已達到 EAA 雙過線合格標準' : '🎉 Congratulations! You Passed Both Sections')
                    : (isZh ? '⚠️ 未能合格：請檢討未過線部分' : '⚠️ Exam Result: Retake Recommended')}
                </h2>
                <p className="text-xs text-slate-300">
                  {isZh
                    ? 'EAA 規定：Part I (單選題) 與 Part II (個案題) 均須同時達到 60% 分數線。'
                    : 'EAA Threshold: Both Part I and Part II must individually reach 60%.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block font-bold">Part I (Multiple Choice)</span>
                <span className={`text-2xl font-black ${part1ScorePct >= 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {part1ScorePct}% ({part1Correct}/{part1Questions.length})
                </span>
                <span className="text-[11px] block text-slate-400 mt-1">
                  {part1ScorePct >= 60 ? '✅ Passed (≥60%)' : '❌ Failed (<60%)'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block font-bold">Part II (Case Studies)</span>
                <span className={`text-2xl font-black ${part2ScorePct >= 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {part2ScorePct}% ({part2Correct}/{part2Questions.length})
                </span>
                <span className="text-[11px] block text-slate-400 mt-1">
                  {part2ScorePct >= 60 ? '✅ Passed (≥60%)' : '❌ Failed (<60%)'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  setAnswers({});
                  setTimeLeft(1800);
                  setIsSubmitted(false);
                }}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>{isZh ? '重新挑戰測驗' : 'Retake Test'}</span>
              </button>

              <Link
                href="/dashboard"
                className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 font-bold text-xs text-slate-200 transition flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4 text-emerald-400" />
                <span>{isZh ? '返回間隔重複儀表板' : 'Go to Dashboard'}</span>
              </Link>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const selectedIdx = answers[q.id];
            const isCorrect = selectedIdx === q.correctIndex;

            return (
              <div key={q.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                    Question {idx + 1} • {q.topic}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                    Part {q.part} ({q.part === 1 ? 'MC' : 'Case Study'})
                  </span>
                </div>

                <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {isZh ? q.questionZh : q.questionEn}
                </p>

                <div className="space-y-2.5 pt-2">
                  {(isZh ? q.optionsZh : q.optionsEn).map((opt, optIdx) => {
                    const isChoice = selectedIdx === optIdx;

                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500/50';
                    if (isChoice) {
                      btnStyle = 'bg-indigo-950 border-indigo-500 text-white';
                    }

                    if (isSubmitted) {
                      if (optIdx === q.correctIndex) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isChoice && !isCorrect) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isSubmitted && optIdx === q.correctIndex && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-amber-400 block">{isZh ? '考官解析:' : 'Explanation:'}</span>
                    <p>{isZh ? q.explanationZh : q.explanationEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit & Next Action Bar */}
        <div className="pt-4 space-y-4">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-extrabold text-sm text-white transition shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <BarChart3 className="h-5 w-5" />
              <span>{isZh ? '提交答案並計算成績' : 'Submit Answers & Calculate Score'}</span>
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800 gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">{isZh ? '測驗已完成！下一步：' : 'Exam Complete! Next Actions:'}</h3>
                <p className="text-xs text-slate-400">{isZh ? '前往儀表板追蹤錯題並開啟 1-3-7-16-35 間隔溫習。' : 'Review weak areas in your Spaced Repetition queue.'}</p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/course"
                  className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-200 transition flex items-center gap-1.5"
                >
                  <BookOpen className="h-4 w-4 text-indigo-400" />
                  <span>{isZh ? '研讀講義' : 'Syllabus'}</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition flex items-center gap-1.5"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>{isZh ? '溫習儀表板' : 'Dashboard'}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}