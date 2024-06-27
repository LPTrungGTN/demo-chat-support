'use client';
import 'react-toastify/dist/ReactToastify.css';

import { ContactInterface } from '@api/chatRoom';
import { RoleEnum } from '@utils/Enums/RoleEnum';

interface Props {
  accessToken: string;
  contact: ContactInterface;
  isSelected: boolean;
  onClick: (chatRoomId: string) => void;
}

const Contact = ({ accessToken, contact, isSelected, onClick }: Props) => {
  const {
    chatRoomId,
    createdAt,
    message: { content, staffId },
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
      ) : (
        <div className='w-3 h-3'></div>
      )}
    </div>
  );
};

export default Contact;
