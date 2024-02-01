import React, { useEffect, useState } from 'react';
import { MdClose, MdOutlineMenu } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar, openSidebar } from '../redux/slices/SidebarMenuSlice';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useDeleteUserMutation, useGetCurrentUserQuery } from '../redux/slices/UserSlices';
import { useLocation } from 'react-router-dom';
import { handleOpenTaskModel } from '../redux/slices/taskModelSlices';

const Header = () => {
    const location = useLocation()
    const [visibleAddTask, setVisibleAddTask] = useState(false);
    useEffect(() => {
        if (location.pathname !== '/') {
            setVisibleAddTask(true);
        } else {
            setVisibleAddTask(false);
        }
    }, [location.pathname])
    const { data: getCurrentUser = {} } = useGetCurrentUserQuery();
    console.log('data', getCurrentUser);
    const currentUser = getCurrentUser?.user || {};
    const [deleteUser] = useDeleteUserMutation();
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();
    const [profileVisible, setProfileVisible] = useState(false);
    const handleLogout = () => {
        Cookies.remove('userToken')
        window.location.href = '/user-login';
        toast.success('successfully log out')
    }
    const deleteAccount = async (id) => {
        deleteUser(id)
            .then((res) => {
                const status = res.data.status;
                const message = res.data.message;
                if (status) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            })
            .catch((err) => {
                console.log('err', err.data);
            });

    }
    const userAccount = (
        <div className='w-[75%] md:w-[40%] lg:w-[25%] absolute bg-white text-[#42526E] right-0 top-[4.5rem] shadow rounded p-5'>
            <div className='w-full ml-3'>
                <h1>Account</h1>
                <div className='w-full mt-5 space-y-4'>
                    <div className='w-full flex flex-row justify-start items-center gap-3'>
                        <img
                            src='/public/images/avatarProfile.png'
                            className='w-10 h-10 rounded-full shadow cursor-pointer'
                            alt=''
                        />
                        <div className='w-full'>
                            <p className='text-sm font-medium md:text-base md:font-medium'>{currentUser?.username}</p>
                            <p className='text-sm font-extralight md:text-base md:font-light'>{currentUser?.email}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-2 space-y-2'>
                    <button onClick={() => handleLogout()} className='w-full text-sm font-medium md:text-base md:font-medium text-start'>Log out</button>
                    <hr className='w-full' />
                    <button className='w-full text-sm font-medium md:text-base md:font-medium text-start text-red-500'
                        onClick={() => deleteAccount(currentUser?._id)}>Delete Account</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className='w-full p-2 relative shadow  dark:bg-slate-800 dark:text-white'>
            <div className='w-[95%] mx-auto lg:w-[80%] lg:ml-[20%] mt-3'>
                <div className='w-full flex flex-row justify-between items-center gap-5'>
                    {isOpen === false ? (
                        <MdOutlineMenu
                            className='block lg:hidden cursor-pointer'
                            size={20}
                            onClick={() => dispatch(openSidebar(true))}
                        />
                    ) : (
                        <MdClose
                            className='block lg:hidden cursor-pointer'
                            size={20}
                            onClick={() => dispatch(closeSidebar(false))}
                        />
                    )}
                    <h1 className='text-base font-medium'> All Boards </h1>
                    <div className='w-fit flex flex-row justify-start items-center gap-4'>
                        {
                            visibleAddTask && <button className='bg-[#322F64] px-4 py-2 rounded-lg shadow text-white 
                            text-base font-medium dark:bg-white dark:text-[#322F64]'
                                onClick={() => dispatch(handleOpenTaskModel(true))}>
                                + add new task
                            </button>

                        }
                        <img
                            onClick={() => setProfileVisible(!profileVisible)}
                            src='/public/images/avatarProfile.png'
                            className='w-10 h-10 rounded-full shadow cursor-pointer'
                            alt=''
                        />
                    </div>
                </div>
            </div>
            {profileVisible && userAccount}
        </div>
    );
};

export default Header;
