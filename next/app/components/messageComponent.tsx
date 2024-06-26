import { FC } from 'react';

type MessageProps = {
  isOwnMessage: boolean;
  msg: string;
};

const MessageComponent: FC<MessageProps> = ({ isOwnMessage, msg }) => {
  const ownMessageStyles =
    'flex-row-reverse bg-blue-700 text-white rounded-t-full rounded-l-full';
  const otherMessageStyles =
    'bg-gray-800 text-gray-200 rounded-t-full rounded-r-full';

  return (
    <div className={`flex flex-row justify-${isOwnMessage ? 'end' : 'start'}`}>
      <div className='messages text-sm grid grid-flow-row gap-2'>
        <div
          className={`flex items-center group ${isOwnMessage ? ownMessageStyles : otherMessageStyles}`}
        >
          <p className={`px-6 py-3 max-w-xs lg:max-w-md`}>{msg}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
