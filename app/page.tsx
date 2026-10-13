// app/page.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  BookOpen, 
  HelpCircle, 
  Layers, 
  LayoutDashboard, 
  PartyPopper, 
  LogIn, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Award,
  Compass,
  CheckCircle2,
  Zap
} from 'lucide-react';

export default function HomePage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const tools = [
    // 1. Welcome Guide
    {
      step: '00',
      titleZh: '學員迎新指引',
      titleEn: 'Student Welcome Guide',
      descZh: '新手入門指南、合格分數線與 4 步精通備考策略。',
      descEn: 'Getting started guide, score thresholds, and 4-step mastery strategy.',
      href: '/welcome',
      icon: PartyPopper,
      btnZh: '閱讀指引',
      btnEn: 'Read Guide'
    },
    // 2. Account Login
    {
      step: '00',
      titleZh: '學員帳號登入',
      titleEn: 'Account Login',
      descZh: '跨裝置同步溫習進度、錯題紀錄與全真模擬考成績。',
      descEn: 'Sync learning progress, error notebooks, and exam scores.',
      href: '/login',
      icon: LogIn,
      btnZh: '前往登入',
      btnEn: 'Go to Login'
    },
    // 3. Step 1: Read 20 Topic Blocks
    {
      step: '01',
      titleZh: '閱讀 20 大主題單元',
      titleEn: 'Read 20 Topic Blocks',
      descZh: '系統化筆記全面涵蓋 Cap. 511 地產代理條例、Cap. 7 租務法例及土地查冊。',
      descEn: 'Systematic notes covering Cap. 511, Cap. 7 Tenancy, and Land Search.',
      href: '/course',
      icon: BookOpen,
      btnZh: '開始閱讀',
      btnEn: 'Start Reading'
    },
    // 4. Step 2: Walk Memory Palace (FIXED: Route points directly to /course#memory-palace)
    {
      step: '02',
      titleZh: '漫步 10 站記憶宮殿',
      titleEn: 'Walk Memory Palace',
      descZh: '將監管法定職責融入住宅交易實景路線，過目不忘。',
      descEn: '10-Station residential route mapping regulatory duties into sequence.',
      href: '/course#memory-palace',
      icon: Compass,
      btnZh: '探索路線',
      btnEn: 'Explore Route'
    },
    // 5. Step 3: Master Exam Traps
    {
      step: '03',
      titleZh: '破解 38 考官陷阱',
      titleEn: 'Master Exam Traps',
      descZh: '專為破解考官誤導性選項設計的 38 個假命題特訓。',
      descEn: 'Review 38 FALSE propositions crafted to trick unprepared candidates.',
      href: '/quiz',
      icon: ShieldAlert,
      btnZh: '查看陷阱',
      btnEn: 'View Traps'
    },
    // 6. Cap. 511 & Form Flashcards
    {
      step: '03+',
      titleZh: 'Cap. 511 / 表格特訓閃卡',
      titleEn: 'Statutory Flashcards Drill',
      descZh: '針對數字記憶錨點與 Form 1-6 法定表格的快速翻牌特訓。',
      descEn: 'Quick interval drills for numeric anchors and Form 1-6 rules.',
      href: '/flashcards',
      icon: Zap,
      btnZh: '翻單字卡',
      btnEn: 'Flip Cards'
    },
    // 7. Step 4: Spaced Practice (Quiz Bank)
    {
      step: '04',
      titleZh: '間隔題庫刷題',
      titleEn: 'Spaced Practice Quiz Bank',
      descZh: '130 題最新大綱驗證真題，結合艾賓浩斯記憶階梯梯隊練題。',
      descEn: 'Practice with 130 mock questions following the Ebbinghaus ladder.',
      href: '/quiz',
      icon: HelpCircle,
      btnZh: '開始練習',
      btnEn: 'Start Practice'
    },
    // 8. Step 4+: Full Mock Exam Suite
    {
      step: '04+',
      titleZh: '全真 50 題模擬考場',
      titleEn: 'Full Mock Exam Suite',
      descZh: '提供 2.5 小時 SQE 及 3 小時 EAQE 全真計時考試模擬體驗。',
      descEn: 'Official timed exam simulation for Salesperson (SQE) & Estate Agent (EAQE).',
      href: '/mock-exam',
      icon: Award,
      btnZh: '進入考場',
      btnEn: 'Enter Exam'
    },
    // 9. Memory Ladder & Dashboard
    {
      step: 'Progress',
      titleZh: '記憶階梯與儀表板',
      titleEn: 'Memory Ladder & Dashboard',
      descZh: '實時追蹤 20 大單元複習進度、弱點警報與熟練度指標。',
      descEn: 'Track review schedules, weakness alerts, and mastery levels.',
      href: '/dashboard',
      icon: LayoutDashboard,
      btnZh: '查看進度',
      btnEn: 'View Progress'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Hero Section */}
        <div className="text-center space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-500 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>HK EAA EAQE / SQE Memory Engineering Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Master <span className="text-indigo-500">20 Topic Blocks</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Pass Your HK EAA Licensing Exam
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base opacity-80 font-medium leading-relaxed">
            {isZh 
              ? '基於地產代理監管局官方大綱研發，融入 1-3-7-16-35 間隔重複算法、38 個主考官陷阱與 130 題全真真題庫。'
              : 'Built on official EAA syllabi, featuring 1-3-7-16-35 Spaced Repetition, 38 Master Exam Traps, and 130 Verified Sample Questions.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/welcome"
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition flex items-center gap-2"
            >
              <span>{isZh ? '閱讀 4 步精通指南' : 'Read 4-Step Mastery Guide'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/course"
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition flex items-center gap-2"
            >
              <span>{isZh ? '探索課程大綱' : 'Explore Syllabus'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/mock-exam"
              className="px-6 py-3.5 rounded-2xl border border-slate-700 hover:border-indigo-500 font-bold text-sm transition flex items-center gap-2"
            >
              <Award className="h-4 w-4 text-amber-400" />
              <span>{isZh ? '進入全真考場' : 'Full Mock Exam'}</span>
            </Link>
          </div>
        </div>

        {/* Feature Grid Header */}
        <div className="text-center space-y-2 pt-6 border-t border-slate-800/40">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-indigo-500">
            The 4-Step AgentPass Mastery Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {isZh ? '順序掌握 4 步備考流程' : 'Step-by-Step Learning Pathway'}
          </h2>
        </div>

        {/* Feature Tool Grid (Aligned with 4-Step Mastery) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 shadow-xl flex flex-col justify-between space-y-6 hover:border-indigo-500/50 transition duration-200 relative group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-slate-800/80 text-[10px] font-mono font-bold text-amber-400 border border-slate-700/60">
                      STEP {tool.step}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">
                      {isZh ? tool.titleZh : tool.titleEn}
                    </h3>
                    <p className="text-xs opacity-70 mt-2 leading-relaxed">
                      {isZh ? tool.descZh : tool.descEn}
                    </p>
                  </div>
                </div>

                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition pt-2"
                >
                  <span>{isZh ? tool.btnZh : tool.btnEn}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}