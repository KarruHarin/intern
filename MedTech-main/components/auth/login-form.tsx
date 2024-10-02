"use client";
import { Suspense } from "react"; // Import Suspense from React
import { CardWrapper } from "../auth/card-warpper";
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
import { LoginSchema, validateEmailOrPhone } from "@/schema";
import { Button } from "../ui/button";
import { login } from "@/actions/auth/login";
import { useState, useTransition } from "react";
import FormSucess from "./form-sucess";
import FormError from "./form-error";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from "@/app/images/Display.png";
import logo from "@/app/images/logo.png";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";
import { Card } from "../ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { VerifyOtp } from "@/actions/auth/VerifyEmailOtp";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('')
  // Use useSearchParams() directly
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different Provider "
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    const data = {
      ...(validateEmailOrPhone(values.identifier) === "email"
        ? { email: values.identifier }
        : validateEmailOrPhone(values.identifier) === "phone"
        ? { phone: values.identifier }
        : {}),
      password: values.password,
    };

    startTransition(() => {
      login(data).then((data) => {
       if(data){ setError(data?.error);
        setSucess(data?.success);
        if(data?.data?.emailVerified===null&&data?.data?.email){
          setEmail(data?.data?.email)
          setOpen(true)
        }}
      });
    });
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const SubmitOtp =(e: React.FormEvent)=>{
      e.preventDefault();
      startTransition(async() => {
       if(email){ 
        const result = await VerifyOtp(otp,email)
        if(result){
         setOpen(false)
        }
        setError("Enter valid otp")}
      });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Enter OTP
            </label>
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
            <Button onClick={SubmitOtp} className="mt-4">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
            Dont have an account?{" "}
            <Link
              href="/auth/register"
              className="text-purple-700 font-bold-700"
            >
              Sign up
            </Link>{" "}
          </span>
        </div>
        <div className="sm:flex sm:w-[50vw] sm:mt-0 mt-[140px] justify-center z-10 items-center">
          <CardWrapper
            headerTitle="Sign in"
            headerLabel="Welcome Back"
            backButtonLabel="Dont have an Account"
            backButtonHref="/auth/register"
            showSocial
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email or Number</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            placeholder="Enter your email"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                              placeholder="Enter your password"
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
                <FormSucess message={sucess} />
                <FormError message={error || urlError} />
                <Button
                  className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                  disabled={isPending}
                  type="submit"
                >
                  Login
                </Button>
                <div className="w-full flex mt-3 text-primary font-semibold hover:underline justify-end">
                  <Link href={"/auth/otp-login"}>Login with Otp</Link>
                </div>
                <Button
                  size="sm"
                  variant="link"
                  asChild
                  className="text-blue-500 px-0 font-normal flex justify-end"
                >
                  <Link href="/auth/reset">Forgot Password?</Link>
                </Button>
              </form>
            </Form>
          </CardWrapper>
        </div>
      </div>
    </>
  );
};
