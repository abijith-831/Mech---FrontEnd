import axios from "axios";

export const signUpRequest = async (formData: any) => {
  try {
    console.log('uilsdfjhg',formData);
    const response = await axios.post('http://localhost:3000/user/signUp', formData, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(response.data);
    return response
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};


export const validateOtpRequest = async()=>{
    try {
        
    } catch (error) {
        
    }
}