'use client';
import Cookies from 'js-cookie';
import React from 'react';

import DropDownButton from '@/app/components/dropdownBtn';
type IHeader = {
  hasAccessToken: string;
  setHasAccessToken: React.Dispatch<React.SetStateAction<string>>;
};
const Header = ({ hasAccessToken, setHasAccessToken }: IHeader) => {
  React.useEffect(() => {
    const accessToken = Cookies.get('accessToken') || '';
    setHasAccessToken(accessToken);
  }, []);

  return (
    <>
      <header
        className='h-20 w-full flex items-center bg-gray-50 '
        style={{ position: 'fixed', zIndex: 20 }}
      >
        {!hasAccessToken && (
          <div className='flex '>
            <img src='/logo.png' alt='Logo' className='pl-12' />

            <div className=' text-black text-lg font-bold pl-6 py-auto'>
              Attendance
            </div>
          </div>
        )}

        <div className=' w-full p-0 mx-2 lg:mx-12'>
          {hasAccessToken && (
            <div className='w-full flex justify-between'>
              <div className='lg:flex w-2/5 hidden '>
                <img src='/logo.png' alt='Logo' />

                <div className=' text-black text-lg ml-8'>
                  Attendance System
                </div>
              </div>
              <img src='/logo.png' alt='Logo' className='p-0 block lg:hidden' />

              <DropDownButton />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
