import { getOtp, getUserByNumber } from "@/data/user";
import { db } from "@/lib/db";
import { LoginUsingOtpSchema } from "@/schema";
import { NextResponse } from "next/server";

export const POST = async(req: any) => {
  try {
    const body = await req.json();

    const validate = LoginUsingOtpSchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json({ error: "Invalid data Error" }, { status: 400 });
    }

    const { otp, phone } = validate.data;

    const existingUser = await getUserByNumber(phone);
    if (!existingUser) {
      return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });
    }

    const isValidOtp = await getOtp(otp);
    if (isValidOtp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    const updatedUser = await db.user.update({
      where: { phone },
      data: { numberVerified: true },
    });

    if (updatedUser) {
      await db.otp.delete({
        where: { 
         phone: phone,
         otp },
      });
    }

    return NextResponse.json({success:"Login successful", user:updatedUser});

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
