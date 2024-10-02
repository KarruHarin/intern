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
import { RegisterSchema, RegisterwithPhoneSchema } from "@/schema";
import { Button } from "../ui/button";
import { register } from "@/actions/auth/register";
import { useState, useTransition } from "react";
import FormSucess from "./form-sucess";
import FormError from "./form-error";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import img from "@/app/images/Display.png";
import logo from "@/app/images/logo.png";
import { NumberRegister } from "@/actions/auth/number-register";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { registerOtp } from "@/actions/auth/registerOtp";

import { PhoneInput } from "react-international-phone";

// Define the schema with confirmPassword field and custom validation

export const NumberRegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [role, setRole] = useState<"USER" | "ADMIN">("USER"); // State for user role

  const form = useForm<z.infer<typeof RegisterwithPhoneSchema>>({
    resolver: zodResolver(RegisterwithPhoneSchema),
    defaultValues: {
      name: "",
      phone: "",
      role: "USER",
      otp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterwithPhoneSchema>) => {
    startTransition(() => {
      NumberRegister({ ...values, role }).then((data) => {
        setError(data?.error);
        setSucess(data?.success);
      });
    });
  };

  const onSendOtp = () => {
    console.log('onSendOtp');
    
    const phone = form.getValues("phone");
    if (phone) {
      startTransition(() => {
        registerOtp(phone).then((data) => {
          if (data?.success) {
            setSucess("OTP sent successfully!");
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
    <div className="flex justify-evenly h-[100vh]">
      <div className="">
        <Image
          alt="Register Image"
          src={img}
          className="w-screen h-full"
          fill
        />
      </div>
      <div className="absolute sm:top-4 sm:left-10 z-10 w-20 h-20">
        <Link href="/">
          <Image src={logo} alt="Logo" layout="fill" objectFit="contain" />
        </Link>
      </div>
      <div className="absolute sm:top-10 top-[100px] sm:right-10 z-20 text-gray-600">
        <span>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-purple-700 font-bold-700">
            Sign in
          </Link>{" "}
        </span>
      </div>
      <div className="sm:flex sm:w-[50vw] w-[95vw] sm:mt-0 mt-[140px] justify-center z-10 items-center">
        <CardWrapper
          headerTitle="Register"
          headerLabel="Create an Account"
          backButtonLabel="Already have an Account?"
          backButtonHref="/auth/login"
          
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex justify-between mb-4">
                <Button
                  className={`w-1/2 mr-2 ${
                    role === "USER"
                      ? "bg-purple-700 hover:bg-purple-500"
                      : "bg-purple-400 hover:bg-purple-300"
                  }`}
                  type="button"
                  onClick={() => setRole("USER")}
                >
                  User
                </Button>
                <Button
                  className={`w-1/2 ml-2 ${
                    role === "ADMIN"
                      ? "bg-purple-700 hover:bg-purple-500"
                      : "bg-purple-400 hover:bg-purple-300"
                  }`}
                  type="button"
                  onClick={() => setRole("ADMIN")}
                >
                  Doctor
                </Button>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Enter your name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <div className="flex w-full items-center gap-2">
                          <PhoneInput
                           defaultCountry="in"
                            className="rounded-md border bg-transparent  text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
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
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <InputOTP maxLength={6} {...field}>
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormSucess message={sucess} />
              <FormError message={error} />
              <Button
                className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                disabled={isPending}
                type="submit"
              >
                Register
              </Button>
              <div className="w-full flex mt-3 text-primary font-semibold hover:underline justify-end">
                <Link href={"/auth/register"}>I have an email</Link>
              </div>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};
