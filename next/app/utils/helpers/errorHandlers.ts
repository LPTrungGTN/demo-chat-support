import { toast } from 'react-toastify';

export const displayError = (error: any) => {
  const {
    response: { data: message, status },
  } = error;
  switch (status) {
    case 404:
      return toast.error('Not found');
    case 401:
      return toast.error('Invalid credentials');
    case 400:
      if (typeof message === 'string') {
        toast.error(message);
      } else {
        message.message.forEach((message: string) => {
          toast.error(message);
        });
      }
    default:
      return toast.error('Internal server error');
  }
};
