import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  LoginSchema,
  LoginUsingOtpSchema,
  validateEmailOrPhone,
} from "./schema";
import { getUserByEmail, getUserByNumber, User } from "./data/user";
import bcrypt from "bcryptjs";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Facebook({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      id: "credentials",
      name: "Email and Password Login",
      async authorize(credentials): Promise<User | null> {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { identifier, password } = validateFields.data;
          const identifierType = validateEmailOrPhone(identifier);
          let user: User | null = null;

          if (identifierType === "email") {
            user = await getUserByEmail(identifier);
          } else if (identifierType === "phone") {
            user = await getUserByNumber(identifier);
          }

          if (user && user.password) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
              return user;
            }
          }

          return null;
        }

        return null;
      },
    }),
    Credentials({
      id: "otp",
      name: "OTP Login",
      async authorize(credentials): Promise<User | null> {
        const validateFields = LoginUsingOtpSchema.safeParse(credentials);

        if (validateFields.success) {
          const { phone } = validateFields.data;
          const user = await getUserByNumber(phone);
          if (user) {
            return user;
          }

          return null;
        }

        return null;
      },
    }),
  ],
} as NextAuthConfig;
