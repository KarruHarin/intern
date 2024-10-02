import { GetTrack } from "@/actions/tracker/getTrack"
import { NextResponse } from "next/server";

export const POST =async (req:any)=>{
   try {
     const body = await req.json(); 
     const result = await GetTrack(body.id)
     return NextResponse.json(result)
   } catch (error) {
    return NextResponse.json(error);
   }
}