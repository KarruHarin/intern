"use client";
import React, { startTransition, useEffect, useState } from "react";
import { PercentageCard } from "./PercentageCard";
import { HealthMonitoring } from "./HealthMonitoring";
import { OverViewReport } from "./OverViewReport";
import { HealthVsExpected } from "./HealthVsExpected";
import { GetTrack } from "@/actions/tracker/getTrack";

const TrackerMain = ({ id }: any) => {
  const [data, setData] = useState<any>(null);
  const handleFetchTrackingData = () => {
    startTransition(() => {
      GetTrack(id)
        .then((data) => {
          if (data) {
            setData(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    });
  };
 console.log(data);
 
  useEffect(() => handleFetchTrackingData(), []);

  return (
    <div className="grid grid-cols-6 gap-4 p-4">
    <div className="lg:col-span-4 col-span-6 grid grid-cols-6 gap-4">
       {data&&<><PercentageCard progress={data?.tracks?.activity} color="#E53761" title="Activity" />
        <PercentageCard progress={data?.tracks?.sleep} color="#27A468" title="Sleep" />
        <PercentageCard progress={data?.tracks?.wellness} color="#F2A735" title="Welness" /></>}
        <HealthMonitoring data={data?.healthMonitoring} />
      </div>
      <div className="lg:col-span-2 col-span-6 grid lg:grid-cols-2 md:grid-cols-4 grid-cols-2 gap-4">
        <OverViewReport data={data?.overview?.report} />
        <HealthVsExpected data={data?.healthExpected?.report} />
      </div>
    </div>
  );
};

export default TrackerMain;


const dummyData = [
  { month: "Jan", health: 70, expected: 80 },
  { month: "Feb", health: 75, expected: 85 },
  { month: "Mar", health: 68, expected: 78 },
  { month: "Apr", health: 80, expected: 90 },
]