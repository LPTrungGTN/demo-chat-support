'use client';

import { SocketProps } from '../utils/hooks/useSocket';
import ChatBody from './chatBody';
import ChatFooter from './chatFooter';
import ChatHeader from './chatHeader';

const ChatBox = ({ socket }: SocketProps) => {
  return (
    <section className='flex flex-col flex-auto border-l border-gray-800'>
      <ChatHeader />
      <ChatBody socket={socket} />
      <ChatFooter socket={socket} />
    </section>
  );
};

export default ChatBox;
