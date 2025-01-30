/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Input from '@/components/Input';
import React, { useState } from 'react';
import axios from '@/utils/instance';
// import BG from './loginBg.png'
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'influencer',
  };

  const [item, setItem] = useState(initialState);
  const [isloginIn, setIsLoginin] = useState(true);
  const handleChange = (e: any, name: any) => {
    setItem((prev) => ({
      ...prev,
      [name]: e,
    }));
  };

  const RoleButton = ({ title }: any) => {
    return (
      <div
        onClick={() =>
          setItem((prev) => ({
            ...prev,
            role: title,
          }))
        }
        className="flex h-full w-1/2 items-center uppercase"
      >
        <div
          className={`flex h-full items-center border px-2 ${title === item.role && 'shadow-3xl border-blue-300 bg-blue-200'} justify-center rounded-md text-slate-500`}
        >
          {title}
        </div>
      </div>
    );
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const results = await axios.post(`${isloginIn ? 'user/login' : 'user/'}`, item);
      if (results?.data.token) {
        const decoded: any = jwtDecode(results?.data.token);
        toast.success(results?.data.message);
        localStorage.setItem('uid', decoded?.uid);
        const expiry = new Date(parseInt(decoded?.exp?.toString() || '0') * 1000);
        setCookie('tkn', results?.data.token, { expires: expiry });
        return (window.location.href = '/');
      } else {
        toast.success('Successfull registration');
        setIsLoginin(!isloginIn);
        setItem(initialState);
        return;
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error('Unknown Error Occured please ty again later');
      }
    }
  };

  return (
    <div className="relative z-0 h-[100vh] w-[100vw] bg-blue-400">
      <div className="absolute left-[10%] top-[10%] z-10 flex h-[80%] w-1/4 flex-col rounded-md bg-slate-100 py-1">
        <div className="mb-2 flex h-1/4 w-full items-center justify-center">
          <div className="flex size-32 rounded-full bg-blue-400"></div>
        </div>
        <p className="text-center text-2xl font-bold">Login</p>
        <div className="flex flex-col gap-y-2 px-10 py-5">
          {!isloginIn && (
            <div className="flex h-8 w-full px-10">
              <RoleButton title="campaigner" />
              <RoleButton title="influencer" />
            </div>
          )}
          {!isloginIn && (
            <Input label="Name" required name="name" value={item.name} onChange={handleChange} />
          )}
          <Input label="email" required name="email" value={item.email} onChange={handleChange} />
          <Input
            label="password"
            required
            name="password"
            type="password"
            value={item.password}
            onChange={handleChange}
          />

          {!isloginIn && (
            <Input
              label="Confirm Password"
              type="password"
              required
              name="confirm_password"
              value={item.confirm_password}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="flex h-20 w-full justify-between px-10">
          <div className="flex h-full w-1/2 justify-between px-2">
            <div className="shadow-3xl flex h-10 w-full items-center justify-center rounded-md bg-red-200 font-bold">
              cancel
            </div>
          </div>
          <div className="flex h-full w-1/2 justify-between px-2">
            <div
              onClick={(e) => handleSubmit(e)}
              className="shadow-3xl flex h-10 w-full items-center justify-center rounded-md bg-blue-400 font-bold text-white"
            >
              {!isloginIn ? 'Register' : 'Login'}
            </div>
          </div>
        </div>
        <p onClick={() => setIsLoginin(!isloginIn)} className="px-12 text-end text-blue-400">
          {!isloginIn ? 'Login' : 'Register new account'}
        </p>
      </div>
    </div>
  );
}

export default Login;
