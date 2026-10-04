// components/Navbar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { language, setLanguage } = useLanguage();
  const isZh = language === 'ZH';

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch initial user session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Subscribe to auth changes (Sign In / Sign Out)
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const navItems = [
    { label: isZh ? '📊 儀表板' : '📊 Dashboard', href: '/dashboard' },
    { label: isZh ? '📚 雙語題庫' : '📚 Practice Quiz', href: '/quiz' },
    { label: isZh ? '⏱️ 模擬考試' : '⏱️ Mock Exam', href: '/mock-exam' },
  ];

  return (
    <header className="bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <Image
  src="/logo.svg"
  alt="AgentPass Logo"
  width={32}
  height={32}
  priority
  unoptimized
  className="w-8 h-8 group-hover:scale-105 transition-transform"
/>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-slate-900 dark:text-slate-100 leading-none">
              AgentPass™
            </span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              HK EAQE / SQE Prep
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-indigo-100/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls: Language Toggle & Auth */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Language Toggle */}
          <div className="inline-flex p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl">
  <button
    type="button"
    onClick={() => setLanguage('ZH')}
    title="繁體中文 (香港)"
    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
      isZh
        ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
    }`}
  >
    繁中 (HK)
  </button>
  <button
    type="button"
    onClick={() => setLanguage('EN')}
    title="English"
    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
      !isZh
        ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
    }`}
  >
    EN
  </button>
</div>

          {/* User Auth State */}
          {user ? (
            <button
              onClick={handleSignOut}
              className="px-3.5 py-1.5 bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition"
            >
              {isZh ? '登出' : 'Sign Out'}
            </button>
          ) : (
            <Link
              href="/login"
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              {isZh ? '登入' : 'Sign In'}
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}