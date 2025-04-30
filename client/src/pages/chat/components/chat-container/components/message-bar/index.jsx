import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from "react-icons/gr"
import { RiEmojiStickerLine } from "react-icons/ri"
import { IoMdSend } from "react-icons/io"
import EmojiPicker from "emoji-picker-react"
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '../../../../../../context/SocketContext'
import { addSingleMessage, removeSingleMessage } from '../../../../../../app/singleMessage/singleMessageSlice'

export default function MessageBar() {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { socket, isSocketConnected } = useSocket();
  const {selectedChatType, selectedChatData} = useSelector(state => state.chat);
  const {currentUser} = useSelector(state => state.user);

  const emojiRef = useRef();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);


  const fileInputRef = useRef();

  useEffect(() => {
    function handleClickOutside(event){
      if(emojiRef.current && !emojiRef.current.contains(event.target)){
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [emojiRef])

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg+emoji.emoji)
  }

  const handleSendMessage = async () => {
    try {
      if(!message.trim()) return;
      if(!socket || !isSocketConnected){
        console.log("Socket not ready!");
        return;
      }
      if(selectedChatType === "contact"){
        socket.emit("sendMessage", {
          sender: currentUser._id,
          content: message,
          recipient: selectedChatData._id,
          messageType: "text",
          fileUrl: null,
        })
      }
      setMessage("");
      
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleAttachmentClick = () => {
    if(fileInputRef.current){
      fileInputRef.current.click();
    }
  }

  const handleAttachmentChange = async(e) => {
    try {
      const file = e.target.files[0];
      if(file) {
        const formData = new FormData();
        formData.append("file",file);
        const response = await fetch("/api/messages/upload-file", {
          method: "POST",
          body: formData,
        })

        if(response.ok){
          const data = await response.json();
          if(data){
            if(selectedChatType === "contact"){
              socket.emit("sendMessage", {
                sender: currentUser._id,
                content: undefined,
                recipient: selectedChatData._id,
                messageType: "file",
                fileUrl: data.filePath,
              })
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-5'>
      <div className="flex-1 flex bg-[#2a2b33] rounded-md gap-5 pr-5 items-center">
        <input type='text' className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none' placeholder='Enter Message' value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button className='text-neutral-500 focus:border-none focus:text-white focus:outline-none duration-300 transition-all' onClick={handleAttachmentClick}>
          <GrAttachment className='text-2xl' />
        </button>
        <input type='file' className='hidden' ref={fileInputRef} onChange={handleAttachmentChange} />
        <div className="relative">
        <button className='text-neutral-500 focus:border-none focus:text-white focus:outline-none duration-300 transition-all' onClick={() => {
          setEmojiPickerOpen(true)
        }}>
          <RiEmojiStickerLine className='text-2xl' />
        </button>
        <div className="absolute bottom-16 right-0" ref={emojiRef}>
          <EmojiPicker theme='dark' open={emojiPickerOpen} onEmojiClick={handleAddEmoji}
          autoFocusSearch={false}/>
        </div>
        </div>
      </div>
      <button className='bg-[#8417ff] rounded-md flex items-center justify-center p-4 focus:border-none hover:bg-[#741bda] focus:text-white focus:bg-[#741bda] focus:outline-none duration-300 transition-all' onClick={handleSendMessage}>
          <IoMdSend className='text-2xl' />
        </button>
    </div>
  )
}
