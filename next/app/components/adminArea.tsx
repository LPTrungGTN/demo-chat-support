'use client';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import createSocket from '@/app/utils/hooks/useSocket';

import ChatBox from './chatBox';
import ListContact from './listContact';

const AdminArea = () => {
  const socket = createSocket('chat');

  useEffect(() => {
    socket.emit('staffActive', { staffId: Cookies.get('accessToken') });
    socket.on('error', (data) => {
      toast.error(data.message);
    });
  }, []);
  return (
    <main className='flex-grow flex flex-row min-h-0'>
      <ListContact socket={socket} />
      <ChatBox socket={socket} />
    </main>
  );
};

export default AdminArea;