// app/context/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'zh-HK' | 'en';

interface LanguageContextType {
  locale: Locale;
  language?: string; // Backwards compatibility for legacy components
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const STORAGE_KEY = 'agentpass_locale_preference';

// Provide safe defaults so static page generation never throws
const defaultContextValue: LanguageContextType = {
  locale: 'zh-HK',
  language: 'ZH',
  setLocale: () => {},
  toggleLocale: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh-HK');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === 'en' || saved === 'zh-HK') {
        setLocaleState(saved);
      }
    } catch (err) {
      console.error('Failed to load locale:', err);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch (err) {
      console.error('Failed to save locale:', err);
    }
  };

  const toggleLocale = () => {
    setLocale(locale === 'zh-HK' ? 'en' : 'zh-HK');
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        language: locale === 'zh-HK' ? 'ZH' : 'EN',
        setLocale,
        toggleLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  // Return context or default fallback to guarantee zero build-time crashes
  return context || defaultContextValue;
}