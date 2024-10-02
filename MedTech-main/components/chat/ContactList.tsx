/*
import React, { useEffect, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { useMail } from './chat';
import { useUser } from '@/app/context/userContext';
import { getAllDoctorsWithDetails } from '@/actions/consult/consultDoc';

interface MailItem {
  userId: string;
  name: string;
  doctorName: string;
  doctor_id: string;
  id: string;
  read: boolean;
  date: string;
  labels: string[];
}

interface ChatListProps {
  items: MailItem[];
  sheetState: boolean;
}

const ContactList = ({ items, sheetState }: ChatListProps) => {
  const { role } = useUser();
  const [mail, setMail] = useMail();

  const [isCreatingCommunity, setIsCreatingCommunity] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [communityMembers, setCommunityMembers] = useState<string[]>([]);
  const [isCommunityView, setIsCommunityView] = useState(false);

 


// const GetAllDoctorsWithDetails=async()=>{
//   const data = await getAllDoctorsWithDetails()
//   console.log("doctors = ",data)
// }

//   useEffect(() => {
//     GetAllDoctorsWithDetails()
//   }, []);

  useEffect(() => {
    setFilteredSuggestions(
      doctorsAndPatients.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Handle creating a community
  const handleCreateCommunity = () => {
    console.log('Creating community with:', newCommunityName, communityMembers);
    setIsCreatingCommunity(false);
  };

  const handleSelectSuggestion = (name: string) => {
    setCommunityMembers((prev) => [...prev, name]);
    setSearchTerm('');
  };

  return (
    <div className="h-full w-full">
      <div className="flex justify-center p-4">
        <Button onClick={() => setIsCommunityView(!isCommunityView)}>
          {isCommunityView ? 'Switch to User Chats' : 'Switch to Community Chats'}
        </Button>
      </div>

//       {/* Dialog for creating a community */


//       <ScrollArea className="h-[calc(100%-200px)]">
//         {/* Chat view content */}
//       </ScrollArea>

//       <div className="w-full h-16 flex items-center justify-center px-4 border-t">
//         <Input placeholder="Search name" />
//       </div>


//     </div>
//   );
// };

// export default ContactList;
//  */

import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useMail } from './chat';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useUser } from '@/app/context/userContext';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

interface MailItem {
    userId: string;
    name:string;
      doctorName: string;
      doctor_id:string
id:string
    read: boolean;
    date: string;
    labels: string[];
  }
  
  interface ChatListProps {
    items: MailItem[];
    sheetState:boolean
  }

