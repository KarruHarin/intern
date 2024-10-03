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
import { Input } from '../ui/input';
import { useUser } from '@/app/context/userContext';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useMail } from './chat';

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

  const doctorsAndPatients = [
    { id: '1', name: 'Dr. John Doe' },
    { id: '2', name: 'Dr. Jane Smith' },
    { id: '3', name: 'Patient Alice' },
    { id: '4', name: 'Patient Bob' },
    { id: '5', name: 'Dr. John Doe' },
    // Add more...
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

  const handleCreateCommunity = () => {
    console.log('Creating community with:', newCommunityName, communityMembers);
    setIsCreatingCommunity(false);
  };

  const handleSelectSuggestion = (name: string) => {
    setCommunityMembers((prev) => [...prev, name]);
    setSearchTerm('');
  };

  return (
    <div className="h-full w-full flex flex-col">
      {role === 'DOCTOR' && (
        <div className="flex justify-center p-4">
          <Button onClick={() => setIsCommunityView(!isCommunityView)}>
            {isCommunityView ? 'Switch to User Chats' : 'Switch to Community Chats'}
          </Button>
        </div>
      )}

      <ScrollArea className={cn("h-[calc(100%-64px)]", role === 'DOCTOR' && "h-[calc(100%-128px)]")}>
        {!isCommunityView ? (
          <div className="flex flex-col p-3">
            {items.map((item, index) => (
              <button
                key={item.id}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg transition-all',
                  mail.selected !== item.id ? 'hover:bg-muted' : 'bg-primary'
                )}
                onClick={() =>
                  setMail({
                    ...mail,
                    selected: role === 'DOCTOR' ? item.userId : item.doctor_id,
                    name: role === 'DOCTOR' ? item.name : item.doctorName
                  })
                }
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    className="rounded-full"
                    src={`https://avatar.iran.liara.run/username?username=${role === 'DOCTOR' ? item.name : item.doctorName || 'Default Name'}`}
                    alt={role === 'DOCTOR' ? item.name : item.doctorName}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-grow border-b pb-2">
                  <h3
                    className={cn(
                      'font-medium text-sm',
                      mail.selected === item.id ? 'text-white' : 'text-gray-900'
                    )}
                  >
                    {role === 'DOCTOR' ? item.name : item.doctorName || `User ${index}`}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col p-3">No community</div>
        )}
      </ScrollArea>

      <div className="w-full h-16 flex items-center justify-center px-4 border-t">
        <Input
          placeholder="Search name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {role === 'DOCTOR' && (
        <div className="w-full h-16 flex items-center justify-center px-4 border-t">
          <Button
            className="w-full bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            onClick={() => setIsCreatingCommunity(true)}
          >
            Create Community
          </Button>
        </div>
      )}

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
                    className="cursor-pointer hover:bg-muted p-2"
                    onClick={() => handleSelectSuggestion(suggestion.name)}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
            <div className="selected-members mt-4">
              {communityMembers.map((member, index) => (
                <div key={index} className="badge bg-gray-200 p-2 rounded-lg">
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
    </div>
  );
};

export default ContactList;