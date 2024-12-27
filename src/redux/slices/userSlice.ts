import {createSlice} from '@reduxjs/toolkit'


const initialState: UserState={
    currentUser : null,
    loading:false,
    error:false,
    isAuthenticated : false
}

interface User{
    data : User | null;
    _id : string ; 
    username : string ; 
    email : string
}

interface UserState{
    currentUser : User | null;
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
        loginSuccess:(state,action)=>{

            state.currentUser=action.payload

            state.loading=false

            state.error=false

            state.isAuthenticated=true

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



    }
})


export const {loginStart,
    loginFailure,
    loginSuccess,
    logout,
    signUpSuccess} = userReducer.actions;

export default userReducer.reducer