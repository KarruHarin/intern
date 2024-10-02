import { VerifyOtp } from "@/actions/auth/VerifyEmailOtp";
import { getUserByNumber, getUserOtp } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const isValidOtp = await getUserOtp(body.otp.toString());
    if (!isValidOtp) {
      return NextResponse.json({ status: true, message: "Invalid otp" });
    }
    const user = await getUserByNumber(body.phone.toString());
    if (user) {
      const updatedUser = await db.user.update({
        where: { id: user.id },
        data: { numberVerified: true },
      });
      return NextResponse.json({
        success: "Verified Successfully",
      });
    }
    return NextResponse.json({error: "User not found" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
};
