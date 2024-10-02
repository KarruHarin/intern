"use server";
import { LoginSchema, validateEmailOrPhone } from "@/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getVerificationToken } from "@/lib/tokens";
import { getUserByEmail, getUserByNumber } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
export const login = async (values: {
  email?: string;
  phone?: string;
  password: string;
}) => {
  const identifier = values.email || values.phone;

  const validate = LoginSchema.safeParse({
    identifier,
    password: values.password,
  });

  if (!validate.success) {
    return { error: "Invalid input" };
  }

  const { identifier: validatedIdentifier, password } = validate.data;

  const fieldType = validateEmailOrPhone(validatedIdentifier);
  let user;

  if (fieldType === "email") {
    user = await getUserByEmail(validatedIdentifier);
  } else if (fieldType === "phone") {
    user = await getUserByNumber(validatedIdentifier);
  } else {
    return { error: "Invalid identifier type" };
  }

  if (!user || !user.email || !user.password) {
    return { error: "User does not exist" };
  }
  if (!user.password) {
    return { error: "Login with social account" };
  }
  if (!user.emailVerified) {
    const verificationToken = await getVerificationToken(user.email);
    await sendVerificationEmail(verificationToken.email);
    return { success: "Confirmation email sent", data: user };
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "Incorrect password" };
    }

    const result = await signIn("credentials", {
      identifier: user.email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Successfully logged in", user };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
