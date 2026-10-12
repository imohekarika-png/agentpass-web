// app/utils/quotaManager.ts

export type UserTier = 'free' | 'sqe' | 'eaqe';

export interface UserQuota {
  tier: UserTier;
  drillsUsed: number;
  drillsLimit: number;
  simsUsed: number;
  simsLimit: number;
}

const STORAGE_KEY = 'agentpass_user_quota_v1';

export const DEFAULT_QUOTAS: Record<UserTier, UserQuota> = {
  free: { tier: 'free', drillsUsed: 0, drillsLimit: 3, simsUsed: 0, simsLimit: 0 },
  sqe: { tier: 'sqe', drillsUsed: 0, drillsLimit: 9999, simsUsed: 0, simsLimit: 30 },
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
  const quota = getUserQuota();

  if (mode === 'express') {
    if (quota.tier !== 'free') return { allowed: true };
    if (quota.drillsUsed >= quota.drillsLimit) {
      return { 
        allowed: false, 
        reason: '已達到免費試用上限 (3 次 Quick Drills)。請升級學員 Pass 解鎖無限次練習！' 
      };
    }
    return { allowed: true };
  }

  if (mode === 'sqe') {
    if (quota.tier === 'free') {
      return { allowed: false, reason: '全真 50 題 SQE 模擬考場僅限 SQE / EAQE 持牌學員使用。' };
    }
    if (quota.simsUsed >= quota.simsLimit) {
      return { allowed: false, reason: '已用完 30 次 SQE 全真模擬組卷配額。' };
    }
    return { allowed: true };
  }

  if (mode === 'eaqe') {
    if (quota.tier !== 'eaqe') {
      return { allowed: false, reason: '180 分鐘 EAQE 地產代理主管全真考場僅限 EAQE Master Pass 學員解鎖。' };
    }
    if (quota.simsUsed >= quota.simsLimit) {
      return { allowed: false, reason: '已用完 100 次 EAQE Master 全真組卷配額。' };
    }
    return { allowed: true };
  }

  return { allowed: false };
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