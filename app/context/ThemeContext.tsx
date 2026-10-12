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

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeVariant;
      if (saved && ['slate', 'oled', 'sepia', 'light'].includes(saved)) {
        setThemeState(saved);
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        document.documentElement.setAttribute('data-theme', 'slate');
      }
    } catch {
      document.documentElement.setAttribute('data-theme', 'slate');
    }
  }, []);

  const setTheme = (newTheme: ThemeVariant) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch {
      // fallback
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme} transition-colors duration-300 min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);