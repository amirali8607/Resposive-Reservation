import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import prisma from "./app/config/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
declare module "next-auth" {
  interface Session {
    user: {
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET || "secret",
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      if (user) token.role = user.role;

      return token;
    },

    async session({ token, session }) {
      if (!token.role || !token.sub) return session;

      session.user.role = token.role as "USER" | "ADMIN";
      session.user.id = token.sub;

      return session;
    },
  },
  ...authConfig,
});
