// app/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Sync client-side mount state post-hydration
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Default to 'zh-HK' during SSR pass, update to saved locale on client mount
  const activeLocale = mounted ? locale : 'zh-HK';
  const isZh = activeLocale === 'zh-HK';

  return (
    <header className="bg-slate-900 border-b border-slate-800">
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
                <span suppressHydrationWarning>
                  {item.label[activeLocale]}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLocale(isZh ? 'en' : 'zh-HK')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-indigo-500 hover:text-white transition-all"
          >
            <span suppressHydrationWarning>
              {isZh ? 'English' : '繁體中文'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}