import {Resend} from "resend"
import nodemailer from "nodemailer";
import { db } from "./db";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL;

// export const sendPasswordReset= async (
//     email:string,
//     token:string
// ) =>{
//     const resetLink = `${domain}/auth/new-password?token=${token}`;
//     await resend.emails.send({
//         from:"onboarding@resend.dev",   
//         to:email,
//         subject:"Reset Your Password",
//         html:`<p>Click<a href="${resetLink}"> here </a> to conform mail</p>`
//     });
// }

export const sendPasswordReset = async (email:string, token:string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "subadha.co.in@gmail.com",
      pass: "fdqv fzjl zxna qhmp", // Use an app-specific password
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: "onboarding@yourdomain.com",
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email.");
  }
};

// export const sendVerificationEmail = async (
//     email:string,
//     token:string
// ) =>{
//     const conformLink = `${domain}/auth/new-verification?token=${token}`;
//     await resend.emails.send({
//         from:"onboarding@resend.dev",   
//         to:email,
//         subject:"Conform your email",
//         html:`<p>Click<a href="${conformLink}"> here </a> to conform mail</p>`
//     });
// }

export const sendVerificationEmail = async (email:string) => {

  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "subadha.co.in@gmail.com",
      pass: "fdqv fzjl zxna qhmp",
    },
  });

  try {
    await db.emailOtp.deleteMany({
      where: { email },
    });
    const otp = crypto.randomInt(100000, 999999).toString();
    // Send email
    await db.emailOtp.create({
      data: {
        email,
        otp,
        expiry: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await transporter.sendMail({
      from: "onboarding@resend.dev",
      to: email,
      subject: "OTP for verification",
      html: `<p>Your OTP for verification is: <strong>${otp}</strong></p>`,
    });

  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email.");
  }

}
