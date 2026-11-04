// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Identify protected routes
  const protectedPrefixes = ['/dashboard', '/mock-exam'];
  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // 2. Read authentication cookies
  const sessionEmail = req.cookies.get('agentpass_user_email')?.value;
  const allCookies = req.cookies.getAll();
  const hasSupabaseCookie = allCookies.some(
    (c) => (c.name.startsWith('sb-') && c.name.endsWith('-auth-token')) || c.name === 'supabase-auth-token'
  );

  const isAuthenticated = Boolean(
    hasSupabaseCookie || 
    (sessionEmail && decodeURIComponent(sessionEmail) !== 'guest@agentpass.hk')
  );

  // 3. Block unauthenticated access and attach redirect target
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/mock-exam/:path*',
  ],
};