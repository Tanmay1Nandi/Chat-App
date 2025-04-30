import React, { useEffect } from 'react'
import {FcPositiveDynamic} from "react-icons/fc"
import ProfileInfo from './components/profile-info'
import NewDm from './components/new-dm'
import { useDispatch, useSelector } from 'react-redux'
import { setDirectMessagesContacts } from '../../../../app/chat/chatSlice'
import ContactList from '../../../../myComponents/ContactList'

export default function ContactsContainer() {

  const dispatch = useDispatch();
  const {directMessagesContacts} = useSelector(state => state.chat)
  useEffect(() => {
    const getContacts = async() => {
      const response = await fetch("/api/contacts/get-contacts-for-dm");
      if(response.ok){
        const data = await response.json();
        dispatch(setDirectMessagesContacts(data.contacts));
      }
    }
    getContacts();
  }, [])

  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
      <div className="pt-3 mb-9">
        <div className="text-white text-4xl flex whitespace-nowrap"><span className='mt-1 ml-6 mr-1 '><FcPositiveDynamic className='bg-gradient-to-r from-gray-900 to-purple-800'/></span><span className='text-gray-100'>Nots<span className='text-purple-500'>App</span></span></div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
        <div className="max-h-[31vh] pl-0 ml-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {/* {console.log(directMessagesContacts)} */}
          {directMessagesContacts && <ContactList contacts={directMessagesContacts} />}
          
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}


const Title = ({text}) => {
  return (
    <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-9- text-sm'>{text}</h6>
  )
}