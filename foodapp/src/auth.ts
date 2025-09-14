import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    Credentials({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        // Handle credentials authentication
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        // You should return user or null, but never undefined

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password as string
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Add user ID to the session
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session as Session;
    },

    // Add custom sign-in page for credentials

    signIn: async ({ user, account }) => {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      // For credentials, check if email is verified
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email!,
        },
      });

      // Prevent sign in if email is not verified
      if (!existingUser?.emailVerified) return false;

      return true;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
});
