'use client';
import 'react-toastify/dist/ReactToastify.css';

import { ContactInterface } from '../api/chatRoom';

interface Props {
  contact: ContactInterface;
  onClick: (roomId: string) => void;
}

//doing 4
const Contact = ({ contact, onClick }: Props) => {
  const { createdAt, message, roomId, status } = contact;
  return (
    <div
      key={roomId}
      className='flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative'
      onClick={() => onClick(roomId)}
    >
      <p className='text-white text-2xl font-bold w-1/6'>{roomId}</p>
      <div className='text-sm font-bold w-2/3'>
        <p className='truncate text-slate-500'>{message}</p>
      </div>
      <p className='ml-2 whitespace-no-wrap text-xl w-1/6 text-slate-500'>
        {createdAt}
      </p>
      {status ? (
        <div className='bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block'></div>
      ) : null}
    </div>
  );
};

export default Contact;
