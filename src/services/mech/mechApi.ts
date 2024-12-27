import axios from "axios";

const API_URL = import.meta.env.VITE_MECH_API_URL

const api=axios.create({
    baseURL:API_URL,
    withCredentials:true
})

export const registerRequest = async (FormData:any)=>{
    console.log('sfsf',FormData);
    
    const response = await api.post('/register',FormData)

    console.log('gndnn',response);
    
}