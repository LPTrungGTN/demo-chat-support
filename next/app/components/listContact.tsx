'use client';

import { listContact } from '@api/chatRoom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { listByRoomId } from '@/app/api/message';
import { useChatContext } from '@/app/contexts/chatContext';
import { RoleEnum } from '@/app/utils/Enums/RoleEnum';
import { SocketProps } from '@/app/utils/hooks/useSocket';

import Contact from './contact';

const ListContact = ({ socket }: SocketProps) => {
  const { chatRoomId, contacts, setChatRoomId, setContacts, setMessages } =
    useChatContext();
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    socket.on('newCustomer', (data) => {
      setContacts((prev) => [data, ...prev]);
    });

    socket.on('roomCreated', (data) => {
      setContacts((prev) => [data, ...prev]);
      handleContactClick(data.chatRoomId);
    });

    socket.on('updateContact', async () => {
      const dataBe = await listContact(
        Cookies.get('accessToken')!,
        Cookies.get('role')!,
      );
      setContacts(dataBe.rooms);
    });

    return () => {
      socket.off('newCustomer');
      socket.off('roomCreated');
      socket.off('updateContact');
    };
  }, []);

  useEffect(() => {
    const getContacts = async () => {
      const token = Cookies.get('accessToken')!;
      setAccessToken(token);
      const data = await listContact(token, Cookies.get('role')!);
      setContacts(data.rooms);
    };
    if (contacts.length === 0) {
      getContacts().catch(console.error);
    }
  }, [contacts.length]);

  const handleContactClick = async (chatRoomId: string) => {
    try {
      const data = await listByRoomId(chatRoomId);
      setChatRoomId(chatRoomId);
      setMessages(data.messages);
      socket.emit('joinRoom', { chatRoomId });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateRoom = async () => {
    socket.emit('createRoom', {
      categoryId: 2,
      happinessId: RoleEnum.USER,
      language: 'en',
    });
  };

  return (
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
        {accessToken === RoleEnum.USER ? (
          <button
            onClick={handleCreateRoom}
            className='block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 hidden md:block group-hover:block'
          >
            <svg viewBox='0 0 24 24' className='w-full h-full fill-current'>
              <path d='M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z' />
            </svg>
          </button>
        ) : (
          ''
        )}
      </div>
      <div className='contacts p-2 flex-1 overflow-y-scroll'>
        {contacts.map((contact) => (
          <Contact
            key={contact.chatRoomId}
            contact={contact}
            onClick={handleContactClick}
            accessToken={accessToken}
            isSelected={chatRoomId === contact.chatRoomId}
          />
        ))}
      </div>
    </section>
  );
};

export default ListContact;
