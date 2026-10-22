// components/Footer.tsx & app/components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';
import logoImg from '@/components/logo.png';
import { Mail, Phone, Clock, ShieldCheck, Lock, Scale, BookOpen } from 'lucide-react';

export default function Footer() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-0 group">
              <div className="relative h-10 w-10 group-hover:scale-105 transition flex items-center justify-center -mr-1">
                <Image
                  src={logoImg}
                  alt="AgentPass Logo"
                  fill
                  className="object-contain scale-125"
                  priority
                />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black tracking-tighter text-white group-hover:text-indigo-400 transition leading-none">
                  AgentPass
                </span>
                <span className="text-[10px] font-bold text-amber-500 ml-0.5 leading-none self-start">
                  TM
                </span>
              </div>
            </Link>
            <p className="text-xs opacity-75 leading-relaxed">
              {isZh 
                ? '專為香港地產代理 (EAQE) 及營業員 (SQE) 牌照考生打造之 AI 智能記憶工程備考平台。'
                : 'AI-powered prep platform engineered specifically for HK EAQE & SQE licensing candidates.'}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {isZh ? '導覽選單' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/course" className="hover:text-indigo-400 transition flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                  <span>{isZh ? '20 大主題單元' : 'Course Syllabus'}</span>
                </Link>
              </li>
              <li>
                <Link href="/memory-palace" className="hover:text-indigo-400 transition">
                  {isZh ? '10 站記憶宮殿' : 'Memory Palace Route'}
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-indigo-400 transition">
                  {isZh ? '全真試題庫' : 'Practice Quiz Bank'}
                </Link>
              </li>
              <li>
                <Link href="/mock-exam" className="hover:text-indigo-400 transition">
                  {isZh ? '全真模擬考場' : 'Full Mock Exam Suite'}
                </Link>
              </li>
              <li>
                <Link href="/flashcards" className="hover:text-indigo-400 transition">
                  {isZh ? '高頻法規閃卡' : 'Legal Flashcards'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance (PDPO Cap. 486) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {isZh ? '法律與私隱條款' : 'Legal & Compliance'}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/privacy" className="hover:text-indigo-300 transition flex items-center gap-1.5 text-indigo-400">
                  <Lock className="h-3.5 w-3.5 shrink-0" />
                  <span>{isZh ? '私隱政策聲明 (PDPO)' : 'Privacy Policy (PDPO)'}</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition flex items-center gap-1.5">
                  <Scale className="h-3.5 w-3.5 shrink-0" />
                  <span>{isZh ? '服務條款與免責聲明' : 'Terms of Service'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {isZh ? '學員支援' : 'Customer Care'}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span>support@agentpass.hk</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: +852 5432 7572</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>{isZh ? '服務時間: 週一至週五 09:00 - 18:00' : 'Hours: Mon-Fri 09:00 - 18:00 HKT'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* EAA Official Alignment & Independent Prep Disclaimer */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-1.5 text-[11px] opacity-80">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>{isZh ? 'EAA 官方大綱深度對齊 • 獨立備考平台聲明' : 'EAA Syllabus Aligned • Independent Prep Notice'}</span>
          </div>
          <p className="leading-relaxed">
            {isZh 
              ? 'AgentPass™ 為獨立 AI 學習輔助平台。所有筆記與答案解析均對照地產代理監管局 (EAA) 最新 Cap. 511、Cap. 7 及 Form 1-6 官方指引審核。AgentPass™ 非地產代理監管局 (EAA) 或職業訓練局 (VTC/PEAK) 之附屬機構，亦未獲其授權。'
              : 'AgentPass™ is an independent AI prep product. Study notes and statutory explanations are compiled directly under Cap. 511, Cap. 7, and official EAA syllabi. AgentPass™ is not affiliated with, sponsored by, or endorsed by the HK Estate Agents Authority (EAA) or VTC/PEAK.'}
          </p>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800/60 text-center space-y-2 text-[11px] opacity-60">
          <p>
            © 2026 Vektor Spatial Limited. All rights reserved. Hong Kong SAR.
          </p>
          <p>
            Compliant with HK Personal Data (Privacy) Ordinance (Cap. 486). AgentPass™ is a product of Vektor Spatial Limited.
          </p>
        </div>

      </div>
    </footer>
  );
}