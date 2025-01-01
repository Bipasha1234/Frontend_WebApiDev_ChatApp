import { ArrowDownTrayIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import React from "react";
import icon1 from "../assets/images/image1.png";
import icon10 from "../assets/images/image10.png";
import icon3 from "../assets/images/image3.png";
import icon4 from "../assets/images/image4.png";
import icon5 from "../assets/images/image5.png";
import icon6 from "../assets/images/image6.png";
import icon7 from "../assets/images/image7.png"; // Image for "Private Messaging"
import icon8 from "../assets/images/image8.png"; // New image for "Stay Connected"
import icon9 from "../assets/images/image9.png";
function ChatArea() {
  return (
    <>
      {/* Main Green Container */}
      <div className="bg-[#ccebe0] rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start relative max-w-full h-auto md:h-[600px] font-open-sans">
        {/* Left Section */}
        <div className="flex flex-col items-start space-y-8 md:space-y-6 w-full md:w-1/2">
          <img src={icon1} alt="Chat Illustration" className="w-auto h-56 object-contain" />
          <img src={icon5} alt="Chat" className="w-auto h-52 object-contain" />

          {/* Buttons */}
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

        {/* Right Section Images */}
        <div className="relative w-full md:w-1/2 flex flex-col items-center md:items-end">
          <div className="space-y-4">
            <img src={icon6} alt="Chat" className="w-auto h-96 object-contain" />
            <img src={icon4} alt="Chat" className="w-auto h-10 object-contain" />
          </div>
          <img src={icon3} alt="Chat" className="w-auto h-20 object-contain" />
        </div>
      </div>

      {/* Combined Features Container */}
      <div className="w-full bg-white rounded-lg shadow-lg p-6 mt-8 space-y-8 font-open-sans">
        {/* Private Messaging */}
        <div className="flex flex-col md:flex-row items-start justify-between">
          {/* Text */}
          <div className="text-left text-gray-800 font-semibold text-lg md:text-xl ml-10">
            Private Messaging
            <p className="text-xs md:text-sm font-light text-gray-600 mt-2 break-words max-w-lg leading-5">
              Lets you express yourself, connect openly, and stay close to the people who matter most,
              no matter how far apart you are.
            </p>
          </div>

          {/* Image */}
          <div>
            <img src={icon7} alt="Private Messaging Illustration" className="w-auto h-96 object-contain mr-10 " />
          </div>
        </div>

        {/* Stay Connected */}
        <div className="flex flex-col md:flex-row items-end justify-items-start">
          {/* Image */}
          <div>
            <img src={icon8} alt="Stay Connected Illustration" className="w-auto h-12 object-contain ml-6 " />
            <img src={icon9} alt="Stay Connected Illustration" className="w-auto h-96 object-contain ml-10" />
          </div>

          {/* Text */}
          <div className="text-start text-gray-800 font-semibold text-lg md:text-xl ml-10 ">
            Stay Connected with your groups
            <p className="text-xs md:text-sm font-light text-gray-600 mt-2 break-words max-w-lg leading-5">
            From organizing outings with friends to keeping up with family chats, group conversations should always be easy and enjoyable.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between">
          {/* Text */}
          <div className="text-left text-gray-800 font-semibold text-lg md:text-xl ml-10 mt-20">
            Share your feelings
            <p className="text-xs md:text-sm font-light text-gray-600 mt-2 break-words max-w-lg leading-5">
            Communicate without words. Use stickers, react to messages. Send a voice message for a 
            quick greeting or a more detailed story.
            </p>
          </div>

          {/* Image */}
          <div>
            <img src={icon10} alt="Private Messaging Illustration" className="w-auto h-96 object-contain mr-10 mt-10" />
          </div>
        </div>

        
      </div>
    </>
  );
}

export default ChatArea;
