"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/auth/new-verification";
import { CardWrapper } from "./card-warpper";
import Link from "next/link";
import Image from "next/image";
import img from "@/app/images/preg.png";
import logo from "@/app/images/logo.png";
import { useRouter } from 'next/navigation';

const VerificationProcess = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return; // Prevent re-running if we already have a result

        if (!token) {
            setError("Missing token. Please check your email for the verification link.");
            return;
        }

        newVerification(token)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccess("Your email has been verified successfully.");
                    router.push("/auth/login");
                }
            })
            .catch(() => {
                setError("Something went wrong. Please try again.");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className="flex flex-col items-center w-full justify-center">
            {!success && !error && <BeatLoader />}
            {success && <p>Success: {success}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default function NewVerificationForm() {
    return (
        <div className="flex justify-evenly h-[100vh]">
            <div className="absolute top-4 left-10 z-10 w-20 h-20">
                <Link href="/"><Image src={logo} alt="Logo" layout="fill" objectFit="contain" /></Link>
            </div>
            <div className="relative w-[50vw] bg-black">
                <Image
                    alt="Verification Image"
                    src={img}
                    className="w-screen h-full"
                    fill
                />
            </div>
            <div className="flex w-[50vw] justify-center items-center">
                <CardWrapper
                    headerTitle="Verification"
                    headerLabel="Confirm Your Verification"
                    backButtonLabel="Back to Login"
                    backButtonHref="/auth/login"
                >
                    <Suspense fallback={<BeatLoader />}>
                        <VerificationProcess />
                    </Suspense>
                </CardWrapper>
            </div>
        </div>
    );
}
