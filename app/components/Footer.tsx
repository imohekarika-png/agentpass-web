// app/components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';
import logoImg from '@/components/logo.png';
import { Mail, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/95 py-12 px-4 sm:px-6 lg:px-8 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-1 group shrink-0">
              <div className="relative h-7 w-7 sm:h-8 sm:w-8 group-hover:scale-105 transition flex items-center">
                <Image
                  src={logoImg}
                  alt="AgentPass Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-black tracking-tight leading-none transition">
                AgentPass<span className="text-[10px] align-top font-bold text-amber-500 ml-0.5">™</span>
              </span>
            </Link>
            <p className="text-xs font-semibold leading-relaxed opacity-90">
              {isZh 
                ? '專為香港地產代理 (EAQE) 及營業員 (SQE) 牌照考生成查研發的 AI 智能備考平台。' 
                : 'AI-powered prep platform engineered specifically for HK EAQE & SQE licensing candidates.'}
            </p>
          </div>

          {/* Navigation Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              {isZh ? '快捷導航' : 'Navigation'}
            </span>
            <ul className="space-y-2 font-bold">
              <li>
                <Link href="/course" className="hover:text-indigo-400 transition">
                  {isZh ? '📚 課程大綱 (Cap. 511 / Cap. 7)' : 'Course Syllabus'}
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-indigo-400 transition">
                  {isZh ? '📝 試題庫與 38 考官陷阱' : 'Practice Quiz Bank'}
                </Link>
              </li>
              <li>
                <Link href="/mock-exam" className="hover:text-indigo-400 transition">
                  {isZh ? '🏆 全真 50 題模擬考場' : 'Full Mock Exam Suite'}
                </Link>
              </li>
              <li>
                <Link href="/flashcards" className="hover:text-indigo-400 transition">
                  {isZh ? '⚡ AI 法規速記閃卡' : 'Legal Flashcards'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Contact Channels */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              {isZh ? '客戶支援與聯絡' : 'Customer Care'}
            </span>
            <div className="space-y-2 font-bold">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>support@agentpass.hk</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +852 5432 7572</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>{isZh ? '服務時間：週一至週五 09:00 - 18:00 HKT' : 'Hours: Mon-Fri 09:00 - 18:00 HKT'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright Bar */}
        <div className="border-t border-slate-800/60 pt-6 text-center space-y-2 text-[11px] font-semibold">
          <div className="flex items-center justify-center gap-1.5 text-amber-500">
            <ShieldCheck className="h-4 w-4" />
            <span>Official EAA Syllabus Aligned • Cap. 511 / Cap. 7 / Forms 1-6</span>
          </div>
          <p className="max-w-3xl mx-auto leading-relaxed opacity-80">
            {isZh 
              ? '本平台學習資料及法例解析依據香港地產代理條例 (Cap. 511)、業主與租客條例 (Cap. 7) 及監管局最新大綱編撰。AgentPass™ 為獨立備考品牌，與地產代理監管局 (EAA) 無直接附屬關係。' 
              : 'Study materials and statutory explanations are compiled under Cap. 511, Cap. 7, and official EAA syllabi. AgentPass™ is an independent prep platform.'}
          </p>
          <div className="pt-2 font-mono opacity-60">
            © 2026 AgentPass™ Limited. All rights reserved. Hong Kong SAR.
          </div>
        </div>

      </div>
    </footer>
  );
}