import React, { useState } from 'react';
import { Hash, Mic, Settings, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProfileEditor from './ProfileEditor';
import CreateChannelModal from './CreateChannelModal';

export default function ChannelList() {
  const { currentServer, currentChannel, setCurrentChannel, currentUser } = useApp();
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);

  return (
    <div className="w-60 bg-gray-800 flex flex-col h-full">
      <div className="p-4 border-b border-gray-900 flex justify-between items-center">
        <h2 className="text-white font-bold text-xl">{currentServer?.name}</h2>
        <button
          onClick={() => setIsCreateChannelOpen(true)}
          className="text-gray-400 hover:text-white"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="text-gray-400 uppercase text-xs font-semibold mb-2">Text Channels</div>
        {currentServer?.channels.filter(c => c.type === 'text').map((channel) => (
          <button
            key={channel.id}
            onClick={() => setCurrentChannel(channel)}
            className={`flex items-center space-x-2 p-2 rounded w-full transition-colors
              ${currentChannel?.id === channel.id 
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
          >
            <Hash className="w-5 h-5" />
            <span>{channel.name}</span>
          </button>
        ))}

        <div className="text-gray-400 uppercase text-xs font-semibold mt-4 mb-2">Voice Channels</div>
        {currentServer?.channels.filter(c => c.type === 'voice').map((channel) => (
          <button
            key={channel.id}
            onClick={() => setCurrentChannel(channel)}
            className={`flex items-center space-x-2 p-2 rounded w-full transition-colors
              ${currentChannel?.id === channel.id 
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
          >
            <Mic className="w-5 h-5" />
            <span>{channel.name}</span>
          </button>
        ))}
      </div>

      <div className="p-4 bg-gray-850 mt-auto flex items-center space-x-2">
        <img
          src={currentUser?.avatar}
          alt="User avatar"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => setIsProfileEditorOpen(true)}
        />
        <div className="flex-1">
          <div className="text-white text-sm font-medium">{currentUser?.username}</div>
          <div className="text-gray-400 text-xs">#{currentUser?.tag}</div>
        </div>
        <button
          onClick={() => setIsProfileEditorOpen(true)}
          className="text-gray-400 hover:text-white"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <ProfileEditor
        isOpen={isProfileEditorOpen}
        onClose={() => setIsProfileEditorOpen(false)}
      />
      
      <CreateChannelModal
        isOpen={isCreateChannelOpen}
        onClose={() => setIsCreateChannelOpen(false)}
      />
    </div>
  );
}