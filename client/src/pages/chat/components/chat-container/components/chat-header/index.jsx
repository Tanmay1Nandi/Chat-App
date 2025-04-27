import React from 'react'
import { RiCloseFill } from "react-icons/ri"
import { useDispatch } from 'react-redux'
import { chatClose } from '../../../../../../app/chat/chatSlice'

export default function ChatHeader() {
  const dispatch = useDispatch();
  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex justify-between items-center px-20'>
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center"></div>
        <div className="flex items-center gap-5 justify-center">
          <button className='text-neutral-500 focus:border-none focus:text-white focus:outline-none duration-300 transition-all' onClick={() => dispatch(chatClose())}>
            <RiCloseFill className='text-3xl' />
          </button>
        </div>
      </div>
    </div>
  )
}
