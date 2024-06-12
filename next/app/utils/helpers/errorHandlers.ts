import { toast } from "react-toastify";

export const displayError = (error: any) => {
  if (error?.status === 404) {
    toast.error(error.data);
  }
  for (let key in error?.data?.message) {
    toast.error(`${key}: ${error?.data?.message[key]}`);
  }
};
