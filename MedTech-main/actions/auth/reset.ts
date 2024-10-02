"use server"

import { ResetSchema } from "@/schema"
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { sendPasswordReset } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";


export const reset = async(values:z.infer<typeof ResetSchema>)=>{
    const validatedFileds = ResetSchema.safeParse(values);

    if(!validatedFileds.success){
        return {error : "Invalid emial"}
    }

    const {email} = validatedFileds.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return {error:"Email Not found"}
    }

    const passowrdResetToken = await generatePasswordResetToken(email);
    await sendPasswordReset(
        passowrdResetToken.email,
        passowrdResetToken.token
    ) 

    return {sucess:"Reset Mail Sent"}

}
