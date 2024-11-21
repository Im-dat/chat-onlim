import React from 'react';
import { useApp } from './context/AppContext';
import ServerList from './components/ServerList';
import ChannelList from './components/ChannelList';
import ChatArea from './components/ChatArea';
import UserSetup from './components/UserSetup';

function App() {
  const { isUserSetup } = useApp();

  if (!isUserSetup) {
    return <UserSetup />;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <ServerList />
      <ChannelList />
      <ChatArea />
    </div>
  );
}

export default App;