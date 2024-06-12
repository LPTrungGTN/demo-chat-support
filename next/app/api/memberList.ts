import axios from "@/app/api/axiosInstance";

const BASE_URL = process.env.BASE_URL;
const API_MEMBER_URL = `${BASE_URL}/users/members`;

export interface Member {
  id: number;
  fullName: string;
  roleId: number;
  tz: number;
}
interface ResponseData {
  members: Member[];
}

interface LogResponse {
  response_status: number;
  data: ResponseData;
}

export const memberName = async (): Promise<LogResponse> => {
  const response = await axios.get<LogResponse>(API_MEMBER_URL, {});
  return response.data;
};
