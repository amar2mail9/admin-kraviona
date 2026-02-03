import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Added icons for actions
import { FaEye } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogTables = () => {
    // State for search and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjustable: how many rows per page
    const [blogs, setBlogs] = useState([

    ])

    // Fixed Dummy Data (Unique IDs)
    const fetchBlog = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/public-blogs`)
            const data = await res.json()
            if (!res.ok) {
                const errorData = await res.json()
                toast.error(errorData.message)
            } else {
                setBlogs(data.data)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // 1. Filter Logic
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    useEffect(() => { fetchBlog() }, [])
    return (
        <div className='mt-3'>
            {/* --- Header Section (Search + Add) --- */}
            <div className='flex justify-between items-center mb-6'>
                <div className="relative w-96">
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        className='w-full h-10 px-4 bg-gray-800 rounded-lg border border-gray-700 text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors'
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to page 1 on search
                        }}
                    />
                </div>

                <Link to="create">
                    <button className='bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 flex items-center gap-2 rounded-md transition-all shadow-lg hover:shadow-emerald-500/20'>
                        <FaPlus />
                        <span className="font-medium">Add Blog</span>
                    </button>
                </Link>
            </div>

            {/* --- Table Section --- */}
            <div className="w-full bg-gray-900 shadow-xl rounded-xl overflow-hidden border border-gray-800">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-800 border-b border-gray-700">
                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {currentBlogs.length > 0 ? (
                                currentBlogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-gray-800/50 transition-colors duration-200">
                                        <td className="px-5 py-4 text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="text-gray-200 whitespace-no-wrap capitalize font-medium">{blog.title}</p>
                                                    <p className="text-gray-500 text-xs mt-0.5">by {blog?.authorDetails?.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm">
                                            <span className="px-2 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded border border-gray-700">
                                                {blog?.categoryName}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-gray-400">
                                            {new Intl.DateTimeFormat("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }).format(new Date(blog?.createdAt))}
                                        </td>

                                        <td className="px-5 py-4 text-sm">
                                            <span className={`inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${blog.status === "Published"
                                                ? "bg-green-900/30 text-green-400 border-green-900"
                                                : "bg-yellow-900/30 text-yellow-400 border-yellow-900"
                                                }`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm">
                                            <div className="flex gap-3">
                                                <Link to={`/edit-blog/${blog.id}`} className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-full transition-colors">
                                                    <FaEdit size={16} />
                                                </Link>
                                                <button
                                                    className="p-2 text-red-400 hover:bg-red-900/30 rounded-full transition-colors"
                                                    onClick={() => alert(`Delete blog ${blog.id}?`)}
                                                >
                                                    <FaTrash size={15} />
                                                </button>
                                                <Link
                                                    className="p-2 text-gray-400 hover:bg-gray-500/30 rounded-full transition-colors"
                                                    to={`${blog.id}`}
                                                >
                                                    <FaEye size={15} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-5 py-10 text-center text-gray-500">
                                        No blogs found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- Pagination Footer --- */}
                <div className="px-5 py-4 bg-gray-800 border-t border-gray-700 flex flex-col xs:flex-row items-center xs:justify-between">
                    <span className="text-xs text-gray-400 mb-2 xs:mb-0">
                        Showing <span className="font-semibold text-gray-200">{filteredBlogs.length === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="font-semibold text-gray-200">{Math.min(indexOfLastItem, filteredBlogs.length)}</span> of <span className="font-semibold text-gray-200">{filteredBlogs.length}</span> Entries
                    </span>
                    <div className="inline-flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${currentPage === 1
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                }`}
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${currentPage === totalPages || totalPages === 0
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogTables;