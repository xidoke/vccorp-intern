import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth';

export default {
  debug: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/home') || nextUrl.pathname.startsWith('/form')
          || nextUrl.pathname === '/admin'
      if (isOnDashboard) {
        return isLoggedIn;
         // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/home', nextUrl));
      }
      return true;
    },
  },
  trustHost: true,
  providers: [GitHub, Google],
} satisfies NextAuthConfig;
