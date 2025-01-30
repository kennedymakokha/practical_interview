/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react";
interface InputProps {
    disable?: boolean;
    min?: number | string | undefined
    name?: string

    placeholder?: string
    value?: any
    onChange: any
    label?: string;
    required?: boolean,
    type?: string;


}
const Input: React.FC<InputProps> = ({ label, min, placeholder, required, value, disable, name, type, onChange }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="flex w-full px-2 items-center gap-x-2 rounded-md border md:border-slate-200 border-purple-800">
            <div className="flex capitalize md:text-slate-500 text-slate-50  font-bold ">
                {label}{" "}
                {required === true && (
                    <span className="text-red-500 px-2 font-bold">* </span>
                )}
            </div>
            <input
             
                name={name}
                disabled={disable}
                type={type === "password" && show ? "text" : type ? type : "text"}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value, name)}
                className={`flex py-2  items-center focus:outline-none bg-transparent focus:bg-transparent  focus:ring-0 focus:ring-offset-0 w-full`}
            />
            {type === "password" && (
                <div
                    onClick={() => setShow(!show)}
                    className="flex items-center justify-center  "
                >
                    {show ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-purple-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-purple-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                        </svg>
                    )}
                </div>
            )}
        </div>
    );
}

export const TextArea: React.FC<InputProps> = ({ label, min, placeholder, required, value, disable, name, type, onChange }) => {
   
    return (
        <div className="flex w-full px-2  gap-x-2 rounded-md border md:border-slate-200 border-purple-800">
            <div className="flex capitalize md:text-slate-500 text-slate-50  font-bold ">
                {label}{" "}
                {required === true && (
                    <span className="text-red-500 px-2 font-bold">* </span>
                )}
            </div>
            <textarea
                name={name}
                disabled={disable}
                rows={10}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value, name)}
                className={`flex py-2  items-center focus:outline-none bg-transparent focus:bg-transparent  focus:ring-0 focus:ring-offset-0 w-full`}
            />
          
        </div>
    );
}

export default Input;