import axios from "@/app/api/axiosInstance";

const BASE_URL = process.env.BASE_URL;

interface User {
  full_name: string;
  id: string;
  role_id: string;
  timezone: string;
}

interface ResponseData {
  token: string;
  user: User;
}

interface LoginResponse {
  data: ResponseData;
  status: number;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const logout = async (): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/logout`);
  return response.data;
};
