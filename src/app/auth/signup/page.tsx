"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [passeword, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const sendOTP = () => {

  }
  const handleSignup = () => {
    console.log("login works")
  }
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md bg-gradient-to-br from-pink-300 to-blue-500">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="flex flex-col">
          <input
            type="text"
            id="username"
            name="name"
            placeholder="Name"
            required
            onChange={e => setName(e.target.value)}
            className="p-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
          />
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
          <div className='flex justify-between items-center mb-4'>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="OTP"
              required
              onChange={e => setOtp(e.target.value)}
              className="p-2 border-2 w-[70%] border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
            />
            <button className='bg-gradient-to-br from-pink-500 to-blue-300  text-white p-2 border-none rounded-lg cursor-pointer transition duration-300 ' onClick={sendOTP}>Send OTP</button>
          </div>

          <button
            onClick={handleSignup}
            type="submit"
            className="bg-gradient-to-br from-pink-500 to-blue-300  text-white p-2 border-none rounded-lg cursor-pointer transition duration-300 "
          >
            Sign Up
          </button>
          <div className='flex justify-end  m-3 text-white  '>

            <Link className=' bg-gradient-to-br from-pink-500 to-blue-300 p-2 w-fit rounded-lg mt-3' href='/auth/login'>Already have an account ?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
