// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, sessionId } = body;

    if (!email || email === 'guest@agentpass.hk') {
      return NextResponse.json({
        authenticated: false,
        tier: 'FREE_PREVIEW',
        active: false,
      });
    }

    const supabase = createClient();

    // Query database directly as the single source of truth
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('tier, active_session_id, last_active_at')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !profile) {
      return NextResponse.json({
        authenticated: false,
        tier: 'FREE_PREVIEW',
        active: false,
        error: 'Profile not found',
      }, { status: 404 });
    }

    // Check if the client's session ID matches the active session in the database
    const isSessionActive = !sessionId || profile.active_session_id === sessionId;

    return NextResponse.json({
      authenticated: true,
      tier: profile.tier || 'FREE_PREVIEW',
      isSessionActive,
      isPaidUser: ['SQE_PRO', 'EAQE_PRO', 'ALL_ACCESS_PRO', 'ADMIN_BUILDER'].includes(profile.tier),
    });
  } catch (err: any) {
    console.error('Session verify error:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal verification error' },
      { status: 500 }
    );
  }
}