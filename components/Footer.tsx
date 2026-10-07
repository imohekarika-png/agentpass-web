// app/components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';

export default function Footer() {
  const { locale } = useLanguage();
  const isZh = locale === 'zh-HK';

  return (
    <footer className="bg-slate-100/80 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 px-4 mt-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Grid: Brand & Quick Navigation & Customer Care */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <Image
                src="/logo.svg"
                alt="AgentPass Logo"
                width={28}
                height={28}
                unoptimized
                className="w-7 h-7 group-hover:scale-105 transition-transform"
              />
              <span className="font-extrabold text-slate-800 dark:text-slate-100 text-base">
                AgentPass™
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {isZh
                ? '香港地產代理 (EAQE) 及營業員 (SQE) 資格考試 AI 智能雙語通關平台。'
                : 'AI-powered bilingual prep platform for HK EAQE & SQE qualifying exams.'}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {isZh ? '快速連結' : 'Navigation'}
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-600 dark:text-slate-400 font-semibold">
              <Link href="/course" className="hover:text-indigo-600 transition">
                {isZh ? '📚 課程大綱' : '📚 Course Syllabus'}
              </Link>
              <Link href="/quiz" className="hover:text-indigo-600 transition">
                {isZh ? '📝 雙語模擬題庫' : '📝 Practice Quiz'}
              </Link>
              <Link href="/dashboard" className="hover:text-indigo-600 transition">
                {isZh ? '📊 個人弱點分析' : '📊 Analytics Dashboard'}
              </Link>
            </div>
          </div>

          {/* Column 3: Customer Care & Support Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {isZh ? '客戶服務與支援' : 'Customer Care & Support'}
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <p className="flex items-center space-x-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">📧 Email:</span>
                <a href="mailto:support@agentpass.hk" className="hover:text-indigo-600 underline">
                  support@agentpass.hk
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">💬 WhatsApp:</span>
                <a href="https://wa.me/85290000000" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 underline">
                  +852 9000 0000
                </a>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                {isZh
                  ? '🕒 服務時間：星期一至五 09:00 - 18:00 (HKT)'
                  : '🕒 Hours: Mon - Fri, 09:00 - 18:00 HKT'}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Statutory Disclaimers */}
        <div className="text-center text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto space-y-2">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isZh
              ? '本平台之試題及 AI 分析均基於《地產代理條例》(第511章)、《發牌規例》(第511A章) 及地產代理監管局 (EAA) 之最新考試大綱設計。AgentPass™ 為獨立第三方備考學習系統，與地產代理監管局無直接附屬關係。'
              : 'Study materials and statutory explanations are grounded in the Estate Agents Ordinance (Cap. 511), Licensing Regulation (Cap. 511A), and EAA syllabus standards. AgentPass™ is an independent prep provider and is not directly affiliated with the EAA.'}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 font-medium">
            © 2026 Vektor Spatial Limited. All rights reserved. Hong Kong SAR.
          </p>
        </div>

      </div>
    </footer>
  );
}