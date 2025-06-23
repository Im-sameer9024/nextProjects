import { NextAuthConfig } from 'next-auth';
export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHomePage = nextUrl.pathname.startsWith("/");

      if (isOnHomePage) {
        if (isLoggedIn) {
          return true;
        }
        return Response.redirect(new URL("/login", nextUrl));
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  providers:[],

} satisfies NextAuthConfig
