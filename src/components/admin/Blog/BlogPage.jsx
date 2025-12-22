import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import Layout from '../Layout/Layout'
import BlogTables from './BlogTables'

const BlogPage = () => {
    return (
        <Layout>
            <div className='w-full '>


                {/* blog preview section / table*/}
                <BlogTables />
            </div>
        </Layout>
    )
}

export default BlogPage