import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST=async (req:any)=>{
    try{
        const request =await req.json()
        const {userId}=request
        const appointments = await db.bookedAppointment.findMany({
            where: {
              userId: userId,
              date: {
                gte: new Date(),
              },
            },
            orderBy: {
              date: 'asc', 
            },
          });
          if (!appointments || appointments?.length === 0) {
            return NextResponse.json({error: "No appointments found for this user." });
          }
          
          return NextResponse.json({ success: true, data: appointments });
    }
    catch (err) {
        console.log(err);
        
        return NextResponse.json({error:"Internal server error"})
    }
}