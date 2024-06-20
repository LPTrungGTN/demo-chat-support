'use client';
import React, { useState } from 'react';

import { accounts } from '@/app/(pages)/admin/fakeData';

const LoginPage = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = () => {
    console.log('Search submitted:', searchValue);
  };

  return (
    <div className='flex-1 flex flex-col'>
      <main className='flex-grow flex flex-row min-h-0'>
        <section className='flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out'>
          <div className='search-box p-4 flex-none'>
            <form onSubmit={handleSubmit}>
              <div className='relative'>
                <label>
                  <input
                    className='rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in'
                    type='text'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder='Search Messenger'
                  />
                  <span className='absolute top-0 left-0 mt-2 ml-3 inline-block'>
                    <svg viewBox='0 0 24 24' className='w-6 h-6'>
                      <path
                        fill='#bbb'
                        d='M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z'
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </form>
          </div>
          <div className='contacts p-2 flex-1 overflow-y-scroll'>
            <div className='flex justify-between items-center p-3 bg-gray-800 rounded-lg relative'>
              <div className='w-16 h-16 relative flex flex-shrink-0'>
                <img
                  className='shadow-md rounded-full w-full h-full object-cover'
                  src='https://randomuser.me/api/portraits/women/33.jpg'
                  alt=''
                />
              </div>
              <div className='flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block'>
                <p>Scarlett Johansson</p>
                <div className='flex items-center text-sm text-gray-600'>
                  <div className='min-w-0'>
                    <p className='truncate'>You sent a photo.</p>
                  </div>
                  <p className='ml-2 whitespace-no-wrap'>1h</p>
                </div>
              </div>
            </div>
            {accounts.map((account, index) => (
              <div
                key={index}
                className='flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative'
              >
                <div className='w-16 h-16 relative flex flex-shrink-0'>
                  <img
                    className='shadow-md rounded-full w-full h-full object-cover'
                    src={account.image}
                    alt={account.name}
                  />
                  {account.status === 'online' && (
                    <div className='absolute bg-gray-900 p-1 rounded-full bottom-0 right-0'>
                      <div className='bg-green-500 rounded-full w-3 h-3'></div>
                    </div>
                  )}
                </div>
                <div className='flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block'>
                  <p
                    className={`font-bold ${account.status ? 'font-bold' : ''}`}
                  >
                    {account.name}
                  </p>
                  <div
                    className={`flex items-center text-sm ${account.status ? 'font-bold' : 'text-gray-600'}`}
                  >
                    <div className='min-w-0'>
                      <p className='truncate'>{account.message}</p>
                    </div>
                    <p className='ml-2 whitespace-no-wrap'>{account.time}</p>
                  </div>
                </div>
                {account.status && (
                  <div className='bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block'></div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
