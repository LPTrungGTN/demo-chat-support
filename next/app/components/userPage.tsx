'use client';

import createSocket from '@/app/utils/hooks/useSocket';

import ChatBox from './chatBox';

const UserPage = () => {
  const socket = createSocket('chat');
  return (
    <div className='flex-1 flex flex-col'>
      <main className='flex-grow flex flex-row min-h-0'>
        <ChatBox socket={socket} />
      </main>
    </div>
  );
};

export default UserPage;
