import React from 'react'
import { useSelector } from 'react-redux'

export default function EmptyChatContainer() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all'>
      <div className="text-4xl text-pink-500">Hello <span>{currentUser.firstName}!</span></div>
      <div className="text-opacity-80 text-white flex flex-col gap-5 mt-10 items-center transition-all duration-300 text-center lg:text-4xl text-3xl">
        <h3 className='poppins-medium'>
        <span className='text-purple-500'></span> Welcome to <span className='text-purple-500'>NotsApp</span> Chat App<span className='text-purple-500'>.</span>
        </h3>
      </div>
    </div>
  )
}
