import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// import Resend from "next-auth/providers/resend";
import bcrypt from "bcryptjs";

import { LoginSchema } from "./zod-schemas";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // TODO: Add Magic link func since there is an issue with email providers
    // https://github.com/nextauthjs/next-auth/issues/10632
    // Resend({
    //   apiKey: process.env.AUTH_RESEND_KEY,
    //   from: "ditterraquion23@gmail.com",
    // }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
