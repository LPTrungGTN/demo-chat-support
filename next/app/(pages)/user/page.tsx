import React from 'react';

import UserPage from '@/app/components/userPage';

const CustomerPage = () => {
  return (
    <div className='flex-1 flex flex-col'>
      <main className='flex-grow flex flex-row min-h-0'>
        <UserPage />
      </main>
    </div>
  );
};

export default CustomerPage;
