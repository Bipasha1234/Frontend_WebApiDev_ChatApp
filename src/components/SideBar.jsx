import React, { useState } from 'react';
import { FaCog, FaComments, FaUserCircle, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const SideBar = ({ active }) => {
  const [activeTab, setActiveTab] = useState(active || 'Chat'); // Default to 'Chat' if not provided
  const navigate = useNavigate(); // Initialize the navigation function

  const iconSize = 25;

  const sidebarItems = [
    { id: 'Chat', icon: <FaComments size={iconSize} />, label: 'Chat' },
    { id: 'Groups', icon: <FaUsers size={iconSize} />, label: 'Groups' },
    { id: 'Profile', icon: <FaUserCircle size={iconSize} />, label: 'Profile' },
    { id: 'Settings', icon: <FaCog size={iconSize} />, label: 'Settings' },
  ];

  const handleTabClick = (itemId) => {
    setActiveTab(itemId);
    if (itemId === 'Profile') {
      navigate('/user/profile-setup'); 
    } else {
      navigate(`/${itemId.toLowerCase()}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 bg-[#d5e8e1] text-gray-700 flex flex-col items-center py-6 space-y-8">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`p-3 rounded-lg cursor-pointer ${activeTab === item.id
                ? 'bg-[#6cbfa3] text-white border-l-4 border-[#1d755d]' // Highlight "Profile" tab only
                : 'hover:bg-gray-100'
              }`}
            title={item.label}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
