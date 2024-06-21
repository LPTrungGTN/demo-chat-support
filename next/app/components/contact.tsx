'use client';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  contact: {
    message: string;
    roomId: string;
    status: boolean;
    timestamp: string;
  };
  onClick: (roomId: string) => void;
}

const Contact = ({ contact, onClick }: Props) => {
  const { message, roomId, status, timestamp } = contact;
  return (
    <div
      key={roomId}
      className='flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative'
      onClick={() => onClick(roomId)}
    >
      <p className='text-white text-2xl font-bold'>{roomId + 1}</p>
      <div className='flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block'>
        <div
          className={`flex items-center text-sm ${status ? 'font-bold' : 'text-gray-600'}`}
        >
          <div className='min-w-0'>
            <p className='truncate'>{message}</p>
          </div>
          <p className='ml-2 whitespace-no-wrap'>{timestamp}</p>
        </div>
      </div>
      {status && (
        <div className='bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block'></div>
      )}
    </div>
  );
};

export default Contact;
