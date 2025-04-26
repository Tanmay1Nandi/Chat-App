import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInRefresh: (state) => {
            state.loading = false;
            state.error = null;
        },
        signInSuccess: (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        signOutSuccess: (state, action) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        }
    }
})

export const {signInFailure, signInRefresh, signInStart, signInSuccess, updateSuccess, signOutSuccess} = userSlice.actions;

export default userSlice.reducer;