import React from 'react'
import { Header, Sidebar } from '../ExportFiles'
import { Outlet } from 'react-router-dom'


const PageLayout = () => {
    
    return (
        <div className='w-full'>
            <Sidebar />
            <div className='w-full relative'>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default PageLayout