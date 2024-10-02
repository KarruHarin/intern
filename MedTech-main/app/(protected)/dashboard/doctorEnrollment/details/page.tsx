"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { docDeatail } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { startTransition, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EnrollDoctorDetails } from "@/actions/DoctorEnroll/enrollDoctorDetail";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";

export default function Page() {
  const router = useRouter();
  const { id, role } = useUser();

  const form = useForm<z.infer<typeof docDeatail>>({
    resolver: zodResolver(docDeatail),
    defaultValues: {
      availableTimeFrom: "",
      availableTimeSlot: [],
      availableDays: [],
      sessionFees: "",
      sessionLength: "",
      languages: [],
    },
  });

  const [isPending] = useState(false);
  const languages = [
    "English",
    "Hindi",
    "Telugu",
    "Tamil",
    "Marathi",
    "Kannada",
    "Other",
  ];

  // Time slots available for selection
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];

  const [availableTimes, setAvailableTimes] = useState(timeSlots); // Initialize available times with all time slots
  const [isStartTimeSelected, setIsStartTimeSelected] = useState(false); // Track if start time is selected

  const onSubmit = (values: any) => {
    startTransition(() => {
      EnrollDoctorDetails(id, values).then((data: any) => {
        if (data.success) {
          router.push("/dashboard/doctorEnrollment/certificate-verification");
        }
      });
    });
  };

  useEffect(() => {
    const selectedStartTime = form.getValues("availableTimeFrom");
    if (selectedStartTime) {
      const filteredTimes = timeSlots.filter(
        (time) => time > selectedStartTime
      );
      setAvailableTimes(filteredTimes);
      setIsStartTimeSelected(true); // Mark start time as selected
    } else {
      setIsStartTimeSelected(false); // Reset if no start time is selected
      setAvailableTimes(timeSlots); // Reset available times to all
    }
  }, [form.watch("availableTimeFrom")]); // Trigger when availableTimeFrom changes

  if (role !== "DOCTOR") {
    router.push("/dashboard");
    return <h2>Only for doctors</h2>;
  }

  return (
    <div className="flex flex-col p-5 sm:p-10 gap-8 sm:gap-10">
      <div className="flex flex-col text-center sm:text-left">
        <h1 className="text-xl font-bold">Add Availability</h1>
        <p>
          Visitors will only be able to schedule appointments during available
          hours
        </p>
      </div>
      <div className="flex sm:flex-row flex-col sm:text-left text-center gap-8 sm:gap-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex sm:flex-row flex-col gap-5">
              <div className="flex flex-col">
                <div className="flex flex-col gap-3 mb-5 w-full sm:w-auto">
                  <FormField
                    control={form.control}
                    name="availableTimeFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-lg">
                          Select Start Time
                        </FormLabel>
                        <FormControl className="text-center sm:text-left">
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full sm:w-[20vw]">
                              <SelectValue placeholder="Select start time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time} {time.endsWith("00") ? "AM" : "PM"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Show available times only if start time is selected */}
                {isStartTimeSelected && (
                  <div className="flex flex-col gap-3 mb-5">
                    <FormField
                      control={form.control}
                      name="availableTimeSlot"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-semibold text-lg">
                            Available Times
                          </FormLabel>
                          <FormControl className="text-center sm:text-left">
                            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                              {availableTimes.map((time) => (
                                <div key={time} className="flex items-center">
                                  <label className="flex items-center gap-2">
                                    <Checkbox
                                      checked={field.value.includes(time)}
                                      onCheckedChange={(checked) => {
                                        const currentSelectedTimes =
                                          field.value;

                                        if (checked) {
                                          form.setValue("availableTimeSlot", [
                                            ...currentSelectedTimes,
                                            time,
                                          ]);
                                        } else {
                                          form.setValue(
                                            "availableTimeSlot",
                                            currentSelectedTimes.filter(
                                              (t) => t !== time
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <span>{time}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Other form fields remain unchanged */}
            <div className="flex mb-5 flex-col gap-3">
              <FormField
                control={form.control}
                name="availableDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      Choose any day of the week to repeat this availability.
                    </FormLabel>
                    <FormControl>
                      <div className="flex pt-4 flex-wrap gap-4 justify-center sm:justify-start">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                          <label key={day} className="flex items-center">
                            <input
                              type="checkbox"
                              value={day}
                              className="hidden"
                              checked={field.value.includes(day)}
                              onChange={(e) => {
                                const selectedDays = [...field.value];
                                if (e.target.checked) {
                                  selectedDays.push(day);
                                } else {
                                  const index = selectedDays.indexOf(day);
                                  if (index > -1) {
                                    selectedDays.splice(index, 1);
                                  }
                                }
                                field.onChange(selectedDays);
                              }}
                            />
                            <div
                              className={`w-12 h-10 flex items-center justify-center border-2 rounded-md ${
                                field.value.includes(day)
                                  ? "bg-purple-600"
                                  : "bg-gray-200"
                              } cursor-pointer`}
                            >
                              <span
                                className={`${
                                  field.value.includes(day)
                                    ? "text-white"
                                    : "text-gray-800"
                                }`}
                              >
                                {day}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex sm:flex-row flex-col gap-5">
              <div className="flex flex-col gap-3 mb-5 w-full sm:w-auto">
                <FormField
                  control={form.control}
                  name="sessionFees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-lg sm:text-left text-center">
                        Fees Per Session
                      </FormLabel>
                      <FormControl className="text-center sm:text-left">
                        <Input
                          disabled={isPending}
                          type="number"
                          {...field}
                          placeholder="Enter your fee"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3 mt-auto mb-5 w-full sm:w-auto">
                <FormField
                  control={form.control}
                  name="sessionLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-lg sm:text-left text-center">
                        Session Length (min.)
                      </FormLabel>
                      <FormControl className="text-center sm:text-left">
                        <Input
                        type="number"
                          disabled={isPending}
                          {...field}
                          placeholder="Enter session length in minutes"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex mb-5 flex-col gap-3">
              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      Choose the languages you speak.
                    </FormLabel>
                    <FormControl>
                      <div className="flex pt-4 flex-wrap gap-4 justify-center sm:justify-start">
                        {languages.map((language) => (
                          <label key={language} className="flex items-center">
                            <input
                              type="checkbox"
                              value={language}
                              className="hidden"
                              checked={field.value.includes(language)}
                              onChange={(e) => {
                                const selectedLanguages = [...field.value];
                                if (e.target.checked) {
                                  selectedLanguages.push(language);
                                } else {
                                  const index =
                                    selectedLanguages.indexOf(language);
                                  if (index > -1) {
                                    selectedLanguages.splice(index, 1);
                                  }
                                }
                                field.onChange(selectedLanguages);
                              }}
                            />
                            <div
                              className={`w-32 h-10 flex items-center justify-center border-2 rounded-md ${
                                field.value.includes(language)
                                  ? "bg-purple-600"
                                  : "bg-gray-200"
                              } cursor-pointer`}
                            >
                              <span
                                className={`${
                                  field.value.includes(language)
                                    ? "text-white"
                                    : "text-gray-800"
                                }`}
                              >
                                {language}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center">
              <Button disabled={isPending} type="submit">
                {isPending ? "Processing..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
