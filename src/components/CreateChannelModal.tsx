import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Hash, Mic, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CreateChannelModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'text' | 'voice'>('text');
  const [description, setDescription] = useState('');
  const { createChannel } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createChannel({
      id: Date.now().toString(),
      name: name.toLowerCase().replace(/\s+/g, '-'),
      type,
      description
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
              Create Channel
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Channel Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('text')}
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    type === 'text' ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Hash className="w-5 h-5" />
                  <span className="text-sm text-white">Text Channel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('voice')}
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    type === 'voice' ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                  <span className="text-sm text-white">Voice Channel</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Channel Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={type === 'text' ? 'new-text-channel' : 'Voice Channel'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                placeholder="Enter channel description"
              />
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
                Create Channel
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}