'use client';
import 'react-toastify/dist/ReactToastify.css';

import { displayError } from '@helpers/errorHandlers';
import Cookies from 'js-cookie';
import { ChangeEvent, useEffect, useState } from 'react';

import Button from '@/app/components/button';
import FormInput from '@/app/components/formInput';

import { login } from '../api/authenticate';

const FormLogin = () => {
  const Roles = {
    ADMIN: {
      accessToken: '1',
      email: 'admin@gmail.com',
      redirectUrl: '/admin',
      userName: 'admin',
    },
    USER: {
      accessToken: '2',
      email: 'user@gmail.com',
      redirectUrl: '/user',
      userName: 'user',
    },
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken && accessToken === '1' && typeof window !== 'undefined') {
      window.location.assign('/admin');
    }
  }, []);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const redirectTo = (url: string) => {
    if (typeof window !== 'undefined') {
      window.location.assign(url);
    }
  };

  const setLoginCookies = (accessToken: string, userName: string) => {
    Cookies.set('accessToken', accessToken);
    Cookies.set('userName', userName);
  };

  const Login = async () => {
    try {
      //   if (email === Roles.ADMIN.email) {
      //     setLoginCookies(Roles.ADMIN.accessToken, Roles.ADMIN.userName);
      //     return redirectTo(Roles.ADMIN.redirectUrl);
      //   }

      //   if (email === Roles.USER.email) {
      //     setLoginCookies(Roles.USER.accessToken, Roles.USER.userName);
      //     return redirectTo(Roles.USER.redirectUrl);
      //   }
      const response = await login(email, password);
      console.log('response: ', response);

      //   toast.error('Invalid email or password');
    } catch (error: any) {
      displayError(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      Login();
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div>
        <FormInput
          label='Email:'
          type='email'
          value={email}
          onChange={handleUsernameChange}
        />
        <FormInput
          label='Password:'
          type='password'
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handleKeyDown}
        />
        <div className='flex items-center pt-6'>
          <input
            type='checkbox'
            className='w-4 h-4 border border-black'
            id='checkbox'
          />
          <label htmlFor='checkbox' className='pl-4'>
            Remember password
          </label>
        </div>
        <div className='flex items-center pt-6'>
          <label
            htmlFor='forgot-password'
            className='hover:text-blue-600 cursor-pointer'
          >
            Forgot password
          </label>
          <div className='pl-28'>
            <Button label='Login' onClick={Login} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
