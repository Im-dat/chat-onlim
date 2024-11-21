import React from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ServerList() {
  const { currentServer, setCurrentServer, servers } = useApp();

  return (
    <div className="w-20 bg-gray-900 flex flex-col items-center py-4 space-y-4">
      {servers.map((server) => (
        <button
          key={server.id}
          onClick={() => setCurrentServer(server)}
          className={`w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center 
            ${currentServer?.id === server.id ? 'text-white bg-indigo-500' : 'text-gray-300'} 
            hover:bg-indigo-500 hover:text-white transition-all duration-200 group relative`}
        >
          {server.icon}
          <span className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
            {server.name}
          </span>
        </button>
      ))}
      <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all duration-200">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}