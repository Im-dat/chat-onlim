import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User } from '../types';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
];

export default function UserSetup() {
  const { setCurrentUser } = useApp();
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const user: User = {
        id: Date.now().toString(),
        username: username.trim(),
        avatar: selectedAvatar,
        status: 'online',
        tag: Math.floor(1000 + Math.random() * 9000).toString()
      };
      setCurrentUser(user);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Welcome to Discord</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Choose your avatar
            </label>
            <div className="flex space-x-4 mb-4">
              {AVATAR_OPTIONS.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all
                    ${selectedAvatar === avatar ? 'border-indigo-500 scale-110' : 'border-transparent'}`}
                >
                  <img src={avatar} alt="Avatar option" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Choose your username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
              required
              minLength={3}
              maxLength={32}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Continue to Discord
          </button>
        </form>
      </div>
    </div>
  );
}