'use client';
import React from 'react';

import ChatBox from '@/app/components/chatBox';
import Contacts from '@/app/components/contacts';

const LoginPage = () => {
  return (
    <div className='flex-1 flex flex-col'>
      <main className='flex-grow flex flex-row min-h-0'>
        <section className='flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out'>
          <div className='header p-4 flex flex-row justify-between items-center flex-none'>
            <div
              className='w-16 h-16 relative flex flex-shrink-0'
              style={{ filter: 'invert(100%)' }}
            >
              <img
                className='rounded-full w-full h-full object-cover'
                alt='ravisankarchinnam'
                src='https://avatars3.githubusercontent.com/u/22351907?s=60'
              />
            </div>
            <p className='text-md font-bold hidden md:block group-hover:block'>
              Messenger
            </p>
            <a
              href='#'
              className='block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 hidden md:block group-hover:block'
            >
              <svg viewBox='0 0 24 24' className='w-full h-full fill-current'>
                <path d='M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z' />
              </svg>
            </a>
          </div>
          <Contacts />
        </section>
        <ChatBox />
      </main>
    </div>
  );
};

export default LoginPage;
