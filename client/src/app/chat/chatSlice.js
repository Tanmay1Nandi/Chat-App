import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";

const initialState = {
    selectedChatType: null,
    selectedChatData: null,
    selectedChatMessages: [],
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
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
            });
          }        
    }
})

export const { chatClose, chatOpen, addMessage, refreshMessage } = chatSlice.actions;

export default chatSlice.reducer;