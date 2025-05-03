import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, setSelectedChatType, refreshMessage, setSelectedChatData} from '../app/chat/chatSlice';

export default function ContactList({contacts, isChannel = false}) {
    const dispatch = useDispatch();
    const {selectedChatData, selectedChatType} = useSelector(state => state.chat);

    const handleClick = (contact) => {
        if(isChannel) dispatch(setSelectedChatType("channel"))
            else dispatch(setSelectedChatType("contact"));
        dispatch(setSelectedChatData(contact));
        if(selectedChatData && selectedChatData._id !== contact._id){
            dispatch(refreshMessage());
        }
    }
  return (
    <div className='mt-5'>
      {contacts.map((contact) => (
        <div  key={contact._id}
        className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
          selectedChatData && selectedChatData._id === contact._id
            ? 'bg-[#8417ff] hover:bg-[#8417ff]'
            : 'hover:bg-[#ff11ff]/50'
        }`}
        onClick={() => handleClick(contact)}>
            <div className="flex gap-5 items-center justify-start text-neutral-300">
                {
                    !isChannel && <div className="">
                    <div className="h-10 w-10 relative border-1 border-purple-500 dark:border-gray-500 rounded-full flex items-center justify-center">
                      <img className='w-full h-full border-0.5 dark:border-gray-500 border-purple-500 rounded-full object-cover' src={contact.image}/>
                    </div>
                    <div className="break-words whitespace-normal ">

                    {contact.firstName ? `${contact.firstName}  ${contact.lastName}` : contact.email 
                    }
                    </div>
                  </div>
                }
            </div>
        </div>
      ))}
    </div>
  )
}
