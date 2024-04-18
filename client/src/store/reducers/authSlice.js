import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: false,
    loading: false
}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart(state){
            state.loading = true
        },
        signInSuccess(state, action){
            state.loading = false,
            state.error = false,
            state.currentUser = action.payload
        }, 
        signInFailure(state, action){
            state.loading = false,
            state.error = action.payload
        },
        signOutSuccess(state){
            state.loading = false;
            state.error = false;
            state.currentUser = null
        },
        accountDeleteStart(state){
            state.loading = true;
        },
        accountDeleteSuccess(state, action){
            state.loading = false;
            state.error = false;
            state.currentUser = null
        },
        accountDeleteFaliure(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        updateAccountStart(state){
            
            state.loading = true
        },
        updateAccountSuccess(state, action){
            state.loading = false
            state.error = false
            state.currentUser = action.payload
        },
        updateAccountFaliure(state, action){
            state.loading = false
            state.error = action.payload
        }
    }
})

export const  {signInFailure, signInStart, signInSuccess, signOutSuccess, accountDeleteFaliure, accountDeleteStart, accountDeleteSuccess,updateAccountStart,updateAccountSuccess,updateAccountFaliure} = userSlice.actions

export default userSlice.reducer