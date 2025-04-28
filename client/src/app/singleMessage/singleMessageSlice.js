import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    singleMessage: null,
}

const singleMessageSlice = createSlice({
    name: 'singleMessage',
    initialState,
    reducers: {
        addSingleMessage: (state, action) => {
            state.singleMessage = action.payload;
        },
        removeSingleMessage: (state) => {
            state.singleMessage = null;
        }
    }
});

export const {addSingleMessage, removeSingleMessage} = singleMessageSlice.actions;

export default singleMessageSlice.reducer;