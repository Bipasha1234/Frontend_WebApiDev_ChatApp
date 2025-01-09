import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
import SideBar from "../../../components/SideBar";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, logout } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

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
    <div className="h-screen flex font-open-sans">
      <SideBar active="Profile" />

      <div className="flex-1 max-w-3xl mx-auto p-6">
        <div className="shadow rounded-xl p-4 space-y-4 bg-opacity-60 bg-[#98D3BF]">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-semibold text-gray-800">Profile</h1>
            <p className="text-gray-500">Manage your profile information and settings</p>
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
                bg-[#91ccb6] hover:bg-[#82c6ad] 
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
            <p className="text-sm text-gray-500">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="text-gray-800 px-4 py-2.5 bg-gray-100 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg shadow-sm space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="text-gray-800 px-4 py-2.5 bg-gray-100 rounded-lg border">
                {authUser?.email}
              </p>
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
    </div>
  );
};

export default ProfilePage;
