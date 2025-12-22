import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import Layout from '../Layout/Layout'

const BlogPage = () => {
    return (
        <Layout>
            <div>
                {/* blog add section */}
                <div className='flex justify-between items-center'>
                    <h1>Blog Page</h1>
                    <button className='bg-emerald-500 px-6 py-1 flex items-center w-fit gap-2 rounded-md'> <FaPlus /> <span>Add</span> </button>
                </div>
                {/* blog preview section / table*/}
            </div>
        </Layout>
    )
}

export default BlogPage