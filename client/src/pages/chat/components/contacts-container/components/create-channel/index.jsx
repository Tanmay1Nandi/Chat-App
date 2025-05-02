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
    if (!channelName || selectedContacts.length === 0) {
        alert("Atleast one user must be selected and channel name cannot be empty")
        return;
    }

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
      alert("Channel created! NOT YET FUNCTIONAL");
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
