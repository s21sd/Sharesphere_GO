"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { UseDispatch, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { logIn, logOut } from '@/redux/features/auth-slice'
import { useRouter } from 'next/navigation';

interface FormData {
    email: string;
    password: string;
}

const LiPage = () => {
    const router = useRouter();
    const auth = useAppSelector((state) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleLogin = async (e: any) => {
        e.preventDefault();
        // console.log("login works")
        if (formData.email == '' || formData.password == '') {
            toast.error('Please fill all the fields');
            return
        }
        let res = await fetch("https://sharesphered.onrender.com" + '/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'

        })
        let data = await res.json();
        if (data.ok) {
            toast.success('Login Successful')
            setTimeout(() => {
                router.push('/myfiles')
            }, 4000)
            getUserData();
        }
        else {
            toast.error(data.message);
        }
    }
    const getUserData = async () => {
        let res = await fetch("https://sharesphered.onrender.com" + '/auth/getuser', {
            method: 'GET',
            credentials: 'include'
        })
        let data = await res.json();
        if (data.ok) {
            dispatch(logIn(data.data));
            setTimeout(() => {

                router.push('/myfiles')
            }, 2000)
        }
        else {
            dispatch(logOut());

        }

    }
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-[95%] max-w-md bg-white p-8 rounded-lg shadow-md bg-gradient-to-br from-pink-300 to-blue-500">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="flex flex-col space-y-4">
                    <input
                        type="text"
                        id="username"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="p-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-[#fb509a]"
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
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

export default LiPage;
