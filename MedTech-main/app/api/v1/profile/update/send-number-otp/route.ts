import { registerOtp } from "@/actions/auth/registerOtp";
import { NextResponse } from "next/server";

export const POST = async(req:any)=>{
     try{
      const body = await req.json();
      const {phone} = body
      const data = await registerOtp(phone)
      if(data){

         return NextResponse.json({success:"Send Successfully",data:data});
      }
      return NextResponse.json({error:"Unable to Send Otp"});

     }catch(err){
        console.log(err);     
     }
}