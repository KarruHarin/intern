"use client";
import React, { useEffect, useState } from "react";
import { icons, LogOut } from "lucide-react";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/userContext";
import { IsDoctorEnrolled } from "@/actions/dashboard/IsDoctorEnrolled";
import { identity } from "@fullcalendar/core/internal";

interface MenuItem {
  name: string;
  icon: keyof typeof icons;
  href: string;
}

export const docItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
  },
  {
    name: "Patients",
    icon: "Users",
    href: "/dashboard/patient",
  },
  {
    name: "Profile",
    icon: "CircleUserRound",
    href: "/dashboard/profile",
  },
  {
    name: "Doctor Enrollment",
    icon: "CircleUserRound",
    href: "/dashboard/doctorEnrollment",
  },
  {
    name: "Chat",
    icon: "MessageCircle",
    href: "/dashboard/chat",
  },
  {
    name: "Help",
    icon: "MessageCircleQuestion",
    href: "/dashboard/help",
  },
  {
    name: "Sign Out",
    icon: "LogOut",
    href: "/dashboard/signout",
  },
];

export const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
  },
  {
    name: "Tracker",
    icon: "AudioWaveform",
    href: "/dashboard/tracker",
  },
  {
    name: "Appointment",
    icon: "UserRoundCheck",
    href: "/dashboard/appointment",
  },
  {
    name: "Consult",
    icon: "BriefcaseMedical",
    href: "/dashboard/consult",
  },
  {
    name: "Calendar",
    icon: "Calendar",
    href: "/dashboard/calender",
  },
  {
    name: "Chat",
    icon: "MessageCircle",
    href: "/dashboard/chat",
  },
  {
    name: "Profile",
    icon: "CircleUserRound",
    href: "/dashboard/profile",
  },
  {
    name: "Help",
    icon: "MessageCircleQuestion",
    href: "/dashboard/help",
  },
  {
    name: "Sign Out",
    icon: "LogOut",
    href: "/dashboard/signout",
  },
];

type SideNavProps = {
  userName: string;
  role: string;
};

export default function SideNav({ userName, role }: SideNavProps) {
  const {id}=useUser()
  const location = usePathname();

  const [enrolled, setEnrolled] = useState(true);
  const [filtered, setFiltered] = useState<any>([]);

 useEffect(()=>{
  const Check= async ()=>{
    const result = await IsDoctorEnrolled(id)
    console.log(result);
    setEnrolled(result);
 }
 Check()
 },[])
 useEffect(()=>{
  const filteredDocItems = enrolled
  ? docItems.filter((item) => item.name !== "Doctor Enrollment")
  : docItems;
  setFiltered(filteredDocItems)
 },[enrolled])
  return (
    <aside className={`lg:block hidden h-full w-64`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} alt="logo" width={70} height={70} />
          </Link>
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {role === "USER" &&
          menuItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex gap-2 py-2 px-3 rounded ${
                  item.href === location ? "bg-primary text-white" : ""
                }`}
              >
                <span>
                  <Icon className="w-5" />
                </span>
                {item.name}
              </Link>
            );
          })}
        {role === "ADMIN" &&
          menuItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex gap-2 py-2 px-3 rounded ${
                  item.href === location ? "bg-primary text-white" : ""
                }`}
              >
                <span>
                  <Icon className="w-5" />
                </span>
                {item.name}
              </Link>
            );
          })}
        {role === "DOCTOR" &&
          filtered.map((item:any) => {
            const Icon = icons[item.icon as keyof typeof icons]; 
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex gap-2 py-2 px-3 rounded ${
                  item.href === location ? "bg-primary text-white" : ""
                }`}
              >
                <span>
                  <Icon className="w-5" />
                </span>
                {item.name}
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}