const ContactList = ({ items,sheetState }: ChatListProps) => {
  const {role} = useUser()
console.log("items",items)
    const [mail, setMail] = useMail();


    const [randomNumber, setRandomNumber] = useState(0);
    const [isCreatingCommunity, setIsCreatingCommunity] = useState(false);
    const [newCommunityName, setNewCommunityName] = useState('');
    const [communityMembers, setCommunityMembers] = useState<string[]>([]);
    const [isCommunityView, setIsCommunityView] = useState(false);

    
    useEffect(() => {
      const number = Math.floor(Math.random() * 11);
      setRandomNumber(number);
    }, [randomNumber]); 
  
    const doctorsAndPatients = [
      { id: '1', name: 'Dr. John Doe' },
      { id: '2', name: 'Dr. Jane Smith' },
      { id: '3', name: 'Patient Alice' },
      { id: '4', name: 'Patient Bob' },
      { id: '5', name: 'Dr. John Doe' },
      { id: '6', name: 'Dr. Jane Smith' },
      { id: '7', name: 'Patient Alice' },
      { id: '8', name: 'Patient Bob' },
      { id: '9', name: 'Dr. John Doe' },
      { id: '10', name: 'Dr. Jane Smith' },
      { id: '11', name: 'Patient Alice' },
      { id: '12', name: 'Patient Bob' },
      { id: '13', name: 'Dr. John Doe' },
      { id: '24', name: 'Dr. Jane Smith' },
      { id: '15', name: 'Patient Alice' },
      { id: '16', name: 'Patient Bob' },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState(doctorsAndPatients);
    
  useEffect(() => {
    setFilteredSuggestions(
      doctorsAndPatients.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Handle creating a community
  const handleCreateCommunity = () => {
    console.log('Creating community with:', newCommunityName, communityMembers);
    setIsCreatingCommunity(false);
  };

  const handleSelectSuggestion = (name: string) => {
    setCommunityMembers((prev) => [...prev, name]);
    setSearchTerm('');
  };

if(role!="DOCTOR"){
  return (
    <div className="h-full w-full"> 


      <ScrollArea className="h-[calc(100%-128px)]">
    <div className="origin-top-right flex flex-col mt-4 p-3 pt-0">
      {items?.map((item,index) => (
        <button
          key={item.id}
          className={cn(
            "flex flex-col items-start gap-2 rounded-lg p-2 text-left text-sm transition-all",mail.selected !== item.id&&"hover:bg-muted",
            mail.selected === item.id && "bg-primary",
          )}
          onClick={() =>
           
            setMail({
              ...mail,
              selected: item.doctor_id,
              name:item.doctorName
            })
          }
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage
                className="rounded-full"
                  src={`https://avatar.iran.liara.run/username?username=${item.doctorName || "Default Name"}`}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className={`flex w-[calc(100%-70px)] ${mail.selected?'':'border-b'} mt-1 gap-2`}>
               <div>
               <h3 className={cn(
                  "font-medium text-[14px]",
                  mail.selected === item.id
                    ? "text-white"
                    : "text-forground",
                )}>{item.doctorName||"User "+index}</h3>
               
               </div>
                <div
                className={cn(
                  "ml-auto text-xs flex flex-col items-end gap-1",
                  mail.selected === item.id
                    ? "text-white"
                    : "text-muted-foreground",
                )}
              >
                
                {/* {console.log(item?.date)}
                {
                
                formatDistanceToNow(new Date(item.date), {
                  addSuffix: true,
                })} */}
                
                {mail.selected !== item.id&&<span><Badge className=" scale-75">69</Badge></span>}
              </div>
              </div>
             
            </div>
          </div>
        </button>
      ))}
    </div>
  </ScrollArea>
  <div className='w-full h-16 flex items-center justify-center px-4 border-t' >
   <Input placeholder='Search name' ></Input>
  </div>
  </div>
  )
}
else{
  return (
    <div className="h-full w-full"> 
        <div className="flex justify-center p-4">
    <Button onClick={() => setIsCommunityView(!isCommunityView)}>
          {isCommunityView ? 'Switch to User Chats' : 'Switch to Community Chats'}
        </Button>
      </div>
      <Dialog open={isCreatingCommunity} onOpenChange={setIsCreatingCommunity}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Community</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Input
              placeholder="Community Name"
              value={newCommunityName}
              onChange={(e) => setNewCommunityName(e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Search for doctors or patients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            {searchTerm && (
              <div className="suggestions-list">
                {filteredSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="suggestion-item cursor-pointer hover:bg-muted"
                    onClick={() => handleSelectSuggestion(suggestion.name)}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
            <div className="selected-members mt-4">
              {communityMembers.map((member, index) => (
                <div key={index} className="badge">
                  {member}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateCommunity}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ScrollArea className="h-[calc(100%-192px)]">
   {!isCommunityView?
   <div className="origin-top-right flex flex-col mt-4 p-3 pt-0">
      {items?.map((item,index) => (
        <button
          key={item.id}
          className={cn(
            "flex flex-col items-start gap-2 rounded-lg p-2 text-left text-sm transition-all",mail.selected !== item.id&&"hover:bg-muted",
            mail.selected === item.id && "bg-primary",
          )}
          onClick={() =>
            setMail({
              ...mail,
              selected: item.userId,
              name:item.name
            })
          }
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage
                className="rounded-full"
                  src={`https://avatar.iran.liara.run/username?username=${item.name || "Default Name"}`}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className={`flex w-[calc(100%-70px)] ${mail.selected?'':'border-b'} mt-1 gap-2`}>
               <div>
               <h3 className={cn(
                  "font-medium text-[14px]",
                  mail.selected === item.id
                    ? "text-white"
                    : "text-forground",
                )}>{item.name||"User "+index}</h3>
               
               </div>
                <div
                className={cn(
                  "ml-auto text-xs flex flex-col items-end gap-1",
                  mail.selected === item.id
                    ? "text-white"
                    : "text-muted-foreground",
                )}
              >
                
                {/* {console.log(item?.date)}
                {
                
                formatDistanceToNow(new Date(item.date), {
                  addSuffix: true,
                })} */}
                
                {mail.selected !== item.id&&<span><Badge className=" scale-75">69</Badge></span>}
              </div>
              </div>
             
            </div>
          </div>
        </button>
      ))}
    </div>:  <div className="origin-top-right flex flex-col mt-4 p-3 pt-0">No community</div>}
      </ScrollArea>
  <div className='w-full h-16 flex items-center justify-center px-4 border-t' >
   <Input placeholder='Search name' ></Input>
  </div>
  {role === 'DOCTOR' && (
        <div className="w-full h-16 flex items-center justify-center px-4 border-t">
          <button
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
            onClick={() => setIsCreatingCommunity(true)}
          >
            Create Community
          </button>
        </div>
      )}
  </div>
  )
}
}

export default ContactList