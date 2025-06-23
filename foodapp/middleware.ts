// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

export const { auth: middleware } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      
      // Public routes
      const publicRoutes = ['/login', '/register'];
      
      // Role-based routes
      const adminRoutes = ['/admin'];
      const userRoutes = ['/dashboard'];
      
      // If not logged in and not on public route, redirect to login
      if (!isLoggedIn && !publicRoutes.includes(nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', nextUrl));
      }
      
      // Check role-based access
      if (isLoggedIn) {
        const userRole = auth.user?.role;
        
        // Admin trying to access user route - allow
        if (userRole === 'ADMIN' && userRoutes.includes(nextUrl.pathname)) {
          return true;
        }
        
        // User trying to access admin route - deny
        if (userRole === 'USER' && adminRoutes.includes(nextUrl.pathname)) {
          return NextResponse.redirect(new URL('/unauthorized', nextUrl));
        }
      }
      
      return true;
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register|unauthorized).*)"],
};