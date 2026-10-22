// app/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserTier = 'FREE_PREVIEW' | 'EAQE_PRO' | 'SQE_PRO' | 'ALL_ACCESS_PRO' | 'ADMIN_BUILDER';

interface AuthContextType {
  userEmail: string;
  userTier: UserTier;
  isPaidUser: boolean;
  isAdmin: boolean;
  setSession: (email: string, tier: UserTier) => void;
  resetToFree: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userEmail: 'guest@agentpass.hk',
  userTier: 'FREE_PREVIEW',
  isPaidUser: false,
  isAdmin: false,
  setSession: () => {},
  resetToFree: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string>('guest@agentpass.hk');
  const [userTier, setUserTier] = useState<UserTier>('FREE_PREVIEW');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('agentpass_user_email') || 'guest@agentpass.hk';
      const storedTier = (localStorage.getItem('agentpass_user_tier') as UserTier) || 'FREE_PREVIEW';
      setUserEmail(storedEmail);
      setUserTier(storedTier);
    }
  }, []);

  const setSession = (email: string, tier: UserTier) => {
    setUserEmail(email);
    setUserTier(tier);
    if (typeof window !== 'undefined') {
      localStorage.setItem('agentpass_user_email', email);
      localStorage.setItem('agentpass_user_tier', tier);
    }
  };

  const resetToFree = () => {
    setSession('guest@agentpass.hk', 'FREE_PREVIEW');
  };

  const isAdmin = userTier === 'ADMIN_BUILDER';
  const isPaidUser =
    isAdmin ||
    userTier === 'ALL_ACCESS_PRO' ||
    userTier === 'EAQE_PRO' ||
    userTier === 'SQE_PRO';

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        userTier,
        isPaidUser,
        isAdmin,
        setSession,
        resetToFree
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);