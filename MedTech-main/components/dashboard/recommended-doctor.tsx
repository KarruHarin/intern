import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { FaAngleRight } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { GiTwoCoins } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import { Button } from "../ui/button";
import Link from "next/link";

const RecommendedDoctors = () => {
  return (
    <Card className=" col-span-6">
      <div className="p-3 flex justify-between items-center">
        <h1 className="text-lg lg:text-[1.4vw] font-semibold">
          Recommended Doctors
        </h1>
        <span className=" text-sm text-primary font-medium gap-1 flex items-center hover:underline">
          View all <FaAngleRight />
        </span>
      </div>
      <CardContent className=" grid grid-cols-6 gap-3"></CardContent>
    </Card>
  );
};

export default RecommendedDoctors;

export const DoctorCard = ({ data }: any) => {
  return (
    <div className=" col-span-6 md:col-span-3 lg:col-span-2">
      <Card className="p-2">
        <CardContent className="rounded-xl overflow-hidden p-2 flex items-center">
          <div className="flex gap-2">
            <Avatar className=" aspect-square h-16 w-16">
              <AvatarImage
                src="https://avatar.iran.liara.run/public"
                alt="@shadcn"
              />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div className=" flex flex-col items-start gap-1">
              <p className="text-base font-semibold">
                {data?.profile?.legalName}
              </p>
              <div className="text-[12px] flex text-gray-600">
                <span>{data?.profile?.specialization}</span>&nbsp;|&nbsp;
                <span>{data?.profile?.experienceYears} Years</span>
              </div>
              <Badge variant="secondary">{data?.profile?.subSpecialist}</Badge>
            </div>
          </div>
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="p-2 w-full flex flex-col gap-2 ">
          <div className="flex py-2 w-full gap-3">
            <div className="flex gap-1 ">
              <IoMdTime />
              <div>
                <p className="text-md leading-none flex font-medium">
                  {data?.availability?.availableDays?.length >= 1 &&
                  data?.availability?.availableDays?.length <= 3
                    ? data.availability.availableDays.join(", ")
                    : data?.available_days?.length > 0
                    ? `${data.available_days[0]} - ${
                        data.available_days[data.available_days.length - 1]
                      }`
                    : "No available days"}
                </p>
                <span className="text-[12px] text-gray-600">
                  {data?.availability?.availableTimeFrom} AM -{" "}
                  {data?.availability?.availableTimeTo} PM
                </span>
              </div>
            </div>
            <div className="flex pl-2 gap-1 border-l">
              <GiTwoCoins />
              <div>
                <p className="text-md leading-none font-medium">
                  Rs.{data?.profile?.consultationFees}
                </p>
                <span className="text-[12px] text-gray-600">Starting</span>
              </div>
            </div>
          </div>
          <Link className="w-full" href={`consult/${data.id}`}>
            <Button className="w-full">Book an appointment</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
