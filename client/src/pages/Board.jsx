import React from 'react';
import { useGetCurrentTaskQuery, useDeleteTaskMutation } from '../redux/slices/taskslices';
import { MdModeEdit, MdOutlineDelete } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleOpenTaskModel } from '../redux/slices/taskModelSlices';
import { TaskForm } from '../ExportFiles';
import toast from 'react-hot-toast';
const Board = ({ board }) => {
    const params_row = useLocation().state;
    const dispatch = useDispatch();
    const [deleteTask] = useDeleteTaskMutation();
    const { data: getTasks = [] } = useGetCurrentTaskQuery();
    const tasks = getTasks?.userTasks || [];
    const boardTasks = tasks?.filter((task) => task?.boardId === board?._id);

    const handleDeleteTask = (id) => {
        if (confirm('Are you sure you want to delete')) {
            deleteTask(id)
                .then((res) => {
                    const status = res?.data?.status;
                    const message = res?.data?.message;
                    if (status) {
                        toast.success(message);
                    } else {
                        toast.error(message);
                    }
                })
                .catch(err => {
                    toast.error(err?.data);
                });
        }
    }
    return (
        <div className='w-full'>
            <div className='w-[95%] mx-auto lg:w-[80%] lg:ml-[20%] mt-10  p-2'>
                <div className='w-full'>
                    <h1 className='text-base font-medium'>{board?.title}</h1>
                </div>

                <div className='w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black'>
                    {
                        boardTasks?.map(task => {
                            return (
                                <div
                                    className={`bg-white p-3 mt-2 rounded-md shadow-md
                                    space-y-4 relative ${task?.status !== 'Todo' && 'Doing' ? 'line-through' : ''}`}
                                >
                                    <span className={`absolute bottom-0 left-0  rounded shadow px-4 py-2 ${task?.status == 'Todo' || 'Doing' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>{task?.status}</span>
                                    <h1 className='text-base font-medium'>
                                        {task?.title}
                                    </h1>
                                    <hr className='w-full' />
                                    <p className='text-base font-light'>
                                        {task?.description}
                                    </p>
                                    <div className='w-full flex flex-row justify-end items-center gap-3'>
                                        <button
                                            onClick={() => handleDeleteTask(task?._id)}
                                        >
                                            <MdOutlineDelete className='text-red-500' size={20} />
                                        </button>
                                        <Link to={`/${board?.title}/${task?._id}`} state={task} onClick={() => dispatch(handleOpenTaskModel(true))}>
                                            <MdModeEdit className='text-green-500' size={20} />
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {
                <TaskForm params_row={params_row} board={board} />
            }
        </div>
    );
};

export default Board;
