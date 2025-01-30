/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Input from '@/components/Input'
import React, { useState } from 'react'
import axios from '@/utils/instance'
// import BG from './loginBg.png'
import toast from 'react-hot-toast'
import { setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

function Login() {
    const initialState = {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "influencer"
    }
   

    const [item, setItem] = useState(initialState)
    const [isloginIn, setIsLoginin] = useState(true)
    const handleChange = (e: any, name: any) => {

        setItem(((prev) => ({
            ...prev, [name]: e
        })))
    }

    const RoleButton = ({ title }: any) => {
        return (
            <div onClick={() => setItem(((prev) => ({
                ...prev, role: title
            })))} className='flex h-full w-1/2 items-center  uppercase'>
                <div className={`flex h-full  items-center border px-2 ${title === item.role && "bg-blue-200 border-blue-300 shadow-3xl"}  text-slate-500 rounded-md justify-center`}>{title}</div>
            </div>
        )
    }
    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            const results = await axios.post(`${isloginIn ? "user/login" : "user/"}`, item)
            if (results?.data.token) {
                const decoded:any = jwtDecode(results?.data.token)
                toast.success(results?.data.message)
                localStorage.setItem('uid', decoded?.uid)
                const expiry = new Date(parseInt(decoded?.exp?.toString() || '0') * 1000)
                setCookie('tkn', results?.data.token, { expires: expiry })
                return window.location.href = "/"

            } else {
                toast.success("Successfull registration")
                setIsLoginin(!isloginIn)
                setItem(initialState)
                return
            }
        } catch (error: any) {

            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            }
            else {
                toast.error("Unknown Error Occured please ty again later")
            }
        }
    };

    return (

        <div className="bg-blue-400 w-[100vw] h-[100vh] relative z-0">

            <div className="absolute w-1/4 h-[80%] rounded-md flex-col py-1 bg-slate-100 flex left-[10%] top-[10%] flex   z-10">
                <div className="flex h-1/4 w-full items-center justify-center mb-2  ">
                    <div className="flex bg-blue-400 size-32 rounded-full"></div>
                </div>
                <p className="text-2xl font-bold text-center">Login</p>
                <div className="flex px-10 py-5 flex-col gap-y-2">
                    {!isloginIn && <div className='w-full flex h-8 px-10'>
                        <RoleButton title="campaigner" />
                        <RoleButton title="influencer" />

                    </div>}
                    {!isloginIn && <Input label="Name" required name="name" value={item.name} onChange={handleChange} />}
                    <Input label="email" required name="email" value={item.email} onChange={handleChange} />
                    <Input label="password" required name="password" type="password" value={item.password} onChange={handleChange} />

                    {!isloginIn && <Input label="Confirm Password" type="password" required name="confirm_password" value={item.confirm_password} onChange={handleChange} />}
                </div>

                <div className="flex w-full h-20 px-10 justify-between">
                    <div className="flex w-1/2 px-2 h-full justify-between ">
                        <div className="flex w-full h-10 rounded-md font-bold  shadow-3xl items-center justify-center bg-red-200">
                            cancel
                        </div>
                    </div>
                    <div className="flex w-1/2 px-2 h-full justify-between ">
                        <div onClick={(e) => handleSubmit(e)} className="flex w-full h-10 rounded-md  font-bold shadow-3xl text-white items-center justify-center bg-blue-400">
                            {!isloginIn ? "Register" : "Login"}
                        </div>
                    </div>
                </div>
                <p onClick={() => setIsLoginin(!isloginIn)} className="text-end px-12 text-blue-400 ">{!isloginIn ? "Login" : "Register new account"}</p>
            </div>

        </div>


    )
}

export default Login