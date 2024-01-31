// Sidebar.js
import React from 'react';
import { SiTask } from "react-icons/si";
import { CiViewBoard } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from "react-icons/md"
import { closeSidebar } from '../redux/slices/SidebarMenuSlice';
import { handleOpen } from '../redux/slices/popUpSlices';
import CreateBoard from './CreateBoard';
import { useGetCurrentBoardQuery } from '../redux/slices/boardSlices';
import { Link } from 'react-router-dom';
import { handleColorBoard } from '../redux/slices/bordColorSlices';

const Sidebar = () => {
    const isOpen = useSelector(state => state.sidebar.isOpen);
    const boardColor = useSelector(state => state.boardColor.boardColor)
    const textColor = useSelector(state => state.boardColor.textColor)
    const dispatch = useDispatch();
    const { data: getBoards = [] } = useGetCurrentBoardQuery();
    const userBoards = getBoards?.userBoards || [];
    return (
        <div className={`w-[70%] lg:w-[18%] p-3 shadow z-20  dark:bg-slate-800 dark:text-white
        fixed left-0 top-0 bottom-0 ${isOpen == false ? 'hidden lg:block' : 'block lg:hidden'}`}
            style={{ backgroundColor: boardColor, color: textColor }}>
            <div className='w-[95%] ml-[5%] mt-5'>
                <div className='w-full flex flex-row justify-start items-center gap-3'>
                    <div className='w-full flex flex-row gap-3'>
                        <SiTask size={30} />
                        <h1 className='text-base font-medium'>TaskWave</h1>
                    </div>
                    <MdClose className="block lg:hidden cursor-pointer" onClick={() => dispatch(closeSidebar(false))} size={20} />
                </div>
                <div className='w-full space-y-3 mt-14'>
                    <button className=' hover:bg-[#DCDFE4] p-2 rounded transition-all duration-500 
                    flex flex-row justify-start items-center gap-3' onClick={() => dispatch(handleOpen(true))}>
                        <CiViewBoard size={25} />
                        <span className='font-medium text-base'> + Create New Board</span>
                    </button>
                </div>
                <h1 className='text-base font-medium mt-10'>All Boards ({userBoards?.length})</h1>
                <div className='w-full mt-6 space-y-3'>
                    <Link to='/' className='hover:bg-[#DCDFE4] p-2 rounded transition-all duration-500 
                            flex flex-row justify-start items-center gap-3'
                        onClick={() => dispatch(handleColorBoard({ boardColor: '#ffffff', textColor: '#42526E' }))}> <CiViewBoard size={25} /> <span>Boards</span></Link>
                    {
                        userBoards?.map(board => {
                            return <Link key={board?._id} to={`${board?.title}`} className='hover:bg-[#DCDFE4] p-2 rounded transition-all duration-500 
                            flex flex-row justify-start items-center gap-3'
                                onClick={() => dispatch(handleColorBoard({ boardColor: board?.color, textColor: '#ffffff' }))}> <CiViewBoard size={25} /> <span>{board?.title}</span></Link>
                        })
                    }
                </div>
            </div>
            {
                <CreateBoard />
            }
        </div>
    );
}

export default Sidebar;
