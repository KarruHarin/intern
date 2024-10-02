"use server"

import { getUserById } from "@/data/user"

export const AddHealthMonitoring = async (userId:string,value:any)=>{
    try {
      const user = await getUserById(userId)
      console.log(user)
      console.log(value)
      return user
    } catch (error) {
        console.log(error);
        
    }
}