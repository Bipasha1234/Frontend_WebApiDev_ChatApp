import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
import ChatContainer from "../../../components/ChatContainer";
import NoChatSelected from "../../../components/NoChatSelected";
import SideBar from "../../../components/SideBar";
import { useChatStore } from "../../public/store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, logout } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
   const { selectedUser } = useChatStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className=" flex font-open-sans bg-gray-100">
      <SideBar active="Profile" />

      <div className="flex-1 max-w-sm  ">
        <div className="shadow p-8 space-y-3 bg-opacity-60 bg-white">
          <div className="text-center space-y-1">
            <p className="text-1xl font-semibold text-gray-800">Profile - Manage your profile information.</p>
            
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-black"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 
                bg-[#69aa92] hover:bg-[#82c6ad] 
                text-white p-2 rounded-full cursor-pointer 
                transition-transform duration-200
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

                    {/* Profile Details */}
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 gap-1 w-80">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-1.5">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <p className="text-gray-800 px-4 text-sm py-2.5 bg-gray-100 rounded-lg border">
                  {authUser?.fullName}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg shadow-sm space-y-1.5">
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="text-gray-800 text-sm px-4 py-2.5 bg-gray-100 rounded-lg border">
                  {authUser?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-6 bg-gray-50 p-2 rounded-xl shadow-sm">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-300">
                <span className="text-gray-600">Member Since</span>
                <span className="text-gray-800">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Account Status</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg w-1/3 font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
     
      <div className="flex-[3]  ">
      
        <div className="bg-base-100 shadow-cl w-100  h-[calc(120vh-8rem)]">
          <div className="flex h-full overflow-hidden">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    
    </div>
    
  );
};

export default ProfilePage;
