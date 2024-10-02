"use client";

import { Dialog, DialogOverlay, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
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
import FormSucess from "../auth/form-sucess";
import FormError from "../auth/form-error";
import { PhoneInput } from "react-international-phone";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema } from "@/schema/dashboard/profile";
import { z } from "zod";
import { updateProfile } from "@/actions/profile/updateProfile";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

export function Modal({details,refresh}: any) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      email: details?.email,
      name: details?.name,
      about: details?.about,
      password: ""
    },
  });
 
  const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
    startTransition(() => {
        updateProfile({ ...values},details.id).then((data) => {
          if (data.success) {
            toast({
              variant:'primary',
              title: "Profile updated successfully",
            })
            setSuccess(data.success);
            refresh();
            setDialogOpen(false);
          } else if (data.error) {
            toast({
              variant: "destructive",
              title: "Try again",
            })
            setError(data.error);
          }}
   ) });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger  asChild>
        <Button variant="outline" onClick={() => setDialogOpen(true)}>Edit<span className="md:block hidden">&nbsp;Profile</span></Button>
      </DialogTrigger>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={details?.name}
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
                          defaultValue={details?.email}
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
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New password"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea
                          defaultValue={details?.about}
                          disabled={isPending}
                          {...field}
                          placeholder="About you"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormSucess message={success} />
              <FormError message={error} />
              <Button
                className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                disabled={isPending}
                type="submit"
              >
                Update
              </Button>
            </form>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
