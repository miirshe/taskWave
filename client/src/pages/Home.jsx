import React from 'react'
import { useGetCurrentBoardQuery } from '../redux/slices/boardSlices';
import { Link } from 'react-router-dom';
import { handleColorBoard } from '../redux/slices/bordColorSlices';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    const { data: getBoards = [] } = useGetCurrentBoardQuery();
    const userBoards = getBoards?.userBoards || [];
    return (
        <div className='w-full'>
            <div className='w-[95%] mx-auto lg:w-[80%] lg:ml-[20%] mt-10  p-2'>
                <div className='w-full'>
                    <h1 className='text-base font-medium'>  Boards  </h1>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5'>
                    {
                        userBoards?.map(board => {
                            return <Link to={`/${board?.title}`} key={board?._id} className='w-full p-10 shadow rounded'
                                style={{ backgroundColor: board?.color , color : '#ffffff'}}
                                onClick={() => dispatch(handleColorBoard({ boardColor: board?.color, textColor: '#ffffff' }))}>
                                    <h1 className='text-base font-medium tracking-wider'>{board?.title}</h1>
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home