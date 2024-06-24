import { Message } from '@api/message';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ChatContextType {
  messages: Message[];
  roomId: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setRoomId: (roomId: string) => void;
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
  const [roomId, setRoomId] = useState<string>('');

  const value = {
    messages,
    roomId,
    setMessages,
    setRoomId,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
