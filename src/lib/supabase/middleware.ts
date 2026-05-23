import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Design-preview mode — Supabase env not yet set. Let every request through
  // so /login, /mission, /overview render with mock data during Phase 2.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Clear stale auth cookies on auth error
  if (authError && !user) {
    request.cookies.getAll().forEach(({ name }) => {
      if (name.startsWith('sb-')) {
        supabaseResponse.cookies.delete(name);
      }
    });
  }

  const { pathname } = request.nextUrl;

  // Forward stray auth codes to callback handler
  if (
    request.nextUrl.searchParams.get('code') &&
    pathname !== '/auth/callback'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/callback';
    return NextResponse.redirect(url);
  }

  // Always allow auth callback through
  if (pathname.startsWith('/auth/')) {
    return supabaseResponse;
  }

  // Public routes — accessible without login
  const publicRoutes = ['/login', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Redirect authed users away from auth pages
  if (isPublicRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/overview';
    return NextResponse.redirect(url);
  }

  // Allow public routes through for unauthed users
  if (isPublicRoute) {
    return supabaseResponse;
  }

  // Protect all other routes — require auth
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Admin route protection — require admin role
  if (pathname.startsWith('/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/overview';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
