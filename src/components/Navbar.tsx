"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AppDispatch, useAppSelector } from '@/redux/store';
import { UseDispatch, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { logIn, logOut } from '@/redux/features/auth-slice'
const Navbar = () => {
    const auth = useAppSelector((state) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const router = useRouter();
    // const checkLogin = async () => {
    //     let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/checklogin', {
    //         method: 'GET',
    //         credentials: 'include'
    //     })
    //     let data = await res.json();
    //     if (!data.ok) {
    //         dispatch(logOut());
    //     }
    //     else {
    //         getUserData();
    //     }
    // }
    // useEffect(() => {
    //     checkLogin();
    // }, []);
    const getUserData = async () => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/getuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        let data = await res.json();
        if (data.ok) {
            dispatch(logIn(data.data));
        }
        else {
            dispatch(logOut());

        }

    }
    const handleLogout = async (e: any) => {
        e.preventDefault();
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/logout', {
            method: 'POST',
            credentials: 'include'

        })
        let data = await res.json();
        if (data.ok) {
            dispatch(logOut());
            router.push('/auth/login')
        }
    }
    return (
        <div className="container mx-auto mt-4 flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

                <button onClick={() => router.push('/')} className="mr-5 text-[32px] font-bold hover:text-gray-900 custom-btn btn-6"><span>ShareSphere</span></button>

            </a>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                {
                    auth.isAuth ?
                        <div>
                            <button onClick={() => router.push('/myfiles')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>My Files</span></button>
                            <button onClick={() => router.push('/share')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>Share</span></button>
                            <button onClick={handleLogout} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>Logout</span></button>
                        </div> :
                        <div>
                            <button onClick={() => router.push('/auth/login')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>Login</span></button>
                            <button onClick={() => router.push('/auth/signup')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>Sign up</span></button>
                        </div>
                }

            </nav>

        </div>

    )
}

export default Navbar
