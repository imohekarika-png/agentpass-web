'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [studyMenuOpen, setStudyMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langZh, setLangZh] = useState(true);

  // Check active routes
  const isStudyActive = ['/syllabus', '/flashcards', '/traps', '/memory-palace'].includes(pathname);
  const isMockActive = pathname === '/mock-exam';
  const isPricingActive = pathname === '/pricing';
  const isDashboardActive = pathname === '/dashboard';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md text-white transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        
        {/* Brand Logo -> Always routes to root '/' */}
        <Link href="/" className="flex items-center gap-2.5 font-black tracking-tight text-lg group">
          <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
            AP
          </span>
          <span className="text-white font-bold tracking-tight">
            AgentPass<span className="text-amber-400 text-xs align-top ml-0.5 font-bold">™</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
          
          {/* Study Hub Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setStudyMenuOpen(true)}
            onMouseLeave={() => setStudyMenuOpen(false)}
          >
            <button 
              className={`flex items-center gap-1.5 py-2 hover:text-white transition cursor-pointer ${
                isStudyActive ? 'text-amber-400 font-bold' : ''
              }`}
              onClick={() => setStudyMenuOpen((prev) => !prev)}
            >
              <span>{langZh ? '備考專區' : 'Study Hub'}</span>
              <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${studyMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {studyMenuOpen && (
              <div className="absolute top-full left-0 w-64 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link 
                  href="/syllabus" 
                  onClick={() => setStudyMenuOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  <span className="text-base">📖</span>
                  <div>
                    <p className="text-xs font-bold text-white">{langZh ? '考試大綱精讀' : 'Syllabus & Cap. Guide'}</p>
                    <p className="text-[10px] text-slate-400">{langZh ? 'Cap. 511 及 20 個核心模組' : 'Statutory framework'}</p>
                  </div>
                </Link>

                <Link 
                  href="/flashcards" 
                  onClick={() => setStudyMenuOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  <span className="text-base">⚡</span>
                  <div>
                    <p className="text-xs font-bold text-white">{langZh ? '法規速記閃卡' : 'Statutory Flashcards'}</p>
                    <p className="text-[10px] text-slate-400">{langZh ? '艾賓浩斯間隔記憶重要數字' : 'Active recall engine'}</p>
                  </div>
                </Link>

                <Link 
                  href="/traps" 
                  onClick={() => setStudyMenuOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  <span className="text-base">⚠️</span>
                  <div>
                    <p className="text-xs font-bold text-white">{langZh ? '常規陷阱題庫' : 'Exam Trap Radar'}</p>
                    <p className="text-[10px] text-slate-400">{langZh ? '查冊釘契與易錯盲點剖析' : 'Common trap scenarios'}</p>
                  </div>
                </Link>

                <Link 
                  href="/memory-palace" 
                  onClick={() => setStudyMenuOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  <span className="text-base">🏛️</span>
                  <div>
                    <p className="text-xs font-bold text-white">{langZh ? '記憶宮殿' : 'Memory Palace'}</p>
                    <p className="text-[10px] text-slate-400">{langZh ? '圖像化記憶重要罰則與期限' : 'Visual mnemonics'}</p>
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
            <span>{langZh ? '全真模擬考' : 'Mock Exam'}</span>
          </Link>

          {/* Pricing Route */}
          <Link 
            href="/pricing" 
            className={`hover:text-white transition ${
              isPricingActive ? 'text-amber-400 font-bold' : ''
            }`}
          >
            <span>{langZh ? '收費方案' : 'Pricing'}</span>
          </Link>

          {/* Dashboard Route */}
          <Link 
            href="/dashboard" 
            className={`hover:text-white transition ${
              isDashboardActive ? 'text-amber-400 font-bold' : ''
            }`}
          >
            <span>{langZh ? '學習進度' : 'Dashboard'}</span>
          </Link>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3">
          
          {/* Language Toggle */}
          <button
            onClick={() => setLangZh(!langZh)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition border border-slate-800"
          >
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>{langZh ? '繁體中文' : 'English'}</span>
          </button>

          {/* Primary CTA */}
          <Link 
            href="/mock-exam" 
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-sm hover:shadow-amber-500/20"
          >
            <span>{langZh ? '免費體驗 10 題' : 'Free Preview'}</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800 text-xs">
            <Link href="/syllabus" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-900 text-slate-200">📖 考試大綱</Link>
            <Link href="/flashcards" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-900 text-slate-200">⚡ 法規閃卡</Link>
            <Link href="/traps" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-900 text-slate-200">⚠️ 常規陷阱</Link>
            <Link href="/memory-palace" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-900 text-slate-200">🏛️ 記憶宮殿</Link>
          </div>
          <Link href="/mock-exam" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-bold text-amber-400">全真模擬考 (Mock Exam)</Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-200">收費方案 (Pricing)</Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-200">學習儀表板 (Dashboard)</Link>
        </div>
      )}
    </header>
  );
}