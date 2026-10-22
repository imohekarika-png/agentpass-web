// app/terms/page.tsx
'use client';

import Link from 'next/link';
import { FileText, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function TermsPage() {
  const { language, locale } = useLanguage();
  const currentLang = (language || locale || 'ZH').toString().toUpperCase();
  const isZh = currentLang.includes('ZH') || currentLang.includes('HK') || currentLang.includes('CN');

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              <span>Terms & Conditions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isZh ? '服務條款與免責聲明' : 'Terms of Service'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              {isZh
                ? '最後更新日期：2026 年 10 月 22 日 • AgentPass™ 地產代理資格考試 AI 備考平台'
                : 'Last Updated: October 22, 2026 • AgentPass™ Licensing Exam AI Prep Platform'}
            </p>
          </div>

          <Link
            href="/"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex items-center gap-2 shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isZh ? '返回首頁' : 'Back to Home'}</span>
          </Link>
        </div>

        {/* Terms Body */}
        <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <span>1. {isZh ? '服務範圍與獨立 platform 聲明' : 'Service Scope & Independent Status'}</span>
            </h2>
            <p>
              {isZh
                ? 'AgentPass™ 為獨立開發之 AI 輔助備考平台，專門協助學員溫習香港地產代理資格考試 (EAQE) 及營業員資格考試 (SQE)。AgentPass™ **絕非**地產代理監管局 (EAA) 或職業訓練局 (VTC/PEAK) 之附屬機構，亦無獲得其直接授權或贊助。'
                : 'AgentPass™ is an independent AI-assisted test preparation platform for HK EAQE and SQE licensing exams. AgentPass™ is **NOT** affiliated with, sponsored by, or endorsed by the Estate Agents Authority (EAA) or VTC/PEAK.'}
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <span>2. {isZh ? '智慧財產權保障 (Intellectual Property)' : 'Intellectual Property'}</span>
            </h2>
            <p>
              {isZh
                ? 'AgentPass™ 平台內所有自主研發之試題幹、法規分析、記憶宮殿口訣及設計系統，版權均屬 AgentPass™ 所有。平台所引述之法定條例（如 Cap. 511, Cap. 219, Cap. 7 等）均源自香港特別行政區公眾法例資料。'
                : 'All original question stems, statutory explanations, mnemonics, and design code are copyright of AgentPass™. Ordinance citations (Cap. 511, Cap. 219, Cap. 7) reference public Hong Kong legislation.'}
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>3. {isZh ? '備考結果免責條款 (Disclaimer of Guarantee)' : 'Disclaimer of Exam Guarantee'}</span>
            </h2>
            <p>
              {isZh
                ? 'AgentPass™ 旨在提供高效率法規訓練，惟模擬考成績不代表地產代理監管局 (EAA) 官方試場之最終合格保證。學員應同時參考官方最新公告及條例副本。'
                : 'While AgentPass™ provides rigorous statutory practice, mock exam performance does not constitute an official guarantee of passing EAA licensing sittings.'}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}