import React, { useState } from 'react';
import './App.css';
import ChatModal from './chatModal';

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <button 
        className="chat-button" 
        onClick={handleChatClick}
        aria-label="Chat Button"
      >
        <span className="material-icons">chat</span> CHAT
      </button>
      <ChatModal isOpen={isChatOpen} onClose={handleCloseChat} />
    </>
  );
};

export default ChatButton;
