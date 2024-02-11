"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logIn, logOut } from '@/redux/features/auth-slice';
import Hamburger from 'hamburger-react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const auth = useAppSelector((state) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const router = useRouter();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const [openi, setOpen] = useState(false);

    const checkLogin = async () => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/checklogin', {
            method: 'GET',
            credentials: 'include'
        });

        let data = await res.json();
        if (!data.ok) {
            dispatch(logOut());
        } else {
            getUserData();
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    const getUserData = async () => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/getuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        let data = await res.json();
        if (data.ok) {
            dispatch(logIn(data.data));
        } else {
            dispatch(logOut());
        }
    };

    const handleLogout = async () => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        let data = await res.json();
        if (data.ok) {
            dispatch(logOut());
            router.push('/auth/login');
        }
    };
    let username = auth.user?.name.split(" ")[0];
    let userProfilepic = auth.user?.profilePic.split("\\").pop();
    console.log(userProfilepic)
    return (
        <div className="container mx-auto mt-4 px-4 lg:px-10 py-5 flex flex-col md:flex-row items-center">
            <div className="flex justify-between items-center w-full md:w-auto">
                <a className="flex title-font justify-center font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <button onClick={() => router.push('/')} className="mr-5 text-2xl font-bold hover:text-gray-900 custom-btn btn-6"><span>ShareSphere</span></button>
                </a>
                <button className="block md:hidden mb-4" onClick={toggleDrawer}>
                    <Hamburger toggled={isDrawerOpen} toggle={setIsDrawerOpen} />
                </button>
            </div>
            <nav className={`md:ml-auto md:flex md:flex-wrap md:items-center ${isDrawerOpen ? 'block' : 'hidden'}`}>
                {auth.isAuth ?
                    <div>
                        <button onClick={() => router.push('/myfiles')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>My Files</span></button>
                        <button onClick={() => router.push('/share')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>Share</span></button>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 40, height: 40 }} src={`http://localhost:5000/public/${userProfilepic}`} alt="User Profile" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}

                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Avatar className='mr-2 font-bold' src={`http://localhost:5000/public/${userProfilepic}`} alt="User Profile" />{username}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <button onClick={handleLogout} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span><ExitToAppIcon />Logout</span></button>
                                </ListItemIcon>

                            </MenuItem>
                        </Menu>
                    </div> :
                    <div>
                        <button onClick={() => router.push('/auth/login')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>Login</span></button>
                        <button onClick={() => router.push('/auth/signup')} className="mr-5 hover:text-gray-900 font-medium custom-btn btn-6"><span>Sign up</span></button>
                    </div>
                }
            </nav>
        </div>
    );
};

export default Navbar;
