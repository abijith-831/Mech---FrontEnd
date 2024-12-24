import React, { useState, useEffect } from "react";
import "./styles/login.css";
import { loginRequest , forgetPass, verifyOtp ,resetPass} from "../../services/user/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [isModalOpen , setIsModalOpen] = useState(false)
  const [showOtpModal , setShowOtpModal] = useState(false)
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [otpData, setOtpData] = useState<string>("");
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<any>({
    emailError: "",
    passwordError: "",
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const { email, password } = formData;
      let errors = {
        email: "",
        password: "",
      };

      if (email && !/^[^\s@]+@gmail\.com$/.test(email)) {
        errors.email = "Please enter a valid Gmail address (e.g., user@gmail.com).";
      }

      if (password && !/^[0-9]{4,}$/.test(password)) {
        errors.password = "Password must be at least 4 digits long.";
      }

      setFormErrors(errors);

      const isValid = !Object.values(errors).some((error) => error !== "");
      setIsFormValid(isValid);
    }, 2000);
 
    return () => {
      clearTimeout(timer);
    };
  }, [formData]);


  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault()

    try {
        const response = await loginRequest(formData.email , formData.password)
        
        if(response.data.accessToken){
            localStorage.setItem('accessToken',response.data.accessToken)
            toast.success(response.data.message)  
            dispatch(loginSuccess(response.data.data))
            navigate('/')
        }       
        
    } catch (error) {
        console.log('catch error');   
        toast.error('Email or Password is Incorrect')  
    }

  }


  const handleForgotPassword = async (e:React.FormEvent) =>{
    e.preventDefault()

    try {
      const response = await forgetPass(resetEmail)
      
      if(response.data){
        toast.success(response.data.response.message)

        setIsModalOpen(false)
        setShowOtpModal(true)
      }
      

    } catch (error) {
      
    }
  }


  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpData(e.target.value);
  };


  const closeOtpModal = ()=>{
    setShowOtpModal(false)
  }


  const handleOtpSubmit = async(e:React.FormEvent)=>{
    e.preventDefault()
    try {
        const response = await verifyOtp(otpData , resetEmail)
        if(response.data.message){

          toast.success('OTP Verified Successfully')
  
          setShowOtpModal(false)
          setShowResetPasswordModal(true)
        }
        
      
    } catch (error) {
      
    }
  }


  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    try {
      const response = await resetPass(newPassword, resetEmail);
      
      if (response.data.success) {
        toast.success('Password Changed Successfully...!');
        setShowResetPasswordModal(false);
        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    }
  };

  
  return (
    <div>
      <div className="login-container">
        <main className="login-main">
          <div className="login-form-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="form-input"
                  required
                />
                {formErrors.email && <p className="error-message">{formErrors.email}</p>}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="form-input"
                  required
                />
                {formErrors.password && <p className="error-message">{formErrors.password}</p>}
                <p className="forgot-password-link">
                  <button onClick={()=> setIsModalOpen(true)}>
                  Forgot Password?
                  </button>
                </p>

              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className={`form-button ${isFormValid ? "enabled" : "disabled"}`}
                  disabled={!isFormValid}
                >
                  Login
                </button>
              </div>
              <div className="or-container">
                <div className="line"></div>
                <span className="or-text">or</span>
                <div className="line"></div>
              </div>
              <div className="google">
                <button>Sign In with Google</button>
              </div>
            </form>

            <p className="login-prompt">
              New here?{" "}
              <a href="/signup" className="login-link">
                Create an Account
              </a>
            </p>
          </div>
        </main>
      </div>

      {/* emial Modal */}
      {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-title">Forgot Password</h2>
              <form onSubmit={handleForgotPassword} className="modal-form">
                <div className="form-group">
                  <input
                    type="email"
                    id="resetEmail"
                    name="resetEmail"
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="modal-input"
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="modal-button cancel"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="modal-button send-otp">
                    Send OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


      {/* otp modal */}
      {showOtpModal && (
        <div className="otp-modal-overlay">
          <div className="otp-modal">
            <h2 className="otp-title">Enter OTP</h2>
            

            <form className="otp-form">
              <input
                type="text"
                placeholder="Enter OTP"
                className="otp-input"
                value={otpData}
                onChange={handleOtp}
              />
              <div className="otp-buttons">
                <button type="button" onClick={closeOtpModal} className="otp-cancel-button">
                  Cancel
                </button>
                <button type="button" onClick={handleOtpSubmit} className="otp-verify-button">
                  Verify
                </button>
              </div>
              <div className="otp-resend">
                {resendDisabled ? (
                  <p className="resend-timer">Resend OTP in  seconds</p>
                ) : (
                  <button type="button" className="resend-button">
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}



      {/* password modal */}
      {showResetPasswordModal && (
         <div className="modal-overlay">
         <div className="modal-content">
           <h2 className="modal-title">Reset Password</h2>
           <form className="modal-form" onSubmit={handleResetPassword}>
             <div className="form-group">
               <input
                 type="password"
                 placeholder="New Password"
                 id="newPassword"
                 onChange={(e)=>setNewPassword(e.target.value)}
                 className="modal-input"
                 required
               />
             </div>
             <div className="form-group">
               <input
                 type="password"
                 placeholder="Confirm Password"
                 id="confirmPassword"
                 onChange={(e)=>setConfirmPassword(e.target.value)}
                 className="modal-input"
                 required
               />
             </div>
             <div className="modal-buttons">
               <button
                 type="button"
                 onClick={() => setShowResetPasswordModal(false)}
                 className="modal-button cancel"
               >
                 Cancel
               </button>
               <button type="submit" className="modal-button submit">
                 Submit
               </button>
             </div>
           </form>
         </div>
       </div>
      )}      
    </div>
  );
};

export default Login;
