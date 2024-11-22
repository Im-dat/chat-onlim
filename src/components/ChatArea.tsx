import React, { useState } from 'react';
import { Plus, Video } from 'lucide-react';
import { useApp } from '../context/AppContext';
import MessageInput from './MessageInput';
import VideoCall from './VideoCall';

export default function ChatArea() {
  const { currentChannel, messages, isInCall, setIsInCall } = useApp();
  
  const startCall = () => {
    setIsInCall(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-700">
      <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-900">
        <div className="flex items-center space-x-2">
          <h3 className="text-white font-semibold"># {currentChannel?.name}</h3>
          <span className="text-gray-400 text-sm">{currentChannel?.description}</span>
        </div>
        <div className="flex items-center space-x-4">
          {currentChannel?.type === 'voice' && (
            <button 
              onClick={startCall}
              className="text-gray-400 hover:text-white"
            >
              <Video className="w-5 h-5" />
            </button>
          )}
          <button className="text-gray-400 hover:text-white">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="flex space-x-4">
            <img
              src={message.author.avatar}
              alt={message.author.username}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-white font-medium">{message.author.username}</span>
                <span className="text-gray-400 text-xs">{message.timestamp}</span>
              </div>
              {message.content && (
                <p className="text-gray-300 mt-1">{message.content}</p>
              )}
              {message.image && (
                <div className="mt-2">
                  <img 
                    src={message.image} 
                    alt="Attached image" 
                    className="max-w-lg rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
      
      {isInCall && <VideoCall onClose={() => setIsInCall(false)} />}
    </div>
  );
}