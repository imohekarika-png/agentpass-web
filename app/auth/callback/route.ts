// app/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  
  const code = requestUrl.searchParams.get('code');
  const redirectParam = requestUrl.searchParams.get('redirect') || requestUrl.searchParams.get('next');
  const targetPath = redirectParam ? decodeURIComponent(redirectParam) : '/pricing?registered=true';

  const finalRedirectUrl = new URL(
    targetPath.startsWith('/') ? targetPath : `/${targetPath}`,
    requestUrl.origin
  );

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    try {
      const { data, error } = await supabaseAdmin.auth.exchangeCodeForSession(code);

      if (!error && data?.user) {
        const userEmail = data.user.email?.trim().toLowerCase() || '';

        const newSessionId = typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        await supabaseAdmin
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: userEmail,
            tier: 'FREE_PREVIEW',
            active_session_id: newSessionId,
            last_active_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }, { onConflict: 'id' });

        const response = NextResponse.redirect(finalRedirectUrl);

        if (userEmail) {
          response.cookies.set('agentpass_user_email', userEmail, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          });
        }
        return response;
      }
    } catch (err: any) {
      console.error('[AUTH CALLBACK EXCEPTION]', err);
    }
  }

  return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(targetPath)}`, requestUrl.origin));
}