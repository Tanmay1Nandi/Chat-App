import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
})

export const { chatClose, chatOpen } = chatSlice.actions;

export default chatSlice.reducer;