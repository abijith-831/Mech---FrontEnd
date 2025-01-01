import React, { useEffect, useState } from "react";
import { resendOtp, signUpRequest, verifyOtp } from "../../services/user/userApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import './styles/SignUp.css';
import { useDispatch } from 'react-redux';
import { signUpSuccess } from "../../redux/slices/userSlice";



const Signup: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    username: '',
    email: '',
    password: ''
  });
  const [otpData, setOtpData] = useState<string>("");
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });  
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(60);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prevState: any) => ({
      ...prevState,
      [id]: value
    }));
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      const { username, email, password } = formData;
      let errors = {
        username: "",
        email: "",
        password: "",
      };

      if (username && !/^[A-Za-z\s]+$/.test(username)) {
        errors.username = "username must contain only alphabets and spaces.";
      }

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

  const closeOtpModal = () => {
    setShowOtpModal(false);
  };

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpData(e.target.value);
  };

  const startResendTimer = () => {
    setResendDisabled(true);
    setTimer(60);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setResendDisabled(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    try {
      const email = formData.email;
      const response = await resendOtp(email);

      if (response.data.success) {
        toast.success(response.data.message.message);
        startResendTimer();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const email = formData.email;
      const response = await verifyOtp(otpData, email);

      if (response.data.message.message) {
        toast.success(response.data.message.message);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    try {
      
      const response = await signUpRequest(formData);

      if (response.data.success) {
        const userData = response.data.user;
        
        dispatch(signUpSuccess(userData));
 
        setShowOtpModal(true);
        startResendTimer();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    }
  };

  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = localPart[0] + '*****' + localPart[localPart.length - 1];
    return `${maskedLocalPart}@${domain}`;
  };

  return (
    <div className="signup-container">
      <main className="signup-main">
        <div className="signup-form-container">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
                required
              />
              {formErrors.username && <p className="error-message" >{formErrors.username}</p>}
            </div>

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
            </div>

            <div className="checkbox">
              
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  
                  required
                />
              i agree to the privacy& policy,terms and
               conditions and content policies              
            </div>


            <div className="form-group">
              <button
                type="submit"
                className={`form-button ${isFormValid ? "enabled" : "disabled"}`}
                disabled={!isFormValid}
              >
                Get OTP
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
            Already have an account?{" "}
            <a href="/login" className="login-link">Log In</a>
          </p>
        </div>
      </main>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="otp-modal-overlay">
          <div className="otp-modal">
            <h2 className="otp-title">Enter OTP</h2>
            <p className="otp-description">
            Verification code has been sent to your email,
            {formData.email ? maskEmail(formData.email) : "a*****0@gmail.com"},
             please enter the same here
             to complete the signup.
            </p>
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
                  <p className="resend-timer">Resend OTP in {timer} seconds</p>
                ) : (
                  <button type="button" onClick={handleResendOtp} className="resend-button">
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
