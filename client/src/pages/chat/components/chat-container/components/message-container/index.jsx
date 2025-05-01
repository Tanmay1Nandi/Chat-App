import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, refreshMessage } from '../../../../../../app/chat/chatSlice';
import { MdFolderZip} from "react-icons/md"
import moment from "moment"
import { IoMdArrowDown } from 'react-icons/io';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2'; // New: we use sweetalert2 for better UI
import withReactContent from 'sweetalert2-react-content';
import { deleteMessage } from '../../../../../../app/chat/chatSlice';

export default function MessageContainer() {
  const scrollRef = useRef();
  const {selectedChatType, selectedChatData, selectedChatMessages} = useSelector(state => state.chat);
  const dispatch = useDispatch();



  // const checkIfImage = (filePath) => {
  //   const imageRegex = /\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff?)$/i;
  //   return imageRegex.test(filePath);
  // }

  // const checkIfImage = (fileType, fileUrl) => {
  //   if (fileType === "image") return true;
  //   const imageRegex = /\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff?)$/i;
  //   return imageRegex.test(fileUrl);
  // }
  

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


  const downloadFile = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = blobUrl;
      // extract filename from url
      const filename = url.split("/").pop();
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
  
      // release blob URL memory
      window.URL.revokeObjectURL(blobUrl);

        // const link = document.createElement('a');
        // link.href = url;
        // link.download = url.split('/').pop(); // force download
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      
    } catch (error) {
      console.log(error.message);
    }
  };


  // const downloadFile = async (fileUrl) => {
  //   try {
  //     // extract public_id and file_type
  //     const urlParts = fileUrl.split('/');
  //     const fileName = urlParts.pop(); // jzx4c5kvpcppnak6pfgx.pdf
  //     const publicId = `chat-files/${fileName.split('.')[0]}`; // chat-files/jzx4c5kvpcppnak6pfgx
  //     const fileType = fileName.split('.').pop(); // pdf
  
  //     // get signed URL from backend
  //     const res = await fetch('/api/files/get-signed-url', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ publicId, fileType }),
  //     });
  
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.error || 'Failed to get signed URL');
  
  //     // now download using signed URL
  //     const a = document.createElement("a");
  //     a.href = data.url;
  //     a.download = fileName;
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();
  
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };
  
  const getFileType = (fileUrl) => {
    const extension = fileUrl.split('.').pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "tiff"].includes(extension)) return "image";
    if (["pdf"].includes(extension)) return "pdf";
    if (["doc", "docx"].includes(extension)) return "doc";
    if (["zip", "rar", "7z"].includes(extension)) return "zip";
    if (["mp4", "mov", "avi"].includes(extension)) return "video";
    if (["mp3", "wav"].includes(extension)) return "audio";
    return "file";
  };
  

  const MySwal = withReactContent(Swal);

  // Delete handler
  const handleDeleteAlert = (messageId) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this message?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 1. Call backend to delete
          const res = await fetch('/api/messages/delete-message', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to delete');

          // 2. Dispatch action to remove from Redux
          dispatch(deleteMessage(messageId));

          MySwal.fire('Deleted!', 'Your message has been deleted.', 'success');

        } catch (error) {
          console.error(error.message);
          MySwal.fire('Error', error.message, 'error');
        }
      }
    });
  };

  
  const renderDmMessages = (message) =>
  <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
    {
      message.isDeleted ? (
        <div className="italic text-white/80 bg-gray-700 border inline-block p-1 rounded my-1 max-w-[60%]">
          Message deleted
        </div>
      ) : message.messageType === "text" && (
        <div className={`${message.sender !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20" } border inline-block p-4 rounded my-1 max-w-[60%] break-words`}>
          {message.content}
        </div>
      )
    }
    {/* {
      message.messageType === "text" && <div className={`${message.sender !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20" } border inline-block p-4 rounded my-1 max-w-[60%] break-words`}>
      {message.content}
    </div>
    } */
    //   message.messageType === "file" && 
    //   <div className={`${message.sender !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#ff11ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ff11ff]/30" } border inline-block p-3 rounded my-1 max-w-[60%] break-words`}>
    //     {checkIfImage(message.fileUrl) ? 
    //     <div className='cursor-pointer'>
    //       {/* <img src={`http://localhost:8000/${message.fileUrl}`} height={300} width={300}/> */}
    //       <img src={message.fileUrl} height={300} width={300}/>
    //     </div> :
    //     <div className="flex items-center justify-center gap-4">
    //       <span className='text-white/60 text-3xl bg-black/20 rounded-full p-3'>
    //         <MdFolderZip />
    //       </span>
    //       <span>{message.fileUrl.split("/").pop()}</span>
    //       <span className='bg-black/20 p-3 text-2xl text-white/60 rounded-full hover:bg-black/70 hover:text-white cursor-pointer transition-all duration-300' onClick={() => downloadFile(message.fileUrl)}>
    //         <IoMdArrowDown />
    //       </span>
    //     </div>
    //     }
    // </div>


    message.isDeleted ? (
      <div className="italic text-white/80 bg-gray-700 border inline-block rounded max-w-[60%]">
      </div>
    ) :
      message.messageType === "file" && 
      <div className={`${message.sender !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#ff11ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ff11ff]/30" } border inline-block p-0 rounded my-1 max-w-[60%] break-words`}>
        {getFileType(message.fileUrl) === "image" ? (
          <div className='relative group cursor-pointer inline-block'>
          {/* Image */}
          <img src={message.fileUrl} height={300} width={300} className="rounded" />
        
          {/* Download button */}
          <div 
            className='hidden group-hover:flex justify-center items-center absolute inset-0 m-auto bg-white/30 p-3 text-2xl text-black/80 rounded-full hover:bg-white/90 hover:text-black cursor-pointer transition-all duration-300 w-12 h-12'
            onClick={() => downloadFile(message.fileUrl)}
          >
            <IoMdArrowDown />
          </div>
        </div>
        
        ) : getFileType(message.fileUrl) === "pdf" ? (
          <div 
            className='p-3 relative cursor-pointer flex items-center gap-2'
            onClick={() => downloadFile(message.fileUrl)}
          >
            <span className='text-white/60 text-3xl bg-black/20 rounded-full p-3'>
              📄
            </span>
            <span className="truncate max-w-[150px]">{message.fileUrl.split("/").pop()}</span>
            <span className='bg-black/20 p-3 text-2xl text-white/60 rounded-full hover:bg-black/70 hover:text-white cursor-pointer transition-all duration-300' onClick={() => downloadFile(message.fileUrl)}>
                <IoMdArrowDown />
              </span>
          </div>
        ) : getFileType(message.fileUrl) === "video" ? (
          <video 
            src={message.fileUrl} 
            controls 
            width="100%" 
            className="rounded"
          />
        ) : getFileType(message.fileUrl) === "audio" ? (
          <audio 
            src={message.fileUrl} 
            controls 
            className="w-full"
          />
        ) : (
          <div className="p-3 flex items-center justify-center gap-4">
            <span className='text-white/60 text-3xl bg-black/20 rounded-full p-3'>
              <MdFolderZip />
            </span>
            <span className="truncate max-w-[150px]">{message.fileUrl.split("/").pop()}</span>
            <span 
              className='bg-black/20 p-3 text-2xl text-white/60 rounded-full hover:bg-black/70 hover:text-white cursor-pointer transition-all duration-300' 
              onClick={() => downloadFile(message.fileUrl)}
            >
              <IoMdArrowDown />
            </span>
          </div>
        )}
      </div>
    
    }
    <div className="text-xs text-gray-600">
      {moment(message.createdAt).format("LT")}
      {
        !message.isDeleted && 
        <button className='ml-2 cursor-pointer' onClick={() => handleDeleteAlert(message._id)}><FaTrashCan className='hover:text-red-500 ' /></button>
      }
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
      <div ref={scrollRef} className=""></div>
    </div>
  )
}
