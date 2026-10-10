// app/welcome/page.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  PartyPopper, 
  BookOpen, 
  ShieldCheck, 
  BrainCircuit, 
  AlertTriangle, 
  Compass, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  Award,
  Sparkles,
  FileText
} from 'lucide-react';

export default function WelcomePage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HERO BANNER */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
            <PartyPopper className="h-4 w-4 text-amber-400" />
            <span>
              {isZh ? '新學員通關指引 (New Candidate Welcome Guide)' : 'New Candidate Exam Mastery Guide'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {isZh ? (
              <>歡迎來到 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-300">AgentPass.HK</span> 備考平台</>
            ) : (
              <>Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-300">AgentPass.HK</span></>
            )}
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isZh
              ? '本平台專為香港地產代理資格考試 (EAQE) 及營業員資格考試 (SQE) 考生設計，結合 EAA 官方大綱與大腦記憶工程學。'
              : 'Designed specifically for HK EAQE & SQE licensing candidates, powered by official EAA syllabi and cognitive memory engineering.'}
          </p>
        </div>

        {/* SECTION 1: CRITICAL EXAM REALITIES */}
        <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base border-b border-rose-500/20 pb-3">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <h2>{isZh ? '考前必須了解的考官設定與合格要求' : 'Essential Exam Pass Requirements & Statistics'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Scale className="h-4 w-4 text-indigo-400" />
                <span>{isZh ? '雙部分獨立過線機制 (Pass Requirements)' : 'Dual-Part Pass Thresholds'}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isZh
                  ? '總分須達 60% 以上，且 Part I (單選題) 與 Part II (個案題) 兩部分必須同時及格。EAQE 門檻為 Part I ≥ 36分 / Part II ≥ 24分；SQE 門檻為 Part I ≥ 48分 / Part II ≥ 12分。'
                  : 'Overall score must reach 60%, and BOTH Part I (Multiple Choice) and Part II (Case Study) must pass independently.'}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-400" />
                <span>{isZh ? '真實合格率與常犯錯誤' : 'Historical Pass Rates & Common Pitfalls'}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isZh
                  ? '官方統計 EAQE 及格率僅約 27% – 39%，SQE 約 25% – 46%。絕大多數失敗考生均因過度死記普通法，而忽略了 Module 1 (監管核心, 占40%) 及 Module 4 (租務, 占22%)。'
                  : 'EAQE pass rates range from 27%–39%; SQE ranges from 25%–46%. Most candidates fail by neglecting Module 1 (40%) and Module 4 (22%).'}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: THE 4-STEP MEMORY METHODOLOGY */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-400" />
              <span>{isZh ? 'AgentPass 4 步高效備考流程' : 'The 4-Step AgentPass Mastery Workflow'}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center text-xs">01</div>
              <h3 className="text-xs font-bold text-white">{isZh ? '研讀 20 大主題講義' : '1. Read 20 Topic Blocks'}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isZh ? '依據 Cap. 511、Cap. 7 租務與 P-O-I-M 土地查冊系統化研讀。' : 'Systematic notes covering Cap. 511, Cap. 7 Tenancy, and Land Search.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center text-xs">02</div>
              <h3 className="text-xs font-bold text-white">{isZh ? '走一遍交易記憶宮殿' : '2. Walk Memory Palace'}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isZh ? '利用十站式房屋空間記憶法，將合規職責排入時間軸。' : '10-Station residential route mapping regulatory duties into sequence.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center text-xs">03</div>
              <h3 className="text-xs font-bold text-white">{isZh ? '審視 38 大考官陷阱' : '3. Master Exam Traps'}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isZh ? '熟記 EAA 精心設計的誤導干擾項，避免盲點扣分。' : 'Review 38 FALSE propositions crafted to trick unprepared candidates.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-mono font-bold flex items-center justify-center text-xs">04</div>
              <h3 className="text-xs font-bold text-white">{isZh ? '1-3-7-16-35 間隔重複測驗' : '4. Spaced Practice'}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isZh ? '利用全真試題庫刷題，依照遺忘曲線進行間隔複習。' : 'Practice with 130 mock questions following the Ebbinghaus ladder.'}
              </p>
            </div>

          </div>
        </div>

        {/* SECTION 3: DIRECT ACTION HUB */}
        <div className="text-center space-y-6 pt-4">
          <h2 className="text-lg font-bold text-white">
            {isZh ? '準備好開始您的備考之旅了嗎？' : 'Ready to Start Your Exam Prep?'}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/course"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
            >
              <BookOpen className="h-4 w-4" />
              <span>{isZh ? '進入課程大綱 (/course)' : 'Start Syllabus'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              <HelpCircle className="h-4 w-4 text-emerald-400" />
              <span>{isZh ? '進入全真試題庫 (/quiz)' : 'Practice Questions'}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}