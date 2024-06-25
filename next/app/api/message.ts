import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

export interface Message {
  content: string;
  staffId: number | string;
}

interface MessageResponse {
  messages: Message[];
}

export const listByRoomId = async (
  roomId: string,
): Promise<MessageResponse> => {
  const response = await axios.get<MessageResponse>(
    `${BASE_URL}/messages/${roomId}`,
  );
  return response.data;
};
