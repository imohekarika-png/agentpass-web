// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
  BookOpen, 
  HelpCircle, 
  Layers, 
  LayoutDashboard, 
  PartyPopper, 
  LogIn, 
  Globe, 
  Menu, 
  X,
  Compass,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    if (setLanguage) {
      setLanguage(isZh ? 'EN' : 'ZH');
    }
  };

  const navLinks = [
    { href: '/', labelZh: '首頁', labelEn: 'Home' },
    { href: '/course', labelZh: '課程大綱', labelEn: 'Syllabus', icon: BookOpen },
    { href: '/quiz', labelZh: '試題庫', labelEn: 'Quiz Bank', icon: HelpCircle },
    { href: '/flashcards', labelZh: '速記卡', labelEn: 'Flashcards', icon: Layers },
    { href: '/dashboard', labelZh: '溫習儀表板', labelEn: 'Dashboard', icon: LayoutDashboard },
    { href: '/welcome', labelZh: '迎新指引', labelEn: 'Welcome', icon: PartyPopper },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-white group-hover:text-indigo-300 transition">
                AgentPass<span className="text-indigo-500">.HK</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-1">
                EAA License Master
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition flex items-center gap-1.5"
                >
                  {Icon && <Icon className="h-3.5 w-3.5 text-indigo-400" />}
                  <span>{isZh ? link.labelZh : link.labelEn}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action Cluster (Language Switcher & Login) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-600 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-indigo-400" />
              <span>{isZh ? 'EN' : '繁體中文'}</span>
            </button>

            {/* Login Button */}
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>{isZh ? '學員登入' : 'Login'}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-indigo-400"
            >
              {isZh ? 'EN' : '中'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 flex items-center gap-2"
              >
                {Icon && <Icon className="h-4 w-4 text-indigo-400" />}
                <span>{isZh ? link.labelZh : link.labelEn}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white"
            >
              <LogIn className="h-4 w-4" />
              <span>{isZh ? '學員登入 / 註冊' : 'Member Login / Register'}</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}