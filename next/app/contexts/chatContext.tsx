import { ContactInterface } from '@api/chatRoom';
import { Message } from '@api/message';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ChatContextType {
  categoryId: number | null;
  chatRoomId: number | null;
  contacts: ContactInterface[];
  language: string;
  messages: Message[];
  setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setChatRoomId: React.Dispatch<React.SetStateAction<number | null>>;
  setContacts: React.Dispatch<React.SetStateAction<ContactInterface[]>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [language, setLanguage] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const value = {
    categoryId,
    chatRoomId,
    contacts,
    language,
    messages,
    setCategoryId,
    setChatRoomId,
    setContacts,
    setLanguage,
    setMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
