import axios from "@/app/api/axiosInstance";
import { List } from "postcss/lib/list";

const BASE_URL = process.env.BASE_URL;
const API_GET_LEAVE_REQUEST_TYPE_URL = `${BASE_URL}/users/upper_roles`;
interface ListApprove {
  id: number;
  full_name: string;
  role_id: number;
}
interface ResponseData {
  upperRoles: ListApprove[];
}
interface LogResponse {
  response_status: number;
  data: ResponseData;
}

export const ApprovePeopleList = async (): Promise<LogResponse> => {
  const response = await axios.get<LogResponse>(API_GET_LEAVE_REQUEST_TYPE_URL);
  return response.data;
};
