import { userAxiosInstance } from "../axiosInstance/userInstance";

const api = userAxiosInstance;

export const changeImage = async (formData: FormData) => {
  try {
    console.log('gg',formData);
    
    const response = await api.post('/changeImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const removeImage = async(userId:string)=>{
  try {
    const response = await api.delete('/removeImage',{params: {userId}})

    return response

  } catch (error) {
    
  }



}

export const changeName  = async(userId:string , username:string)=>{
  try {

    const response = await api.patch('/changeName',{userId,username})

    return response

  } catch (error) {
    
  }
}


export const addNumber = async(userId:string,phone:string)=>{
  try {
    
    const response = await api.post('/addNumber',{userId,phone})

    return response
    
  } catch (error) {
    
  }
}

export const addAddress = async (userId: string, formData: FormData) => {
  try {

    formData.append('userId', userId);

    const response = await api.post('/addAddress', formData)

    return response.data; 
    
  } catch (error) {
    console.error('Error adding address:', error);
  }
};


export const deleteAddress = async(userId:string , index:number)=>{
  try {

    const response = await api.delete('/deleteAddress',{data:{userId,index}})
    
    return response

  } catch (error) {
    
  }
}