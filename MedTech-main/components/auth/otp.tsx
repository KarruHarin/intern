"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import FormSuccess from "./form-sucess";
import FormError from "./form-error";
import { otpVerify } from "@/schema";
import { verifyOtp } from "@/actions/auth/otp-verify";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-warpper";
import * as z from "zod";
import {
    Form
} from "@/components/ui/form";
import { useRouter } from 'next/navigation';

// Define the type for form values
type FormValues = z.infer<typeof otpVerify>;

interface InputOTPPatternProps {
    control: any; // Replace with correct type if possible
}

const InputOTPPattern: React.FC<InputOTPPatternProps> = ({ control }) => (
    <Controller
        name="otp"
        control={control}
        render={({ field }) => (
            <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                        <InputOTPSlot key={index} index={index} {...field} />
                    ))}
                </InputOTPGroup>
            </InputOTP>
        )}
    />
);

export const OtpVerification: React.FC = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(otpVerify),
        defaultValues: {
            otp: "",
        }
    });

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        startTransition(() => {
            verifyOtp(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    if (data?.success && data?.token) {
                        // Assuming `data.token` contains the token parameter
                        router.push(`/auth/new-password?token=${data.token}`);
                    }
                })
                .catch((err) => setError("An error occurred. Please try again."));
        });
    };


    return (
        <div className="flex justify-evenly h-[100vh]">
            <div className="absolute sm:top-4 sm:left-10 z-10 w-20 h-20">
                <Link href="/"><Image src={logo} alt="Logo" layout="fill" objectFit="contain" /></Link>
            </div>
            <div className="sm:flex sm:w-[50vw] flex sm:mt-0 mt-[140px] justify-center z-10 items-center">
                <CardWrapper
                    headerTitle="OTP Verification"
                    headerLabel="Enter the OTP sent to your email"
                    backButtonLabel="Go back"
                    backButtonHref="/auth/login"
                >
                    <Form {...form}>
                        <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
                            <InputOTPPattern control={form.control} />
                            {error && <FormError message={error} />}
                            {success && <FormSuccess message={success} />}
                            <Button className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500" disabled={isPending} type="submit">
                                {isPending ? "Verifying..." : "Verify OTP"}
                            </Button>
                            <Button size="sm" variant="link" asChild className="text-blue-500 px-0 font-normal flex justify-end">
                                <Link href="/auth/resend-otp">Resend OTP?</Link>
                            </Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    );
};
