"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Lottie from "lottie-react";
import Animation from "../../../../public/Animation - 1706994418335.json"
interface FormData {
  name: string,
  email: string;
  password: string;

}
const Page = () => {
  const router = useRouter();
  const [imgfile, setImgFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  } as FormData)

  const [otp, setOtp] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  const [sendingOTP, setSendingOTP] = useState<boolean>(false);

  const sendOTP = async (e: any) => {
    e.preventDefault();
    setSendingOTP(true);
    let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/sendotp', {
      method: 'POST',
      body: JSON.stringify({ email: formData.email }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    let data = await res.json();
    setSendingOTP(false);
    if (data.ok) {
      toast.success("OTP sent");
    }
    else {
      toast.error(data.message);
    }

  }
  const handleSignup = async (e: any) => {
    e.preventDefault();
    if (formData.name == "" || formData.email == '' || formData.password == '' || otp == '') {
      toast.error('Please fill all the fields')
      return
    }
    let formdata = new FormData();

    formdata.append('name', formData.name);
    formdata.append('email', formData.email);
    formdata.append('password', formData.password);
    formdata.append('otp', otp);
    if (imgfile) {
      formdata.append('clientfile', imgfile)
    }
    let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/register', {
      method: 'POST',
      body: formdata,
      credentials: 'include'
    })

    let data = await res.json()
    if (data.ok) {
      toast.success('Signup successful')
      router.push('/auth/login')
    }

    else {
      toast.error(data.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {
        sendingOTP ?
          <Lottie className='absolute top-16' animationData={Animation} loop={true} /> :
          <></>
      }
      <div className="w-[95%] max-w-md bg-white p-8 rounded-lg shadow-md bg-gradient-to-br from-pink-300 to-blue-500">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="flex flex-col">
          <input
            type="text"
            id="username"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
          />
          <input
            type="file"
            id="image"
            name="image"
            placeholder="Password"
            onChange={(e) => setImgFile(e.target.files![0])}
            className="p-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
          />
          <div className='flex justify-between items-center mb-4'>

            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border-2 w-[74%] border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
            />
            {
              !sendingOTP ? <button className=' bg-gradient-to-br from-pink-500 to-blue-300  text-white lg:p-2 border-none rounded-lg cursor-pointer transition duration-300 md:p-1' onClick={sendOTP}>Send OTP</button>
                : <button className='bg-gray-300  text-white p-2 border-none rounded-lg transition duration-300 cursor-not-allowed'>Sending</button>

            }
          </div>

          <input
            type="text"
            id="OTP"
            name="OTP"
            placeholder="OTP"
            onChange={e => setOtp(e.target.value)}
            className="p-2 border-2 mb-4 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
          />

          <button
            onClick={handleSignup}
            className="bg-gradient-to-br from-pink-500 to-blue-300  text-white p-2 border-none rounded-lg cursor-pointer transition duration-300 "
          >
            Sign Up
          </button>
          <div className='flex justify-end  m-3 text-white  '>

            <Link className=' bg-gradient-to-br from-pink-500 to-blue-300 p-2 w-fit rounded-lg mt-3' href='/auth/login'>Already have an account ?</Link>
          </div>
        </form>
      </div >
    </div >
  );
};

export default Page;
