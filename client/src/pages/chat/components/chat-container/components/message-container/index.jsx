import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, refreshMessage } from '../../../../../../app/chat/chatSlice';
import { removeSingleMessage } from '../../../../../../app/singleMessage/singleMessageSlice';
import moment from "moment"

export default function MessageContainer() {
  const scrollRef = useRef();
  const {selectedChatType, selectedChatData, selectedChatMessages} = useSelector(state => state.chat);
  // const {singleMessage} = useSelector(state => state.singleMessage)
  const dispatch = useDispatch();
  // const {currentUser} = useSelector(state => state.user);


  useEffect(() => {
    if (!selectedChatData?._id || selectedChatType !== "contact"){
      return;
    } 
    const getMessages = async() => {
      dispatch(refreshMessage());
      
      try {
        const response = await fetch(`/api/messages/get-messages`,{
          method: "POST",
          headers: {"Content-type" : "application/json"},
          body: JSON.stringify({id: selectedChatData._id})
        });
        
        if(response.ok){
          // setOneMessage(null);
          const data = await response.json();
          console.log(data)
          if(data.messages){
            data.messages.forEach((msg) => {
              dispatch(addMessage(msg));
            });
          }
        }
      } catch (error) {
        console.log(error.message);
      }
      
    }
    getMessages();
    
  }, [selectedChatData, selectedChatType, dispatch])

  const renderDmMessages = (message) =>
  <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
    {
      message.messageType === "text" && <div className={`${message.sender !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20" } border inline-block p-4 rounded my-1 max-w-[60%] break-words`}>
      {message.content}
    </div>
    }
    <div className="text-xs text-gray-600">
      {moment(message.createdAt).format("LT")}
    </div>
  </div>

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages && selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={message._id + '-' + index} className="">
          {
            showDate && <div className="text-center text-gray-500 my-2">
              {
                moment(message.createdAt).format("LL")
              }
            </div>
          }
          {
            selectedChatType === "contact" &&  renderDmMessages(message)
          }
        </div>
      )
    })
  }

  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [selectedChatMessages])


  return (
    <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
      {renderMessages()}
      {/* {
        oneMessage && <div className="text-right">
        <div className="bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50  border inline-block p-4 rounded my-1 max-w-[60%] break-words ">{oneMessage}</div>
      </div>
      } */}
      
      <div ref={scrollRef} className=""></div>
    </div>
  )
}
