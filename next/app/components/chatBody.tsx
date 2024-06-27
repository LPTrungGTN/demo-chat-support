'use client';
import 'react-toastify/dist/ReactToastify.css';

import { ContactInterface } from '@api/chatRoom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { useChatContext } from '@/app/contexts/chatContext';
import { RoleEnum } from '@/app/utils/Enums/RoleEnum';
import { SocketProps } from '@/app/utils/hooks/useSocket';

import MessageComponent from './messageComponent';

const ChatBody = ({ socket }: SocketProps) => {
  const [accessToken, setAccessToken] = useState<string | number>('');
  const [role, setRole] = useState<string>('');

  const { messages, setChatRoomId, setMessages } = useChatContext();
  useEffect(() => {
    const handleNewMessage = (data: ContactInterface) => {
      setMessages((prev) => [...prev, data.message]);
    };

    const handleRoomCreated = (data: ContactInterface) => {
      setChatRoomId(data.chatRoomId);
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('roomCreated', handleRoomCreated);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('roomCreated', handleRoomCreated);
    };
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')!;
    setAccessToken(accessToken);
    setRole(Cookies.get('role')!);
  }, []);

  return (
    <div className='p-4 flex-1 overflow-y-scroll'>
      {messages.map((msg) => {
        const { content, staffId } = msg;

        let isOwnMessage;
        if (role === RoleEnum.USER) {
          isOwnMessage = staffId === accessToken;
        } else {
          isOwnMessage = staffId !== RoleEnum.USER;
        }

        return <MessageComponent msg={content} isOwnMessage={isOwnMessage} />;
      })}
    </div>
  );
};

export default ChatBody;
