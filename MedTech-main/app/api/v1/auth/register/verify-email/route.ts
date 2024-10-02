import { VerifyOtp } from "@/actions/auth/VerifyEmailOtp";
import { NextResponse } from "next/server";

export const POST = async(req:any)=>{
     try{
      const body = await req.json();      
      const data = await VerifyOtp(body.otp,body.email)
      return NextResponse.json({user:data});
     }catch(err){
        console.log(err);     
      return NextResponse.json(err)
     }
}