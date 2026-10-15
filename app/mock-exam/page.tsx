// app/mock-exam/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
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
  Building2
} from 'lucide-react';

interface MockQuestion {
  id: number;
  part: 'I' | 'II';
  caseScenarioId?: string;
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
  };
}

const CASE_SCENARIOS: Record<string, CaseScenario> = {
  'case-1': {
    id: 'case-1',
    titleZh: '遺囑執行人與違建清拆令 (Smart Mansion)',
    titleEn: 'Sole Executor & UBW Removal Order (Smart Mansion)',
    narrativeZh: 'Mr. Wan 作為 Smart Mansion 單位之單獨遺囑執行人，委託 Smart Agency 地產代理 Sunny 以 $8,000,000 出售物業。買家 Polly 經 Sunny 視察單位。Sunny 知悉陽台設有未經批准之違例建築工程 (UBW) 及屋宇署 Cap. 123 s.24 清拆令，但未向 Polly 警示按揭批核風險。',
    narrativeEn: 'Mr. Wan acts as the sole executor for Smart Mansion. Vendor instructed agent Sunny of Smart Agency to market the unit at $8,000,000. Purchaser Polly inspected the flat via Sunny. Sunny was aware of an unauthorized building work (UBW) on the balcony and a Cap. 123 s.24 removal order, but failed to warn Polly regarding potential mortgage restrictions.',
    landSearch: {
      propertyZh: [
        '地段編號：九龍內地段第 8842 號',
        '物業地址：旺角聰明大廈 12 樓 B 室',
        '批約年期：自 1978 年起計 75 年可續期'
      ],
      propertyEn: [
        'Lot No.: Kowloon Inland Lot No. 8842',
        'Address: Flat B, 12/F, Smart Mansion, Mong Kok',
        'Lease Term: 75 years renewable from 1978'
      ],
      ownerZh: [
        '登記業主：溫國強 (單獨遺囑執行人)',
        '代價：遺囑認證註冊 (註冊摘要編號 UB99201)'
      ],
      ownerEn: [
        'Registered Owner: Wan Kwok Keung (Sole Executor)',
        'Consideration: Probate Registration (Memorial No. UB99201)'
      ],
      incumbrancesZh: [
        '1. 法定押記/按揭：滙豐銀行有限公司 (摘要編號 UB44012)',
        '2. 建築物令：屋宇署 s.24 清拆令 (露台違例建築物 UBW)'
      ],
      incumbrancesEn: [
        '1. Legal Charge: HSBC Bank Ltd (Memorial No. UB44012)',
        '2. Building Order: Buildings Dept s.24 Removal Order (UBW on Balcony)'
      ]
    }
  },
  'case-2': {
    id: 'case-2',
    titleZh: '有限公司賣家與雙重查冊法則 (Central Commercial Tower)',
    titleEn: 'Company Vendor & Two-Search Rule (Central Commercial Tower)',
    narrativeZh: '賣方為「Apex Profits Limited」，委託代理 Ken 出售商業單位。土地查冊顯示物業登記於 Apex Profits 名下且無押記。代理 Ken 僅提供了土地查冊副本，未進行公司註冊處 (Companies Registry) 查冊。買方簽約後發現該公司已向另一財務公司發行包含浮動押記 (Floating Charge) 的債權證。',
    narrativeEn: 'Vendor is "Apex Profits Limited", instructing agent Ken to sell a commercial unit. Land search shows property registered under Apex Profits with no incumbrances. Ken supplied only the Land Registry search without conducting a Companies Registry charge search. Buyer later discovered an active Floating Charge debenture filed at Companies Registry.',
    landSearch: {
      propertyZh: [
        '地段編號：海旁地段第 102 號',
        '物業地址：中環商業大廈 20 樓 01 室',
        '批約年期：999 年 (自 1865 年起算)'
      ],
      propertyEn: [
        'Lot No.: Marine Lot No. 102',
        'Address: Suite 01, 20/F, Central Commercial Tower',
        'Lease Term: 999 years from 1865'
      ],
      ownerZh: [
        '登記業主：Apex Profits Limited',
        '代價：$38,000,000 (摘要編號 UB88102)'
      ],
      ownerEn: [
        'Registered Owner: Apex Profits Limited',
        'Consideration: $38,000,000 (Memorial No. UB88102)'
      ],
      incumbrancesZh: [
        '【土地註冊處無登記浮動押記】(無紀錄)'
      ],
      incumbrancesEn: [
        '[No Floating Charge registered at Land Registry]'
      ]
    }
  }
};

