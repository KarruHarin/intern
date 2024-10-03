// pages/no-chat.tsx

import React from "react";

const NoChatSelected: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700">No Chat Selected</h1>
        <p className="text-gray-500 mt-2">
          Please select a conversation to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
