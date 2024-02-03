"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
    const [email, setEmail] = useState('');
    const [passeword, setPassword] = useState('');
    const handleLogin = () => {
        console.log("login works")
    }
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md bg-gradient-to-br from-pink-300 to-blue-500">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="flex flex-col">
                    <input
                        type="text"
                        id="username"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={e => setEmail(e.target.value)}
                        className="p-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={e => setPassword(e.target.value)}
                        className="p-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
                    />

                    <button
                        onClick={handleLogin}
                        type="submit"
                        className="bg-gradient-to-br from-pink-500 to-blue-300  text-white p-2 border-none rounded-lg cursor-pointer transition duration-300 "
                    >
                        Login
                    </button>
                    <div className='flex justify-end m-3 text-white'>

                        <Link className=' bg-gradient-to-br from-pink-500 to-blue-300 p-2 mt-3 w-fit rounded-lg' href='/auth/forgotpassword'>Forgot Password ?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
