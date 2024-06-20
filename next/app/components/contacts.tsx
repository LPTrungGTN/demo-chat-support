'use client';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';

import createSocket from '@/app/utils/hooks/useSocket';

const Contacts = () => {
  const socket = createSocket('chat');

  const [contacts, setContacts] = useState<
    { message: string; roomId: string; status: boolean; timestamp: string }[]
  >([]);

  useEffect(() => {
    if (socket) {
      socket.on('newCustomer', (data) => {
        setContacts((prev) => [...prev, data]);
      });

      socket.on('staffJoined', (data) => {
        console.log('Staff joined:', data);
      });

      socket.on('error', (data) => {
        console.error(data.message);
      });
    }
  }, [socket]);

  return (
    <div className='contacts p-2 flex-1 overflow-y-scroll'>
      {contacts.map((contact, index) => (
        <div
          key={index}
          className='flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative'
        >
          <p className='text-white text-2xl font-bold'>{index + 1}</p>
          <div className='flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block'>
            <div
              className={`flex items-center text-sm ${contact.status ? 'font-bold' : 'text-gray-600'}`}
            >
              <div className='min-w-0'>
                <p className='truncate'>{contact.message}</p>
              </div>
              <p className='ml-2 whitespace-no-wrap'>{contact.timestamp}</p>
            </div>
          </div>
          {contact.status && (
            <div className='bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block'></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Contacts;
