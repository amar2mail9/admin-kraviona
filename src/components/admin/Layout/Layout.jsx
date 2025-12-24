import React, { useState } from 'react'
import { AiFillDashboard } from 'react-icons/ai'
import { FaBloggerB, FaComments, FaDraft2Digital, FaUserFriends } from 'react-icons/fa'
import { FaFile, FaFolder, FaUser } from 'react-icons/fa6'
import { IoSettings } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import BreadcrumbHeader from '../../BootCamp'
import { RiDraftFill } from 'react-icons/ri'


const Layout = ({ children }) => {
    const location = useLocation()
    const [showProfile, setShowProfile] = useState(false)

    // Placeholder for user data (In a real app, this comes from Context or Redux)
    const currentUser = { name: "Amar", email: "amar@example.com" };

    const menu = [
        { name: 'Dashboard', link: "/", icon: <AiFillDashboard className='w-full h-full' /> },
        { name: 'Blogs', link: "/blog", icon: <FaBloggerB className='w-full h-full' /> },
        { name: 'Comments', link: "/comments", icon: <FaComments className='w-full h-full' /> },
        { name: 'Media', link: "/media-file", icon: <FaFolder className='w-full h-full' /> },
        { name: 'Draft', link: "/draft", icon: <RiDraftFill className='w-full h-full' /> },
        { name: 'Setting', link: "/setting", icon: <IoSettings className='w-full h-full' /> },
        { name: 'Users', link: "/user", icon: <FaUserFriends className='w-full h-full' /> },
    ]

    return (
        <div className='flex h-screen overflow-hidden'> {/* Added h-screen overflow-hidden to main wrapper */}

            {/* Left side (Sidebar) */}
            <div className='w-[320px] h-full bg-gray-800 flex flex-col'> {/* Changed to flex-col to manage height better */}

                {/* Logo section */}
                <div className='w-full py-4 bg-gray-800 sticky top-0 z-10'>
                    <div className='flex justify-center items-center gap-2'>
                        <img src="/favicon.ico" alt="" className='w-14 h-14' />
                        <div className='flex flex-col'> {/* Fixed w-flex to flex flex-col */}
                            <h1 className='text-2xl text-white'>
                                <strong>Kraviona</strong>
                            </h1>
                            <p className='text-gray-500 text-xs'>Web Developer</p>
                        </div>
                    </div>
                </div>

                {/* Menu section - Scrollable */}
                <div className='flex-1 overflow-y-auto no-scrollbar'>
                    {menu.map(({ name, link, icon }, idx) => {
                        const isActive = location.pathname === link
                        return (
                            <Link to={link} key={idx} >
                                <div className={`${isActive ? "bg-[#22a795] text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"} flex items-center gap-2 py-3 px-6 transition-all ease-in-out duration-200`}>
                                    <span className='w-6 h-6'> {/* Adjusted icon size slightly */}
                                        {icon}
                                    </span>
                                    <span className='text-lg font-semibold'>
                                        {name}
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Right side (Main Content) */}
            <div className='flex-1 h-full flex flex-col'>

                {/* Header */}
                <header className='w-full bg-gray-800 h-16 flex items-center px-8 justify-between text-white shadow-md z-20'>
                    <BreadcrumbHeader />

                    <div className="relative flex items-center gap-3">
                        {/* Icon / Trigger */}
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className={`${window.navigator.onLine ? " border-green-400" : "border-rose-400"} w-10 h-10 bg-gray-700 flex items-center justify-center rounded-full border-2 hover:bg-gray-600 transition ring-2 ring-transparent `}
                        >
                            <FaUser className="w-5 h-5 text-white" />
                        </button>

                        {/* Dropdown Menu */}
                        {showProfile && (
                            <div className="absolute top-12 right-0 w-56 bg-gray-700 rounded-lg shadow-xl p-4 text-white z-50 flex flex-col gap-2 border border-gray-600">
                                {/* Header Section */}
                                <div className="border-b border-gray-600 pb-2 mb-1">
                                    <p className="font-semibold text-lg">{currentUser.name}</p>
                                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                                </div>

                                {/* Menu Items */}
                                <button className="text-left hover:bg-gray-600 p-2 rounded text-sm transition">Settings</button>
                                <button className="text-left text-red-400 hover:bg-gray-600 hover:text-red-300 p-2 rounded text-sm transition">Logout</button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <main className='flex-1 overflow-y-auto bg-gray-900 px-6 text-white'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout



