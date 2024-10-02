import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, data } = body;

    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingOverview = await db.tracker.findFirst({
      where: {
        userId: user.id
      }
    });

    let updatedOverview;
   if(existingOverview){
      updatedOverview = await db.tracker.update({
        where: {
          id: existingOverview.id
        },
        data: {
          activity: data
        }
      });
    } else {
      updatedOverview = await db.tracker.create({
        data: {
          userId: user.id,
          activity: data,
          sleep: {}, 
          wellness: {}
        }
      });
    }

    return NextResponse.json(updatedOverview);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
