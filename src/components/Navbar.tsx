"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(0);
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className="container mx-auto mt-4 flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

                <button onClick={() => router.push('/')} className="mr-5 text-[32px] font-bold hover:text-gray-900 custom-btn btn-6"><span>ShareSphere</span></button>

            </a>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                {
                    isLoggedIn ?
                        <div>
                            <button onClick={() => router.push('/myfiles')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>My Files</span></button>
                            <button onClick={() => router.push('/share')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>Share</span></button>
                            <button onClick={() => router.push('/auth/logout')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>Logout</span></button>
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
