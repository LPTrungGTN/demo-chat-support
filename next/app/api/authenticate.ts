import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

interface LoginResponse {
  accessToken: string;
}

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  console.log('response: ', response);
  return response.data;
};

export const logout = async (token: string): Promise<void> => {
  await axios.post(`${BASE_URL}/auth/logout`, { token });
};
