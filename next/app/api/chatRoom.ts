import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

export interface ContactInterface {
  createdAt: string;
  message: string;
  roomId: string;
}

interface RoomResponse {
  rooms: ContactInterface[];
}

export const listByStaffId = async (
  staffId?: string,
): Promise<RoomResponse> => {
  const response = await axios.get<RoomResponse>(
    `${BASE_URL}/chat_rooms${staffId ? `?staffId=${staffId}` : ''}`,
  );
  return response.data;
};
