import { useState } from 'react';
import BGImg from '../../assets/user/bg.jpg'

const SignUpPage = () => {

  const [formData, setFormData] = useState<any>({
    username: '',
    email: '',
    password: ''
  });


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    

    
  }
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${BGImg})` }}>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-40"></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 md:w-1/3 w-full z-10">
          <h2 className="text-2xl font-bold text-center text-[#88c065] mb-4">Sign Up</h2>
          <form className='space-y-6 px-4'>
            <div className="mb-4">
              <input
                type="text"
                id='username'
                name='username'
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border rounded-md text-gray-800  bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id='email'
                name='email'
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border rounded-md text-gray-800 bg-gray-200 "
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id='password'
                name='password'
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full px-4 py-3 border rounded-md text-gray-800  bg-gray-200"
              />
            </div>
            <div className="flex items-start mb-4">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-[#88c065] underline">privacy policy</a>, terms, and conditions.
              </label>
            </div>
            <div className='flex justify-center'>
              <button
                type="submit"
                className="w-72 flex justify-center bg-[#88c065]  text-white font-semibold py-3 rounded-md hover:bg-green-500 transition-colors"
              >
                Get OTP
              </button>
            </div>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button
              type="button"
              className="w-full bg-red-500 d py-3 rounded-md hover:bg-red-600 transition-colors"
            >
              Sign In with Google
            </button>
          </form>
          <p className="text-start text-sm text-gray-600 mt-4">
            Already have an account? <a href="#" className="text-green-600 underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
