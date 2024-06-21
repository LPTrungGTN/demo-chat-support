'use client';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import MyMessageComponent from '@/app/components/myMessageComponent';
import OtherMessageComponent from '@/app/components/otherMessageComponent';
import { useChatContext } from '@/app/contexts/chatContext';
import { SocketProps } from '@/app/utils/hooks/useSocket';

const ChatBody = ({ socket }: SocketProps) => {
  const [accessToken, setAccessToken] = useState<string | number>('');
  const [roomId, setRoomId] = useState<string>('');

  const { messages, setMessages } = useChatContext();
  useEffect(() => {
    socket.on('newMessage', (data) => {
      setMessages([...messages, data]);
    });

    socket.on('roomCreated', (data) => {
      const { id: roomId } = data;
      setRoomId(roomId);
      Cookies.set('roomId', roomId);
    });

    socket.on('staffJoined', (data) => {
      console.log('Staff joined:', data);
    });

    socket.on('error', (data) => {
      toast.error(data.message);
    });
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setAccessToken(
        accessToken === 'customer' ? accessToken : Number(accessToken),
      );
    }

    const roomIdCookies = Cookies.get('roomId');
    if (roomIdCookies) {
      setRoomId(roomIdCookies);
    }

    if (accessToken === 'customer' && !roomId) {
      handleCreateRoom();
    }
  }, []);

  const handleCreateRoom = () => {
    if (socket) {
      socket.emit('createRoom', { categoryId: 6, language: 'en' });
    }
  };

  return (
    <div className='p-4 flex-1 overflow-y-scroll'>
      {messages.map((msg) => {
        const { content, staffId } = msg;
        const senderId = !staffId ? 'customer' : Number(staffId);
        return senderId === accessToken ? (
          <MyMessageComponent msg={content} />
        ) : (
          <OtherMessageComponent msg={content} />
        );
      })}
    </div>
  );
};

export default ChatBody;
