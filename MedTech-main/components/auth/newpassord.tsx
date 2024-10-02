// File: /components/NewPasswordForm.tsx
"use client";
import { CardWrapper } from "./card-warpper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Button } from "../ui/button";
import { newPassword } from "@/actions/auth/new-password";
import { useState, useTransition } from "react";
import FormSuccess from "./form-sucess";
import FormError from "./form-error";
import { NewPasswordSchema } from "@/schema";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/images/logo.png";

export const NewPasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [showPassword, setShowPassword] = useState(false);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        if (!token) {
            setError("Token is missing.");
            return;
        }
        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                        setSuccess(undefined);
                    } else {
                        setSuccess("Password reset successfully.");
                        setError(undefined);
                    }
                })
                .catch(() => {
                    setError("An unexpected error occurred.");
                    setSuccess(undefined);
                });
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-evenly h-[100vh]">
            <div className="absolute sm:top-4 sm:left-10 z-10 w-20 h-20">
                <Link href="/"><Image src={logo} alt="Logo" layout="fill" objectFit="contain" /></Link>
            </div>
            <div className="sm:flex sm:w-[50vw] sm:mt-0 mt-[140px] justify-center z-10 items-center">
                <CardWrapper
                    headerTitle="New Password"
                    headerLabel="Enter a New Password"
                    backButtonLabel="Back to Login"
                    backButtonHref="/auth/login"
                >
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) => {
                                onSubmit(values);
                            })}
                        >
                            <div>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        placeholder="*******"
                                                        type={showPassword ? "text" : "password"}
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <button
                                                            type="button"
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {success && <FormSuccess message={success} />}
                            {error && <FormError message={error} />}
                            <Button className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500" disabled={isPending} type="submit">
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    );
};
