import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUserEdit } from "react-icons/fa"
import { IoLogOut } from "react-icons/io5"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { useNavigate } from 'react-router-dom';
  

export default function ProfileInfo() {
    const {currentUser} = useSelector(state => state.user);

    const navigate = useNavigate();

    const logout = async() => {

    }

  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-6 w-full bg-[#2a2b33]'>
      <div className="flex gap-2 items-center justify-center">
        <div className="">
        <div className="h-12 w-12 relative border-2 border-purple-500 dark:border-gray-500 rounded-full flex items-center justify-center">
              <img className='w-full h-full border-0.5 dark:border-gray-500 border-purple-500 rounded-full object-cover' src={currentUser.profilePicture}/>
            </div>
        </div>
        <div className="">
        {
            currentUser.firstName && currentUser.lastName ? `${currentUser.firstName} ${currentUser.lastName}` : currentUser.firstName
        }
        </div>
      </div>
      <div className="flex gap-3">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaUserEdit className='text-purple-500 text-xl font-light' onClick={() => navigate("/profile")}/>
                </TooltipTrigger>
                <TooltipContent>
                <p className='bg-[#1c1e1e] border-none'>Edit Profile</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <IoLogOut className='text-red-500 text-xl font-light' onClick={() => navigate("/auth")}/>
                </TooltipTrigger>
                <TooltipContent>
                <p className='bg-[#1c1e1e] border-none'>Logout</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
