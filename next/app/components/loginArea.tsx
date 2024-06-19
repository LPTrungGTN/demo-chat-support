'use client';
import 'react-toastify/dist/ReactToastify.css';

import { displayError } from '@helpers/errorHandlers';
import Cookies from 'js-cookie';
import { ChangeEvent, useEffect, useState } from 'react';

import { login } from '@/app/api/authenticate';
import Button from '@/app/components/button';
import FormInput from '@/app/components/formInput';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken && typeof window !== 'undefined') {
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

  const setLoginCookies = (accessToken: string) => {
    Cookies.set('accessToken', accessToken);
  };

  const Login = async () => {
    try {
      const response = await login(email, password);
      setLoginCookies(response.accessToken);
      redirectTo('/admin');
    } catch (error: any) {
      console.log('error: ', error);
      displayError(error);
    }
  };

  const LoginChat = async () => {
    setLoginCookies('customer');
    redirectTo('/user');
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
          <div className='pl-28'>
            <Button label='Chat' onClick={LoginChat} />
          </div>
          <div className='pl-28'>
            <Button label='Login' onClick={Login} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
