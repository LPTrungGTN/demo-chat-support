'use client';

import createSocket from '@/app/utils/hooks/useSocket';

import ChatBody from './chatBody';
import ChatFooter from './chatFooter';
import ChatHeader from './chatHeader';

const ChatBox = () => {
  const socket = createSocket('chat');
  return (
    <section className='flex flex-col flex-auto border-l border-gray-800'>
      <ChatHeader />
      <ChatBody socket={socket} />
      <ChatFooter socket={socket} />
    </section>
  );
};

export default ChatBox;
