// components/Navbar.tsx & app/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import logoImg from '@/components/logo.png';
import { 
  BookOpen, 
  HelpCircle, 
  Layers, 
  LayoutDashboard, 
  PartyPopper, 
  LogIn, 
  LogOut,
  Globe, 
  Menu, 
  X,
  Award,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
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

  // Dedicated navigation items with original routes and icons
  const navLinks = [
    { href: '/course', labelZh: '課程大綱', labelEn: 'Syllabus', icon: BookOpen },
    { href: '/memory-palace', labelZh: '記憶宮殿', labelEn: 'Memory Palace', icon: Compass },
    { href: '/quiz', labelZh: '考官陷阱', labelEn: 'Exam Traps', icon: HelpCircle },
    { href: '/flashcards', labelZh: '速記閃卡', labelEn: 'Flashcards', icon: Layers },
    { href: '/mock-exam', labelZh: '模擬考場', labelEn: 'Mock Exam', icon: Award },
    { href: '/dashboard', labelZh: '溫習儀表板', labelEn: 'Dashboard', icon: LayoutDashboard },
    { href: '/welcome', labelZh: '迎新指引', labelEn: 'Welcome', icon: PartyPopper },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Title */}
          <Link href="/" className="flex items-center gap-0 group shrink-0">
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 group-hover:scale-105 transition flex items-center justify-center -mr-1">
              <Image
                src={logoImg}
                alt="AgentPass Logo"
                fill
                className="object-contain scale-125"
                priority
              />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 group-hover:text-blue-600 transition leading-none">
                AgentPass
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-500 ml-0.5 leading-none self-start">
                TM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50 font-extrabold border-b-2 border-blue-600' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{isZh ? link.labelZh : link.labelEn}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Controls (Language & Auth - Dynamic Theme Selector Permanently Removed) */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:border-blue-500 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-blue-600" />
              <span>{isZh ? 'EN' : '繁體中文'}</span>
            </button>

            {/* User Session Handler */}
            {isMounted && user ? (
              <div className="flex items-center gap-2 border-l border-slate-200 pl-2.5">
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-emerald-300 hover:border-emerald-500 transition"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-emerald-800 max-w-[100px] truncate">
                    {user.name || user.email?.split('@')[0] || (isZh ? '已登入' : 'Logged In')}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  title={isZh ? '登出帳號' : 'Sign Out'}
                  className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-300 transition cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : isMounted ? (
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <LogIn className="h-3.5 w-3.5 !text-white" />
                <span>{isZh ? '學員登入' : 'Login'}</span>
              </Link>
            ) : null}
          </div>

          {/* Mobile Drawer Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-blue-600"
            >
              {isZh ? 'EN' : '中'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
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
                    ? 'text-blue-600 font-bold bg-blue-50 border-l-2 border-blue-600 pl-4' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{isZh ? link.labelZh : link.labelEn}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}