import { sendVerificationEmail } from "@/lib/mail";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Assuming bcrypt is used for password hashing
import { validateEmailOrPhone } from "@/schema";
import { getUserByEmail, getUserByNumber } from "@/data/user";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    const fieldType = await validateEmailOrPhone(identifier);

    let user;
    
    if (fieldType === "email") {
      user = await getUserByEmail(identifier);
    } else if (fieldType === "phone") {
      user = await getUserByNumber(identifier);
    } else {
      return NextResponse.json({ error: "Invalid identifier type" }, { status: 400 });
    }

    if (!user || !user.password) {
      return NextResponse.json({ error: "User does not exist or is using social login" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    if (!user.emailVerified&&user.email) {
      await sendVerificationEmail(user.email);
      return NextResponse.json({ success: "Confirmation email sent", user: user }, { status: 200 });
    }
    
    return NextResponse.json({ success: "Login successful..", user:user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
