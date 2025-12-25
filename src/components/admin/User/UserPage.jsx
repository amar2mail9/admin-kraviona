import React, { useState } from 'react';
import { Trash2, Edit, Search, MoreVertical } from 'lucide-react'; // Optional icons, or use text if you don't have lucide-react installed
import Layout from '../Layout/Layout';

const UserPage = () => {
    // 1. Mock Data for Users
    const [users, setUsers] = useState([
        { id: 1, name: 'Amit Sharma', email: 'amit@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Priya Verma', email: 'priya.v@example.com', role: 'Student', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Rohan Das', email: 'rohan.d@example.com', role: 'Student', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Sneha Gupta', email: 'sneha.g@example.com', role: 'Editor', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', role: 'Student', status: 'Banned', avatar: 'https://i.pravatar.cc/150?u=5' },
    ]);

    // 2. Handle Delete
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">

                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">All Users</h1>
                        <p className="text-gray-400 mt-1">Manage your team members and students.</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200">
                        + Add New User
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        className="w-full md:w-1/3 bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5"
                    />
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-xl border border-gray-700 shadow-lg">
                    <table className="min-w-full bg-gray-800">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300 text-left text-xs uppercase tracking-wider">
                                <th className="py-4 px-6 font-semibold">User</th>
                                <th className="py-4 px-6 font-semibold">Role</th>
                                <th className="py-4 px-6 font-semibold">Status</th>
                                <th className="py-4 px-6 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-750 transition duration-150 hover:bg-gray-700/50">

                                    {/* User Column (Avatar + Name + Email) */}
                                    <td className="py-4 px-6 flex items-center gap-4">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="h-10 w-10 rounded-full object-cover border border-gray-600"
                                        />
                                        <div>
                                            <p className="font-medium text-white">{user.name}</p>
                                            <p className="text-sm text-gray-400">{user.email}</p>
                                        </div>
                                    </td>

                                    {/* Role Column */}
                                    <td className="py-4 px-6 text-gray-300">
                                        {user.role}
                                    </td>

                                    {/* Status Column with Badge */}
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${user.status === 'Active'
                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                            : user.status === 'Inactive'
                                                ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                            }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : user.status === 'Inactive' ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}></span>
                                            {user.status}
                                        </span>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button className="text-gray-400 hover:text-blue-400 transition" title="Edit">
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-gray-400 hover:text-red-500 transition"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {users.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No users found.
                        </div>
                    )}
                </div>

                {/* Pagination (Static Example) */}
                <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">
                    <span>Showing 1 to 5 of 5 entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 border border-gray-700">Previous</button>
                        <button className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 border border-gray-700">Next</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserPage;