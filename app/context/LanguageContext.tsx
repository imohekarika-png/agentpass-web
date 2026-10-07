// app/context/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'zh-HK' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isMounted: boolean;
}

const STORAGE_KEY = 'agentpass_locale_preference';
const DEFAULT_LOCALE: Locale = 'zh-HK';

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  isMounted: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always initialize with DEFAULT_LOCALE for both SSR and initial client pass
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [isMounted, setIsMounted] = useState(false);

  // Read saved locale from localStorage strictly after client-side hydration
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === 'en' || saved === 'zh-HK') {
        setLocaleState(saved);
      }
    } catch (err) {
      console.error('Failed to read locale from localStorage:', err);
    }
  }, []);

  // Handler to update locale in state and sync with localStorage
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch (err) {
      console.error('Failed to save locale to localStorage:', err);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isMounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);