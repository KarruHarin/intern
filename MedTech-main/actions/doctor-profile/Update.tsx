"use server"
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const UpdateAbout = async (id:string,about:string)=>{
   try {
     const updatedUser = await db.user.update({
         where: { id: id },
         data: {about:about},
       });
       if(updatedUser){
        return {success:'success'}
       }
   } catch (error) {
    return{error:'error'}
   }
}

export const UpdateProfilePicture = async (id:string,imageUrl:string)=>{
   try {
     const updatedUser = await db.user.update({
         where: { id: id },
         data: {image:imageUrl},
       });
       if(updatedUser){
        return {success:'success'}
       }
   } catch (error) {
    return{error:'error'}
   }

}

export const EditProfile = async (id:string,field:any,value:string)=>{
  try {
    const updatedUser = await db.user.update({
        where: { id: id },
        data: {[field]:value},
      });      
      if(updatedUser){
       return {success:'success'}
      }
  } catch (error) {
   return{error:'error'}
  }

}

export const UpdatePassword = async (id:string,value:string)=>{
  try {
    const hashedPassword = await bcrypt.hash(value, 10);
    const updatedUser = await db.user.update({
        where: { id: id },
        data: {password:hashedPassword},
      });      
      if(updatedUser){
       return {success:'success'}
      }
  } catch (error) {
   return{error:'error'}
  }

}