"use client";
import { getAllAppointment } from "@/actions/appointment/getOppintments";
import { useUser } from "@/app/context/userContext";
import { useMail } from "@/components/chat/chat";
import { ChatDisplay } from "@/components/chat/chatDisplay";
import ContactList from "@/components/chat/ContactList";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import React, { useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

interface MailItem {
  id: string;
  creator: {
    name: string;
  };
  read: boolean;
  updated_at: string;
  labels: string[];
}

const defaultLayout = [265, 360, 655];
const socket = io("http://localhost:8000");

const Page = () => {
  const [mail] = useMail();
  const { id ,role} = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState([]);
  const [sheetState, setSheetState] = useState(false);
  const [list, setList] = useState<any[]>([]);

  const [cookie, setCookie] = useCookies([
    "react-resizable-panels:collapsed",
    "react-resizable-panels:layout",
  ]);
  

  // const GetMessages = useCallback(async () => {
  //   if (!mail.selected) {
  //     return;
  //   }
  //   let data = await fetch(
  //     `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${mail.selected}`
  //   );
  //   data = await data.json();
  //   console.log("messages = ",data)
  // }, [mail.selected]);



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getAllAppointments = async () => {
    const data = await getAllAppointment(id,role);
    console.log("da",data)
    if (data.data && data.data?.length) {
      setList(data.data);
      console.log("d",data)
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  const updateSheetState = (val: boolean) => {
    setSheetState(val);
  };

  return (
    <div className="w-full h-full p-4">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          setCookie("react-resizable-panels:layout", JSON.stringify(sizes));
        }}
        className="h-full max-h-[800px] border rounded-lg items-stretch"
      >
        {isMobile && mail.selected ? null : (
          <ResizablePanel defaultSize={23} minSize={25} maxSize={35}>
            <ContactList sheetState={sheetState} items={list} />
          </ResizablePanel>
        )}
        {!isMobile && <ResizableHandle withHandle />}
        {isMobile ? (
          mail.selected ? (
            <ResizablePanel defaultSize={defaultLayout[2]}>
              <ChatDisplay data={message} removedata={() => setMessage([])} socket={socket}/>
            </ResizablePanel>
          ) : null
        ) : (
          <ResizablePanel defaultSize={defaultLayout[2]}>
              <ChatDisplay data={message} removedata={() => setMessage([])} socket={socket} />
              </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;




