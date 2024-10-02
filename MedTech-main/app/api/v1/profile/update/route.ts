import { NextResponse } from "next/server"
import bcrypt from "bcrypt";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const POST= async(req:any)=>{
   try{
   const request= await req.json()
   const { email, name, password,phone, about,userId } = request;
   let hashedPassword = undefined;
 
   if (password) {
     hashedPassword = await bcrypt.hash(password, 10);
   }
 
   const user = await getUserById(userId);
 
   const updateData: any = {
     name,
     about,
     phone,
     email,
     numberVerified:phone?false:user?.numberVerified,
     password: hashedPassword || user?.password,
     emailVerified: email?null:user?.emailVerified,
   };

   const updatedUser = await db.user.update({
     where: { id: userId },
     data: updateData,
   });

   return NextResponse.json({success: "Profile updated successfully",user:updatedUser });
 
 } catch (error) {
   return NextResponse.json({ error: "An error occurred while updating the profile" });
 }
}