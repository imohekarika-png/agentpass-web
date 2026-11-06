// app/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  const [isKickedOut, setIsKickedOut] = useState<boolean>(false);

  const sessionRef = useRef<{ email: string; sid: string | null }>({ email: '', sid: null });
  sessionRef.current = { email: userEmail, sid: sessionId };

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

      // Purge temporary guest queue and legacy keys
      localStorage.removeItem('agentpass_srs_guest');
      localStorage.removeItem('agentpass_srs_queue_v1');

      // Clear edge middleware authentication cookie
      document.cookie = `agentpass_user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;

      window.dispatchEvent(new Event('agentpass_auth_change'));
    }

    try {
      supabase.auth.signOut();
    } catch (e) {
      // client fallback
    }
  }, [supabase]);

  // Direct active session check against database
  const verifyActiveSession = useCallback(async () => {
    const { email, sid } = sessionRef.current;
    if (!email || email === 'guest@agentpass.hk') return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('active_session_id, tier')
        .eq('email', email)
        .single();

      if (!error && data) {
        // Self-heal legacy sessions without a local session ID
        if (!sid && data.active_session_id) {
          setSessionId(data.active_session_id);
          localStorage.setItem('agentpass_session_id', data.active_session_id);
          return;
        }

        if (data.tier && data.tier !== userTier) {
          setUserTier(data.tier as UserTier);
          localStorage.setItem('agentpass_user_tier', data.tier);
        }

        // Check if database has a newer session ID from another device
        const localSid = sid || localStorage.getItem('agentpass_session_id');
        if (data.active_session_id && localSid && data.active_session_id !== localSid) {
          console.warn('[SECURITY] Newer session detected in database. Triggering lockdown.');
          logout();
          setIsKickedOut(true);
        }
      }
    } catch (err) {
      console.warn('Verification poll failed:', err);
    }
  }, [supabase, logout, userTier]);

  useEffect(() => {
    syncAuthFromStorage();
    setIsMounted(true);

    const handleAuthEvent = () => syncAuthFromStorage();
    window.addEventListener('agentpass_auth_change', handleAuthEvent);
    window.addEventListener('storage', handleAuthEvent);

    // Verify on tab focus and every 8 seconds
    window.addEventListener('focus', verifyActiveSession);
    const interval = setInterval(verifyActiveSession, 8000);

    return () => {
      window.removeEventListener('agentpass_auth_change', handleAuthEvent);
      window.removeEventListener('storage', handleAuthEvent);
      window.removeEventListener('focus', verifyActiveSession);
      clearInterval(interval);
    };
  }, [syncAuthFromStorage, verifyActiveSession]);

  // Realtime WebSocket Push Listener
  useEffect(() => {
    if (!userEmail || userEmail === 'guest@agentpass.hk') return;

    const channelName = `session_guard_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
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

          if (updatedEmail === userEmail.toLowerCase()) {
            if (remoteTier && remoteTier !== userTier) {
              setUserTier(remoteTier as UserTier);
              localStorage.setItem('agentpass_user_tier', remoteTier);
            }

            const currentSid = sessionRef.current.sid || localStorage.getItem('agentpass_session_id');
            // Kick out only if remote session differs from local session
            if (remoteSessionId && currentSid && remoteSessionId !== currentSid) {
              console.warn('[SECURITY] Account accessed elsewhere. Locking down session.');
              logout();
              setIsKickedOut(true);
            }
          }
        }
      )
      .subscribe((status: string) => {
        if (status === 'SUBSCRIBED') {
          console.log(`[REALTIME ACTIVE] Channel connected for: ${userEmail}`);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userEmail, userTier, logout, supabase]);

  const setSession = (email: string, tier?: UserTier, newSessId?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanTier = tier || userTier || 'FREE_PREVIEW';
    const sid = newSessId || sessionId || `sess_${Date.now()}`;

    setUserEmail(cleanEmail);
    setUserTier(cleanTier);
    setSessionId(sid);
    setIsKickedOut(false);

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

      // Write edge middleware authentication cookie (30-day persistence)
      document.cookie = `agentpass_user_email=${encodeURIComponent(cleanEmail)}; path=/; max-age=2592000; SameSite=Lax`;

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
        resetToFree: logout,
        logout,
        signOut: logout,
      }}
    >
      {/* Full-Screen Lockdown Curtain */}
      {isKickedOut && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/50 p-6 sm:p-8 space-y-6 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <AlertTriangle className="h-7 w-7" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">
                Account Active on Another Device
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your AgentPass account was just logged into from another browser or device. To prevent account sharing and protect your exam progress, this session has been locked and disconnected.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsKickedOut(false);
                  window.location.href = '/login';
                }}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
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