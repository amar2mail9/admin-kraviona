import React from 'react'
import { BiLeftArrow } from 'react-icons/bi'

const PageNotFound = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div class="text-center text-white px-6">
                <h1 class="text-8xl font-extrabold text-rose-500">404</h1>
                <p class="text-2xl mt-4 font-semibold text-rose-200">Page Not Found</p>
                <p class="text-gray-400 mt-2">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>

                <div class="mt-6 flex justify-center gap-4">
                    <a href="/" class="px-6 py-3 flex items-center gap-2 bg-emerald-500 rounded-lg font-medium hover:bg-emerald-600 hover:scale-110 transition-all ease-in-out delay-200 duration-300">
                        <BiLeftArrow />   Go Home
                    </a>
                    <a href="/contact" class="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound