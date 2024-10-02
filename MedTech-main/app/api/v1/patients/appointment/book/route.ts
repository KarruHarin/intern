import { BookAppointment } from "@/actions/appointment/appoint"
import { NextResponse } from "next/server";

export const POST =async(req: Request)=>{
    try {
        const response = await req.json()
        const result = await BookAppointment(response);
        
        return NextResponse.json(result)
    } catch (error) {
        console.log(error);
        
        return NextResponse.json(error)
    }
}