import React from 'react'
import { AiFillDashboard } from 'react-icons/ai'
import { FaBloggerB, FaComments, FaUserFriends } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'


const Layout = ({ children }) => {
    const location = useLocation()
    const menu = [
        { name: 'Dashboard', link: "/", icon: <AiFillDashboard className='w-full h-full' /> },
        { name: 'Blogs', link: "/blogs", icon: <FaBloggerB className='w-full h-full' /> },
        { name: 'Comments', link: "/comments", icon: <FaComments className='w-full h-full' /> },
        { name: 'Setting', link: "/setting", icon: <IoSettings className='w-full h-full' /> },
        { name: 'Users', link: "/user", icon: <FaUserFriends className='w-full h-full' /> },

    ]
    return (
        <div className='flex  '>
            {/* left side */}
            <div className='w-[320px] h-screen overflow-y-scroll no-scrollbar bg-gray-800'>
                {/* logo section */}
                <div className='w-full py-4 sticky top-0 bg-gray-800'>
                    <div className='flex justify-center  items-center gap-2'>
                        <img src="/favicon.ico" alt="" className='w-14 h-14' />
                        <div className='w-flex'>
                            <h1 className='text-2xl'>
                                <strong>Kraviona</strong>
                            </h1>
                            <p className='text-gray-500 text-xs'>Web Developer</p>
                        </div>
                    </div>
                    {/* <hr className='text-gray-600' /> */}
                </div>

                {/* menu section */}
                <div className=' h-[calc(100%-96px)]'>
                    {
                        menu.map(({ name, link, icon }, idx) => {
                            const isActive = location.pathname === link
                            return <Link to={link} key={idx} >
                                <div className={`${isActive ? "bg-[#22a795]" : "hover:bg-gray-700 "} flex items-center gap-2 py-2    px-4 transition-all ease-in-out delay-200 duration-100 `}>
                                    <span className='w-8 h-8'>
                                        {icon}
                                    </span>
                                    <span className='text-xl font-semibold'>
                                        {name}
                                    </span>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
            {/* right side */}
            <div className='w-[calc(100%-320px)]  h-screen'>
                <div className='w-full h-full'>
                    {/* header */}
                    <header className='w-full bg-gray-800 sticky top-0 right-0 h-16 flex items-center px-8'>
                        <nav>
                            {/* Welcome */}
                            <h1 className='text-2xl'>Welcome <span className='capitalize font-bold text-green-500'>{name ? "Amar" : "Unknown"}</span></h1>

                            {/* logo */}

                        </nav>
                    </header>
                    {/* content */}
                    <main className='h-[calc(100%-64px)]  w-full no-scrollbar p-4 overflow-y-scroll '>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Layout