import { NumberRegister } from "@/actions/auth/number-register";
import { NextResponse } from "next/server";

export const POST = async(req:any)=>{
     try{
      const body = await req.json(); 
      const data = await NumberRegister(body)
      return NextResponse.json(data);
     }catch(err){
        console.log(err);
        
     }
}