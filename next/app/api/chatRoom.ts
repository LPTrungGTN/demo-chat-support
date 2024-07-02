import axios from 'axios';

import { Message } from './message';

const BASE_URL = process.env.BASE_URL;

export interface ContactInterface {
  categoryId: number;
  chatRoomId: number;
  createdAt: string;
  language: string;
  message?: Message;
}

interface RoomResponse {
  rooms: ContactInterface[];
}

export const listContact = async (
  id: string,
  role: string,
): Promise<RoomResponse> => {
  const response = await axios.get<RoomResponse>(
    `${BASE_URL}/chat_rooms?id=${id}&role=${role}`,
  );
  return response.data;
};

export const updateCategoryAndLanguage = async (
  id: number,
  chatRoomId: string,
  language: string,
) => {
  await axios.put(`${BASE_URL}/chat_rooms/${chatRoomId}`, {
    categoryId: id,
    language,
  });
};
