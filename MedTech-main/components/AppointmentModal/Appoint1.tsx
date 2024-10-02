"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import FormSuccess from "../auth/form-sucess";
import FormError from "../auth/form-error";
import { DatePickerDemo } from "./DatePicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Define the schema
const AppointmentSchema = z.object({
  time: z.string().nonempty("Time is required"), // Time must be selected
  date: z.string().nonempty("Date is required"), // Date must be selected
});

export default function Appoint1({ details, onChangeApp }: any) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // Initialize form
  const form = useForm({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      time: "",
      date: "",
    },
  });

  const onSubmit =()=> {
    onChangeApp({time:form.getValues("time"),date:form.getValues("date")});
};

  return (
    <form
      className="space-y-6 p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-600">{details?.name}</h2>
        <p className="text-sm text-gray-600 mt-2">{details?.specialization}</p>
        <p className="text-sm text-gray-600">{details?.experience}</p>
      </div>

      <div>
        <hr className="border-gray-300 my-4" />
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">Select date</h3>
          <DatePickerDemo
            setDate={(e: any) => form.setValue("date", e)} // Set date on selection
            availableDays={details?.availability?.availableDays}
          />
        </div>
        <hr className="border-gray-300 my-4" />
      </div>

      <h3 className="text-xl font-bold">Available times</h3>
      <Select
        onValueChange={(value) => {
          form.setValue("time", value);
        }}
        defaultValue={form.getValues("time")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {details?.availability?.availableTimeSlot.map((val: string) => (
              <SelectItem key={val} value={val}>
                {val}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <FormSuccess message={success} />
      <FormError message={error} />

      <div className="text-center">
        <Button className="w-full" onClick={onSubmit}>
          Next
        </Button>
      </div>
    </form>
  );
}
