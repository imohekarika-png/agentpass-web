// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Define routes that require authentication
  const protectedPrefixes = ['/dashboard', '/mock-exam'];
  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // 2. Inspect session cookies written by Supabase Auth and AgentPass
  const allCookies = req.cookies.getAll();
  const hasSupabaseAuthCookie = allCookies.some(
    (c) => (c.name.startsWith('sb-') && c.name.endsWith('-auth-token')) || c.name === 'supabase-auth-token'
  );
  const hasSessionEmailCookie = req.cookies.get('agentpass_user_email')?.value;

  const isAuthenticated = Boolean(
    hasSupabaseAuthCookie || 
    (hasSessionEmailCookie && hasSessionEmailCookie !== 'guest@agentpass.hk')
  );

  // 3. Unauthenticated -> Intercept and Redirect
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/mock-exam/:path*'],
};