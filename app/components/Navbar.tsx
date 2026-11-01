'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { 
  LogOut, 
  LogIn, 
  User, 
  Globe, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight 
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [studyMenuOpen, setStudyMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Global Language Context Integration
  const langContext = useLanguage() as any;
  const currentLang = (langContext?.language || langContext?.locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const toggleLanguage = () => {
    if (typeof langContext?.setLanguage === 'function') {
      langContext.setLanguage(isZh ? 'EN' : 'ZH');
    } else if (typeof langContext?.toggleLanguage === 'function') {
      langContext.toggleLanguage();
    }
  };

  // 2. Global Auth Context Integration
  const authContext = useAuth() as any;
  const userEmail = authContext?.userEmail || '';
  const isLoggedIn = Boolean(userEmail && userEmail !== 'guest@agentpass.hk');
  const logout = authContext?.logout || authContext?.signOut;

  // Active route indicators
  const isStudyActive = ['/course', '/flashcards', '/case-study', '/traps', '/memory-palace'].includes(pathname);
  const isMockActive = pathname === '/mock-exam';
  const isPricingActive = pathname === '/pricing';
  const isDashboardActive = pathname === '/dashboard';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md text-white transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        
        {/* Brand Logo: Clean Vector SVG + Proportional Typography */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group select-none transition-transform"
          aria-label="AgentPass Home"
        >
          <div className="flex items-center justify-center transition-transform group-hover:scale-105">
            <svg 
              viewBox="0 0 801 848" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-auto sm:h-8"
              aria-hidden="true"
            >
              {/* Red A - Left Stem & Apex */}
              <polygon 
                points="365,5 5,843 197,842 262,684 149,553 221,459 309,569 363,437 387,489 507,337" 
                fill="#E11D48" 
              />
              {/* Red A - Right Lower Leg */}
              <polygon 
                points="573,491 449,641 531,840 724,843" 
                fill="#E11D48" 
              />
              {/* Gold Checkmark */}
              <polygon 
                points="677,124 317,579 221,461 150,554 340,771 796,220" 
                fill="#EAB308" 
              />
            </svg>
          </div>

          <span className="text-white font-black tracking-tight text-xl sm:text-2xl flex items-center leading-none">
            AgentPass<span className="text-amber-400 text-xs font-bold align-top ml-0.5">™</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
          
          {/* Study Hub Dropdown (All 5 Core Tools Preserved) */}
          <div 
            className="relative"
            onMouseEnter={() => setStudyMenuOpen(true)}
            onMouseLeave={() => setStudyMenuOpen(false)}
          >
            <button 
              type="button"
              className={`flex items-center gap-1.5 py-2 hover:text-white transition cursor-pointer ${
                isStudyActive ? 'text-amber-400 font-bold' : ''
              }`}
              onClick={() => setStudyMenuOpen((prev) => !prev)}
              aria-expanded={studyMenuOpen}
            >
              <span>{isZh ? '備考專區' : 'Study Hub'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${studyMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {studyMenuOpen && (
              <div className="absolute top-full left-0 w-72 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* 1. Course Syllabus */}
                <Link 
                  href="/course" 
                  onClick={() => setStudyMenuOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  <span className="text-base">📖</span>
                  <div>
                    <p className="text-xs font-bold text-white">{isZh ? '20 大考綱精讀' : '20 Study Blocks'}</p>
                    <p className="text-[10px] text-slate-400">{isZh ? '官方考綱模組與深度課文' : 'Statutory course lessons'}</p>
                  </div>
                </Link>

                {/* 2. Flashcards */}
                <Link 
                  href="/flashcards" 
                  onClick={() => setStudyMenuOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  <span className="text-base">⚡</span>
                  <div>
                    <p className="text-xs font-bold text-white">{isZh ? '法規速記閃卡' : 'Active Recall Cards'}</p>
                    <p className="text-[10px] text-slate-400">{isZh ? '關鍵數字與法例罰則' : 'SRS flashcard deck'}</p>
                  </div>
                </Link>

                {/* 3. Case Studies */}
                <Link 
                  href="/case-study" 
                  onClick={() => setStudyMenuOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  <span className="text-base">📑</span>
                  <div>
                    <p className="text-xs font-bold text-white">{isZh ? 'Part II 查冊個案' : 'Part II Case Studies'}</p>
                    <p className="text-[10px] text-slate-400">{isZh ? 'IRIS 土地查冊與負擔剖析' : 'Land search dossiers'}</p>
                  </div>
                </Link>

                {/* 4. Exam Traps */}
                <Link 
                  href="/traps" 
                  onClick={() => setStudyMenuOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  <span className="text-base">⚠️</span>
                  <div>
                    <p className="text-xs font-bold text-white">{isZh ? '常規陷阱題庫' : 'Exam Trap Radar'}</p>
                    <p className="text-[10px] text-slate-400">{isZh ? '查冊釘契與易錯盲點剖析' : 'Common trap scenarios'}</p>
                  </div>
                </Link>

                {/* 5. Memory Palace */}
                <Link 
                  href="/memory-palace" 
                  onClick={() => setStudyMenuOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  <span className="text-base">🏛️</span>
                  <div>
                    <p className="text-xs font-bold text-white">{isZh ? '記憶宮殿' : 'Memory Palace'}</p>
                    <p className="text-[10px] text-slate-400">{isZh ? '圖像化記憶與雙重編碼' : 'Visual mnemonics'}</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Standalone Mock Exam */}
          <Link 
            href="/mock-exam" 
            className={`flex items-center gap-1.5 hover:text-white transition ${
              isMockActive ? 'text-amber-400 font-bold' : ''
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>{isZh ? '全真模擬考' : 'Mock Exam'}</span>
          </Link>

          {/* Standalone Pricing */}
          <Link 
            href="/pricing" 
            className={`hover:text-white transition ${
              isPricingActive ? 'text-amber-400 font-bold' : ''
            }`}
          >
            <span>{isZh ? '收費方案' : 'Pricing'}</span>
          </Link>

          {/* Standalone Dashboard */}
          <Link 
            href="/dashboard" 
            className={`hover:text-white transition ${
              isDashboardActive ? 'text-amber-400 font-bold' : ''
            }`}
          >
            <span>{isZh ? '學習進度' : 'Dashboard'}</span>
          </Link>
        </nav>

        {/* Right Action Tools: Language + Auth State */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Global Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition border border-slate-800 cursor-pointer"
            title={isZh ? 'Switch to English' : '切換至繁體中文'}
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>{isZh ? '繁體中文' : 'English'}</span>
          </button>

          {/* Authenticated View: User Pill + Logout Button */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-white transition max-w-[140px] sm:max-w-[180px]"
                title={userEmail}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">{userEmail.split('@')[0]}</span>
              </Link>

              {logout && (
                <button
                  type="button"
                  onClick={() => logout()}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-800/60 text-slate-400 hover:text-rose-300 transition cursor-pointer"
                  title={isZh ? '登出帳號' : 'Log out'}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            /* Unauthenticated View: Free Preview + Login CTA */
            <div className="flex items-center gap-2">
              <Link 
                href="/mock-exam" 
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-sm hover:shadow-amber-500/20"
              >
                <span>{isZh ? '免費體驗 10 題' : 'Free Preview'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link 
                href="/login" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{isZh ? '登入' : 'Login'}</span>
              </Link>
            </div>
          )}

          {/* Mobile Drawer Toggle */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800 text-xs">
            <Link href="/course" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-900 text-slate-200">📖 20 大考綱</Link>
            <Link href="/flashcards" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-900 text-slate-200">⚡ 法規閃卡</Link>
            <Link href="/case-study" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-900 text-slate-200">📑 查冊個案</Link>
            <Link href="/traps" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-900 text-slate-200">⚠️ 常規陷阱</Link>
            <Link href="/memory-palace" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-900 text-slate-200 col-span-2">🏛️ 記憶宮殿</Link>
          </div>

          <Link href="/mock-exam" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-amber-400">
            {isZh ? '全真模擬考 (Mock Exam)' : 'Mock Exam'}
          </Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-200">
            {isZh ? '收費方案 (Pricing)' : 'Pricing'}
          </Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-200">
            {isZh ? '學習進度 (Dashboard)' : 'Dashboard'}
          </Link>

          {/* Mobile Auth Actions */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout?.();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-rose-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-800"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isZh ? `登出 (${userEmail})` : `Log out (${userEmail})`}</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 w-full">
                <Link
                  href="/mock-exam"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs text-center"
                >
                  {isZh ? '免費體驗 10 題' : 'Free Preview'}
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{isZh ? '會員登入' : 'Login'}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}