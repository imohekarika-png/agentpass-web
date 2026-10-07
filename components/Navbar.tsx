// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { locale, toggleLocale } = useLanguage();

  const navItems = [
    {
      href: '/dashboard',
      label: { 'zh-HK': '📊 儀表板', en: '📊 Dashboard' },
    },
    {
      href: '/course',
      label: { 'zh-HK': '📚 課程大綱', en: '📚 Course' },
    },
    {
      href: '/quiz',
      label: { 'zh-HK': '📝 模擬測驗', en: '📝 Practice Quiz' },
    },
  ];

  const isZh = locale === 'zh-HK';

  return (
    <header className="bg-slate-900 border-b border-slate-800 relative z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="font-extrabold text-white text-base tracking-wide flex items-center gap-2">
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            AgentPass™
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{item.label[locale]}</span>
              </Link>
            );
          })}
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-indigo-500 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <Globe className="h-3.5 w-3.5 text-indigo-400" />
            <span>{isZh ? 'English' : '繁體中文'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}