// context/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'zh-HK' | 'en';

interface LanguageContextType {
  locale: Locale;
  language: 'ZH' | 'EN';
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  setLanguage?: (lang: 'ZH' | 'EN') => void;
}

const STORAGE_KEY = 'agentpass_locale_preference';

const defaultContextValue: LanguageContextType = {
  locale: 'zh-HK',
  language: 'ZH',
  setLocale: () => {},
  toggleLocale: () => {},
  setLanguage: () => {},
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
        setLanguage: (lang) => setLocale(lang === 'ZH' ? 'zh-HK' : 'en'),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context || defaultContextValue;
}