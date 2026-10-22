// app/components/ExamTrackerCTA.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Mail, CheckCircle2, ArrowRight, Download, ExternalLink, Sparkles } from 'lucide-react';
import { generateGoogleCalendarUrl, downloadIcsCalendarFile } from '@/app/utils/calendar';

interface ExamTrackerCTAProps {
  isZh: boolean;
  trackName: 'EAQE' | 'SQE';
}

export default function ExamTrackerCTA({ isZh, trackName }: ExamTrackerCTAProps) {
  const [examDate, setExamDate] = useState<string>('2026-11-18');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isEmailSubscribed, setIsEmailSubscribed] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDate = localStorage.getItem('agentpass_exam_date');
      if (savedDate) setExamDate(savedDate);

      const savedEmail = localStorage.getItem('agentpass_user_email');
      if (savedEmail) setUserEmail(savedEmail);
    }
  }, []);

  const handleDateChange = (newDate: string) => {
    setExamDate(newDate);
    if (typeof window !== 'undefined') {
      localStorage.setItem('agentpass_exam_date', newDate);
    }
  };

  const handleSubscribeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;

    if (typeof window !== 'undefined') {
      localStorage.setItem('agentpass_reminder_email', userEmail);
    }
    setIsEmailSubscribed(true);
    setTimeout(() => {
      setShowEmailModal(false);
    }, 1500);
  };

  const daysRemaining = Math.max(
    0,
    Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm space-y-6">
      
      {/* Header & Days Remaining Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-100 pb-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 !text-white">
            <Sparkles className="h-3.5 w-3.5 !text-white" />
            <span>{isZh ? '倒數計時與智能提醒' : 'Exam Schedule & Automated Reminders'}</span>
          </span>
          <h3 className="text-xl font-black text-slate-900 pt-1">
            {isZh ? `距離 ${trackName} 資格考試僅剩 ${daysRemaining} 天` : `${daysRemaining} Days Until Your ${trackName} Licensing Exam`}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 shrink-0">{isZh ? '目標考期:' : 'Exam Date:'}</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="px-3.5 py-1.5 rounded-xl border border-blue-200 bg-white font-bold text-xs text-slate-900 shadow-2xs focus:outline-none focus:border-blue-600 transition"
          />
        </div>
      </div>

      {/* Prominent One-Click Action CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Google Calendar Direct Sync CTA */}
        <a
          href={generateGoogleCalendarUrl(examDate, trackName, isZh)}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-white border border-blue-200 hover:border-blue-500 hover:shadow-md transition flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-slate-900 block">{isZh ? '同步至 Google 日曆' : 'Sync Google Calendar'}</span>
              <span className="text-[10px] text-slate-500">{isZh ? '一鍵新增考試日與提醒' : 'Add exam date & alert'}</span>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition" />
        </a>

        {/* iCal / Outlook Download CTA */}
        <button
          type="button"
          onClick={() => downloadIcsCalendarFile(examDate, trackName, isZh)}
          className="p-4 rounded-2xl bg-white border border-blue-200 hover:border-blue-500 hover:shadow-md transition flex items-center justify-between group cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-slate-900 block">{isZh ? '下載 Apple / Outlook 日曆' : 'Download .ICS Calendar'}</span>
              <span className="text-[10px] text-slate-500">{isZh ? '匯入 iPhone 及 電腦日曆' : 'Import to iCal / Outlook'}</span>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition" />
        </button>

        {/* Email Notification Trigger CTA */}
        <button
          type="button"
          onClick={() => setShowEmailModal(true)}
          className="p-4 rounded-2xl bg-white border border-blue-200 hover:border-blue-500 hover:shadow-md transition flex items-center justify-between group cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-slate-900 block">{isZh ? '設定電郵溫習提醒' : 'Set Email Reminders'}</span>
              <span className="text-[10px] text-slate-500">{isZh ? '30/14/7 天階段智能催促' : 'Milestone email alerts'}</span>
            </div>
          </div>
          <Bell className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition" />
        </button>

      </div>

      {/* Email Reminder Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-900">{isZh ? '訂閱備考階段電郵提醒' : 'Set Milestone Email Alerts'}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                ✕
              </button>
            </div>

            {isEmailSubscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>{isZh ? '提醒已設定！系統將於考前 30 天、14 天及 7 天發送階段提醒。' : 'Subscribed! Reminders set for 30, 14, and 7 days prior to exam.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribeEmail} className="space-y-4 text-xs">
                <p className="text-slate-600 font-medium">
                  {isZh
                    ? `請輸入您的電郵，AgentPass 將於 ${examDate} 考期前的關鍵節點自動為您送上複習提示：`
                    : `Enter your email to receive tailored review digest alerts leading up to ${examDate}:`}
                </p>

                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-blue-600"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 !text-white font-extrabold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="h-4 w-4 !text-white" />
                  <span>{isZh ? '確定啟用提醒' : 'Confirm Subscription'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}