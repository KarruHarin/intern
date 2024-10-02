"use client"
import { getAllDoctorsWithDetails } from "@/actions/consult/consultDoc";
import { DoctorCard } from "@/components/dashboard/recommended-doctor";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [doctors,setDoctors]= useState<any>([])
  useEffect(()=>{
    (async()=>{
      const doc = await getAllDoctorsWithDetails();
      setDoctors(doc)
    })()
  },[])

  return (
    <>
      <div className="p-4 flex flex-col lg:flex-row justify-between h-20 lg:items-center gap-4">
        <h2 className=" text-2xl font-medium">All Doctors</h2>
        <span className=" text-primary font-medium">Filter</span>
      </div>
      <div className="grid grid-cols-6 gap-3 p-4">
        {doctors?.map((data: any) => (
          <DoctorCard key={data.id} data={data} />
        ))}
      </div>
    </>
  );
};

export default Page;
