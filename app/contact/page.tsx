// app/contact/page.tsx
'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, Clock, MapPin, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const { locale, language } = useLanguage();
  const isZh = locale === 'zh-HK' || language === 'ZH';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isZh ? '聯絡我們' : 'Contact Us'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            {isZh
              ? '如有關於 AgentPass™ 課程、模擬題庫或 AI 導師系統的任何查詢，歡迎隨時與我們的團隊聯絡。'
              : 'Have questions about AgentPass™ course syllabus, practice bank, or AI tutor system? Reach out to our team.'}
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Email Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">
              {isZh ? '電子郵件 Support' : 'Email Support'}
            </h3>
            <p className="text-xs text-slate-400">
              {isZh ? '我們會在 24 小時內回覆您的查詢：' : 'We typically respond within 24 hours:'}
            </p>
            <a
              href="mailto:support@agentpass.hk"
              className="inline-block text-sm font-semibold text-indigo-400 hover:text-indigo-300 underline"
            >
              support@agentpass.hk
            </a>
          </div>

          {/* WhatsApp / Phone Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">
              {isZh ? '電話與 WhatsApp 查詢' : 'Phone & WhatsApp'}
            </h3>
            <p className="text-xs text-slate-400">
              {isZh ? '專人即時解答報考及課程細節：' : 'Direct line for enrollment and syllabus inquiries:'}
            </p>
            <a
              href="https://wa.me/85254327572"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold text-emerald-400 hover:text-emerald-300 underline"
            >
              +852 54327572
            </a>
          </div>

          {/* Business Hours */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">
              {isZh ? '服務時間' : 'Business Hours'}
            </h3>
            <p className="text-xs text-slate-300 font-mono">
              {isZh
                ? '星期一至五：09:00 - 18:00 (HKT)'
                : 'Mon - Fri: 09:00 - 18:00 (HKT)'}
            </p>
            <p className="text-xs text-slate-500">
              {isZh ? '公眾假期及週末休息' : 'Closed on Weekends & Public Holidays'}
            </p>
          </div>

          {/* Office Location */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white">
              {isZh ? '辦公地點' : 'Location'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vektor Spatial Limited <br />
              {isZh ? '香港特別行政區' : 'Hong Kong SAR'}
            </p>
          </div>

        </div>

        {/* Contact Form Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <MessageSquare className="h-5 w-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">
              {isZh ? '線上留言查詢' : 'Send us a message'}
            </h2>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  {isZh ? '姓名' : 'Name'}
                </label>
                <input
                  type="text"
                  placeholder={isZh ? '張小明' : 'John Doe'}
                  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  {isZh ? '電郵地址' : 'Email Address'}
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                {isZh ? '查詢內容' : 'Message'}
              </label>
              <textarea
                rows={4}
                placeholder={
                  isZh
                    ? '請輸入您關於 EAQE / SQE 課程或平台使用之查詢...'
                    : 'Write your enquiry here...'
                }
                className="w-full rounded-xl bg-slate-800 border border-slate-700 p-3.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isZh ? '提交查詢' : 'Submit Enquiry'}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}