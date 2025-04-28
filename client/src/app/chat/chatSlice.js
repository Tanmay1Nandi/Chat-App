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
        addMessage: (state, action) => {
            const message = action.payload;

            state.selectedChatMessages.push({
                ...message,
                receipent:
                    state.selectedChatType === "channel"
                        ? message.recepient
                        : message.recipient._id,
                sender:
                    state.selectedChatType === "channel"
                        ? message.sender
                        : message.sender._id,
            });
        }
    }
})

export const { chatClose, chatOpen, addMessage } = chatSlice.actions;

export default chatSlice.reducer;