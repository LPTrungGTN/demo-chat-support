import { Category, listAll } from '@api/category';
import { updateCategoryAndLanguage } from '@api/chatRoom';
import { useEffect, useState } from 'react';

import { useChatContext } from '@/app/contexts/chatContext';
import { SocketProps } from '@/app/utils/hooks/useSocket';

import Button from './button';
import ChatBody from './chatBody';
import ChatFooter from './chatFooter';
import ChatHeader from './chatHeader';
import MessageComponent from './messageComponent';

const translations = [
  { label: 'English', value: 'en' },
  { label: '日本語', value: 'ja' },
  { label: 'Tiếng Việt', value: 'vi' },
];

const ChatBox = ({ socket }: SocketProps) => {
  const { chatRoomId, language, setLanguage } = useChatContext();
  const [languageSelect, setLanguageSelect] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await listAll();
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    })();
  }, []);

  useEffect(() => {
    setLanguageSelect(null);
  }, [language]);

  const getContentMessage = () => {
    switch (languageSelect?.value) {
      case 'vi':
        return 'Bạn muốn trao đổi về vấn đề gì?';
      case 'ja':
        return 'どの内容を話し合いたいですか？';
      default:
        return 'What content do you want to discuss?';
    }
  };

  return (
    <section className='flex flex-col flex-auto border-l border-gray-800'>
      {chatRoomId && <ChatHeader />}
      {language ? (
        <>
          <ChatBody socket={socket} />
          {chatRoomId && <ChatFooter socket={socket} />}
        </>
      ) : (
        <>
          {chatRoomId && (
            <>
              <MessageComponent
                msg='Which language do you want to talk?'
                isOwnMessage={false}
                key='language'
              />

              {languageSelect ? (
                <>
                  <MessageComponent
                    msg={languageSelect.label}
                    isOwnMessage={true}
                    key='languageSelect'
                  />
                  <MessageComponent
                    msg={getContentMessage()}
                    isOwnMessage={false}
                    key='category'
                  />
                  {categories.map((category) => {
                    const { id, name } = category;
                    return (
                      <Button
                        key={id}
                        label={name}
                        onClick={async () => {
                          await updateCategoryAndLanguage(
                            id,
                            chatRoomId,
                            languageSelect.value,
                          );
                          setLanguage(languageSelect.value);
                        }}
                      />
                    );
                  })}
                </>
              ) : (
                translations.map((translation) => (
                  <Button
                    label={translation.label}
                    onClick={() => setLanguageSelect(translation)}
                    key={translation.label}
                  />
                ))
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default ChatBox;
