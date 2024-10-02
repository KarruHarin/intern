import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, data } = body;

    const user = await getUserById(userId);
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingOverview = await db.healthExpected.findFirst({
      where: {
        userId: user.id
      }
    });   
    let updatedOverview;

    if (existingOverview) {
      const currentReport = existingOverview.report as Prisma.JsonArray;

      let newReportArray = Array.isArray(currentReport) ? [...currentReport, data] : [data];

      // Maintain a limit of 5 reports
      if (newReportArray.length > 5) {
        newReportArray.shift(); 
      }

      updatedOverview = await db.healthExpected.update({
        where: {
          id: existingOverview.id
        },
        data: {
          report: newReportArray
        }
      });
    } else {
      updatedOverview = await db.healthExpected.create({
        data: {
          userId: user.id,
          report: [data]  // Create the new report
        }
      });
    }

    return NextResponse.json(updatedOverview);
  } catch (err) {
    console.error("Error in /api/v1/patients/tracker/add_health_or_expected:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
