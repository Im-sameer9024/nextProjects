import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

// Define routes that require authentication
const protectedRoutes = [
  '/cart',
  '/orders',
];

// Define routes that should redirect if authenticated
const authRoutes = [
  '/auth/login',
  '/auth/signup',
];

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/menu',
  '/contact',
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if the route is an auth route
  const isAuthRoute = authRoutes.includes(pathname);

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route) || 
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  );

  // Handle auth routes - redirect to dashboard if already logged in
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Handle protected routes - redirect to login if not authenticated
  if (isProtectedRoute && !isLoggedIn) {
    let callbackUrl = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }
    const redirectUrl = new URL('/auth/login', req.url);
    redirectUrl.searchParams.set('callbackUrl', callbackUrl);
    return NextResponse.redirect(redirectUrl);
  }

  // Allow the request to continue for public routes and authenticated users
  return NextResponse.next();
});

// Optional: Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};