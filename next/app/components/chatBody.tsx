'use client';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useChatContext } from '@/app/contexts/chatContext';
import { RoleEnum } from '@/app/utils/Enums/RoleEnum';
import { SocketProps } from '@/app/utils/hooks/useSocket';

import MessageComponent from './messageComponent';

const ChatBody = ({ socket }: SocketProps) => {
  const [accessToken, setAccessToken] = useState<string | number>('');

  const { messages, setChatRoomId, setMessages } = useChatContext();
  useEffect(() => {
    socket.on('newMessage', (data) => {
      console.log('newMessage');
      console.log(data);
      setMessages((prev) => [...prev, data.message]);
    });

    socket.on('roomCreated', (data) => {
      setChatRoomId(data.chatRoomId);
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
        const isOwnMessage = senderId === accessToken;
        return <MessageComponent msg={content} isOwnMessage={isOwnMessage} />;
      })}
    </div>
  );
};

export default ChatBody;
