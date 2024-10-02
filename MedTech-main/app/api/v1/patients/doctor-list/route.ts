import { getAllDoctorsWithDetails } from "@/actions/consult/consultDoc";
import { NextResponse } from "next/server";

export const GET = async()=>{
     try{
      const data = await getAllDoctorsWithDetails()
      return NextResponse.json(data);
     }catch(err){
        console.log(err);
        
     }
}