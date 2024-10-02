import { auth } from "@/auth";
import { HealthMonitoring } from "@/components/tracker/HealthMonitoring";
import { HealthVsExpected } from "@/components/tracker/HealthVsExpected";
import { OverViewReport } from "@/components/tracker/OverViewReport";
import { PercentageCard } from "@/components/tracker/PercentageCard";
import TrackerMain from "@/components/tracker/TrackerMain";
import React from "react";

const page = async () => {
  const session = await auth();
  const id = session?.user.id||'';
  
  return (
   <TrackerMain id={id} />
  );
};

export default page;
