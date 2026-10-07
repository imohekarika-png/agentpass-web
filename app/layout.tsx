// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/app/context/LanguageContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import AiTutorWidget from '@/app/components/AiTutorWidget';

export const metadata: Metadata = {
  title: 'AgentPass™ - EAQE / SQE 智能備考平台',
  description: '香港地產代理及營業員牌照考試 AI 導師平台',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-HK" translate="no" className="notranslate" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100 antialiased font-sans min-h-screen flex flex-col" suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <AiTutorWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}