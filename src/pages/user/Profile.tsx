import { useEffect, useState } from 'react';
import carBanner from '../../assets/user/profile-banner.jpg';
import EditProfile from '../../components/user/EditProfile';
import Services from '../../components/user/Services';
import Favourites from '../../components/user/Favourites';
import Notifications from '../../components/user/Notifications';
import Advises from '../../components/user/Advises';
import Reviews from '../../components/user/Reviews';
import Wallet from '../../components/user/Wallet';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [progress, setProgress] = useState(25);
  const { currentUser } = useSelector((state: RootState) => state.user);
  

  useEffect(() => {
    let calculatedProgress = 25; 
    if (currentUser?.image) calculatedProgress += 25;
    if(currentUser?.phone) calculatedProgress += 25
    setProgress(calculatedProgress);
  }, [currentUser]);


  const handleNavigation = (tab: any) => {
    setActiveTab(tab);
  };

  const sidebarItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'services', label: 'Service / Booking History' },
    { id: 'favorites', label: 'Favourites / Saved' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'advise', label: 'Mechanic Advice' },
    { id: 'reviews', label: 'Reviews & Ratings' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'logout', label: 'Logout' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <EditProfile />;
      case 'services':
        return <Services />;
      case 'favorites':
        return <Favourites />;
      case 'notifications':
        return <Notifications />;
      case 'advise':
        return <Advises />;
      case 'reviews':
        return <Reviews />;
      case 'wallet':
        return <Wallet />;
      default:
        return <EditProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 max-w-[85%] mx-auto">
      <div className="relative">
        <img
          src={carBanner}
          alt="Car Banner"
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-20 left-20 flex items-center space-x-4">
          <svg width="120" height="120" viewBox="0 0 80 80" className="border-4 border-gray-300 rounded-full p-2">
            <defs>
              <pattern id="image-pattern" width="100%" height="100%" patternUnits="userSpaceOnUse">
                <image
                  xlinkHref={currentUser?.image || 'https://via.placeholder.com/150'}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
            <circle cx="40" cy="40" r="48" fill="transparent" stroke="#e5e7eb" strokeWidth="16"/>
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="url(#image-pattern)"
              stroke="#88c065"
              strokeWidth="14"
              strokeDasharray="251.2"
              strokeDashoffset={`${251.2 - (251.2 * progress) / 100}`}
              strokeLinecap="round"
            />
          </svg>

          <div className="flex flex-col">
            <h1 className="text-white font-bold text-lg">{currentUser?.username}</h1>
          </div>
        </div>
        <div className="absolute bg-slate-100 bottom-[45px] left-[122px] rounded-md p-1 text-[#88c065] font-semibold">
          {progress}%
        </div>

        <div className="absolute top-5 right-10">
          <p className="text-white font-bold text-lg">{currentUser?.email}</p>
          <p className="text-white font-bold text-lg">8891137023</p>
        </div>
      </div>

      <div className="flex">
      <aside className="w-1/4 bg-white shadow-md">
  <ul className="space-y-4 p-4">
    {sidebarItems.map((item) => (
      <li
        key={item.id}
        onClick={() => handleNavigation(item.id)}
        className={`cursor-pointer py-2 px-4 transition duration-300 ease-in-out transform 
          hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white hover:scale-105
          ${activeTab === item.id ? 'bg-gradient-to-r from-green-400 to-green-600 font-bold text-white' : 'text-gray-700'}
        `}
      >
        {item.label}
      </li>
    ))}
  </ul>
</aside>


        <main className="flex-1 bg-white shadow-md m-0 rounded-md">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Profile;
