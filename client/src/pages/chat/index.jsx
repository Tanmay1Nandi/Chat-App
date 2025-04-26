import React from 'react'
import ContactsContainer from './components/contacts-container'
import EmptyChatContainer from './components/empty-chat-container'
import ChatContainer from './components/chat-container'

export default function Chat() {
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />
      {/* <EmptyChatContainer /> */}
      {/* <ChatContainer /> */}
    </div>
  )
}
