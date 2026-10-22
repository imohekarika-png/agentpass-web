// app/privacy/page.tsx
'use client';

import Link from 'next/link';
import { Shield, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function PrivacyPage() {
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
              <Shield className="h-3.5 w-3.5 text-blue-600" />
              <span>PDPO Cap. 486 Compliant</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {isZh ? '私隱政策聲明' : 'Privacy Policy'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              {isZh
                ? '最後更新日期：2026 年 10 月 22 日 • 嚴格遵循香港《個人資料（私隱）條例》（第 486 章）'
                : 'Last Updated: October 22, 2026 • Compliant with HK Personal Data (Privacy) Ordinance (Cap. 486)'}
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

        {/* Content Card */}
        <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <span>1. {isZh ? '資料收集與使用目的 (Data Collection & Purpose)' : 'Data Collection & Purpose'}</span>
            </h2>
            <p>
              {isZh
                ? 'AgentPass™ 僅收集提供備考服務所必需的個人資料，包括您的電郵地址、訂閱級別（EAQE / SQE）、考試目標日期及溫習進度紀錄。我們絕不收集香港身份證號碼、住宅地址或非必要的個人識別資訊。'
                : 'AgentPass™ collects only personal data directly relevant to providing exam preparation services, including your email address, subscription tier (EAQE/SQE), target exam date, and learning progress metrics. We do NOT collect HKID numbers, residential addresses, or unneeded personal identifiers.'}
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Lock className="h-4 w-4 text-blue-600" />
              <span>2. {isZh ? '付款資料與第三方金網 Security' : 'Payment Processing & Security'}</span>
            </h2>
            <p>
              {isZh
                ? '所有訂閱交易均由符合 PCI-DSS 最高安全認證的國際支付平台（如 Stripe）直接處理。AgentPass™ 伺服器絕不儲存、處理或接觸您的完整信用卡號碼或銀行帳戶密碼。'
                : 'All subscription payments are handled directly by PCI-DSS compliant third-party payment gateways (e.g., Stripe). AgentPass™ servers never store, process, or transmit raw payment card credentials.'}
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span>3. {isZh ? '資料保護與第三者不轉讓原則' : 'Data Protection & Non-Disclosure'}</span>
            </h2>
            <p>
              {isZh
                ? '根據《個人資料（私隱）條例》保障原則，AgentPass™ 承諾絕不會向任何第三方、廣告商或招聘機構出售、租借或轉讓您的個人資料或備考成績。所有數據均傳輸於 SSL/TLS 加密頻道。'
                : 'In strict compliance with the HK Personal Data (Privacy) Ordinance, AgentPass™ guarantees that personal data and test scores will never be sold, rented, or transferred to third parties or recruiters. All data transmission is encrypted via TLS/HTTPS.'}
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>4. {isZh ? '查閱、更正及刪除權利 (Data Access & Deletion)' : 'Data Access & Rights'}</span>
            </h2>
            <p>
              {isZh
                ? '學員隨時有權查閱、更正或要求徹底刪除於 AgentPass™ 儲存的所有個人帳戶數據及本機溫習紀錄（`localStorage`）。如需刪除帳戶，請透過 support@agentpass.hk 與我們聯絡。'
                : 'Candidates retain full rights under PDPO DPP 6 to access, amend, or request full deletion of account metrics and stored local data. To request account deletion, contact support@agentpass.hk.'}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}