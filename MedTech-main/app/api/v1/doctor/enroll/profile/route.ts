import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { values, userId } = body;
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const existingProfile = await db.doctorProfile.findFirst({
      where: { userId: userId },
    });
    if (existingProfile) {
      return NextResponse.json({
        error: "Doctor profile already exists for this user",
      });
    }

    const result = await db.doctorProfile.create({
      data: {
        ...values,
        userId: userId,
      },
    });
    return NextResponse.json({message:"Added Successfully",user:result});
  } catch (error) {
    return NextResponse.json(error);
  }
};
