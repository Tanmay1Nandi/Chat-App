import React from 'react'
import { useSelector } from 'react-redux'

export default function Chat() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div>
      <img className='rounded-full w-32 h-32 object-cover' src={currentUser.profilePicture}/>
    </div>
  )
}
