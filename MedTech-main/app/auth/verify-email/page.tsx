"use client"
import React, { useState, startTransition, useEffect } from "react";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import Link from "next/link";
import img from "@/app/images/Display.png";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { VerifyOtp } from "@/actions/auth/VerifyEmailOtp";
import { useRouter } from "next/navigation";
import FormError from "@/components/auth/form-error";

const Page = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null);
  const handleOtpChange = (value: string) => {
    setOtp(value); 
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail);
    }
  }, []);
 
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async() => {
     if(email){ const result = await VerifyOtp(otp,email)
      if(result){
        router.push('/auth/login')
      }
      setError("Enter valid otp")}
    });
  };

  return (
    <div className="flex justify-evenly h-[100vh]">
      <div className="">
        <Image alt="Login Image" src={img} fill />
      </div>
      <div className="absolute sm:top-4 sm:left-10 z-10 w-20 h-20">
        <Link href="/">
          <Image src={logo} alt="Logo" layout="fill" objectFit="contain" />
        </Link>
      </div>
      <div className="absolute sm:top-10 top-[100px] sm:right-10 z-20 text-gray-600">
        <span className="font-bold">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-purple-700 font-bold-700">
            Sign up
          </Link>{" "}
        </span>
      </div>
      <div className="sm:flex sm:w-[50vw] sm:mt-0 mt-[140px] justify-center z-10 items-center">
        <Card className="p-4">
          <form onSubmit={onSubmit}>
            <div>
              <label className="block text-lg font-medium text-gray-700">Enter OTP</label>
              <div className="relative mt-2">
                <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <FormError message={error} />
           <div className="flex justify-end">
           <Button type="submit" className="mt-4">
              Submit
            </Button>
           </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Page;
