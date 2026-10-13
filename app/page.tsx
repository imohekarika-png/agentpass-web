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
    // 1. Student Welcome Guide (First)
    {
      titleZh: '學員迎新指引',
      titleEn: 'Student Welcome Guide',
      descZh: '新手入門指南、合格分數線與備考策略分析。',
      descEn: 'Getting started guide, score thresholds, and pass-rate strategy.',
      href: '/welcome',
      icon: PartyPopper,
      btnZh: '閱讀指引',
      btnEn: 'Read Guide'
    },
    // 2. Account Login (Second)
    {
      titleZh: '學員帳號登入',
      titleEn: 'Account Login',
      descZh: '跨裝置同步溫習進度與全真模擬考成績紀錄。',
      descEn: 'Sync learning progress and saved test results across devices.',
      href: '/login',
      icon: LogIn,
      btnZh: '前往登入',
      btnEn: 'Go to Login'
    },
    // 3. Interactive Flashcards (General Deck)
    {
      titleZh: '高頻法規閃卡',
      titleEn: 'High-Frequency Flashcards',
      descZh: '針對數字記憶點與 EAA 法定表格的快速翻牌訓練。',
      descEn: 'Quick interval drills for numeric anchors and form rules.',
      href: '/flashcards',
      icon: Layers,
      btnZh: '翻單字卡',
      btnEn: 'Flip Cards'
    },
    // 4. Cap. 511 & Form 1-6 Special Flashcard Deck (Added Extra Card)
    {
      titleZh: 'Cap. 511 / 表格特訓閃卡',
      titleEn: 'Cap. 511 & Forms Drill Deck',
      descZh: '專為地產代理條例 Cap. 511 與 Form 1-6 打造的 AI 智能速記特訓。',
      descEn: 'Dedicated AI flashcard drills for Cap. 511 and Forms 1-6 statutory rules.',
      href: '/flashcards',
      icon: Zap,
      btnZh: '開始特訓',
      btnEn: 'Start Drill'
    },
    // 5. 20 Topic Block Lessons
    {
      titleZh: '20 大主題單元',
      titleEn: '20 Topic Block Lessons',
      descZh: '全面涵蓋地產代理條例 Cap. 511、土地查冊 P-O-I-M 及 Cap. 7 租務法例。',
      descEn: 'Deep coverage of Cap. 511, Land Search P-O-I-M, and Cap. 7 Tenancy.',
      href: '/course',
      icon: BookOpen,
      btnZh: '開始閱讀',
      btnEn: 'Start Reading'
    },
    // 6. Quiz & Practice Bank
    {
      titleZh: '試題及模擬考場',
      titleEn: 'Quiz & Practice Bank',
      descZh: '130 題最新大綱驗證真題，附設極詳細法規條文解析。',
      descEn: '130 syllabus-verified mock questions with detailed explanations.',
      href: '/quiz',
      icon: HelpCircle,
      btnZh: '開始練習',
      btnEn: 'Start Practice'
    },
    // 7. 10-Station Memory Palace
    {
      titleZh: '10 站記憶宮殿',
      titleEn: '10-Station Memory Palace',
      descZh: '將監管職責融入住宅交易實景路線，過目不忘。',
      descEn: 'Map regulatory duties onto a residential transaction route.',
      href: '/course',
      icon: Compass,
      btnZh: '探索路線',
      btnEn: 'Explore Route'
    },
    // 8. 38 Master Exam Traps
    {
      titleZh: '38 個主考官陷阱',
      titleEn: '38 Master Exam Traps',
      descZh: '專為破解考官誤導性選項設的「假命題」特訓。',
      descEn: 'Learn FALSE propositions specifically engineered to trick candidates.',
      href: '/quiz',
      icon: ShieldAlert,
      btnZh: '查看陷阱',
      btnEn: 'View Traps'
    },
    // 9. Memory Ladder & Dashboard
    {
      titleZh: '記憶階梯與儀表板',
      titleEn: 'Memory Ladder & Dashboard',
      descZh: '實時追蹤 20 大單元複習進度與熟練度指標。',
      descEn: 'Track review schedules and mastery levels across all 20 blocks.',
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
              href="/course"
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition flex items-center gap-2"
            >
              <span>{isZh ? '探索課程大綱' : 'Explore Syllabus'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/quiz"
              className="px-6 py-3.5 rounded-2xl border border-slate-700 hover:border-indigo-500 font-bold text-sm transition flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>{isZh ? '開始模擬題庫' : 'Practice Question Bank'}</span>
            </Link>

            <Link
              href="/mock-exam"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-amber-500/20 transition flex items-center gap-2"
            >
              <Award className="h-4 w-4 text-amber-200" />
              <span>{isZh ? '進入全真模擬考場' : 'Full Exam Suite'}</span>
            </Link>
          </div>
        </div>

        {/* Feature Grid Header */}
        <div className="text-center space-y-2 pt-6 border-t border-slate-800/40">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-indigo-500">
            Platform Features Overview
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {isZh ? '選擇您的備考工具' : 'Select Your Prep Tool'}
          </h2>
        </div>

        {/* Feature Tool Grid (Balanced 3x3 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 shadow-xl flex flex-col justify-between space-y-6 hover:border-indigo-500/50 transition duration-200"
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Icon className="h-5 w-5" />
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

        {/* Metrics Bar */}
        <div className="p-8 rounded-3xl border border-slate-800/80 bg-slate-900/40 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-indigo-400">20</div>
            <div className="text-xs font-bold opacity-70 mt-1">{isZh ? '主題單元' : 'Topic Blocks'}</div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400">89</div>
            <div className="text-xs font-bold opacity-70 mt-1">{isZh ? '法規筆記' : 'Verified Notes'}</div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-400">38</div>
            <div className="text-xs font-bold opacity-70 mt-1">{isZh ? '考試陷阱' : 'Exam Traps'}</div>
          </div>
          <div>
            <div className="text-3xl font-black text-indigo-400">130</div>
            <div className="text-xs font-bold opacity-70 mt-1">{isZh ? '全真試題' : 'Mock Questions'}</div>
          </div>
        </div>

      </div>
    </div>
  );
}