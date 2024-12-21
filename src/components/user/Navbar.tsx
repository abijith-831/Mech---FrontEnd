import React, { useState } from 'react';
import './styles/navbar.css';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux'; 
import { signUpRequest } from '../../services/user/userApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profile from '../../assets/user/say my name.jpg'



const Navbar: React.FC = () => {
  const dispatch = useDispatch(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);
  // const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState({ fullName: '', email: '', password: '' });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const openModal = (type: 'login' | 'signup') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  // const closeOTPModal = () => {
  //   setIsOTPModalOpen(false);
  // };

  // const handleOTPVerification = (otp: string) => {
  //   if (otp === '123456') {
  //     console.log('OTP verified successfully!');
  //     dispatch({ type: 'SIGNUP', payload: signupFormData });
  //     setIsOTPModalOpen(false);
  //     setIsModalOpen(false); // Close both modals after successful signup
  //   } else {
  //     console.error('Invalid OTP');
  //   }
  // };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Data:', loginFormData); 
    dispatch({ type: 'LOGIN', payload: loginFormData }); 
    closeModal();
  };
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUpRequest(signupFormData);
  
      if (response?.data?.success) {
        toast.success(response.data.message); 
        setIsLoggedIn(true);
        closeModal(); 
      } else {
        toast.error(response?.data?.message || "Signup failed");
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error("An error occurred during signup");
    }
  };
  

  const modalContent = isModalOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{modalType === 'login' ? 'Login' : 'Sign Up'}</h2>
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          {modalType === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginFormData.email}
                onChange={handleLoginChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginFormData.password}
                onChange={handleLoginChange}
              />
              <button type="submit">Login</button>
              <div className="or-container">
                <span className="line"></span>
                <span className="or-text">OR</span>
                <span className="line"></span>
              </div>
              <div className="google">
                <button>Sign In With Google</button>
              </div>
              <div className="new-here">
                <h3>
                  New Here? <span>Create Account</span>
                </h3>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={signupFormData.fullName}
                onChange={handleSignupChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={signupFormData.email}
                onChange={handleSignupChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={signupFormData.password}
                onChange={handleSignupChange}
              />
              <div className="checkbox-container">
                <input type="checkbox" id="agreePolicy" name="agreePolicy" required />
                <label htmlFor="agreePolicy">
                  I agree to the privacy & policy, terms and conditions, and content policies.
                </label>
              </div>
              <button type="submit">Sign Up</button>
              <div className="or-container">
                <span className="line"></span>
                <span className="or-text">OR</span>
                <span className="line"></span>
              </div>
              <div className="google">
                <button>Sign Up With Google</button>
              </div>
              <div className="new-here">
                <h3>
                  Already have an account? <span>Login</span>
                </h3>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="logo">
          <h1>LOGO</h1>
        </div>
        <div className="left-nav-items">
          <h3>
            <span>ADD WORKSHOPS / MECHANICS</span>
          </h3>
        </div>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <div className="profile-icon">
            <img
              src={profile} 
              alt="Profile"
              className="profile-image"
              style={{width:'30px' , height:'30px',borderRadius:'50%' }}
            />
          </div>
        ) : (
          <div className={`nav-links ${isMenuOpen ? 'show-menu' : ''}`}>
            <ul>
              <li>
                <button onClick={() => openModal('signup')}>Sign Up</button>
              </li>
              <li>
                <button onClick={() => openModal('login')}>Login</button>
              </li>
            </ul>
          </div>
        )}
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      
      {ReactDOM.createPortal(modalContent, document.getElementById('modal-root')!)}
      {/* {ReactDOM.createPortal(<OTP isOpen={isOTPModalOpen} onClose={closeOTPModal} onVerifyOTP={handleOTPVerification} />, document.getElementById('modal-root')! */}
    </div>
  );
};

export default Navbar;
