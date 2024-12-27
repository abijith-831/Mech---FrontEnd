import { userAxiosInstance } from "../axiosInstance/userInstance";

const api=userAxiosInstance


export const signUpRequest=async(formData:any)=>{
    console.log('for',formData);
    
    const response=await api.post('/signup',formData)
    
    return response
}

export const verifyOtp=async(otpData:string,email:string)=>{

    const response=await api.post('/verifyOtp',{ otpData,email})

    return response

}

export const resendOtp=async(email:string)=>{

    const response=await api.post('/resendotp',{email})

    return response
}

export const forgetPass=async(email:string)=>{

    const response=await api.post('/forgetpass',{email})

    return response

}

export const resetPass=async(newPass:string,email:string)=>{

    const response=await api.post('/resetPass',{newPass,email})

    return response

}

export const loginRequest=async(email:string,password:string)=>{

    const response =await api.post('/login',{email,password})
    
    return response

}

export const profileRequest=async(email:string)=>{

    console.log('jj')

    const response=await api.get(`/userProfile/${email}`)

    return response

}

export const updateProfie=async(updateddata:{username:string,email:string,id:string})=>{

    const response=await api.post('/updateprofile',{updateddata})

    return response

}


export const userLogout=async()=>{

    const response=await api.get('/logout')

    if(!response){

    }

    return response

}