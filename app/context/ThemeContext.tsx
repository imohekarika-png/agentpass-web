// app/context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeVariant = 'slate' | 'oled' | 'sepia' | 'light';

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'slate',
  setTheme: () => {},
});

const STORAGE_KEY = 'agentpass_theme_v1';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeVariant>('slate');

  const applyThemeToDOM = (newTheme: ThemeVariant) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
      document.body.setAttribute('data-theme', newTheme);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeVariant;
      const initialTheme = (saved && ['slate', 'oled', 'sepia', 'light'].includes(saved)) ? saved : 'slate';
      setThemeState(initialTheme);
      applyThemeToDOM(initialTheme);
    } catch {
      applyThemeToDOM('slate');
    }
  }, []);

  const setTheme = (newTheme: ThemeVariant) => {
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // fallback
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);