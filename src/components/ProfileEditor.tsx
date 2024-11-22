import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'online', label: 'Online', color: 'bg-green-500' },
  { value: 'idle', label: 'Idle', color: 'bg-yellow-500' },
  { value: 'dnd', label: 'Do Not Disturb', color: 'bg-red-500' },
  { value: 'offline', label: 'Offline', color: 'bg-gray-500' },
];

export default function ProfileEditor({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { currentUser, updateUser } = useApp();
  const [username, setUsername] = useState(currentUser?.username || '');
  const [status, setStatus] = useState(currentUser?.status || 'online');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      ...currentUser!,
      username,
      status,
      avatar,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold text-white">
              Edit Profile
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Avatar URL
              </label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setStatus(option.value as any)}
                    className={`flex items-center space-x-2 p-2 rounded-md ${
                      status === option.value
                        ? 'bg-gray-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${option.color}`} />
                    <span className="text-sm text-white">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}