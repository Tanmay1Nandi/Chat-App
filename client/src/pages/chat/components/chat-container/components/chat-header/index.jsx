import React from 'react'
import { RiCloseFill } from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { chatClose } from '../../../../../../app/chat/chatSlice'

export default function ChatHeader() {
  const dispatch = useDispatch();
  const {selectedChatData, selectedChatType} = useSelector(state => state.chat);
  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex justify-between items-center px-20'>
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
        <div className="flex gap-2 items-center justify-center">
          <div className="">
            <div className="h-12 w-12 relative border-1 border-purple-500 dark:border-gray-500 rounded-full flex items-center justify-center">
              <img className='w-full h-full border-0.5 dark:border-gray-500 border-purple-500 rounded-full object-cover' src={selectedChatData.image}/>
            </div>
          </div>
          {selectedChatType === "contact" && selectedChatData.firstName ? `${selectedChatData.firstName}  ${selectedChatData.lastName}` : selectedChatData.email 
          }
        </div>
        </div>
        <div className="flex items-center gap-5 justify-center">
          <button className='text-neutral-500 focus:border-none focus:text-white focus:outline-none duration-300 transition-all' onClick={() => dispatch(chatClose())}>
            <RiCloseFill className='text-3xl' />
          </button>
        </div>
      </div>
    </div>
  )
}
