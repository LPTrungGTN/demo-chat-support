import axios from 'axios';

import { RoleEnum } from '@/app/utils/Enums/RoleEnum';

import { Message } from './message';

const BASE_URL = process.env.BASE_URL;

export interface ContactInterface {
  categoryId: string;
  chatRoomId: string;
  createdAt: string;
  language: string;
  message: Message;
}

interface RoomResponse {
  rooms: ContactInterface[];
}

export const listByStaffId = async (staffId: string): Promise<RoomResponse> => {
  const response = await axios.get<RoomResponse>(
    `${BASE_URL}/chat_rooms${staffId !== RoleEnum.USER ? `?staffId=${staffId}` : ''}`,
  );
  return response.data;
};

export const updateCategoryAndLanguage = async (
  categoryId: number,
  chatRoomId: string,
  language: string,
) => {
  await axios.put(`${BASE_URL}/chat_rooms/${chatRoomId}`, {
    categoryId,
    language,
  });
};
