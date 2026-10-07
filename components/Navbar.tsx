// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';
import { Globe, BookOpen, HelpCircle, LayoutDashboard, Mail } from 'lucide-react';

export default function Navbar() {
  const { locale, toggleLocale } = useLanguage();
  const isZh = locale === 'zh-HK';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name - Matching Footer Format */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <Image
            src="/logo.svg"
            alt="AgentPass Logo"
            width={28}
            height={28}
            unoptimized
            className="w-7 h-7 group-hover:scale-105 transition-transform"
          />
          <span className="font-extrabold text-slate-100 text-base tracking-tight">
            AgentPass™
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-300">
          <Link href="/course" className="flex items-center space-x-1.5 hover:text-indigo-400 transition">
            <BookOpen className="h-4 w-4" />
            <span>{isZh ? '課程大綱' : 'Syllabus'}</span>
          </Link>
          <Link href="/quiz" className="flex items-center space-x-1.5 hover:text-indigo-400 transition">
            <HelpCircle className="h-4 w-4" />
            <span>{isZh ? '模擬題庫' : 'Practice Quiz'}</span>
          </Link>
          <Link href="/dashboard" className="flex items-center space-x-1.5 hover:text-indigo-400 transition">
            <LayoutDashboard className="h-4 w-4" />
            <span>{isZh ? '個人分析' : 'Dashboard'}</span>
          </Link>
          <Link href="/contact" className="flex items-center space-x-1.5 hover:text-indigo-400 transition">
            <Mail className="h-4 w-4" />
            <span>{isZh ? '聯絡我們' : 'Contact Us'}</span>
          </Link>
        </nav>

        {/* Global Language Toggle Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleLocale}
            className="flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            title="Switch Language / 切換語言"
          >
            <Globe className="h-4 w-4 text-indigo-400" />
            <span>{isZh ? 'English' : '繁體中文'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}