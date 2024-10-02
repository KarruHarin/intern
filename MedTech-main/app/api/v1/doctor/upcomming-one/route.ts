import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { userId } = body;

    // Validate user ID
    if (typeof userId !== "string" || !userId.trim()) {
      throw new Error("Invalid ID format");
    }
    
    // Fetch the most recent upcoming appointment
    const appointments = await db.bookedAppointment.findMany({
      where: {
        doctor_id: userId,
        date: {
          gte: new Date(), 
        },
      },
      orderBy: {
        date: 'asc', 
      },
      take: 1, 
    });

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({ error: "No upcoming appointments found." });
    }

    return NextResponse.json({ success: "Success", data: appointments[0] });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json({ error: "Internal server error" });
  }
};
