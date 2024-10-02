"use server"
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { UpdateProfileSchema } from "@/schema/dashboard/profile";
import { getVerificationToken } from "@/lib/tokens";
import  {getUserById } from "@/data/user";

export const updateProfile = async (values: z.infer<typeof UpdateProfileSchema>, userId: string) => {
  try {
    const validate = UpdateProfileSchema.safeParse(values);
    if (!validate.success) {
      return { error: "Invalid data" };
    }  
    
    const { email, name, password, about } = validate.data;
    let hashedPassword = undefined;
  
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
  
    const user = await getUserById(userId);
  
    const updateData: any = {
      name,
      about,
      password: hashedPassword || user?.password,
      emailVerified: email?null:user?.emailVerified,
    };
  
    if (email && email.toLowerCase() !== user?.email) {
      updateData.email = email.toLowerCase();
      const verificationToken = await getVerificationToken(email);
      await sendVerificationEmail(
        verificationToken.email,
      );
    }
    
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    return { success: "Profile updated successfully",user:updatedUser };
  
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the profile" };
  }
};
