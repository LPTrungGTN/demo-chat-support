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

  const { messages, setMessages } = useChatContext();
  useEffect(() => {
    const handleNewMessage = (data: ContactInterface) => {
      setMessages((prev) => [...prev, data.message!]);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
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
        const { content, happinessId, id, staffId } = msg;

        let isOwnMessage;
        if (role === RoleEnum.USER) {
          isOwnMessage = happinessId === accessToken;
        } else {
          isOwnMessage = !!staffId || (!staffId && !happinessId);
        }

        return (
          <MessageComponent
            key={id}
            msg={content}
            isOwnMessage={isOwnMessage}
          />
        );
      })}
    </div>
  );
};

export default ChatBody;
