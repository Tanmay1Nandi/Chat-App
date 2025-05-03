import React from 'react'
import ChatHeader from './components/chat-header'
import MessageBar from './components/message-bar'
import MessageContainer from './components/message-container'

export default function ChatContainer() {
  return (
    <div className='fixed inset-0 h-screen w-screen bg-[#1c1d25] flex flex-col md:static md:flex-1'>
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  )
}
