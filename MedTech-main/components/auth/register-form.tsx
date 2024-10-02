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
import { RegisterSchema } from "@/schema";
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
import { PhoneInput } from "react-international-phone";
import { useRouter } from "next/navigation";
// Define the schema with confirmPassword field and custom validation
const ExtendedRegisterSchema = RegisterSchema.extend({
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Field which contains the error
});

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [role, setRole] = useState<"USER" | "ADMIN" | "DOCTOR">("USER"); // State for user role
  const router = useRouter();
  const form = useForm<z.infer<typeof ExtendedRegisterSchema>>({
    resolver: zodResolver(ExtendedRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      role: "USER",
    },
  });

  const onSubmit = (values: z.infer<typeof ExtendedRegisterSchema>) => {
    startTransition(() => {
      register({ ...values, role }).then((data) => {
        if(data.data){localStorage.setItem('email', data?.data.email||'');}
        setError(data?.error);
        setSucess(data?.success);
        if(!data.data?.emailVerified){
         router.push('/auth/verify-email')
        }
      });
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <span className="font-bold">
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
                  className={`w-1/2 mr-2 ${role === "USER"
                      ? "bg-purple-700 hover:bg-purple-500"
                      : "bg-purple-400 hover:bg-purple-300"
                    }`}
                  type="button"
                  onClick={() => setRole("USER")}
                >
                  User
                </Button>
                <Button
                  className={`w-1/2 ml-2 ${role === "DOCTOR"
                      ? "bg-purple-700 hover:bg-purple-500"
                      : "bg-purple-400 hover:bg-purple-300"
                    }`}
                  type="button"
                  onClick={() => setRole("DOCTOR")}
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            disabled={isPending}
                            {...field}
                            placeholder="Confirm your password"
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
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          defaultCountry="in"
                          className="rounded-md border bg-transparent  text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
                          placeholder="Telephone"
                          disabled={isPending}
                          {...field}
                        />
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
                <Link href={"/auth/phone-register"}>Use Phone number</Link>
              </div>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};