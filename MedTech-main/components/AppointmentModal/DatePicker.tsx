"use client";

import * as React from "react";
import { format, isBefore, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const getDayNumber = (dayName: string) => {
  const dayMap: { [key: string]: number } = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return dayMap[dayName];
};

export function DatePickerDemo({ availableDays,setDate }: { availableDays: string[],setDate:any}) {
  const today = new Date(); // Current date
  const [date,settDate]=React.useState()
  // Convert availableDays from string format to number format (for comparison)
  const availableDayNumbers = availableDays.map(getDayNumber);

  const isDaySelectable = (date: Date) => {
    const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    // Disable dates in the past and dates not in availableDays
    return !isBefore(date, today) && availableDayNumbers.includes(dayOfWeek);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-[280px] justify-start text-left font-normal ${
            !date ? "text-muted-foreground" : ""
          }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e:any)=>{setDate(e);settDate(e)}}
          // Disable dates in the past and days not in the user-provided availableDays
          disabled={(date) => !isDaySelectable(date)} 
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
