'use client';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import MyMessageComponent from '@/app/components/myMessageComponent';
import OtherMessageComponent from '@/app/components/otherMessageComponent';
import { ChatFooterProps } from '@/app/utils/hooks/useSocket';

const ChatBody = ({ socket }: ChatFooterProps) => {
  const [accessToken, setAccessToken] = useState<string | number>('');
  const [roomId, setRoomId] = useState<string>('');
  const [messages, setMessages] = useState<
    { message: string; sender: string; timestamp: string; userId: string }[]
  >([]);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      setMessages((prev) => [...prev, data]);
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
      console.error(data.message);
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
    } else if (accessToken !== 'customer') {
      socket!.emit('joinRoom', { roomId: 5, staffId: 'customer' });
    } else {
      socket!.emit('joinRoom', { roomId, staffId: accessToken });
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
        const { message, userId } = msg;
        return userId === accessToken ? (
          <MyMessageComponent msg={message} />
        ) : (
          <OtherMessageComponent msg={message} />
        );
      })}
    </div>
  );
};

export default ChatBody;
