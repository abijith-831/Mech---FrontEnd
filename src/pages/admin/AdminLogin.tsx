import { useState } from "react"
import { loginRequest } from "../../services/admin/adminApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


const AdminLogin = () => {
  
  const navigate = useNavigate()

  const [email , setEmail] = useState('admin@gmail.com')
  const [password , setPassword] = useState('1111')
  
  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault()

    try {
      
      const response = await loginRequest(email,password)

      console.log('front',response);
      
      if(response.data.success){
        toast.success(response.data.message)
        navigate('/admin/dashboard')
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error:any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong.");
      } else {
        toast.error("Network error. Please try again.");
      }

      
    }
  }


  return (
<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-[#1a202c] mb-6">
          Admin Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1a202c] mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
              
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1a202c] mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e)=>setPassword(e.target.value)}             
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
              
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#00563f] text-white font-medium rounded-md hover:bg-[#00482f] focus:outline-none focus:ring-2 focus:ring-[#00563f]"
            >
              Log In
            </button>
          </div>
        </form>

        
      </div>
    </div>
  )
}

export default AdminLogin