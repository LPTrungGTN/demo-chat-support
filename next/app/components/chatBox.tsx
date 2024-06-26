'use client';

import { useChatContext } from '@/app/contexts/chatContext';
import { SocketProps } from '@/app/utils/hooks/useSocket';

import ChatBody from './chatBody';
import ChatFooter from './chatFooter';
import ChatHeader from './chatHeader';

const ChatBox = ({ socket }: SocketProps) => {
  const { chatRoomId } = useChatContext();

  return (
    <section className='flex flex-col flex-auto border-l border-gray-800'>
      {chatRoomId && <ChatHeader />}
      <ChatBody socket={socket} />
      {chatRoomId && <ChatFooter socket={socket} />}
    </section>
  );
};

export default ChatBox;
