import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { RiMapPin2Line } from "react-icons/ri";
import { Separator } from "../ui/separator";

const NearbyDoctors = () => {
  return (
    <div className="pt-4  w-full">
      <div className="flex py-4 justify-between">
        <h2 className="text-lg lg:text-[1.4vw] font-semibold">
          Nearby Doctors
        </h2>
        <span className=" text-sm text-primary font-medium gap-1 flex items-center hover:underline">
          View all <FaAngleRight />
        </span>
      </div>
      <div className="grid grid-cols-6 gap-3">
        <NearDoctorCard />
        <NearDoctorCard />
        <NearDoctorCard />
      </div>
    </div>
  );
};

export default NearbyDoctors;

const NearDoctorCard = () => {
  return (
    <div className=" col-span-3 lg:col-span-2">
      <Card className="p-2">
        <CardContent className="rounded-xl overflow-hidden p-0 flex items-center">
          <div className="flex gap-2 items-center">
            <Image
              alt="Image"
              className=" aspect-square rounded-md"
              width={60}
              height={30}
              src={"https://avatar.iran.liara.run/public"}
            />
            <div>
              <p className="text-base font-semibold leading-none">
                Dr. Madhukar
              </p>
              <span className=" text-[12px] text-gray-600">Gynecologist</span>
            </div>
          </div>
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="p-0 flex gap-2 text-[12px] text-gray-600">
          <RiMapPin2Line className="text-lg" />
          <p className=" leading-snug">
            1 km <br />
            Delhi Road
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
