import React from "react";
import Layout from "../Layout/Layout";

const DraftPage = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-900 p-6">

                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-white">
                        Drafts
                    </h1>


                </div>

                {/* Draft List */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">

                    {/* Table Header */}
                    <div className="grid grid-cols-5 gap-4 px-4 py-3 text-sm text-gray-400 border-b border-gray-700">
                        <span>Title</span>
                        <span>Category</span>
                        <span>Last Edited</span>
                        <span>Status</span>
                        <span className="text-right">Actions</span>
                    </div>

                    {/* Draft Item */}
                    <div className="grid grid-cols-5 gap-4 px-4 py-4 text-sm text-gray-200 hover:bg-gray-700 transition">
                        <span className="font-medium">
                            How to Learn React Faster
                        </span>
                        <span>Technology</span>
                        <span>24 Dec 2025</span>
                        <span className="text-yellow-400">
                            Draft
                        </span>
                        <span className="flex justify-end gap-3">
                            <button className="text-emerald-400 hover:underline">
                                Edit
                            </button>
                            <button className="text-red-400 hover:underline">
                                Delete
                            </button>
                        </span>
                    </div>

                    {/* Empty State (Optional UI) */}
                    <div className="px-4 py-10 text-center text-gray-500">
                        No drafts available
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default DraftPage;
