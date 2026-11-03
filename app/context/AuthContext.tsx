// app/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type UserTier = 'FREE_PREVIEW' | 'EAQE_PRO' | 'SQE_PRO' | 'ALL_ACCESS_PRO' | 'ADMIN_BUILDER';

export interface AuthContextType {
  userEmail: string;
  userTier: UserTier;
  isPaidUser: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  isMounted: boolean;
  setSession: (email: string, tier?: UserTier) => void;
  resetToFree: () => void;
  logout: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userEmail: 'guest@agentpass.hk',
  userTier: 'FREE_PREVIEW',
  isPaidUser: false,
  isAdmin: false,
  isLoggedIn: false,
  isMounted: false,
  setSession: () => {},
  resetToFree: () => {},
  logout: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string>('guest@agentpass.hk');
  const [userTier, setUserTier] = useState<UserTier>('FREE_PREVIEW');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const syncAuthFromStorage = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      let email = localStorage.getItem('agentpass_user_email');
      const tier = (localStorage.getItem('agentpass_user_tier') as UserTier) || 'FREE_PREVIEW';

      // Fallback: Check composite user JSON object if email key is missing
      if (!email || email === 'guest@agentpass.hk') {
        const rawUser = localStorage.getItem('agentpass_user');
        if (rawUser) {
          const parsed = JSON.parse(rawUser);
          if (parsed?.email) {
            email = parsed.email;
          }
        }
      }

      if (email && email.trim() !== '' && email !== 'guest@agentpass.hk') {
        setUserEmail(email.trim().toLowerCase());
        setUserTier(tier);
      } else {
        setUserEmail('guest@agentpass.hk');
        setUserTier('FREE_PREVIEW');
      }
    } catch (err) {
      console.warn('Failed to parse authentication state from storage:', err);
    }
  }, []);

  useEffect(() => {
    syncAuthFromStorage();
    setIsMounted(true);

    const handleAuthEvent = () => syncAuthFromStorage();

    // Listen for custom dispatch events and cross-tab storage changes
    window.addEventListener('agentpass_auth_change', handleAuthEvent);
    window.addEventListener('storage', handleAuthEvent);

    return () => {
      window.removeEventListener('agentpass_auth_change', handleAuthEvent);
      window.removeEventListener('storage', handleAuthEvent);
    };
  }, [syncAuthFromStorage]);

  const setSession = (email: string, tier?: UserTier) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanTier = tier || userTier || 'FREE_PREVIEW';

    setUserEmail(cleanEmail);
    setUserTier(cleanTier);

    if (typeof window !== 'undefined') {
      localStorage.setItem('agentpass_user_email', cleanEmail);
      localStorage.setItem('agentpass_user_tier', cleanTier);
      localStorage.setItem(
        'agentpass_user',
        JSON.stringify({
          email: cleanEmail,
          name: cleanEmail.split('@')[0],
          id: 'user_' + cleanEmail.replace(/[^a-zA-Z0-9]/g, '_'),
        })
      );
      window.dispatchEvent(new Event('agentpass_auth_change'));
    }
  };

  const logout = () => {
    setUserEmail('guest@agentpass.hk');
    setUserTier('FREE_PREVIEW');

    if (typeof window !== 'undefined') {
      localStorage.removeItem('agentpass_user_email');
      localStorage.removeItem('agentpass_user_tier');
      localStorage.removeItem('agentpass_user');
      window.dispatchEvent(new Event('agentpass_auth_change'));
    }
  };

  const resetToFree = () => {
    logout();
  };

  const isLoggedIn = Boolean(userEmail && userEmail !== 'guest@agentpass.hk');
  const isAdmin = userTier === 'ADMIN_BUILDER' || userEmail.toLowerCase().includes('admin');
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
        isLoggedIn,
        isMounted,
        setSession,
        resetToFree,
        logout,
        signOut: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);