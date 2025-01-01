import { ArrowDownTrayIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import React from "react";
import icon6 from "../assets/images/image.png";
import icon1 from "../assets/images/image1.png";
import icon3 from "../assets/images/image3.png";
import icon4 from "../assets/images/image4.png";
import icon5 from "../assets/images/image5.png";

function ChatArea() {
  return (
    <div className="bg-[#ccebe0] rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start relative max-w-full h-auto md:h-[600px] font-open-sans">

      <div className="flex flex-col items-start space-y-8 md:space-y-6 w-full md:w-1/2">
        <img src={icon1} alt="Chat Illustration" className="w-auto h-56 object-contain" />
        <img src={icon5} alt="Chat" className="w-auto h-52 object-contain" />

        <div className="flex space-x-4 mt-6">

          <button className="bg-[#80CBB2] text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2">
            <UserPlusIcon className="h-5 w-5" />
            <span>Register</span>
          </button>

          <button className="bg-[#373838] text-white px-4 py-2 rounded-lg hover:bg-black flex items-center space-x-2">
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span>Download</span>
          </button>
        </div>
      </div>


      <div className="relative w-full md:w-1/2 flex flex-col items-center md:items-end">

        <div className="space-y-4">
          <img src={icon6} alt="Chat" className="w-auto h-96 object-contain" />
          <img src={icon4} alt="Chat" className="w-auto h-10 object-contain" />
        </div>

        <img src={icon3} alt="Chat" className="w-auto h-20 object-contain" />
      </div>
    </div>
  );
}

export default ChatArea;
