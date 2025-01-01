import axios from "axios";

const API_URL = import.meta.env.VITE_MECH_API_URL

const api=axios.create({
    baseURL:API_URL,
    withCredentials:true
})

export const registerRequest = async (FormData:any)=>{
    
    const response = await api.post('/register',FormData)
    
    return response
    
}


export const loginRequest = async (email:string , password:string)=>{
    
    const response = await api.post('/login',{email , password})
    
    return response
    
}