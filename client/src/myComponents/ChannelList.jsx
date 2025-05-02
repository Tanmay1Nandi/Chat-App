import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  refreshMessage,
  setSelectedChatType,
  setSelectedChatData,
} from '../app/chat/chatSlice';

export default function ContactList({ channels, isChannel = true }) {
  const dispatch = useDispatch();
  const { selectedChatData } = useSelector((state) => state.chat);

  const handleClick = (channel) => {
    dispatch(setSelectedChatType(isChannel ? "channel" : "contact"));
    dispatch(setSelectedChatData(channel));

    if (selectedChatData && selectedChatData._id !== channel._id) {
      dispatch(refreshMessage());
    }
  };

  return (
    <div className="mt-5">
      {channels.map((channel) => (
        <div
          key={channel._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === channel._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#ff11ff]/50"
          }`}
          onClick={() => handleClick(channel)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300 my-2">
            <div className="text-lg break-words capitalize flex">
                <span className="mr-2 rounded-full w-8 h-8 flex justify-center items-center border-1 capitalize bg-green-900">
                    {
                        channel.name[0] !== "" ? channel.name[0] : "X"
                    }
                </span>
              {channel.name || "Unnamed"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
