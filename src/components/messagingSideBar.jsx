import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useAuthStore } from "../../src/core/public/store/useAuthStore";
import { useChatStore } from "../../src/core/public/store/useChatStore";
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton";

const MessagingSidebar = () => {
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
    <aside className="h-full w-40 lg:w-72 bg-white border-r border-gray-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 bg-white shadow flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-gray-800">Messaging</h1>
          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg">32</span>
        </div>
        <button className="text-black text-2xl font-bold">+</button>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <div className="flex items-center space-x-2 border rounded-lg px-3 py-2 bg-gray-50">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search ..."
            className="flex-1 outline-none bg-transparent text-sm"
          />
        </div>
      </div>

      {/* Online filter toggle */}
      <div className="px-4 py-2 hidden lg:flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span>Show online only</span>
        </label>
        <span className="text-xs text-gray-500">({onlineUsers.length - 1} online)</span>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-2 bg-white ">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 
              hover:bg-green-100 hover:text-black 
              ${selectedUser?._id === user._id ? "bg-[#e4f6ef] ring-1 ring-[#9bf1c6]" : ""}`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="w-12 h-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-5 bg-[#e4f6ef] rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block min-w-0">
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

export default MessagingSidebar;
