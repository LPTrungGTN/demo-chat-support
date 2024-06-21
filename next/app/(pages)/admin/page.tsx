'use client';
import React from 'react';

import ChatBox from '@/app/components/chatBox';
import ListContact from '@/app/components/listContact';
import createSocket from '@/app/utils/hooks/useSocket';

const AdminPage = () => {
  const socket = createSocket('chat');
  return (
    <div className='flex-1 flex flex-col'>
      <main className='flex-grow flex flex-row min-h-0'>
        <ListContact socket={socket} />
        <ChatBox socket={socket} />
      </main>
    </div>
  );
};

export default AdminPage;
