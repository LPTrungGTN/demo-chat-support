import axios from "@/app/api/axiosInstance";

const BASE_URL = process.env.BASE_URL;
const API_EXPORT_CSV_URL = `${BASE_URL}/export`;

interface LogResponse {
  data: any;
  body: any;
  status: number;
}

export const exportSheet = async (): Promise<LogResponse> => {
  const response = await axios.get<LogResponse>(API_EXPORT_CSV_URL, {});
  console.log(response.data);
  return response.data;
};
