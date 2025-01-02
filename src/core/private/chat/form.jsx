import React from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi"; // Importing React Icons
import ChatSideBar from "../../../components/chatSideBar";

const ChatApp = () => {
  const chatList = [
    {
      id: 1,
      name: "Ram Lamsal",
      message: "Thank you very much. I'm glad...",
      time: "10:25",
      unread: 0,
    },
    {
      id: 2,
      name: "Har Ram",
      message: "Sure! Let me tell you about...",
      time: "10:25",
      unread: 1,
    },
    {
      id: 3,
      name: "Ram Krishna Lamsal",
      message: "Thanks a bunch! Have a great day! 😊",
      time: "10:25",
      unread: 5,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-open-sans">
      <ChatSideBar />
      {/* Main Messaging Area */}
      <div className="flex-[1.5] flex flex-col">
        {/* Header */}
        <div className="bg-white text-black px-4 py-3 flex items-center justify-between shadow">
          <div className="flex items-center">
            <h1 className="text-xl mt-2 mr-2">Messaging</h1>
            <span className="text-xs bg-red-500 py-1 px-1 text-white font-extralight rounded-lg">
              32
            </span>
          </div>
          <button className="text-green-500 text-2xl font-bold">+</button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-2 bg-white shadow flex items-center space-x-2">
          <span className="text-gray-500">
            <FiSearch className="h-5 w-5" /> {/* Using React Icon */}
          </span>
          <input
            type="text"
            placeholder="Search ..."
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Chat List */}
        <div className="flex-1 p-4 bg-white overflow-y-auto space-y-4">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between p-3 border-b hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <h2 className="font-semibold text-gray-800">{chat.name}</h2>
                  <p className="text-sm text-gray-500">{chat.message}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">{chat.time}</span>
                {chat.unread > 0 && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-[3] bg-white p-4">
        {/* Header with background color and icons */}
        <div className="flex items-center justify-between pb-4 p-3 border-b bg-[#EBF3F0]">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="font-bold text-gray-800">Ram Lamsal</h2>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            
            <button>
            <FiSearch className="h-5 w-5 text-gray-600" />
            </button>

            <button>
              <FiMoreVertical className="h-5 w-5 text-gray-600" /> {/* Using React Icon for the three dots */}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="text-gray-600">
            <p>Hey there! 👋</p>
            <span className="text-xs text-gray-400">10:10</span>
          </div>
          <div className="text-gray-600">
            <p>This is your delivery update from your place.</p>
            <span className="text-xs text-gray-400">10:10</span>
          </div>
          <div className="bg-green-500 text-white p-3 rounded-lg self-end">
            <p>Awesome, thanks!</p>
            <span className="text-xs text-gray-200">10:11</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
