import { registerOtp } from "@/actions/auth/registerOtp";
import { NextResponse } from "next/server";

export const POST = async(req:any)=>{
     try{
      const body = await req.json();
      const data = await registerOtp(body)
      return NextResponse.json(data);
     }catch(err){
        console.log(err);     
     }
}