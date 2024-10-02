import { registerOtp } from "@/actions/auth/registerOtp";
import { sendVerificationEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export const POST = async(req:any)=>{
     try{
      const body = await req.json();
      const {email}=body
      const normalizedEmail = email.toLowerCase();
      await sendVerificationEmail(normalizedEmail);
      return NextResponse.json({success:"Send Successfully"});
     }catch(err){
        return NextResponse.json(err);
    }
}