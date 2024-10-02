import { getUserById } from "@/data/user";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const request = await req.json();
    const data = await getUserById(request.userId);
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
};
