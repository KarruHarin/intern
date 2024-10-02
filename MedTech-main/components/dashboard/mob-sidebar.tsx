import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { icons, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { menuItems } from "../home/SideNav";
import { SignOut } from "@/actions/auth/signout";
import { usePathname } from "next/navigation";

type HeaderProps = {
  userName: string;
  role: string;
};

interface MenuItem {
  name: string;
  icon: keyof typeof icons; 
  href: string;
}
const MobSideBar = ({ userName, role }: HeaderProps) => {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await SignOut(); // Sign out the user
  };
  const location = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden block">
        <Menu className="" />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 littleTransition">
        <SheetHeader className=" h-44 p-4 items-start">
          <div className="my-3 flex w-full items-center pr-2 justify-between">
            <Avatar className="h-16 w-16 ">
              <AvatarImage
                className="rounded-full z-20"
                src={`https://avatar.iran.liara.run/public`}
                alt="@shadcn"
              />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
          </div>
          <SheetTitle className="text-xl">{userName}</SheetTitle>
          <SheetDescription className="opacity-85">{role}</SheetDescription>
        </SheetHeader>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <a
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
              </a>
            );
          })}
          <form onSubmit={handleLogout} className="mt-4">
            <button
              type="submit"
              className="w-full py-2 px-3 text-left rounded hover:bg-purple-700"
            >
              Sign Out
            </button>
          </form>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobSideBar;
