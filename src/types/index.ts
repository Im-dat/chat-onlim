export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'idle' | 'dnd';
  tag: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  author: User;
  image?: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  description?: string;
}

export interface Server {
  id: string;
  name: string;
  icon: React.ReactNode;
  channels: Channel[];
}