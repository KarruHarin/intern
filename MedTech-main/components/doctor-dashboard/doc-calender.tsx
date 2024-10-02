"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Calendar } from "../ui/calendar";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CalenderAndAppointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="col-span-6  lg:col-span-2">
      <CardHeader className="p-3">
        <div className="flex justify-between">
          <h1 className="text-lg lg:text-[1.4vw] font-semibold">Calendar</h1>
        </div>
      </CardHeader>
      <CardContent className=" justify-center items-center flex">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </CardContent>
      <CardFooter className="p-3 border-0 flex-col">
        <div className="flex w-full justify-between">
          <h1 className="text-lg lg:text-[1.4vw] font-semibold">Upcoming</h1>
          <Link
            className=" text-sm text-primary font-medium gap-1 flex items-center hover:underline"
            href={"#"}
          >
            View all
            <FaAngleRight />
          </Link>
        </div>
        <div className="w-full mt-2" >
          <Card className="flex gap-2 p-2 w-full">
            <Avatar className=" h-12 w-12">
              <AvatarImage
                src="https://avatar.iran.liara.run/public"
                alt="@shadcn"
              />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start gap-1">
              <p className="text-base font-semibold">Dr. John Doe</p>
              <p className="text-[12px] leading-none text-muted-foreground">
               8 april 2021 | 10:00 AM
              </p>
            </div>
          </Card>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CalenderAndAppointments;
