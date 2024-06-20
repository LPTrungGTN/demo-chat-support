'use client';
import React from 'react';

import ChatBox from '@/app/components/chatBox';
import ListContact from '@/app/components/listContact';

const LoginPage = () => {
  return (
    <div className='flex-1 flex flex-col'>
      <main className='flex-grow flex flex-row min-h-0'>
        <ListContact />
        <ChatBox />
      </main>
    </div>
  );
};

export default LoginPage;
