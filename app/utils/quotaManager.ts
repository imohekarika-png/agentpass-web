// app/utils/quotaManager.ts

export type UserTier = 'free' | 'sqe' | 'eaqe';

export interface UserQuota {
  tier: UserTier;
  drillsUsed: number;
  drillsLimit: number;
  simsUsed: number;
  simsLimit: number;
}

const STORAGE_KEY = 'agentpass_user_quota_v2';

export const DEFAULT_QUOTAS: Record<UserTier, UserQuota> = {
  free: { tier: 'free', drillsUsed: 0, drillsLimit: 9999, simsUsed: 0, simsLimit: 30 },
  sqe: { tier: 'sqe', drillsUsed: 0, drillsLimit: 9999, simsUsed: 0, simsLimit: 50 },
  eaqe: { tier: 'eaqe', drillsUsed: 0, drillsLimit: 9999, simsUsed: 0, simsLimit: 100 },
};

export function getUserQuota(): UserQuota {
  if (typeof window === 'undefined') return DEFAULT_QUOTAS.free;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return DEFAULT_QUOTAS.free;
}

export function saveUserQuota(quota: UserQuota): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quota));
  }
}

export function canRunExam(mode: 'express' | 'sqe' | 'eaqe'): { allowed: boolean; reason?: string } {
  // Always allow Express Drills for testing and practice
  if (mode === 'express') {
    return { allowed: true };
  }

  const quota = getUserQuota();

  if (mode === 'sqe' || mode === 'eaqe') {
    if (quota.simsUsed >= quota.simsLimit && quota.tier === 'free') {
      return { 
        allowed: false, 
        reason: '全真 50 題考場已達免費試用上限。請升級學員 Pass 解鎖無限次練習！' 
      };
    }
    return { allowed: true };
  }

  return { allowed: true };
}

export function consumeQuota(mode: 'express' | 'sqe' | 'eaqe'): UserQuota {
  const quota = getUserQuota();
  if (mode === 'express') {
    quota.drillsUsed += 1;
  } else {
    quota.simsUsed += 1;
  }
  saveUserQuota(quota);
  return quota;
}