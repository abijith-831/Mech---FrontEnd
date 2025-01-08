import {createSlice} from '@reduxjs/toolkit'


const initialState: UserState={
    currentUser : null,
    loading:false,
    error:false,
    isAuthenticated : false
}

interface IAddress {
    _id: string;
    area: string;
    village: string;
    landmark: string;
    city: string;
    pincode: string;
}

interface User{
    data : User | null;
    userId : string ; 
    username : string ; 
    email : string
    phone?:string;
    image?: string;
    addresses?: IAddress[];
}

interface UserState{
    currentUser : User  | null;
    loading : boolean ;
    error : boolean;
    isAuthenticated : boolean
}

const userReducer=createSlice({

    name: 'user',
    initialState,

    reducers:{

        loginStart:(state)=>{
            state.loading=true
        },
        loginSuccess: (state, action) => {
            console.log('Action Payload:', action.payload)
            const imageUrl = `http://localhost:3000/${action.payload.image}`
            state.currentUser = {
              ...action.payload,
              userId: action.payload._id,
              image: imageUrl || 'https://via.placeholder.com/150', 
            };
            state.loading = false;
            state.error = false;
            state.isAuthenticated = true;
        },
        loginFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
        logout:(state)=>{
            state.currentUser=null
            state.isAuthenticated=false
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
            state.isAuthenticated = true;
        },
        updateUserImage: (state, action) => {
            if (state.currentUser) {
              state.currentUser.image = action.payload;
            }
        },
        removeUserImage: (state) => {
            if (state.currentUser) {
              state.currentUser.image = undefined; 
            }
        },
        updateUserName: (state, action) => {
            if (state.currentUser) {
              state.currentUser.username = action.payload; 
            }
        },
        addPhoneNumber: (state, action) => {
            if (state.currentUser) {
              state.currentUser.phone = action.payload; 
            }
        },
        addAddresss: (state, action) => {           
            if (state.currentUser) {
              state.currentUser.addresses = state.currentUser.addresses || [];
              state.currentUser.addresses.push(action.payload); 
            }
          },
          
    }
})


export const {loginStart,
    loginFailure,
    loginSuccess,
    logout,
    signUpSuccess,
    updateUserImage ,
    removeUserImage ,
    updateUserName ,
    addPhoneNumber,
    addAddresss,
} = userReducer.actions;


export default userReducer.reducer