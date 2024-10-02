"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schema";
import { getPasswordResetTokenByToken } from "@/data/password-resset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs"
import {db} from "@/lib/db"

export const newPassword = async (
    values:z.infer<typeof NewPasswordSchema>,
    token?:string | null,
)=>{
    if(!token){
        return {error:"Missing token!"};
    }
    const validateFileds = NewPasswordSchema.safeParse(values);
    if(!validateFileds.success){
        return {error:"Invalid Field"}
    }
    const {password} = validateFileds.data;
    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return{error:"Invalid Token"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired){
        return {error:"Token has expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return {error : "Email not Found"}
    }

    const hasedPassword = await bcrypt.hash(password,10);
    await db.user.update({
        where:{id:existingUser.id},
        data:{password:hasedPassword}
        })

    await db.passwordReset.delete({
        where:{id:existingToken.id}
    }) 

    return {sucess:"Password Updated"}
}
