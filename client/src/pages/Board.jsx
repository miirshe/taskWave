import React from 'react'
import { TaskForm } from '../ExportFiles'

const Board = ({ board }) => {
    return (
        <div className='w-full'>
            <div className='w-[95%] mx-auto lg:w-[80%] lg:ml-[20%] mt-10  p-2'>
                <div className='w-full'>
                    <h1 className='text-base font-medium'> {board?.title} </h1>
                </div>
            </div>
            <TaskForm/>
        </div>
    )
}

export default Board