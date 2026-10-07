// app/contact/page.tsx
'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();
  const isZh = language === 'ZH';

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {isZh ? '聯絡客戶服務及技術支援' : 'Customer Care & Support'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {isZh
            ? '無論是平台使用問題、帳戶查詢或考試法例疑問，我們的團隊樂意為你解答。'
            : 'Have questions about subscriptions, features, or statutory content? We are here to help.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support Card 1 */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <div className="text-2xl">💬</div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
            {isZh ? '即時 WhatsApp 查詢' : 'WhatsApp Support'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isZh
              ? '適合快速解答課程內容、訂閱安排或帳戶登入問題。'
              : 'Quick answers regarding account access, feature guidance, and subscriptions.'}
          </p>
          <a
            href="https://wa.me/85254327572"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block pt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {isZh ? '開啟 WhatsApp 對話 ↗' : 'Chat on WhatsApp ↗'}
          </a>
        </div>

        {/* Support Card 2 */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <div className="text-2xl">📧</div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
            {isZh ? '電郵技術支援' : 'Email Support'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isZh
              ? '提交詳細題目爭議、企業團體報名或付款發票索取。'
              : 'For billing invoices, detailed statutory feedback, or bulk corporate access.'}
          </p>
          <a
            href="mailto:support@agentpass.hk"
            className="inline-block pt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            support@agentpass.hk
          </a>
        </div>
      </div>
    </main>
  );
}