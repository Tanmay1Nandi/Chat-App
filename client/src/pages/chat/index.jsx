import React from 'react'
import ContactsContainer from './components/contacts-container'
import EmptyChatContainer from './components/empty-chat-container'
import ChatContainer from './components/chat-container'
import { useSelector } from 'react-redux'

export default function Chat() {
  const {selectedChatType} = useSelector(state => state.chat);
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />
      {
        selectedChatType === null ? (<EmptyChatContainer />) : <ChatContainer/>
      }
    </div>
  )
}
