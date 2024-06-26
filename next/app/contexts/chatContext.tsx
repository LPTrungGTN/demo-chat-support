import { Message } from '@api/message';
import { createContext, ReactNode, useContext, useState } from 'react';
import { ContactInterface } from '../api/chatRoom';

interface ChatContextType {
  messages: Message[];
  chatRoomId: string;
  contacts: ContactInterface[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setContacts: React.Dispatch<React.SetStateAction<ContactInterface[]>>;
  setChatRoomId: (chatRoomId: string) => void;
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
    const [chatRoomId, setChatRoomId] = useState<string>('');
    const [contacts, setContacts] = useState<ContactInterface[]>([]);

  const value = {
    messages,
    chatRoomId,
    contacts,
    setMessages,
    setContacts,
    setChatRoomId,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
