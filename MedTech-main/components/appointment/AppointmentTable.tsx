"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarDays,
  CircleCheck,
  Clock8,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";


export function AppointmentTable({data}:any) {
  const [selected, setSelected] = useState<string[]>([]);

  function changeSelection(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  }
 
  return (
    <>
      <div className="flex mt-4 gap-4 lg:h-20 lg:flex-row flex-col items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm font-bold">
            <span className=" font-normal text-gray-500">Showing:</span>
            10 Appoinments
          </p>
        </div>
        <div className="flex items-center gap-6 justify-between">
          <span className="flex items-center gap-2">
            <Checkbox className="rounded" />
            Hide visited
          </span>
          <span className="flex items-center gap-2">
            <Checkbox className="rounded" />
            Show Empty
          </span>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Display Columns</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex w-full flex-col gap-3 p-2  ">
                    <li className=" whitespace-nowrap">Doctor Name</li>
                    <li className="flex items-center gap-2">Problems</li>
                    <li className="flex items-center gap-2">Status</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Problems</TableHead>
            <TableHead>Reschedule</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Mode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((appointment:any, index:number) => (
            <TableRow
              key={index}
              className={
                selected.includes(appointment.id)
                  ? "bg-purple-50"
                  : "" + " hover:bg-purple-100 "
              }
            >
              <TableCell>
                <Checkbox
                  className="rounded"
                  onClick={() => changeSelection(appointment.id)}
                  checked={selected.includes(appointment.id)}
                />
                <span className="ml-2">{appointment.time}</span>
              </TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>{appointment.purpose}</TableCell>
              <TableCell>
                <Button variant="link" className="pl-0">
                  Reschedule
                </Button>
              </TableCell>
              <TableCell>
                <span className="flex items-center ">
                  {appointment.status === "Scheduled" ? (
                    <CalendarDays className="mr-2 w-4 text-green-600 " />
                  ) : appointment.status === "Not confirmed" ? (
                    <Clock8 className="mr-2 w-4 text-yellow-500 " />
                  ) : (
                    <CircleCheck className="mr-2 w-4 text-primary" />
                  )}
                  <span className=" text-sm">{appointment.status}</span>
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Phone size={18} />

                  <MessageCircle size={18} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
