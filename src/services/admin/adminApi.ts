import axios from "axios";

const API_URL = import.meta.env.VITE_ADMIN_API_URL

const api=axios.create({
    baseURL:API_URL,
    withCredentials:true
})


export const loginRequest=async(email:string,password:string)=>{

    const response=await api.post('/auth/login',{email,password})

    return response

}


export const getUsers=async()=>{
    
    const response=await api.get('/getUsers')
  
    return response

}


export const getMechanics=async()=>{
    
    const response=await api.get('/getMechs')
  
    return response

}


export const verifyMechanic=async(mechId:string)=>{
    
    const response=await api.patch('/verifyMech',{mechId})
  
    return response

}