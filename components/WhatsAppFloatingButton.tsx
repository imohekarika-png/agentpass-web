// components/WhatsAppFloatingButton.tsx
'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  // Update with your operational HK business WhatsApp number
  const whatsappNumber = '85254327572'; 
  const defaultMessage = encodeURIComponent('你好！我想查詢 AgentPass 地產考試題庫及方案。');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl transition-all duration-300 hover:scale-105 group border border-emerald-400/30"
    >
      <MessageCircle className="h-5 w-5 text-white shrink-0 fill-current" />
      <span className="hidden sm:inline-block">WhatsApp 助教諮詢</span>
    </a>
  );
}