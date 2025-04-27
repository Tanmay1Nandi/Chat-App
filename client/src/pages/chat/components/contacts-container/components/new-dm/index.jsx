import React, { useState } from 'react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  
import { ScrollArea } from "@/components/ui/scroll-area"

import { FaPlus } from 'react-icons/fa'
import { Input } from '../../../../../../components/ui/input';
import { useDispatch, useSelector } from 'react-redux'
import { chatClose, chatOpen } from '../../../../../../app/chat/chatSlice'

export default function NewDm() {
    const [openNewContactModel, setOpenNewContactModel] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);
    
    const dispatch = useDispatch();
    // const {selectedChatType} = useSelector(state => state.chat);

    const searchContacts = async(searchTerm) => {
        try {
            if(searchTerm.length > 0){
                const response = await fetch("/api/contacts/search",{
                    method: "POST",
                    headers:{"Content-type" : "application/json"},
                    body: JSON.stringify({searchTerm}),
                });
                const data = await response.json();
                if (response.ok){
                    const contacts = data.contacts;
                    setSearchedContacts(contacts);
                }
            }else{
                setSearchedContacts([]);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const selectNewContact = (contact) => {
        dispatch(chatOpen({
            type: "contact",
            data: contact,
            messages: [],
        }));
        setOpenNewContactModel(false);
        setSearchedContacts([]);
    }

    return (
    <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus className='text-neutral-500 font-light text-start cursor-pointer hover:text-neutral-100 transition-all duration-300' onClick={() => setOpenNewContactModel(true)}/>
                </TooltipTrigger>
                <TooltipContent>
                    <p className='bg-[#1c1b1e] border-none pb-2 p-3 text-white'>Select New Contact</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
            <DialogContent className="bg-[#24242e] border-none text-white w-[400px] h-[400px] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Please select a contact</DialogTitle>
                <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="">
                    <Input placeholder="Search Contacts" className="rounded-lg p-6 bg-[#2c2e3b]"
                    onChange={(e)=>searchContacts(e.target.value)}/>
                </div>
                <ScrollArea className="h-[250px]" >
                    <div className="flex flex-col gap-5">
                        {
                            searchedContacts.map(contact => <div key={contact._id} className='flex gap-3 items-center cursor-pointer' onClick={()=> selectNewContact(contact)}>
                                <div className="flex gap-2 items-center justify-center">
                                    <div className="">
                                    <div className="h-12 w-12 relative border-1 border-purple-500 dark:border-gray-500 rounded-full flex items-center justify-center">
                                        <img className='w-full h-full border-0.5 dark:border-gray-500 border-purple-500 rounded-full object-cover' src={contact.profilePicture}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span>
                                        {
                                        contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email
                                    }
                                    </span>
                                    <span className='text-xs'>{contact.email}</span>
                                </div>
                            </div>)
                        }
                    </div>
                </ScrollArea>

                {
                    searchedContacts.length === 0 && <div className="">
                        <div className='flex-1 flex-col justify-center items-center duration-1000 transition-all sm:mb-30'>
                        {/* <div className="flex justify-center text-4xl mt-5 text-pink-500 font-bold">Hello</div> */}
                        <div className="text-opacity-80 text-white flex flex-col gap-5 mb-30 items-center transition-all duration-300 text-center text-3xl">
                            <h3 className='poppins-medium'>
                            Hi <span className='text-purple-500'>!</span> Search New <span className='text-purple-500'>Contact.</span>
                            </h3>
                        </div>
                        </div>
                    </div>
                }
            </DialogContent>
        </Dialog>

    </>
  )
}
