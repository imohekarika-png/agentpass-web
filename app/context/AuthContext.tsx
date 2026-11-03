// app/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AlertTriangle, LogIn } from 'lucide-react';

export type UserTier = 'FREE_PREVIEW' | 'EAQE_PRO' | 'SQE_PRO' | 'ALL_ACCESS_PRO' | 'ADMIN_BUILDER';

export interface AuthContextType {
  userEmail: string;
  userTier: UserTier;
  sessionId: string | null;
  isPaidUser: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  isMounted: boolean;
  setSession: (email: string, tier?: UserTier, sessionId?: string) => void;
  resetToFree: () => void;
  logout: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userEmail: 'guest@agentpass.hk',
  userTier: 'FREE_PREVIEW',
  sessionId: null,
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
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState<string>('guest@agentpass.hk');
  const [userTier, setUserTier] = useState<UserTier>('FREE_PREVIEW');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [showConcurrentKickModal, setShowConcurrentKickModal] = useState<boolean>(false);

  const syncAuthFromStorage = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      let email = localStorage.getItem('agentpass_user_email');
      const tier = (localStorage.getItem('agentpass_user_tier') as UserTier) || 'FREE_PREVIEW';
      const localSession = localStorage.getItem('agentpass_session_id');

      if (!email || email === 'guest@agentpass.hk') {
        const rawUser = localStorage.getItem('agentpass_user');
        if (rawUser) {
          const parsed = JSON.parse(rawUser);
          if (parsed?.email) email = parsed.email;
        }
      }

      if (email && email.trim() !== '' && email !== 'guest@agentpass.hk') {
        setUserEmail(email.trim().toLowerCase());
        setUserTier(tier);
        setSessionId(localSession);
      } else {
        setUserEmail('guest@agentpass.hk');
        setUserTier('FREE_PREVIEW');
        setSessionId(null);
      }
    } catch (err) {
      console.warn('Failed to parse auth state:', err);
    }
  }, []);

  const logout = useCallback(() => {
    setUserEmail('guest@agentpass.hk');
    setUserTier('FREE_PREVIEW');
    setSessionId(null);

    if (typeof window !== 'undefined') {
      localStorage.removeItem('agentpass_user_email');
      localStorage.removeItem('agentpass_user_tier');
      localStorage.removeItem('agentpass_user');
      localStorage.removeItem('agentpass_session_id');
      window.dispatchEvent(new Event('agentpass_auth_change'));
    }

    try {
      supabase.auth.signOut();
    } catch (e) {
      // Supabase client fallback
    }
  }, [supabase]);

  const resetToFree = () => {
    logout();
  };

  useEffect(() => {
    syncAuthFromStorage();
    setIsMounted(true);

    const handleAuthEvent = () => syncAuthFromStorage();
    window.addEventListener('agentpass_auth_change', handleAuthEvent);
    window.addEventListener('storage', handleAuthEvent);

    return () => {
      window.removeEventListener('agentpass_auth_change', handleAuthEvent);
      window.removeEventListener('storage', handleAuthEvent);
    };
  }, [syncAuthFromStorage]);

  // Anti-Account Sharing Realtime Watcher
  useEffect(() => {
    if (!sessionId || !userEmail || userEmail === 'guest@agentpass.hk') return;

    // Use a sanitized channel name and verify email inside the event handler
    const channelName = `guard_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
        },
        (payload: any) => {
          const updatedEmail = payload?.new?.email?.toLowerCase();
          const remoteSessionId = payload?.new?.active_session_id;
          const remoteTier = payload?.new?.tier;

          // Only process updates belonging to this active user
          if (updatedEmail === userEmail.toLowerCase()) {
            if (remoteTier && remoteTier !== userTier) {
              setUserTier(remoteTier as UserTier);
              localStorage.setItem('agentpass_user_tier', remoteTier);
            }

            // If the active session ID changed in the database, another device logged in
            if (remoteSessionId && remoteSessionId !== sessionId) {
              console.warn('[SECURITY] Account logged in on another device. Terminating session.');
              logout();
              setShowConcurrentKickModal(true);
            }
          }
        }
      )
      .subscribe((status: string) => {
        if (status === 'SUBSCRIBED') {
          console.log(`[REALTIME ACTIVE] Listening for concurrent logins on: ${userEmail}`);
        } else if (status === 'CHANNEL_ERROR') {
          console.error('[REALTIME ERROR] Subscription failed. Verify Supabase RLS and replica identity.');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, userEmail, userTier, logout, supabase]);

  const setSession = (email: string, tier?: UserTier, newSessId?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanTier = tier || userTier || 'FREE_PREVIEW';
    const sid = newSessId || sessionId || `sess_${Date.now()}`;

    setUserEmail(cleanEmail);
    setUserTier(cleanTier);
    setSessionId(sid);

    if (typeof window !== 'undefined') {
      localStorage.setItem('agentpass_user_email', cleanEmail);
      localStorage.setItem('agentpass_user_tier', cleanTier);
      localStorage.setItem('agentpass_session_id', sid);
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
        sessionId,
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
      {/* Concurrent Login Kick-Out Alert Modal */}
      {showConcurrentKickModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 p-6 sm:p-8 space-y-5 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <AlertTriangle className="h-6 w-6" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white">
                Account Active on Another Device
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your AgentPass account was just accessed from another browser or device. To protect your exam data and prevent unauthorized sharing, this session has been automatically disconnected.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowConcurrentKickModal(false);
                  window.location.href = '/login';
                }}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In Again on This Device</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);