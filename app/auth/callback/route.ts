// app/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');
  const redirectParam = requestUrl.searchParams.get('redirect');
  const targetPath = redirectParam ? decodeURIComponent(redirectParam) : '/pricing?registered=true';

  if (!code) {
    return NextResponse.redirect(new URL('/login', requestUrl.origin));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Exchange the verification code for an authenticated session
    const { data, error } = await supabaseAdmin.auth.exchangeCodeForSession(code);

    if (error || !data?.user) {
      console.error('[AUTH CALLBACK ERROR]', error);
      return NextResponse.redirect(new URL('/login?error=confirmation_failed', requestUrl.origin));
    }

    const user = data.user;
    const userEmail = user.email?.trim().toLowerCase() || '';

    // Generate initial unique session ID for this newly confirmed device
    const newSessionId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Ensure database profile exists and is initialized
    await supabaseAdmin
      .from('profiles')
      .upsert({
        id: user.id,
        email: userEmail,
        tier: 'FREE_PREVIEW',
        active_session_id: newSessionId,
        last_active_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    // Prepare redirect to the target upgrade page (e.g. /pricing?tier=EAQE_PRO)
    const finalRedirectUrl = new URL(
      targetPath.startsWith('/') ? targetPath : `/${targetPath}`,
      requestUrl.origin
    );
    const response = NextResponse.redirect(finalRedirectUrl);

    // Set cookie so Edge Middleware allows access immediately
    if (userEmail) {
      response.cookies.set('agentpass_user_email', userEmail, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }

    return response;
  } catch (err: any) {
    console.error('[AUTH CALLBACK EXCEPTION]', err);
    return NextResponse.redirect(new URL('/login?error=server_error', requestUrl.origin));
  }
}