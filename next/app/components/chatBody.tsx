'use client';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { messages } from '@/app/(pages)/user/fakeData';
import MyMessageComponent from '@/app/components/myMessageComponent';
import OtherMessageComponent from '@/app/components/otherMessageComponent';

const ChatBody = () => {
  const [accessToken, setAccessToken] = useState<string | number>('');

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setAccessToken(
        accessToken === 'customer' ? accessToken : Number(accessToken),
      );
    }
  }, []);

  return (
    <div className='chat-body p-4 flex-1 overflow-y-scroll'>
      {messages.map((msg) =>
        msg.userId === accessToken ? (
          <MyMessageComponent msg={msg.content} />
        ) : (
          <OtherMessageComponent msg={msg.content} />
        ),
      )}
    </div>
  );
};

export default ChatBody;
