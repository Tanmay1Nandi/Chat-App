import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    oneMessage: null,
}

const singleMessageSlice = createSlice({
    name: 'singleMessage',
    initialState,
    reducers: {
        addSingleMessage: (state, action) => {
            state.oneMessage = action.payload;
        },
        removeSingleMessage: (state) => {
            state.oneMessage = null;
        }
    }
});

export const {addSingleMessage, removeSingleMessage} = singleMessageSlice.actions;

export default singleMessageSlice.reducer;