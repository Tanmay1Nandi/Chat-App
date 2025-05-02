import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";

const initialState = {
    selectedChatType: null,
    selectedChatData: null,
    selectedChatMessages: [],
    directMessagesContacts: [],
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        setSelectedChatType: (state, action) => {
            state.selectedChatType = action.payload;
        },
        setSelectedChatData:(state, action) => {
            state.selectedChatData = action.payload;
        },
        chatOpen: (state, action) =>{
            state.selectedChatType= action.payload.type;
            state.selectedChatData= action.payload.data;
            state.selectedChatMessages= action.payload.messages;
        },
        chatClose: (state, action)=>{
            state.selectedChatType = null;
            state.selectedChatData = null;
            state.selectedChatMessages = [];
        },
        // addMessage: (state, action) => {
        //     const message = action.payload;

        //     // console.log("receipent",message.recepient);
        //     // console.log(message.sender._id);
        //     console.log("message",message)
        //     state.selectedChatMessages.push({
        //         ...message,
        //         recipient:
        //             state.selectedChatType === "channel"
        //                 ? message.recipient
        //                 : message.recipient,
        //         sender:
        //             state.selectedChatType === "channel"
        //                 ? message.sender
        //                 : message.sender
        //     });
        // }
        refreshMessage: (state) => {
            state.selectedChatMessages = [];
        },
        addMessage: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
          
            messages.forEach((message) => {
              const exists = state.selectedChatMessages.some((msg) => msg._id === message._id);
              if(!exists){
                state.selectedChatMessages.push({
                  ...message,
                  recipient:
                    state.selectedChatType === "channel"
                      ? message.recipient
                      : message.recipient,
                  sender:
                    state.selectedChatType === "channel"
                      ? message.sender
                      : message.sender,
                });
              }
            });
          },
          deleteMessage: (state, action) => {
            const messageId = action.payload;
            state.selectedChatMessages = state.selectedChatMessages.map(msg =>
              msg._id === messageId ? { ...msg, isDeleted: true } : msg
            );
          },
          replaceMessage: (state, action) => {
            const { tempId, newMessage } = action.payload;
            state.selectedChatMessages = state.selectedChatMessages.map(msg =>
              msg._id === tempId ? newMessage : msg
            );
          },
          setDirectMessagesContacts: (state, action) => {
            state.directMessagesContacts = action.payload;
          },
          removeMessage: (state, action) => {
            state.selectedChatMessages = state.selectedChatMessages.filter(msg => msg._id !== action.payload);
          },       
    }
})

export const {setSelectedChatType, replaceMessage, removeMessage, deleteMessage, setSelectedChatData, chatClose, chatOpen, addMessage, refreshMessage, setDirectMessagesContacts } = chatSlice.actions;

export default chatSlice.reducer;