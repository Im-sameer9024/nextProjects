import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import prisma from "./lib/prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginFormDataSchema } from "./types/Schema";
import bcrypt from "bcryptjs";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginFormDataSchema.safeParse(credentials);

        console.log("validatedFields of signIn", validatedFields);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            console.log("No user found with that email");
            return null;
          }

          const validateUser = await bcrypt.compare(password, user.password!);

          if (!validateUser) {
            return null;
          } else {
            return user;
          }
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          //check user exists
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email!,
            },
          });

          if (!existingUser) {
            //create new user
            await prisma.user.create({
              data: {
                name: user.name!,
                email: user.email!,
              },
            });
          }
        } catch (error) {
            console.log("error during Google Sign in ",error)
            return false;
        }
      }
      return true;
    },

    async jwt({token,user}){
        if(user){
            token.id = user.id;
            token.email = user.email;
            token.role = user.role
            token.name = user.name
            
        }
        return token;

    },

    async session({session,token}){
        if(session.user){
            session.user.id = String(token.id);
            session.user.email = String(token.email) ?? "";
            session.user.role = String(token.role)
            session.user.name = String(token.name)
            
        }
        return session;
    }


  },
});
