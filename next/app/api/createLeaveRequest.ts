import axios from "@/app/api/axiosInstance";

const BASE_URL = process.env.BASE_URL;
const API_POST_LEAVE_REQUEST_TYPE_URL = `${BASE_URL}/requests`;

interface Message {
    error: string;
}

interface ResponseData {
  message: Message[];
}

interface LogResponse {
  response_status: number;
  data: ResponseData;
}

export const createLeaveRequest = async (
  categoryId: number,
  typeId: number,
  parentId: number|null,
  reason : string,
  start: string,
  end: string,
  tz: number,
): Promise<LogResponse> => {
  const param = {
    categoryId: categoryId,
    typeId :typeId,
    parentId: parentId,
    reason: reason,
    start: start,
    end: end,
    tz: tz,
  };
  const response = await axios.post<LogResponse>(
    API_POST_LEAVE_REQUEST_TYPE_URL,
    param
  );
  return response.data;
};
