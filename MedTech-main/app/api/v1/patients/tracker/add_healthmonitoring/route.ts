import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, data } = body;

    const user = await getUserById(userId);

    if (user) {
      const created = await db.healthMonitoring.create({
        data: {
          userId: user.id, 
          monthly_monitoring: data.monthly_monitoring, 
          weekly_monitoring: data.weekly_monitoring,   
          daily_monitoring: data.daily_monitoring      
        }
      });
      return NextResponse.json(created);
    }

    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
