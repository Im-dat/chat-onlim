import React, { useState, useRef } from 'react';
import { Paperclip, Plus, Send, Smile, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MessageInput() {
  const [input, setInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, currentChannel } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || imagePreview) {
      sendMessage(input, imagePreview);
      setInput('');
      setImagePreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
          }
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
      {imagePreview && (
        <div className="mb-4 relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-h-60 rounded-lg"
          />
          <button
            type="button"
            onClick={() => setImagePreview(null)}
            className="absolute top-2 right-2 bg-gray-900 text-white p-1 rounded-full hover:bg-gray-700"
          >
            ×
          </button>
        </div>
      )}
      <div className="bg-gray-700 rounded-lg p-4 flex items-center space-x-4">
        <button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-400 hover:text-white"
        >
          <ImageIcon className="w-6 h-6" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPaste={handlePaste}
          placeholder={`Message #${currentChannel?.name}`}
          className="bg-transparent flex-1 text-white focus:outline-none"
        />
        <div className="flex items-center space-x-4">
          <button type="button" className="text-gray-400 hover:text-white">
            <Paperclip className="w-5 h-5" />
          </button>
          <button type="button" className="text-gray-400 hover:text-white">
            <Smile className="w-5 h-5" />
          </button>
          <button type="submit" className="text-gray-400 hover:text-white">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}