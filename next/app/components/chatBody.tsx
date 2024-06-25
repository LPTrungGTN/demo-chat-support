'use client';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import MyMessageComponent from '@/app/components/myMessageComponent';
import OtherMessageComponent from '@/app/components/otherMessageComponent';
import { useChatContext } from '@/app/contexts/chatContext';
import { RoleEnum } from '@/app/utils/Enums/RoleEnum';
import { SocketProps } from '@/app/utils/hooks/useSocket';

const ChatBody = ({ socket }: SocketProps) => {
  const [accessToken, setAccessToken] = useState<string | number>('');

  const { messages, setMessages, setRoomId } = useChatContext();
  useEffect(() => {
    socket.on('newMessage', (data) => {
      setMessages((prev) => [...prev, data.message]);
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
        accessToken === RoleEnum.USER ? accessToken : Number(accessToken),
      );
    }
  }, []);

  return (
    <div className='p-4 flex-1 overflow-y-scroll'>
      {messages.map((msg) => {
        const { content, staffId } = msg;

        const senderId =
          staffId === RoleEnum.USER ? RoleEnum.USER : Number(staffId);
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
