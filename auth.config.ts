import { compare } from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
import prisma from "./app/config/db";
import GitHub from "next-auth/providers/github";
export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);
        if (!validatedFields.success) return null;
        const { email, password } = validatedFields.data;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        console.log(user);
        if (!user || !user.email) return null;
        if (user.password != password) return null;
        console.log("login succes");
        return user;
      },
    }),
    GitHub({
      clientId: "Ov23li2dOOQwcFTIghuR",
      clientSecret: "9a9eb5a25c8dd2ee4d39d91502d4caa59276068d",
    }),
  ],
} satisfies NextAuthConfig;
