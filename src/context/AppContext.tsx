import React, { createContext, useContext, useState } from 'react';
import { Server, Channel, Message, User } from '../types';
import { Hash, Home, Users } from 'lucide-react';

interface AppContextType {
  currentServer: Server | null;
  currentChannel: Channel | null;
  setCurrentServer: (server: Server) => void;
  setCurrentChannel: (channel: Channel) => void;
  messages: Message[];
  sendMessage: (content: string, image?: string | null) => void;
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  servers: Server[];
  isUserSetup: boolean;
}

const initialServers: Server[] = [
  {
    id: '1',
    name: 'Home',
    icon: <Home className="w-6 h-6" />,
    channels: [
      { id: '1', name: 'general', type: 'text' },
      { id: '2', name: 'voice-chat', type: 'voice' }
    ]
  },
  {
    id: '2',
    name: 'Community',
    icon: <Users className="w-6 h-6" />,
    channels: [
      { id: '3', name: 'announcements', type: 'text' },
      { id: '4', name: 'general', type: 'text' }
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentServer, setCurrentServer] = useState<Server>(initialServers[0]);
  const [currentChannel, setCurrentChannel] = useState<Channel>(initialServers[0].channels[0]);
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (content: string, image?: string | null) => {
    if (!currentUser) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString(),
      author: currentUser,
      image: image || undefined
    };
    setMessages([...messages, newMessage]);
  };

  const isUserSetup = currentUser !== null;

  return (
    <AppContext.Provider
      value={{
        currentServer,
        currentChannel,
        setCurrentServer,
        setCurrentChannel,
        messages,
        sendMessage,
        currentUser,
        setCurrentUser,
        servers: initialServers,
        isUserSetup
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}