const MOCK_QUESTIONS: MockQuestion[] = [
  // Part I Questions
  {
    id: 1,
    part: 'I',
    questionZh: '根據《地產代理條例》(Cap. 511)，地產代理牌照 (個人) 持有人在變更營業地點後，必須於多少天內以書面通知地產代理監管局 (EAA)？',
    questionEn: 'Under Cap. 511, within how many days must an individual estate agent license holder notify EAA in writing after changing their business address?',
    optionsZh: ['A. 7 天', 'B. 14 天', 'C. 31 天', 'D. 60 天'],
    optionsEn: ['A. 7 Days', 'B. 14 Days', 'C. 31 Days', 'D. 60 Days'],
    answerIndex: 2,
    explanationZh: '✓ Cap. 511 s.40 規定，營業地點或註冊地址變更必須於 31 天內以書面通知 EAA。',
    explanationEn: '✓ Cap. 511 s.40 mandates that any address change must be reported in writing to EAA within 31 days.',
    statuteRefZh: '《地產代理條例》Cap. 511 s.40',
    statuteRefEn: 'Estate Agents Ordinance Cap. 511 s.40'
  },
  {
    id: 2,
    part: 'I',
    questionZh: '無明確條款下，住宅租客欠租達多少天時，業主即可行使法定沒收租賃權 (Forfeiture for Non-payment)？',
    questionEn: 'Absent an express clause, after how many days of unpaid rent can a landlord forfeit a domestic lease?',
    optionsZh: ['A. 7 天', 'B. 14 天', 'C. 15 天', 'D. 30 天'],
    optionsEn: ['A. 7 Days', 'B. 14 Days', 'C. 15 Days', 'D. 30 Days'],
    answerIndex: 2,
    explanationZh: '✓ 根據《業主與租客 (綜合) 條例》(Cap. 7)，欠租法定沒收門檻為 15 天。',
    explanationEn: '✓ Under Cap. 7, the statutory forfeiture threshold for unpaid rent is 15 days.',
    statuteRefZh: '《業主與租客 (綜合) 條例》Cap. 7 Part IV',
    statuteRefEn: 'Landlord & Tenant Ordinance Cap. 7 Part IV'
  },

  // Part II Case Study Questions (Linked to POIM Engine)
  {
    id: 3,
    part: 'II',
    caseScenarioId: 'case-1',
    questionZh: '【Part II 個案題 - Case 1】根據土地查冊 (Annex)，本物業現時之法定登記業主為何人？',
    questionEn: '[Part II Case Study - Case 1] According to the Land Search (Annex), who is the current registered owner of the property?',
    optionsZh: [
      'A. Smart Agency Limited',
      'B. Mr. Wan (溫先生) 與已故胞弟以聯名均等持有 (Joint Tenants)',
      'C. Mr. Wan (溫先生) 作為遺囑執行人 (Sole Executor)',
      'D. Sunshine Development Ltd'
    ],
    optionsEn: [
      'A. Smart Agency Limited',
      'B. Mr. Wan as Joint Tenant with his deceased brother',
      'C. Mr. Wan as Sole Executor under Letters of Probate',
      'D. Sunshine Development Ltd'
    ],
    answerIndex: 2,
    explanationZh: '✓ 根據查冊 Owner Particulars 欄位，原業主去世後已辦理遺囑認證，現由 Mr. Wan 以遺囑執行人身分登記。',
    explanationEn: '✓ Under Owner Particulars, probate has been registered following the co-owner’s death, making Mr. Wan the sole executor.',
    statuteRefZh: '土地查冊附件 - 業主紀錄欄',
    statuteRefEn: 'Land Search Annex - Owner Section'
  },
  {
    id: 4,
    part: 'II',
    caseScenarioId: 'case-2',
    questionZh: '【Part II 個案題 - Case 2】當賣方為有限公司時，地產代理除了進行土地查冊外，法定金科玉律還必須進行甚麼查冊？',
    questionEn: '[Part II Case Study - Case 2] When the vendor is a limited company, what second search MUST the agent conduct in addition to a Land Search?',
    optionsZh: [
      'A. 商業登記處 (BR) 查冊',
      'B. 公司註冊處 (Companies Registry) 公司押記查冊',
      'C. 破產管理署查冊',
      'D. 破產及高等法院查冊'
    ],
    optionsEn: [
      'A. Business Registration (BR) Search',
      'B. Companies Registry Search for Corporate Charges/Debentures',
      'C. Official Receiver Bankruptcy Search',
      'D. High Court Writ Search'
    ],
    answerIndex: 1,
    explanationZh: '✓ 根據《公司條例》(Cap. 622)，公司浮動押記或公司押記可能僅登記於公司註冊處，土地查冊無法顯示，因此必須進行「雙重查冊」(Two Searches)。',
    explanationEn: '✓ Under Cap. 622, corporate floating charges may only be registered at Companies Registry and omitted from Land Registry. Two Searches are mandatory.',
    statuteRefZh: '《公司條例》Cap. 622 與 EAA 操守指引',
    statuteRefEn: 'Companies Ordinance Cap. 622 & EAA Guidelines'
  }
];

