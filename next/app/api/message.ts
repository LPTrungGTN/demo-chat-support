import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

export interface Message {
  content: string;
  happinessId: string;
  id: number;
  staffId: string;
}

interface MessageResponse {
  messages: Message[];
}

export const listByRoomId = async (
  chatRoomId: string,
): Promise<MessageResponse> => {
  const response = await axios.get<MessageResponse>(
    `${BASE_URL}/messages/${chatRoomId}`,
  );
  return response.data;
};
