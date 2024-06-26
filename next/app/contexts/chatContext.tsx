import { ContactInterface } from '@api/chatRoom';
import { Message } from '@api/message';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ChatContextType {
  chatRoomId: string;
  contacts: ContactInterface[];
  messages: Message[];
  setChatRoomId: (chatRoomId: string) => void;
  setContacts: React.Dispatch<React.SetStateAction<ContactInterface[]>>;
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
  const [chatRoomId, setChatRoomId] = useState<string>('');
  const [contacts, setContacts] = useState<ContactInterface[]>([]);

  const value = {
    chatRoomId,
    contacts,
    messages,
    setChatRoomId,
    setContacts,
    setMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
