import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, refreshMessage } from '../../../../../../app/chat/chatSlice';
import { MdFolderZip} from "react-icons/md"
import { removeSingleMessage } from '../../../../../../app/singleMessage/singleMessageSlice';
import moment from "moment"
import { IoMdArrowDown } from 'react-icons/io';

export default function MessageContainer() {
  const scrollRef = useRef();
  const {selectedChatType, selectedChatData, selectedChatMessages} = useSelector(state => state.chat);
  const {oneMessage} = useSelector(state => state.singleMessage)
  const dispatch = useDispatch();


  // const {currentUser} = useSelector(state => state.user);

  const checkIfImage = (filePath) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff?)$/i;
    return imageRegex.test(filePath);
  }

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


  const downloadFile = (file) => {

  };
  const renderDmMessages = (message) =>
  <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
    {
      message.messageType === "text" && <div className={`${message.sender !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20" } border inline-block p-4 rounded my-1 max-w-[60%] break-words`}>
      {message.content}
    </div>
    }
    {
      message.messageType === "file" && 
      <div className={`${message.sender !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20" } border inline-block p-4 rounded my-1 max-w-[60%] break-words`}>
        {checkIfImage(message.fileUrl) ? 
        <div className='cursor-pointer'>
          <img src={`http://localhost:8000/${message.fileUrl}`} height={300} width={300}/>
        </div> :
        <div className="flex items-center justify-center gap-4">
          <span className='text-white/60 text-3xl bg-black/20 rounded-full p-3'>
            <MdFolderZip />
          </span>
          <span>{message.fileUrl.split("/").pop()}</span>
          <span className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300' onClick={() => downloadFile(message.fileUrl)}>
            <IoMdArrowDown />
          </span>
        </div>
        }
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
