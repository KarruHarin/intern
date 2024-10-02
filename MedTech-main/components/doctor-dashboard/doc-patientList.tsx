import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card } from "../ui/card";


const PatientList = () => {
  return (
    <Card
     className="mt-4 w-full">
      <div className="flex p-4 justify-between">
        <h2 className="text-lg lg:text-[1.4vw] font-semibold">
          Patient List
        </h2>
        <Selection/>
      </div>
      <div className="grid grid-cols-6 gap-3">
        
      </div>
    </Card>
  );
};

export default PatientList;

function Selection() {
    return (
      <Select>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Daily" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }