import axios from "@/app/api/axiosInstance";
import {
  DecisionRequestData,
  GetRequestData,
  ResponseData,
} from "@api/request/types";

const BASE_URL = process.env.BASE_URL;
const API_REQUESTS_URL = `${BASE_URL}/requests/users/`;

export const getLeaveRequest = async (
  userId: number,
  from: string,
  to: string,
  tz: number,
  page: number,
  categoryId: number
): Promise<ResponseData<GetRequestData>> => {
  const params = {
    from,
    to,
    tz: tz.toString(),
    page: page.toString(),
    categoryId,
  };
  const response = await axios.get<ResponseData<GetRequestData>>(
    `${API_REQUESTS_URL}${userId}`,
    { params }
  );
  return response.data;
};

export const decisionRequest = async (
  userId: number,
  categoryId: number,
  requestIds: number[],
  statusLeaveRequest: number
): Promise<ResponseData<DecisionRequestData>> => {
  const body = {
    categoryId,
    requestIds,
    action: statusLeaveRequest,
  };

  const response = await axios.patch<ResponseData<DecisionRequestData>>(
    `${API_REQUESTS_URL}${userId}`,
    body
  );
  return response.data;
};
