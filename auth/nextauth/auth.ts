import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginFormDataSchema } from "./validation/Schemas";
import bcrypt from "bcryptjs";
import prisma from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginFormDataSchema.safeParse(credentials);

        console.log(validatedFields);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            console.error("No user found with that email");
            return null;
          }

          const checkUser = await bcrypt.compare(password, user.password!);

          console.log("password match", checkUser);

          if (!checkUser) {
            console.error("Password does not match");
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
    async signIn({ user, account, }) {
      if (account?.provider === "google") {
        try {
          // check user existing
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email!,
            },
          });

          if (!existingUser) {
            // create new user if they don't exist

            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name!,
                role: "STUDENT",
              },
            });
          }
        } catch (error) {
          console.log("error during Google sign in", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if(session.user){
        session.user.id = String(token.id);
        session.user.email = token.email ?? "";
      }
      return session;
    }
  },
});
