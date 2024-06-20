import React from 'react';

import ChatBody from '@/app/components/chatBody';
import ChatFooter from '@/app/components/chatFooter';
import ChatHeader from '@/app/components/chatHeader';

const LoginPage = () => {
  return (
    <div className='flex-1 flex flex-col'>
      <main className='flex-grow flex flex-row min-h-0'>
        <section className='flex flex-col flex-auto border-l border-gray-800'>
          <ChatHeader />
          <ChatBody />
          <ChatFooter />
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
