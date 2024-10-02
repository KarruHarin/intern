"use client";
import { Dialog, DialogOverlay, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyNumber } from "@/schema/dashboard/profile";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "../ui/input-otp";
import { loginOtp } from "@/actions/auth/loginOtp";
import { PhoneInput } from "react-international-phone";
import FormSucess from "../auth/form-sucess";
import FormError from "../auth/form-error";
import { verifyOtp1 } from "@/actions/auth/profileOtp";

export const PhoneVerify = ({ details,data1, refresh }: any)=> {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof VerifyNumber>>({
        resolver: zodResolver(VerifyNumber),
        defaultValues: {
            phone: "",
            otp: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof VerifyNumber>) => {
        try {
            startTransition(() => {
                verifyOtp1({...values},data1).then((data) => {
                    if (data?.success) {
                        setSuccess("OTP Verified successfully!");
                        toast({
                            variant: 'primary',
                            title: "Profile updated successfully",
                        })
                        setError("");
                        refresh();
                        setDialogOpen(false);
                    } else {
                        setError("Error Occurred");
                        toast({
                            variant: "destructive",
                            title: "Try again",
                        })
                    }
                });
            });
        } catch (err) {
            setError("An unexpected error occurred.");
            console.error(err); // Log the error
        }
    };

    const onSendOtp = () => {
        const phone = form.getValues("phone");
        if (phone) {
            startTransition(() => {
                loginOtp({ phone }).then((data) => {
                    if (data?.success) {
                        setSuccess("OTP sent successfully!");
                        setError("");
                    } else {
                        setError(data?.error);
                    }
                });
            });
        } else {
            setError("Please enter a valid phone number.");
        }
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setDialogOpen(true)}>Verify<span className="md:block hidden">&nbsp;Number</span></Button>
            </DialogTrigger>
            <DialogOverlay>
                <DialogContent className="overflow-y-hidden flex justify-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone no.</FormLabel>
                                        <FormControl>
                                            <div className="flex w-full items-center gap-2">
                                                <PhoneInput
                                                    defaultCountry="in"
                                                    className="rounded-md border bg-transparent text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
                                                    placeholder="Telephone"
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                                <Button type="button" onClick={onSendOtp}>
                                                    Send OTP
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-center">OTP</FormLabel>
                                        <FormControl>
                                            <div className="relative flex justify-center">
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup className="flex space-x-2">
                                                        <InputOTPSlot
                                                            index={0}
                                                            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                        />
                                                        <InputOTPSlot
                                                            index={1}
                                                            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                        />
                                                        <InputOTPSlot
                                                            index={2}
                                                            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator className="w-4 h-12 flex items-center justify-center text-gray-500" />
                                                    <InputOTPGroup className="flex space-x-2">
                                                        <InputOTPSlot
                                                            index={3}
                                                            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                        />
                                                        <InputOTPSlot
                                                            index={4}
                                                            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                        />
                                                        <InputOTPSlot
                                                            index={5}
                                                            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                        />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormMessage />
                            <FormSucess message={success} />
                            <FormError message={error} />
                            <Button
                                className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                                disabled={isPending}
                                type="submit"
                            >
                                Verify
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    );
}
