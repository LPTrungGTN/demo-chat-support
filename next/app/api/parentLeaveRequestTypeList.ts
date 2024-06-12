import axios from "@/app/api/axiosInstance";

const BASE_URL = process.env.BASE_URL;
const API_GET_LEAVE_REQUEST_TYPE_URL = `${BASE_URL}/requests/types`;

interface RequestType {
  id: number;
  parentId: number;
  categoryId: number;
  name: string;
}

interface ResponseData {
  requestTypes: RequestType[];
}

interface LogResponse {
  response_status: number;
  data: ResponseData;
}

export const parentLeaveRequestType = async (
  categoryId: number
): Promise<LogResponse> => {
  const param = {
    categoryId: categoryId,
  };
  const response = await axios.get<LogResponse>(
    API_GET_LEAVE_REQUEST_TYPE_URL,
    { params: param }
  );
  return response.data;
};
