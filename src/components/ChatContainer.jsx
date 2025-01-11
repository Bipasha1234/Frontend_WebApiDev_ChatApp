import { useEffect, useRef } from "react";
import { useAuthStore } from "../../src/core/public/store/useAuthStore";
import { useChatStore } from "../../src/core/public/store/useChatStore";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageSkeleton from "../components/skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
            ref={messageEndRef}
          >
            {/* Profile Picture */}
            {message.senderId !== authUser._id && (
              <div className="chat-profilePic avatar mr-2">
                <div className="w-10 h-10 rounded-full border">
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="Receiver Profile"
                  />
                </div>
              </div>
            )}

            {/* Chat Bubble */}
            <div
              className={`chat-bubble px-4 py-2 rounded-lg text-sm shadow ${
                message.senderId === authUser._id
                  ? "bg-[#81b9a4] text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {message.profilePic && (
                <img
                  src={message.profilePic}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
              <time
                className={`text-xs opacity-50 mt-1 ${
                  message.senderId === authUser._id ? "text-right" : "text-left"
                }`}
              >
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            {/* Sender Profile Picture */}
            {message.senderId === authUser._id && (
              <div className="chat-profilePic avatar ml-2">
                <div className="w-10 h-10 rounded-full border">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="Sender Profile"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
