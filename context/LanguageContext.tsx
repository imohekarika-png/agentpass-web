// context/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'ZH';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  langCode: 'en-US' | 'zh-HK';
  langLabel: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ZH');

  useEffect(() => {
    const saved = localStorage.getItem('agentpass_lang') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.getItem('agentpass_lang');
    localStorage.setItem('agentpass_lang', lang);
    // Update HTML lang attribute for accessibility & SEO
    document.documentElement.lang = lang === 'ZH' ? 'zh-HK' : 'en-US';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        langCode: language === 'ZH' ? 'zh-HK' : 'en-US',
        langLabel: language === 'ZH' ? '繁體中文 (香港)' : 'English (US)',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}