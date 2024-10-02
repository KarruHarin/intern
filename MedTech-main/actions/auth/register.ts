"use server";
import { RegisterSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail, getUserByNumber } from "@/data/user";
import { getVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validate = RegisterSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid data" };
  }

  const { email, password, name, role, phone } = validate.data;
  const normalizedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(normalizedEmail);
  if (existingUser) {
   if(existingUser.emailVerified==null){
    await sendVerificationEmail(normalizedEmail);
    return {error:"Verify email",data:existingUser}
   }
    return { error: "Email already exists",data:existingUser };
  }
  
  const numberUsed = await getUserByNumber(phone);
 if (numberUsed){
  return { error: "Phone number is already used"}
 }
  const data= await db.user.create({
    data: {
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      phone, 
    },
  });

 
  await sendVerificationEmail(normalizedEmail);

  return { success: "Confirmation email sent",data };
};
