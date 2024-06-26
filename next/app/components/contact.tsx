'use client';
import 'react-toastify/dist/ReactToastify.css';

import { ContactInterface } from '@api/chatRoom';
import { RoleEnum } from '@utils/Enums/RoleEnum';
import { useState } from 'react';

interface Props {
  contact: ContactInterface;
  onClick: (chatRoomId: string) => void;
  accessToken: string;
  isSelected: boolean;
}

const Contact = ({ contact, onClick, accessToken, isSelected }: Props) => {
  const {
    createdAt,
    message: { content, staffId },
    chatRoomId,
  } = contact;

  const shouldShowIndicator = () => {
    if (staffId === RoleEnum.USER) return staffId !== accessToken;
    return staffId.toString() !== accessToken;
  };

  return (
    <div
      key={chatRoomId}
      className={`flex justify-between items-center p-3 rounded-lg relative ${isSelected ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
      onClick={() => onClick(chatRoomId)}
    >
      <p className='text-white text-2xl font-bold w-1/6'>{chatRoomId}</p>
      <div className='text-sm font-bold w-2/3'>
        <p className='truncate text-slate-500'>{content}</p>
      </div>
      <p className='ml-2 whitespace-no-wrap text-xl w-1/6 text-slate-500'>
        {createdAt}
      </p>
      {shouldShowIndicator() ? (
        <div className='bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block'></div>
      ) : null}
    </div>
  );
};

export default Contact;
