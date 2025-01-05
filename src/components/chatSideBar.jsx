// import React, { useState } from 'react';
// import { FaCog, FaComments, FaUserCircle, FaUsers } from 'react-icons/fa';

// const ChatSideBar = () => {
//   const [activeTab, setActiveTab] = useState('Chat'); 

//   const iconSize = 25; 

//   const sidebarItems = [
//     { id: 'Chat', icon: <FaComments size={iconSize} />, label: 'Chat' },
//     { id: 'Groups', icon: <FaUsers size={iconSize} />, label: 'Groups' },
//     { id: 'Profile', icon: <FaUserCircle size={iconSize} />, label: 'Profile' },
//     { id: 'Settings', icon: <FaCog size={iconSize} />, label: 'Settings' },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-20 bg-[#d5e8e1] text-gray-700 flex flex-col items-center py-6 space-y-8">
//         {sidebarItems.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => setActiveTab(item.id)}
//             className={`p-3 rounded-lg cursor-pointer ${
//               activeTab === item.id
//                 ? 'bg-[#6cbfa3] text-white'
//                 : 'hover:bg-gray-100'
//             }`}
//             title={item.label}
//           >
//             {item.icon}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatSideBar;


import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../src/core/public/store/useAuthStore";
import { useChatStore } from "../../src/core/public/store/useChatStore";
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 bg-gradient-to-tl from-green-100 to-white border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5 bg-green-200 rounded-t-lg shadow-md">
        <div className="flex items-center gap-2 text-gray-800">
          <Users className="text-2xl text-gray-700" />
          <span className="font-semibold hidden lg:block">Contacts</span>
        </div>
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span>Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 rounded-lg transition-all duration-200
              hover:bg-green-100 hover:text-black
              ${selectedUser?._id === user._id ? "bg-green-200 ring-2 ring-green-400" : ""}
            `}
          >
            <div className="relative">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-gray-800">{user.fullName}</div>
              <div className="text-sm text-gray-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
