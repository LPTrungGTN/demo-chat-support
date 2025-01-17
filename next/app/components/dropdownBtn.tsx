import 'react-toastify/dist/ReactToastify.css';

import { logout } from '@api/authenticate';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { RoleEnum } from '@/app/utils/Enums/RoleEnum';

const DropDownButton = () => {
  const [username, setUsername] = useState('');

  const clearSession = async () => {
    try {
      if (Cookies.get('accessToken') !== RoleEnum.USER) {
        await logout(Cookies.get('accessToken')!);
      }

      Cookies.remove('accessToken');
      if (typeof window !== 'undefined') {
        window.location.assign('/login');
      }
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const logoutUser = async () => {
    try {
      clearSession();
    } catch (error: any) {
      if (error.status === 401) {
        clearSession();
      }
      toast.error(error.data.message.error);
    }
  };
  useEffect(() => {
    const username = Cookies.get('username');
    setUsername(username || '');
  });

  return (
    <div className='relative lg:ml-auto inline-block text-left'>
      <div className='group'>
        <button
          type='button'
          className='inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-0 hover:bg-gray-100'
          id='menu-button'
          aria-expanded='true'
          aria-haspopup='true'
        >
          <h1 className='flex'>Hello {username || 'guy'}</h1>
          <svg
            className='-mr-1 h-5 w-5 text-gray-400'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <div className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <div className='py-1' role='none'>
            <button
              type='submit'
              className='text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900'
              role='menuitem'
              id='menu-item-3'
              onClick={logoutUser}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownButton;
