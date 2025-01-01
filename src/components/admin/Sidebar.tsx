import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-80 bg-[#7e8799] text-white h-screen flex flex-col p-6 mt-5 mb-10 ml-5 mr-5 shadow-md">
      <div>
        <h2 className="text-3xl font-bold text-center text-white mb-8">Admin Dashboard</h2>

        <ul className="space-y-4">
          <li>
            <div
              className={`p-3 rounded-md transition duration-200 ease-in-out ${
                isActive('/admin/dashboard')
                  ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600'
                  : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-green-400 hover:via-green-500 hover:to-green-600'
              }`}
            >
              <Link
                to="/admin/dashboard"
                className="text-white text-lg font-medium"
              >
                Dashboard
              </Link>
            </div>
          </li>
          <li>
            <div
              className={`p-3 rounded-md transition duration-200 ease-in-out ${
                isActive('/admin/userList')
                  ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600'
                  : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-green-400 hover:via-green-500 hover:to-green-600'
              }`}
            >
              <Link
                to="/admin/userList"
                className="text-white text-lg font-medium"
              >
                Users
              </Link>
            </div>
          </li>
          <li>
            <div
              className={`p-3 rounded-md transition duration-200 ease-in-out ${
                isActive('/admin/mechLists')
                  ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600'
                  : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-green-400 hover:via-green-500 hover:to-green-600'
              }`}
            >
              <Link
                to="/admin/mechLists"
                className="text-white text-lg font-medium"
              >
                Mechanics
              </Link>
            </div>
          </li>
          <li>
            <div
              className={`p-3 rounded-md transition duration-200 ease-in-out ${
                isActive('/admin/blacklisted')
                  ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600'
                  : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-green-400 hover:via-green-500 hover:to-green-600'
              }`}
            >
              <Link
                to="/admin/blacklisted"
                className="text-white text-lg font-medium"
              >
                Blacklisted
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-green-400 hover:via-green-500 hover:to-green-600 p-3 rounded-md transition duration-200 ease-in-out">
          <Link
            to="/admin"
            className="text-white text-lg font-medium block"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
