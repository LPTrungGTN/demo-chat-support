import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

export interface Message {
  content: string;
  createdAt: string;
  staffId: number | null;
}

interface MessageResponse {
  messages: Message[];
}

export const listByRoomId = async (
  roomId: string,
): Promise<MessageResponse> => {
  const response = await axios.get<MessageResponse>(
    `${BASE_URL}/message/:${roomId}`,
  );
  return response.data;
};
