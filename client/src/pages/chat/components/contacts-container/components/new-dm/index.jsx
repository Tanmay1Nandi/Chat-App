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
  
import { FaPlus } from 'react-icons/fa'
import { Input } from '../../../../../../components/ui/input';


export default function NewDm() {
    const [openNewContactModel, setOpenNewContactModel] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);
    
    const searchContacts = async(searchTerm) => {

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
                {
                    searchedContacts.length === 0 && <div className="">
                        <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-1000 transition-all'>
                        {/* <div className="flex justify-center text-4xl mt-5 text-pink-500 font-bold">Hello</div> */}
                        <div className="text-opacity-80 text-white flex flex-col gap-5 my-10 items-center transition-all duration-300 text-center lg:text-2xl text-3xl">
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
