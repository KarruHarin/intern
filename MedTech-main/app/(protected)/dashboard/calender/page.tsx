"use client";
import React from "react";
import randomColor from "randomcolor";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});
const CalendarPage = () => {
  const events = [
    {
      title: "Dr. Deep sorthiya",
      start: "2024-08-09T08:00:00",
      end: "2024-08-09T10:00:00",
      backgroundColor: "#FFCCCC",
    },
    {
      title: "Dr. Mahesh Pokal",
      start: "2024-08-09T12:00:00",
      end: "2024-08-09T13:00:00",
      backgroundColor: "#CCFFCC",
    },
  ];

  return (
    <div className="pt-10 px-6 min-h-[90vh] lg:py-10 lg:px-12">
      <Card className="lg:p-4 p-1 h-[calc(100vh-100px)] lg:h-full overflow-y-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "today",
            center: "prev title next",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
          }}
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
            hour12: false,
          }}
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
        />
      </Card>
    </div>
  );
};

export default CalendarPage;

function renderEventContent(eventInfo: any) {
  const { backgroundColor } = eventInfo;
  let bgColorWithOpacity = backgroundColor;

  if (backgroundColor.startsWith("#")) {
    bgColorWithOpacity = hexToRgba(backgroundColor, 0.3);
  } else if (backgroundColor.startsWith("rgb")) {
    bgColorWithOpacity = backgroundColor
      .replace("rgb", "rgba")
      .replace(")", `, 0.3)`);
  } else {
    bgColorWithOpacity = "rgba(0, 0, 0, 0.4)"; // Default to black with 0.3 opacity
  }
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: bgColorWithOpacity,
        border: `4px solid ${backgroundColor}`,
      }}
      className={`rounded-md text-black p-2`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="event-time">
          <Badge
            className="text-black"
            style={{ backgroundColor: backgroundColor }}
          >
            {eventInfo.timeText}
          </Badge>

          <div className=" mt-4 leading-tight font-medium">
            <p>Meeting with {eventInfo.event.title}</p>
          </div>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function hexToRgba(hex: string, opacity: number) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
