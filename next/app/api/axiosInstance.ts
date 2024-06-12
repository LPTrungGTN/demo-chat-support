import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const instance = axios.create();

// Hàm interceptor xử lý response
const handleResponse = (
  response: AxiosResponse<any, any>
): AxiosResponse<any, any> => {
  return {
    ...response,
    data: {
      data: response.data.response_body,
      status: response.status,
    },
  };
};

const handleError = (error: any): Promise<AxiosResponse<any, any>> => {
  return Promise.reject({
    data:
      error.response.data.response_body ||
      "Something went wrong, try again later",
    status: error.response.status,
  });
};

instance.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const token: string | undefined = Cookies.get("accessToken");

  // Make sure headers always exists
  config.headers = config.headers || {};

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config as unknown as InternalAxiosRequestConfig<any>;
});

instance.interceptors.response.use(handleResponse, handleError);

export default instance;
