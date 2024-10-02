import { v4 as uuidv4 } from "uuid";
import crypto from 'crypto';
import twilio from 'twilio';
import { getVerificationTokenByEmail } from "@/data/verificationtoken";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-resset-token";

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour from now
    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
        await db.passwordReset.delete({
            where: { id: existingToken.id },
        });
    }

    const passwordReset = await db.passwordReset.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordReset;
};




// export const generateNumberResetToken = async (number: string) => {
//     const token = uuidv4();
//     const expires = new Date(Date.now() + 3600 * 1000); // 1 hour from now
//     const existingToken = await getPasswordResetTokenByEmail(email);
//     if (existingToken) {
//         await db.passwordReset.delete({
//             where: { id: existingToken.id },
//         });
//     }

//     const passwordReset = await db.passwordReset.create({
//         data: {
//             email,
//             token,
//             expires,
//         },
//     });

//     return passwordReset;
// };

export const getVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour from now
    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
    return verificationToken;
};
export const sendOtp = async (phone: string) => {
    
    try {
        const otp = (crypto.randomBytes(3).readUIntBE(0, 3) % 1000000).toString().padStart(6, '0');   
        // Uncomment and configure the following lines if you want to send OTP via Twilio
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
        });

        // Store the hashed OTP and phone number in the database
        await db.otp.create({
            data: {
                phone,
                otp: otp,
                expiry: new Date(Date.now() + 10 * 60 * 1000), // OTP expires after 10 minutes
            },
        });

        return { success: "OTP sent!" };
    } catch (err) {
        console.log(err);
        return { error: "Could not send OTP" };
    }
}


