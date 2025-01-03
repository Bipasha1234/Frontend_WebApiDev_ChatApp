import React, { useState } from 'react';
import { FaCog, FaComments, FaUserCircle, FaUsers } from 'react-icons/fa';

const ChatSideBar = () => {
  const [activeTab, setActiveTab] = useState('Chat'); 

  const iconSize = 25; 

  const sidebarItems = [
    { id: 'Chat', icon: <FaComments size={iconSize} />, label: 'Chat' },
    { id: 'Groups', icon: <FaUsers size={iconSize} />, label: 'Groups' },
    { id: 'Profile', icon: <FaUserCircle size={iconSize} />, label: 'Profile' },
    { id: 'Settings', icon: <FaCog size={iconSize} />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 bg-[#d5e8e1] text-gray-700 flex flex-col items-center py-6 space-y-8">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`p-3 rounded-lg cursor-pointer ${
              activeTab === item.id
                ? 'bg-[#6cbfa3] text-white'
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

export default ChatSideBar;
