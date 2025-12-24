import React from 'react'
import { FaTrash, FaEye, FaCloudUploadAlt, FaSearch } from 'react-icons/fa'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'

const MediaPage = () => {
    // Mock Data (Replace this with your API data later)
    const mediaFiles = [
        { id: 1, name: 'banner-design.jpg', url: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a9?auto=format&fit=crop&w=600&q=80' },
        { id: 2, name: 'profile-pic.png', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
        { id: 3, name: 'hero-section.png', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80' },
        { id: 4, name: 'footer-bg.jpg', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80' },
        { id: 5, name: 'logo-transparent.png', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
        { id: 6, name: 'chart-graph.svg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    ]

    return (
        <Layout>
            <div className='w-full min-h-screen bg-gray-900 text-gray-200 p-6'>

                {/* --- Heading Section --- */}
                <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
                    <div>
                        <h1 className='text-3xl font-bold text-white'>Media Library</h1>
                        <p className='text-gray-400 text-sm mt-1'>Manage your uploaded images and assets.</p>
                    </div>

                    <div className='flex gap-3'>
                        {/* Search Bar */}
                        <div className='relative'>
                            <FaSearch className='absolute top-3 left-3 text-gray-500' />
                            <input
                                type="text"
                                placeholder="Search files..."
                                className='bg-gray-800 border border-gray-700 text-gray-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500'
                            />
                        </div>
                        {/* Upload Button */}
                        <Link to={'upload'} className='flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors font-medium'>
                            <FaCloudUploadAlt />
                            <span>Upload New</span>
                        </Link>
                    </div>
                </div>

                {/* --- Media Grid Section --- */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>

                    {/* Map through data */}
                    {mediaFiles.map((file) => (
                        <div key={file.id} className='group relative bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-500 transition-all duration-300'>

                            {/* Image Thumbnail */}
                            <div className='h-40 w-full overflow-hidden'>
                                <img
                                    src={file.url}
                                    alt={file.name}
                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                                />
                            </div>

                            {/* File Name Info */}
                            <div className='p-3 bg-gray-800'>
                                <p className='text-sm text-gray-300 truncate'>{file.name}</p>
                            </div>

                            {/* Hover Overlay Actions */}
                            <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 backdrop-blur-sm'>
                                <button className='p-2 bg-white/10 hover:bg-emerald-500 text-white rounded-full transition-colors' title="View">
                                    <FaEye size={18} />
                                </button>
                                <button className='p-2 bg-white/10 hover:bg-red-500 text-white rounded-full transition-colors' title="Delete">
                                    <FaTrash size={18} />
                                </button>
                            </div>

                        </div>
                    ))}

                    {/* Empty State (Optional: Use this if array is empty) */}
                    {mediaFiles.length === 0 && (
                        <div className='col-span-full py-20 text-center text-gray-500'>
                            <p>No media files found.</p>
                        </div>
                    )}

                </div>

            </div>
        </Layout>
    )
}

export default MediaPage