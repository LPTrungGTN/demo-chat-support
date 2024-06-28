'use client';

import Cookies from 'js-cookie';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

import { ChatProvider } from '@/app/contexts/chatContext';
import { RoleEnum } from '@/app/utils/Enums/RoleEnum';
import createSocket from '@/app/utils/hooks/useSocket';

import ChatBox from './chatBox';
import ListContact from './listContact';

const AdminArea = () => {
  const socket = useMemo(() => createSocket('chat'), []);

  useEffect(() => {
    socket.on('error', (data) => {
      toast.error(data.message);
    });
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken || accessToken === RoleEnum.USER) return;
    socket.emit('staffActive', { staffId: accessToken });
  }, []);
  return (
    <ChatProvider>
      <main className='flex-grow flex flex-row min-h-0'>
        <ListContact socket={socket} />
        <ChatBox socket={socket} />
      </main>
    </ChatProvider>
  );
};

export default AdminArea;
