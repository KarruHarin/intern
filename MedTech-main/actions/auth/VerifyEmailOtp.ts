"use server"

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db"

export const VerifyOtp = async(otp:string,email:string)=>{
   try {
    if(!otp ||!email){ 
      return {error: "Enter valid email and otp"}

    }    
     const result = await db.emailOtp.findFirst({
         where: {
           otp: otp, 
           email: email
         },
       });

       if(result?.email){
        const exisitingUser = await getUserByEmail(email);
        if(exisitingUser){await db.user.update({
          where:{id:exisitingUser.id},
          data:{  
              emailVerified:new Date(),
          }
      })}
      const updatedUser = await getUserByEmail(email);
      return updatedUser
     }
       return null
   } catch (error) {
    console.log(error);
   }
}