export default function MockExamPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [activePart, setActivePart] = useState<'I' | 'II'>('I');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(180 * 60); // 3-Hour Exam Timer
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'facts'>('search');

  const filteredQuestions = MOCK_QUESTIONS.filter((q) => q.part === activePart);
  const currentQ = filteredQuestions[currentQIndex] || filteredQuestions[0];
  const activeScenario = currentQ.caseScenarioId ? CASE_SCENARIOS[currentQ.caseScenarioId] : null;

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    MOCK_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.answerIndex) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Exam Header Banner */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          className="p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
              <Award className="h-3.5 w-3.5" />
              <span>{isZh ? '官方全真模擬考場 (EAA Timed Simulation)' : 'Official EAA Timed Exam Suite'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isZh ? '全真模擬考試 (包含 Part II 土地查冊個案題)' : 'Full Mock Exam (Part I Objective & Part II Case Study)'}
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{isZh ? `剩餘時間: ${formatTime(timeLeftSeconds)}` : `Time Left: ${formatTime(timeLeftSeconds)}`}</span>
            </div>

            <Link
              href="/course"
              className="px-4 py-2.5 rounded-2xl border border-slate-700 hover:border-indigo-500 font-bold text-xs transition flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-indigo-400" />
              <span>{isZh ? '離開考場' : 'Exit Exam'}</span>
            </Link>
          </div>
        </div>

        {/* Part Selection Control Bar */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          className="p-4 rounded-3xl border shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => { setActivePart('I'); setCurrentQIndex(0); }}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activePart === 'I' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isZh ? 'Part I 客觀選擇題 (80 題)' : 'Part I Objective Questions (80 Qs)'}</span>
            </button>

            <button
              onClick={() => { setActivePart('II'); setCurrentQIndex(0); }}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activePart === 'II' 
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md' 
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>{isZh ? 'Part II 個案實務 & POIM (20 題)' : 'Part II POIM Case Studies (20 Qs)'}</span>
            </button>
          </div>

          <div className="text-xs font-mono opacity-70">
            {isZh ? `已完成: ${Object.keys(userAnswers).length} / ${MOCK_QUESTIONS.length} 題` : `Completed: ${Object.keys(userAnswers).length} / ${MOCK_QUESTIONS.length} Qs`}
          </div>
        </div>

        {/* Exam Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Panel: Renders POIM Annex PDF in Part II, or Progress Stats in Part I */}
          {activePart === 'II' && activeScenario ? (
            <div 
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              className="lg:col-span-5 p-6 rounded-3xl border shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('search')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        activeTab === 'search' ? 'bg-amber-500 text-slate-950' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {isZh ? '土地查冊 (Annex PDF)' : 'Land Search Annex'}
                    </button>
                    <button
                      onClick={() => setActiveTab('facts')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        activeTab === 'facts' ? 'bg-amber-500 text-slate-950' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {isZh ? '個案背景故事' : 'Case Story'}
                    </button>
                  </div>

                  <span className="text-[10px] font-mono font-bold opacity-60">
                    {isZh ? 'IRIS 官方查冊' : 'IRIS Official Template'}
                  </span>
                </div>

                {activeTab === 'search' ? (
                  <div className="space-y-4 text-xs font-mono">
                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold block">(P) PROPERTY PARTICULARS</span>
                      {(isZh ? activeScenario.landSearch.propertyZh : activeScenario.landSearch.propertyEn).map((line, i) => (
                        <p key={i} className="opacity-80">{line}</p>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold block">(O) OWNER PARTICULARS</span>
                      {(isZh ? activeScenario.landSearch.ownerZh : activeScenario.landSearch.ownerEn).map((line, i) => (
                        <p key={i} className="opacity-80">{line}</p>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold block">(I) INCUMBRANCES</span>
                      {(isZh ? activeScenario.landSearch.incumbrancesZh : activeScenario.landSearch.incumbrancesEn).map((line, i) => (
                        <p key={i} className="text-rose-400 font-bold">{line}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs leading-relaxed opacity-85">
                    <p className="font-bold text-amber-400">{isZh ? activeScenario.titleZh : activeScenario.titleEn}</p>
                    <p>{isZh ? activeScenario.narrativeZh : activeScenario.narrativeEn}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t text-[10px] font-mono opacity-50 flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
                <span>{isZh ? `個案編號: CS-${activeScenario.id.toUpperCase()}` : `Case Ref: CS-${activeScenario.id.toUpperCase()}`}</span>
                <span>{isZh ? 'Part II 查冊附件' : 'Part II Annex'}</span>
              </div>
            </div>
          ) : (
            <div 
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              className="lg:col-span-4 p-6 rounded-3xl border shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <h3 className="text-sm font-extrabold flex items-center gap-2 text-indigo-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{isZh ? 'Part I 考核主題總覽' : 'Part I Domain Coverage'}</span>
                </h3>
                <p className="text-xs opacity-75 leading-relaxed">
                  {isZh ? 'Part I 涵蓋地產代理條例 Cap. 511、發牌條件、客戶信託帳戶、代理協議 Form 3-6 及住宅租務條例 Cap. 7。' : 'Part I covers Cap. 511, licensing rules, client trust accounts, Forms 3-6, and Cap. 7 tenancy provisions.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold opacity-60 block">{isZh ? '及格門檻 (Passing Mark)' : 'Passing Threshold'}</span>
                <span className="text-xl font-black text-indigo-400">60% (60 / 100 Marks)</span>
              </div>
            </div>
          )}

          {/* Right Panel: Question Interactive Engine */}
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className={`${activePart === 'II' ? 'lg:col-span-7' : 'lg:col-span-8'} p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 flex flex-col justify-between`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-color)' }}>
                <span className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-bold text-indigo-400">
                  {isZh ? `Part ${currentQ.part} • 第 ${currentQIndex + 1} 題 (共 ${filteredQuestions.length} 題)` : `Part ${currentQ.part} • Question ${currentQIndex + 1} of ${filteredQuestions.length}`}
                </span>

                <span className="text-xs font-mono opacity-60">
                  {isZh ? currentQ.statuteRefZh : currentQ.statuteRefEn}
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-base sm:text-lg font-bold leading-relaxed">
                  {isZh ? currentQ.questionZh : currentQ.questionEn}
                </h2>

                <div className="space-y-3">
                  {(isZh ? currentQ.optionsZh : currentQ.optionsEn).map((opt, idx) => {
                    const isSelected = userAnswers[currentQ.id] === idx;
                    const isCorrect = idx === currentQ.answerIndex;

                    let btnStyle = 'border-slate-800 bg-slate-900/60 hover:border-indigo-500/60';
                    if (isSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-600/20 border-rose-500 text-rose-300 font-bold';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isSubmitted && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                        {isSubmitted && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {isSubmitted && (
                <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1 animate-in fade-in duration-200">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase block">
                    {isZh ? '【 官方解題分析 】' : '[ Official Statutory Analysis ]'}
                  </span>
                  <p className="text-xs font-semibold text-indigo-200 leading-relaxed">
                    {isZh ? currentQ.explanationZh : currentQ.explanationEn}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="pt-4 border-t flex items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => prev - 1)}
                  className="px-4 py-2 rounded-2xl border border-slate-700 hover:border-indigo-500 font-bold text-xs disabled:opacity-30 transition flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>{isZh ? '上一題' : 'Prev'}</span>
                </button>

                <button
                  disabled={currentQIndex === filteredQuestions.length - 1}
                  onClick={() => setCurrentQIndex((prev) => prev + 1)}
                  className="px-4 py-2 rounded-2xl border border-slate-700 hover:border-indigo-500 font-bold text-xs disabled:opacity-30 transition flex items-center gap-1 cursor-pointer"
                >
                  <span>{isZh ? '下一題' : 'Next'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {!isSubmitted ? (
                <button
                  onClick={() => setIsSubmitted(true)}
                  className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4 text-slate-950" />
                  <span>{isZh ? '提交試卷' : 'Submit Exam'}</span>
                </button>
              ) : (
                <div className="text-right space-y-0.5">
                  <span className="text-[10px] font-mono font-bold opacity-60 block">{isZh ? '最終總得分' : 'Final Exam Score'}</span>
                  <span className="text-lg font-black text-amber-400">
                    {calculateScore()} / {MOCK_QUESTIONS.length}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}