import { createSlice } from "@reduxjs/toolkit";


interface Mech{
    data : Mech | null;
    _id : string
    username:string;
    email:string
}


interface MechState{
    currentMech:Mech | null;
    loading : boolean;
    error : boolean;
    isAuthenticated : boolean
}


const initialState:MechState={
    currentMech:null,
    loading:false,
    error:false,
    isAuthenticated:false
}


const mechReducer = createSlice({
    name:'mech',
    initialState,

    reducers:{
        loginStart:(state)=>{
            state.loading = true
        },
        registrationSuccess:(state,action)=>{
            state.currentMech = action.payload
            state.loading = false
            state.error = false
            state.isAuthenticated = true
        }
    }
})


export const { loginStart,
               registrationSuccess } = mechReducer.actions

export default mechReducer.reducer               