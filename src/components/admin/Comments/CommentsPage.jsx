import React, { useState } from "react";
import Layout from "../Layout/Layout";

const CommentsPage = () => {
    const [comments, setComments] = useState([
        { id: 101, user: "Rahul Kumar", content: "Great product, love it!", status: "Approved", date: "2025-10-24" },
        { id: 102, user: "Anjali Singh", content: "Delivery was late.", status: "Pending", date: "2025-10-25" },
        { id: 103, user: "Spammer123", content: "Click this link for free money!", status: "Pending", date: "2025-10-26" },
    ]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            setComments(comments.filter(c => c.id !== id));
        }
    };

    const handleApprove = (id) => {
        setComments(
            comments.map(c =>
                c.id === id ? { ...c, status: "Approved" } : c
            )
        );
    };

    return (
        <Layout>
            <div className="min-h-full mt-3">
                {/* Header */}
                <h2 className="text-2xl font-semibold text-gray-100 mb-6">
                    Admin Dashboard: Manage Comments
                </h2>

                {/* Table Container */}
                <div className="bg-gray-900 rounded-lg shadow-lg overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-700 text-gray-100 text-left">
                                <th className="px-4 py-3 text-sm font-semibold">ID</th>
                                <th className="px-4 py-3 text-sm font-semibold">User</th>
                                <th className="px-4 py-3 text-sm font-semibold">Comment</th>
                                <th className="px-4 py-3 text-sm font-semibold">Date</th>
                                <th className="px-4 py-3 text-sm font-semibold">Status</th>
                                <th className="px-4 py-3 text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {comments.map(comment => (
                                <tr
                                    key={comment.id}
                                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                                >
                                    <td className="px-4 py-3 text-sm text-gray-300">
                                        {comment.id}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-200">
                                        {comment.user}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-300">
                                        {comment.content}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-300">
                                        {comment.date}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${comment.status === "Approved"
                                                    ? "bg-green-800 text-green-200"
                                                    : "bg-amber-800 text-amber-200"
                                                }`}
                                        >
                                            {comment.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 flex gap-2">
                                        {comment.status === "Pending" && (
                                            <button
                                                onClick={() => handleApprove(comment.id)}
                                                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(comment.id)}
                                            className="px-3 py-1 text-sm bg-red-700 hover:bg-red-800 text-white rounded transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {comments.length === 0 && (
                        <p className="text-center py-6 text-gray-400">
                            No comments found.
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CommentsPage;
