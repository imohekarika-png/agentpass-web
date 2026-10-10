// app/page.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  BookOpen, 
  BrainCircuit, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  AlertTriangle,
  Layers,
  Award,
  LogIn,
  PartyPopper,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function HomePage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* TOP QUICK ACCESS BAR (WELCOME & LOGIN) */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isZh ? '2026 年最新香港 EAA 考試大綱與真題答案庫已修訂' : '2026 Latest HK EAA Syllabus & Verified Answer Keys Ready'}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/welcome"
              className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              <PartyPopper className="h-3.5 w-3.5" />
              <span>{isZh ? '新學員指引 (Welcome Guide)' : 'Welcome Guide'}</span>
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>{isZh ? '學員登入 / 註冊 (Login)' : 'Member Login'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>
              {isZh ? '香港 EAA EAQE / SQE 記憶工程學備考平台' : 'HK EAA EAQE / SQE Memory Engineering Platform'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            {isZh ? (
              <>
                掌握 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-300">20 大核心單元</span><br />
                打破 EAA 考官低合格率魔咒
              </>
            ) : (
              <>
                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-300">20 Topic Blocks</span><br />
                Pass Your HK EAA Licensing Exam
              </>
            )}
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isZh
              ? '結合 1-3-7-16-35 間隔重複記憶法、38 個考官陷阱拆解 (Trap Register) 與 130 題全真真題解構，助你高效一次通關。'
              : 'Built on official EAA syllabi, featuring 1-3-7-16-35 Spaced Repetition, 38 Master Exam Traps, and 130 Verified Sample Questions.'}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/course"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
            >
              <BookOpen className="h-4 w-4" />
              <span>{isZh ? '進入課程大綱 (Syllabus)' : 'Explore Syllabus'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              <HelpCircle className="h-4 w-4 text-emerald-400" />
              <span>{isZh ? '全真模擬試題庫 (Quiz Bank)' : 'Practice Question Bank'}</span>
            </Link>
          </div>

        </div>
      </section>

      {/* FULL PLATFORM NAVIGATION GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            {isZh ? '全平台功能快速導航' : 'Platform Features Overview'}
          </h2>
          <p className="text-xl sm:text-2xl font-extrabold text-white">
            {isZh ? '按學習目標選擇備考工具' : 'Select Your Prep Tool'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Link 1: Interactive Course */}
          <Link
            href="/course"
            className="group rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-indigo-500 transition space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                {isZh ? '20 大主題講義 (/course)' : '20 Topic Block Lessons (/course)'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isZh ? 'Cap. 511、土地查冊 P-O-I-M、Cap. 7 租務 2-2-2 鏡像完整剖析。' : 'Deep coverage of Cap. 511, Land Search P-O-I-M, and Cap. 7 Tenancy.'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400 pt-2">
              <span>{isZh ? '研讀講義' : 'Start Reading'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Link 2: Question Bank */}
          <Link
            href="/quiz"
            className="group rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-emerald-500 transition space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                {isZh ? '全真模擬試題庫 (/quiz)' : 'Quiz & Practice Bank (/quiz)'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isZh ? '130 題 EAA 官方核實真題，精準解析答案邏輯與法規出處。' : '130 syllabus-verified mock questions with detailed explanations.'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 pt-2">
              <span>{isZh ? '進入測驗' : 'Start Practice'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Link 3: Memory Palace */}
          <Link
            href="/course/m4-l3"
            className="group rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-indigo-400 transition space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                {isZh ? '十站交易記憶宮殿 (/course/m4-l3)' : '10-Station Memory Palace'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isZh ? '從大門放盤到後花園售後，貫串整套地產買賣合規程序。' : 'Map regulatory duties onto a residential transaction route.'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400 pt-2">
              <span>{isZh ? '開啟宮殿' : 'Explore Route'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Link 4: Master Trap Register */}
          <Link
            href="/course/m4-l5"
            className="group rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-amber-500 transition space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                {isZh ? '38 大考官陷阱冊 (/course/m4-l5)' : '38 Master Exam Traps'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isZh ? '拆解 EAA 常見的誤導干擾項，避免盲點失分 (Trap Register)。' : 'Learn FALSE propositions specifically engineered to trick candidates.'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 pt-2">
              <span>{isZh ? '查看陷阱冊' : 'View Traps'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Link 5: Flashcards */}
          <Link
            href="/flashcards"
            className="group rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-purple-500 transition space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                {isZh ? '速記卡片 (/flashcards)' : 'Interactive Flashcards (/flashcards)'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isZh ? '利用零碎時間進行快速對比訓練：15年業權、3到1續期等。' : 'Quick interval drills for numeric anchors and form rules.'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 pt-2">
              <span>{isZh ? '刷卡溫習' : 'Flip Cards'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Link 6: User Dashboard / Memory Ladder */}
          <Link
            href="/dashboard"
            className="group rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-cyan-500 transition space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                {isZh ? '個人溫習階梯 (/dashboard)' : 'Memory Ladder & Dashboard (/dashboard)'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isZh ? '追蹤 1-3-7-16-35 間隔重複排程，掌控各單元精通度。' : 'Track review schedules and mastery levels across all 20 blocks.'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 pt-2">
              <span>{isZh ? '查看進度' : 'View Progress'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Link 7: Welcome Page */}
          <Link
            href="/welcome"
            className="group rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-indigo-400 transition space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition">
              <PartyPopper className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                {isZh ? '新學員迎新頁 (/welcome)' : 'Student Welcome Page (/welcome)'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isZh ? '新手備考指南、EAA 兩大部分合格標準與通過率分析。' : 'Getting started guide, score thresholds, and pass-rate strategy.'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400 pt-2">
              <span>{isZh ? '閱讀指南' : 'Read Guide'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Link 8: Login Page */}
          <Link
            href="/login"
            className="group rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-emerald-400 transition space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
              <LogIn className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                {isZh ? '學員帳號登入 (/login)' : 'Account Login (/login)'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isZh ? '同步您的溫習進度與雲端測驗紀錄，隨時隨地備考。' : 'Sync learning progress and saved test results across devices.'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 pt-2">
              <span>{isZh ? '前往登入' : 'Go to Login'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </Link>

        </div>
      </section>

      {/* STATS OVERVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">20</div>
            <div className="text-xs text-slate-400 mt-1">{isZh ? '核心主題單元' : 'Topic Blocks'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">89</div>
            <div className="text-xs text-slate-400 mt-1">{isZh ? '核實講義考點' : 'Verified Notes'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">38</div>
            <div className="text-xs text-slate-400 mt-1">{isZh ? '考官陷阱拆解' : 'Exam Traps'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">130</div>
            <div className="text-xs text-slate-400 mt-1">{isZh ? '全真答案庫題目' : 'Mock Questions'}</div>
          </div>
        </div>
      </section>

    </div>
  );
}