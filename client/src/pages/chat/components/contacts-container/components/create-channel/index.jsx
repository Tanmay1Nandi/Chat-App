// import React, { useState, useEffect } from 'react'

// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
//   } from "@/components/ui/tooltip"

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//   } from "@/components/ui/dialog"
  
// import { ScrollArea } from "@/components/ui/scroll-area"

// import { FaPlus } from 'react-icons/fa'
// import { Input } from '../../../../../../components/ui/input';
// import { useDispatch, useSelector } from 'react-redux'
// import { chatClose, chatOpen } from '../../../../../../app/chat/chatSlice'
// import { setDirectMessagesContacts } from '../../../../../../app/chat/chatSlice'
// import MultipleSelector from '../../../../../../components/ui/multiple-selector'

// export default function CreateChannel() {
//     const [openNewContactModel, setOpenNewContactModel] = useState(false);
//     const [searchedContacts, setSearchedContacts] = useState([]);
    
//     const [newChannelMode, setNewChannelModel] = useState(false);
//     const [allContacts, setAllContacts] = useState([]);
//     const [selectedContacts, setSelectedContacts] = useState([]);
//     const [channelName, setChannelName] = useState("");

//     const dispatch = useDispatch();

//     // useEffect(() => {
//     //     const getContacts = async () => {
//     //         const response = await fetch("/api/contacts/get-all-contacts");
//     //         if(response.ok){
//     //           const data = await response.json();
//     //           // Map to react-select format
//     //           const formattedContacts = data.contacts.map(contact => ({
//     //             label: contact.firstName && contact.lastName 
//     //               ? `${contact.firstName} ${contact.lastName}` 
//     //               : contact.email,
//     //             value: contact._id,
//     //             profilePicture: contact.profilePicture,
//     //             email: contact.email,
//     //           }))
//     //           setAllContacts(formattedContacts);
//     //         }
//     //       }
//     //     getContacts();
//     //   }, [])

//     useEffect(() => {
//         const getContacts = async () => {
//           const response = await fetch("/api/contacts/get-all-contacts");
//           if (response.ok) {
//             const data = await response.json();
//             const formattedContacts = data.contacts.map(contact => ({
//               value: contact._id,
//               label: contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email,
//               profilePicture: contact.profilePicture,
//               email: contact.email, // if you want to use email later
//             }));
//             setAllContacts(formattedContacts);
//           }
//         };
//         getContacts();
//       }, []);
      

//     const createChannel = async () => {
//         console.log("Channel Name:", channelName);
//       console.log("Selected Contacts:", selectedContacts);
//     }

//     return (
//     <>
//         <TooltipProvider>
//             <Tooltip>
//                 <TooltipTrigger>
//                     <FaPlus className='text-neutral-500 font-light text-start cursor-pointer hover:text-neutral-100 transition-all duration-300' onClick={() => setOpenNewContactModel(true)}/>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                     <p className='bg-[#1c1b1e] border-none pb-2 p-3 text-white'>Create New Channel</p>
//                 </TooltipContent>
//             </Tooltip>
//         </TooltipProvider>
//         <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
//             <DialogContent className="bg-[#24242e] border-none text-white w-[400px] h-[400px] flex flex-col">
//                 <DialogHeader>
//                     <DialogTitle>Please fill up the details for new channel</DialogTitle>
//                 <DialogDescription></DialogDescription>
//                 </DialogHeader>
//                 <div className="">
//                     <Input placeholder="Channel Name" className="rounded-lg p-6 bg-[#2c2e3b]"
//                     onChange={(e)=>setChannelName(e.target.value)}
//                     value = {channelName}/>
//                 </div>
//                 <div className="bg-white">
//                     <MultipleSelector 
//                     className=" bg-[#2c2e3b] border-none text-white cursor-pointer"
//                     defaultOptions = {allContacts}
//                     placeholder = "Search Contacts"
//                     value = {selectedContacts}
//                     onChange={(selected) => setSelectedContacts(selected || [])}/>
//                 </div>
//                 <button className='w-full p-3 rounded-xl bg-purple-700 hover:bg-purple-900 transition-all duration-300 cursor-pointer' onClick={createChannel}>Create Channel</button>
//                 <ScrollArea className="h-[250px]" >
//                     <div className="flex flex-col gap-5">
//                         {
//                             searchedContacts.map(contact => <div key={contact._id} className='flex gap-3 items-center cursor-pointer' onClick={()=> selectNewContact(contact)}>
//                                 <div className="flex gap-2 items-center justify-center">
//                                     <div className="">
//                                     <div className="h-12 w-12 relative border-1 border-purple-500 dark:border-gray-500 rounded-full flex items-center justify-center">
//                                         <img className='w-full h-full border-0.5 dark:border-gray-500 border-purple-500 rounded-full object-cover' src={contact.profilePicture}/>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <span>
//                                         {
//                                         contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email
//                                     }
//                                     </span>
//                                     <span className='text-xs'>{contact.email}</span>
//                                 </div>
//                             </div>)
//                         }
//                     </div>
//                 </ScrollArea>

//             </DialogContent>
//         </Dialog>

//     </>
//   )
// }


import React, { useState, useEffect } from 'react';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaPlus } from 'react-icons/fa';
import { Input } from '../../../../../../components/ui/input';
import { useDispatch } from 'react-redux';
import MultipleSelector from '../../../../../../components/ui/multiple-selector';

export default function CreateChannel() {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch("/api/contacts/get-all-contacts");
      const data = await res.json();
      const formatted = data.contacts.map(c => ({
        label: c.firstName && c.lastName ? `${c.firstName} ${c.lastName}` : c.email,
        value: c.value,
        profilePicture: c.profilePicture,
      }));
      setContacts(formatted);
    };
    fetchContacts();
  }, []);

  const createChannel = async () => {
    if (!channelName || selectedContacts.length === 0) return;

    const res = await fetch("/api/channels/create", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: channelName,
        members: selectedContacts.map(c => c.value),
      }),
    });

    if (res.ok) {
      setOpen(false);
      setChannelName('');
      setSelectedContacts([]);
      alert("Channel created!");
    } else {
      alert("Failed to create channel");
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus className="text-neutral-500 cursor-pointer hover:text-white" onClick={() => setOpen(true)} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Create New Channel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#24242e] text-white">
          <DialogHeader>
            <DialogTitle>Create a new channel</DialogTitle>
            <DialogDescription>Enter channel name and select members</DialogDescription>
          </DialogHeader>

          <Input
            placeholder="Channel Name"
            className="bg-[#2c2e3b] text-white"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />

          <MultipleSelector
            className="bg-[#2c2e3b] border-none text-white"
            // defaultOptions={contacts}
            placeholder="Search Users"
            value={selectedContacts}
            onChange={setSelectedContacts}
          />

          <button
            className="w-full p-2 mt-4 rounded bg-purple-700 hover:bg-purple-800"
            onClick={createChannel}
          >
            Create Channel
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
