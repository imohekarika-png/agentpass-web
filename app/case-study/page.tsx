// app/case-study/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  Building, 
  ShieldAlert, 
  Search,
  Eye,
  Award
} from 'lucide-react';

interface CaseStudyQuestion {
  id: number;
  questionZh: string;
  questionEn: string;
  optionsZh: string[];
  optionsEn: string[];
  answerIndex: number;
  explanationZh: string;
  explanationEn: string;
  statuteRef: string;
}

const CASE_STUDY_QUESTIONS: CaseStudyQuestion[] = [
  {
    id: 1,
    questionZh: '根據土地查冊 (Annex)，本物業現時之登記業主為何人？',
    questionEn: 'According to the Land Search (Annex), who is the current registered owner of the property?',
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
    statuteRef: 'Land Search Annex - Owner Section'
  },
  {
    id: 2,
    questionZh: '查冊 Incumbrances 欄顯示一項屋宇署 Cap. 123 s.24 清拆令，代理應如何向買方 (Polly) 履行披露責任？',
    questionEn: 'The Incumbrances section shows a Buildings Dept Cap. 123 s.24 removal order. How must the agent disclose this to buyer Polly?',
    optionsZh: [
      'A. 無需披露，因清拆違建屬業主與屋宇署之間的事宜',
      'B. 必須在 Form 1 清楚註明，並警告買方該清拆令可能影響銀行按揭批核',
      'C. 只要買方簽署「按現狀 (As-is)」條款即免除代理責任',
      'D. 口頭通知買方即可，無需提供土地查冊副本'
    ],
    optionsEn: [
      'A. No disclosure required as UBW is between landlord and Buildings Dept',
      'B. Must state clearly in Form 1 and warn buyer that it may jeopardize mortgage approval',
      'C. Signing an "As-is" clause automatically absolves agent liability',
      'D. Verbal notice is sufficient without delivering land search copy'
    ],
    answerIndex: 1,
    explanationZh: '✓ 代理必須進行盡職審查 (Due Diligence)，於 Form 1 披露 subsisting orders 並警示買方銀行按揭風險。',
    explanationEn: '✓ Agents must exercise due diligence, record subsisting orders on Form 1, and advise buyers on mortgage risks.',
    statuteRef: 'Cap. 123 s.24 & Practice Regulation s.3'
  }
];

export default function CaseStudyPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [activeTab, setActiveTab] = useState<'search' | 'facts'>('search');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = CASE_STUDY_QUESTIONS[currentQIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentQIndex((prev) => (prev + 1) % CASE_STUDY_QUESTIONS.length);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Navigation Bar */}
        <div 
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          className="p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500">
              <Award className="h-3.5 w-3.5" />
              <span>EAQE Part II (20 Questions) / SQE Part II (10 Questions)</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isZh ? 'Part II 個案實務與土地查冊 (Land Search P-O-I-M)' : 'Part II Case Study & Land Search POIM Engine'}
            </h1>
          </div>

          <Link
            href="/course"
            className="px-4 py-2.5 rounded-2xl border border-slate-700 hover:border-indigo-500 font-bold text-xs transition flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span>{isZh ? '返回課程大綱' : 'Back to Syllabus'}</span>
          </Link>
        </div>

        {/* Split Screen Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Panel: Land Search POIM Document Viewer (5 Columns) */}
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="lg:col-span-5 p-6 rounded-3xl border shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('search')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      activeTab === 'search' ? 'bg-amber-500 text-slate-950' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {isZh ? '土地查冊 (Annex PDF)' : 'Land Search Annex'}
                  </button>
                  <button
                    onClick={() => setActiveTab('facts')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      activeTab === 'facts' ? 'bg-amber-500 text-slate-950' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {isZh ? '個案背景故事' : 'Case Study Narrative'}
                  </button>
                </div>

                <span className="text-[10px] font-mono font-bold opacity-60">IRIS Official Template</span>
              </div>

              {activeTab === 'search' ? (
                <div className="space-y-4 text-xs font-mono">
                  {/* P Section */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold block">(P) PROPERTY PARTICULARS</span>
                    <p className="opacity-80">Lot No.: Kowloon Inland Lot No. 8842</p>
                    <p className="opacity-80">Address: Flat B, 12/F, Smart Mansion, Mong Kok</p>
                    <p className="opacity-80">Lease Term: 75 years renewable from 1978</p>
                  </div>

                  {/* O Section */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold block">(O) OWNER PARTICULARS</span>
                    <p className="opacity-80">Registered Owner: Wan Kwok Keung (Sole Executor)</p>
                    <p className="opacity-80">Consideration: Probate Registration (Memorial No. UB99201)</p>
                  </div>

                  {/* I Section */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-amber-400 font-bold block">(I) INCUMBRANCES</span>
                    <p className="text-rose-400 font-bold">1. Legal Charge: HSBC Bank Ltd (Memorial No. UB44012)</p>
                    <p className="text-rose-400 font-bold">2. Building Order: Buildings Dept s.24 Removal Order (UBW on Balcony)</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs leading-relaxed opacity-85">
                  <p className="font-bold text-amber-400">【個案事實背景】</p>
                  <p>Mr. Wan 為 Smart Mansion 單位之遺囑執行人。業主委託 Smart Agency 之地產代理 Sunny 以 $8,000,000 出售該單位。</p>
                  <p>買家 Polly 經 Sunny 視察物業， Sunny 知悉陽台設有未經批准之違建工程 (UBW) 及屋宇署清拆令，但未向 Polly 警示按揭風險。</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t text-[10px] font-mono opacity-50 flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
              <span>Case Study Reference: CS-2026-EAQE</span>
              <span>Page 1 of 1</span>
            </div>
          </div>

          {/* Right Panel: Interactive Question Engine (7 Columns) */}
          <div 
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-color)' }}>
                <span className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-bold text-indigo-400">
                  Question {currentQIndex + 1} of {CASE_STUDY_QUESTIONS.length}
                </span>

                <span className="text-xs font-mono opacity-60">{currentQ.statuteRef}</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-base sm:text-lg font-bold leading-relaxed">
                  {isZh ? currentQ.questionZh : currentQ.questionEn}
                </h2>

                <div className="space-y-3">
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
                        className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {isAnswered && (
                <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1 animate-in fade-in duration-200">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase block">【 官方解題分析 】</span>
                  <p className="text-xs font-semibold text-indigo-200 leading-relaxed">
                    {isZh ? currentQ.explanationZh : currentQ.explanationEn}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-xs font-mono font-bold opacity-60">Score: {score} / {CASE_STUDY_QUESTIONS.length}</span>

              {isAnswered && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <span>{isZh ? '下一題' : 'Next Question'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}