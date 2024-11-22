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
  updateUser: (user: User) => void;
  servers: Server[];
  createServer: (server: Server) => void;
  createChannel: (channel: Channel) => void;
  isUserSetup: boolean;
  isInCall: boolean;
  setIsInCall: (inCall: boolean) => void;
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
      { id: '4', name: 'general', type: 'text' },
      { id: '5', name: 'voice-lounge', type: 'voice' }
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentServer, setCurrentServer] = useState<Server>(initialServers[0]);
  const [currentChannel, setCurrentChannel] = useState<Channel>(initialServers[0].channels[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [servers, setServers] = useState(initialServers);
  const [isInCall, setIsInCall] = useState(false);

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

  const updateUser = (user: User) => {
    setCurrentUser(user);
  };

  const createServer = (server: Server) => {
    setServers([...servers, server]);
    setCurrentServer(server);
    setCurrentChannel(server.channels[0]);
  };

  const createChannel = (channel: Channel) => {
    const updatedServer = {
      ...currentServer,
      channels: [...currentServer.channels, channel]
    };
    
    setServers(servers.map(server => 
      server.id === currentServer.id ? updatedServer : server
    ));
    setCurrentServer(updatedServer);
    setCurrentChannel(channel);
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
        updateUser,
        servers,
        createServer,
        createChannel,
        isUserSetup,
        isInCall,
        setIsInCall
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