"use server";
import { getUserOtp } from "@/data/user";
import { getUserByNumber } from "@/data/user";
import { db } from "@/lib/db";
import { otpVerify } from "@/schema";
import { VerifyNumber } from "@/schema/dashboard/profile";
import { z } from "zod";

export const verifyOtp1 = async (values: z.infer<typeof VerifyNumber>,current:string) => {
  // Validate the OTP and phone number
  const otpValidation = VerifyNumber.safeParse(values);
  console.log("Hello");
  
  if (!otpValidation.success) {
    return { error: "Invalid input data." };
  }

  const { otp, phone,} = otpValidation.data;

  // Retrieve the OTP details from the database
  const isValidOtp = await getUserOtp(otp.toString());

  if (isValidOtp?.otp === otp) {
    // Retrieve the user using the phone number from the OTP record
    const user = await getUserByNumber(current);
    
    if (user?.email) {
      // Update the user's phone number
      await db.user.update({
        where: { email: user.email }, // Use the email to identify the user
        data: { phone: phone,numberVerified:true }, // Update the phone number
      });

      return {
        success: "Verified Successfully",
      };
    } else {
      return {
        error: "User not found.",
      };
    }
  } else {
    return {
      error: "Invalid OTP. Please try again.",
    };
  }
};
