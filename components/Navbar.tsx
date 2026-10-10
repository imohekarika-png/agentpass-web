// Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import logoImg from '@/components/logo.png';
import { 
  Home,
  BookOpen, 
  HelpCircle, 
  Layers, 
  LayoutDashboard, 
  PartyPopper, 
  LogIn, 
  LogOut,
  Globe, 
  Menu, 
  X
} from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Session state
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

  const syncUser = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('agentpass_user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
    syncUser();

    const handleStorage = () => syncUser();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('agentpass_auth_change', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('agentpass_auth_change', handleStorage);
    };
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agentpass_user');
      window.dispatchEvent(new Event('agentpass_auth_change'));
    }
    setUser(null);
    router.push('/login');
  };

  const toggleLanguage = () => {
    if (setLanguage) {
      setLanguage(isZh ? 'EN' : 'ZH');
    }
  };

  const navLinks = [
    { href: '/', labelZh: '首頁', labelEn: 'Home', icon: Home },
    { href: '/course', labelZh: '課程大綱', labelEn: 'Syllabus', icon: BookOpen },
    { href: '/quiz', labelZh: '試題庫', labelEn: 'Quiz Bank', icon: HelpCircle },
    { href: '/flashcards', labelZh: '速記卡', labelEn: 'Flashcards', icon: Layers },
    { href: '/dashboard', labelZh: '溫習儀表板', labelEn: 'Dashboard', icon: LayoutDashboard },
    { href: '/welcome', labelZh: '迎新指引', labelEn: 'Welcome', icon: PartyPopper },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Prominent Dimensions */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 group-hover:scale-105 transition">
              <Image
                src={logoImg}
                alt="AgentPass Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-indigo-300 transition">
              AgentPass<span className="text-xs align-top font-normal text-slate-300">™</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-indigo-950/80 text-white border border-indigo-500/40' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{isZh ? link.labelZh : link.labelEn}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-600 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-indigo-400" />
              <span>{isZh ? 'EN' : '繁體中文'}</span>
            </button>

            {isMounted && user ? (
              <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-500 transition"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-emerald-300 max-w-[110px] truncate">
                    {user.name || user.email?.split('@')[0] || (isZh ? '已登入' : 'Logged In')}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  title={isZh ? '登出帳號' : 'Sign Out'}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : isMounted ? (
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>{isZh ? '學員登入' : 'Login'}</span>
              </Link>
            ) : null}
          </div>

          {/* Mobile Menu Toggle Button */}
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                  isActive 
                    ? 'bg-indigo-950 text-white border border-indigo-500/40' 
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{isZh ? link.labelZh : link.labelEn}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-800 space-y-2">
            {isMounted && user ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-200">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold text-rose-400 flex items-center gap-1"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>{isZh ? '登出' : 'Logout'}</span>
                </button>
              </div>
            ) : isMounted ? (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white"
              >
                <LogIn className="h-4 w-4" />
                <span>{isZh ? '學員登入 / 註冊' : 'Member Login / Register'}</span>
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}