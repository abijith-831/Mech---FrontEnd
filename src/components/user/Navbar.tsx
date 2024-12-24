import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate  } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import profile from '../../assets/user/say my name.jpg';
import './styles/navbar.css';
import { userLogout } from '../../services/user/userApi';
import { logout } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  const handleSignUpClick = ()=>{
      navigate('/signUp')
  }

  const handleLoginClick = () => {
    navigate('/login');
  };


  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async()=>{
    try {
      const response = await userLogout()
      dispatch(logout())
      localStorage.removeItem('accessToken')
      toast.success(response.data.message)
      
    } catch (error) {
      
    }
  }
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
        {currentUser ? (
          <div className="profile-section">
            <h4>{currentUser.username}</h4>
            <div className="profile-dropdown">
              <img
                src={profile}
                alt="Profile"
                className="profile-image"
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="dropdown-menu open">
                  <ul>
                    <li>Profile</li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={`nav-links ${isMenuOpen ? 'show-menu' : ''}`}>
            <ul>
              <li>
                <button onClick={handleSignUpClick}>Sign Up</button>
              </li>
              <li>
                <button onClick={handleLoginClick}>Login</button>
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
    </div>
  );
};

export default Navbar;
