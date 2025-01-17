import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

interface LoginResponse {
  accessToken: string;
}

export const login = async (
  password: string,
  username: string,
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, {
    password,
    username,
  });
  return response.data;
};

export const logout = async (token: string): Promise<void> => {
  await axios.post(`${BASE_URL}/logout`, { token });
};
