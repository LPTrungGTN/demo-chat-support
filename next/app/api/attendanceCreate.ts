import axios from "@/app/api/axiosInstance";

const BASE_URL = process.env.BASE_URL;
const API_CHECKIN_URL = `${BASE_URL}/attendance/checkin`;
const API_CHECKOUT_URL = `${BASE_URL}/attendance/checkout`;

interface LogResponse {
  data: any;
  body: any;
  status: number;
}

export const startWork = async (datetime: string): Promise<LogResponse> => {
  const response = await axios.post<LogResponse>(API_CHECKIN_URL, {
    datetime,
  });
  console.log(response.data);
  return response.data;
};
export const endWork = async (datetime: string): Promise<LogResponse> => {
  const response = await axios.post<LogResponse>(API_CHECKOUT_URL, {
    datetime,
  });
  return response.data;
};
