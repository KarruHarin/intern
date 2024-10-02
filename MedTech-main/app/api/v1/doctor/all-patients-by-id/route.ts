import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { userId } = body;

    if (typeof userId !== "string" || !userId.trim()) {
      throw new Error("Invalid ID format");
    }

    const appointments = await db.bookedAppointment.findMany({
      where: { doctor_id: userId },
    });

    if (!appointments || appointments?.length === 0) {
      return NextResponse.json({ error: "No appointments found." });
    }

    return NextResponse.json({ success: "Success", data: appointments });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json({ error: "Internal server error" });
  }
};
