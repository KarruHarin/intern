"use client"
import { CardWrapper } from "./card-warpper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod";
import { Button } from "../ui/button"
import { reset } from "@/actions/auth/reset"
import { useState, useTransition } from "react"
import FormSucess from "./form-sucess"
import FormError from "./form-error"
import Link from "next/link"
import Image from "next/image"
import img from "@/app/images/Display.png"
import logo from "@/app/images/logo.png"
import { ResetSchema, ResetUsingNumber } from "@/schema"
import {reset1} from "@/actions/auth/reset-using-number"
import { useRouter } from 'next/navigation';

export const ResetForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [sucess, setSucess] = useState<string | undefined>("");
    const [error1, setError1] = useState<string | undefined>("");
    const [sucess1, setSucess1] = useState<string | undefined>("");
    const router = useRouter();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setSucess(data?.sucess)
                })
        })
    }

    const form1 = useForm<z.infer<typeof ResetUsingNumber>>({
        resolver: zodResolver(ResetUsingNumber),
        defaultValues: {
            phone: "",
        }
    });

    const onSubmit1 = (values: z.infer<typeof ResetUsingNumber>) => {
        startTransition(() => {
           reset1(values)
                .then((data) => {
                    setError1(data?.error);
                    setSucess1(data?.success)
                    if (data?.success) {
                        router.push("/auth/otp");
                    }
                })
        })
    }


    return (
        <div className="flex justify-evenly h-[100vh]">
            <div className="absolute sm:top-4 sm:left-10 z-10 w-20 h-20">
                <Link href="/"><Image src={logo} alt="Logo" layout="fill" objectFit="contain" /></Link>
            </div>
            <div className="absolute sm:top-10 top-[100px] sm:right-10 z-20 text-gray-600">
                <span>Remembered your password? <Link href="/auth/login" className="text-purple-700 font-bold-700">Sign in</Link> </span>
            </div>
            <div className="">
                <Image
                    alt="Reset Password Image"
                    src={img}
                    className="w-screen h-full"
                    fill
                />
            </div>
            <div className="sm:flex sm:w-[50vw] sm:mt-0 mt-[140px] justify-center z-10 items-center">
                <CardWrapper
                    headerTitle="Reset Password"
                    headerLabel="Forgot Your Password?"
                    backButtonLabel="Back to Login"
                    backButtonHref="/auth/login"
                >
                    <Form {...form} >
                        <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    {...field}
                                                    placeholder="Enter your email"
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormSucess message={sucess} />
                            <FormError message={error} />
                            <Button className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500" disabled={isPending} type="submit">Send reset email</Button>
                        </form>
                    </Form>
                    <br></br>
                    <span className="flex justify-center items-center">Or</span>
                    
                    <Form {...form1} >
                        <form className="flex flex-col" onSubmit={form1.handleSubmit(onSubmit1)}>
                            <div>
                                <FormField
                                    control={form1.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    {...field}
                                                    placeholder="Enter your Phone Number"
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormSucess message={sucess1} />
                            <FormError message={error1} />
                            <Button className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500" disabled={isPending} type="submit">Send Otp</Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    )
}
