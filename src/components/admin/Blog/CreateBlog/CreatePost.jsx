
import Layout from '../../Layout/Layout'
import { FaPlus, } from 'react-icons/fa'

import React, { useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
// import JoditBlogEditor from './TextEditor';

const CreatePost = () => {
    const [showImages, setShowImages] = useState(false)
    const [chooseFile, setChooseFile] = useState()
    const [imageURL, setImageURL] = useState(null)
    const mediaFiles = [
        { id: 1, name: 'banner-design.jpg', url: 'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg' },
        { id: 2, name: 'profile-pic.png', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
        { id: 3, name: 'hero-section.png', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80' },
        { id: 4, name: 'footer-bg.jpg', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80' },
        { id: 5, name: 'logo-transparent.png', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
        { id: 6, name: 'chart-graph.svg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
        { id: 1, name: 'banner-design.jpg', url: 'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg' },
        { id: 2, name: 'profile-pic.png', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
        { id: 3, name: 'hero-section.png', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80' },
        { id: 4, name: 'footer-bg.jpg', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80' },
        { id: 5, name: 'logo-transparent.png', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
        { id: 6, name: 'chart-graph.svg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
        { id: 1, name: 'banner-design.jpg', url: 'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg' },
        { id: 2, name: 'profile-pic.png', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
        { id: 3, name: 'hero-section.png', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80' },
        { id: 4, name: 'footer-bg.jpg', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80' },
        { id: 5, name: 'logo-transparent.png', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
        { id: 6, name: 'chart-graph.svg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    ]
    // editor
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start writing...',
        height: 400,

        style: {
            background: '#1f2937',   // gray-800
            color: '#e5e7eb',        // gray-200
        },

        toolbarAdaptive: false,
        toolbarSticky: false,

        theme: 'dark',

        uploader: {
            insertImageAsBase64URI: true
        }
    }), []);

    // category
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");

    const categories = {
        Technology: ["Web Development", "AI", "Mobile Apps"],
        Business: ["Marketing", "Finance", "Sales"],
        Education: ["Programming", "Design", "Exams"],
    };

    return (
        <Layout>
            <section className='w-full h-full '>
                <section className='mt-3 bg-gray-800  p-4 w-full border-gray-700 border rounded-lg'>
                    <label className='text-xl font-medium capitalize text-gray-300 ' >Create blog</label>

                    <div className='w-full my-3 bg-gray-900 p-4 rounded-2xl flex flex-col gap-4'>
                        <div className='flex flex-col justify-center gap-2'>
                            <label htmlFor="" className='text-lg text-gray-500'>Post Title</label>
                            <input type="text" placeholder='What is AI ?' className='border border-gray-600 outline-0    w-full h-10 rounded-md px-2 text-lg py-1 focus:border-0  focus:ring-emerald-400 transition focus:outline-none ease-in-out duration-100 focus:ring-2 delay-100 ' />
                        </div>
                        {/* image add */}
                        <div className='flex items-center gap-8'>
                            <button onClick={() => {
                                setShowImages(!showImages)
                            }} className=' flex bg-emerald-600  text-white px-6 py-2 gap-2 items-center rounded-lg '><FaPlus /> Image</button>

                            {
                                imageURL === null ? null : <div className='w-32 h-32 relative rounded-2xl'>
                                    <img src={imageURL} alt="" className='w-full h-full rounded-2xl' />
                                    <button onClick={() => setImageURL(null)} className='absolute top-2 cursor-pointer right-2 w-4 h-4 bg-rose-500 text-xs rounded-full text-red-50'>
                                        X</button>
                                </div>

                            }
                        </div>
                        {/* content section */}
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1}
                            onBlur={(newContent) => setContent(newContent)}
                            onChange={() => { }}
                        />

                        <div className="flex items-center justify-evenly ">

                            {/* Category */}
                            <div className="flex flex-col gap-1 w-3/12">
                                {/* <label className="text-sm text-gray-400">Category</label> */}
                                <select
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setSubCategory("");
                                    }}
                                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sub Category */}
                            <div className="flex flex-col gap-1 w-3/12">
                                {/* <label className="text-sm text-gray-400">Sub Category</label> */}
                                <select
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    disabled={!category}
                                    className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                                >
                                    <option value="">Select Sub Category</option>
                                    {category &&
                                        categories[category].map((sub) => (
                                            <option key={sub} value={sub}>
                                                {sub}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* seo part */}
                    {/* SEO Section */}
                    <div className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-6">

                        <h2 className="text-xl font-semibold text-white">
                            SEO Settings
                        </h2>

                        {/* Meta Title */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter meta title (max 60 characters)"
                                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        {/* Meta Description */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">
                                Meta Description
                            </label>
                            <textarea
                                rows="3"
                                placeholder="Enter meta description (max 160 characters)"
                                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        {/* SEO Keywords */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">
                                SEO Keywords
                            </label>
                            <input
                                type="text"
                                placeholder="keyword1, keyword2, keyword3"
                                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        {/* URL Slug */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">
                                URL Slug
                            </label>
                            <input
                                type="text"
                                placeholder="custom-url-slug"
                                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                    </div>
                    {/* button */}
                    {/* Action Buttons */}
                    <div className="w-full flex items-center justify-end gap-4 mt-8">

                        {/* Save as Draft */}
                        <button
                            type="button"
                            className="px-6 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
                        >
                            Save as Draft
                        </button>

                        {/* Publish */}
                        <button
                            type="button"
                            className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                        >
                            Publish
                        </button>

                    </div>

                </section>


                {/* choose image section */}
                {
                    showImages ? <div className='w-full h-full fixed top-0 z-50 flex items-center backdrop-blur-sm justify-center     p-5 rounded-2xl  border-gray-600 right-0  bg-gray-900/80 border'>
                        <div className='max-w-4xl   rounded-2xl p-4 bg-gray-800'>
                            <div className='max-w-3xl mx-auto mb-2'>
                                <input type="text" placeholder='search...' className='bg-gray-800 w-full py-2 px-4 border border-gray-700 rounded-md  focus:ring-1 focus:ring-emerald-500 focus:border-0 focus:outline-0' />
                            </div>

                            <div className='p-6 overflow-y-scroll no-scrollbar  h-[500px] bg-gray-900 grid grid-cols-5 gap-8'>

                                {
                                    mediaFiles.map((item, idx) => {
                                        return <div
                                            key={idx}
                                            onClick={() => {
                                                setImageURL(item.url)
                                                setShowImages(false)
                                            }}
                                            className='relative group cursor-pointer border border-transparent hover:border-emerald-500 w-32 h-32 rounded-lg overflow-hidden transition-all'
                                        >
                                            <img
                                                src={item.url}
                                                alt={item.name}
                                                className='w-32 h-32 object-cover bg-gray-900'
                                            />
                                            {/* Hover Overlay */}
                                            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity'>
                                                <FaPlus className='text-white text-2xl' />
                                            </div>
                                            {/* File Name */}
                                            <div className='bg-gray-900 p-2 text-xs text-gray-400 truncate'>
                                                {item.name}
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div> : null
                }
            </section>
        </Layout>
    )
}

export default CreatePost


