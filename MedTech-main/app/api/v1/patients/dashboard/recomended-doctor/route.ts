import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async ()=>{
    try {
        const recommendedDoctors= await db.doctorProfile.findMany()
        const top3Doctors = recommendedDoctors
        .sort((a, b) => b.BookedAppointment - a.BookedAppointment)
        .slice(0, 3);
        return NextResponse.json({data:top3Doctors})
    } catch (error) {
       NextResponse.json(error)
    }
}