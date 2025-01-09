import { MoreVertical, Search, X } from "lucide-react";
import { useAuthStore } from "../../src/core/public/store/useAuthStore";
import { useChatStore } from "../../src/core/public/store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 bg-[#d5e8e1] border-b border-base-300 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="avatar">
          <div className="size-10 rounded-full relative">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>

        {/* User info */}
        <div>
          <h3 className="font-medium">{selectedUser.fullName}</h3>
          <p className="text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end  gap-2">
        {/* Search button */}
        <button className="btn btn-circle">
          <Search size={20} />
        </button>

        {/* Three-dot vertical button */}
        <button className="btn btn-circle">
          <MoreVertical size={20} />
        </button>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="btn btn-circle">
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
