import React, { useState, useRef } from 'react'
import { FaCloudUploadAlt, FaImage, FaTimes, FaCheck } from 'react-icons/fa'
import Layout from '../Layout/Layout';

const UploadMedia = () => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // Track the actual file
    const [isUploading, setIsUploading] = useState(false); // Track upload status

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Clean up old preview
            if (previewUrl) URL.revokeObjectURL(previewUrl);

            setPreviewUrl(URL.createObjectURL(file));
            setSelectedFile(file); // Save file for submission
        }
    };

    const handleRemoveImage = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = () => {
        if (!selectedFile) return;

        // Simulate API Upload
        setIsUploading(true);
        console.log("Uploading file:", selectedFile.name);

        setTimeout(() => {
            alert("File Uploaded Successfully!");
            setIsUploading(false);
            // Optional: Reset form after success
            handleRemoveImage();
        }, 2000);
    };

    return (
        <Layout>
            <div className='w-full bg-gray-900 p-6 rounded-lg'>

                {/* Main Content Area */}
                <div className='flex w-full h-72 gap-6 mb-6'>

                    {/* Left Side: File Input */}
                    <div className='w-1/3 h-full relative border-2 border-dashed border-gray-600 rounded-2xl hover:border-emerald-500 hover:bg-gray-800 transition-all group'>
                        <div className='absolute inset-0 flex flex-col justify-center items-center pointer-events-none'>
                            <FaCloudUploadAlt className='text-5xl text-gray-500 group-hover:text-emerald-500 transition-colors mb-3' />
                            <p className='text-gray-400 font-medium'>Drag & Drop or Click</p>
                            <p className='text-gray-600 text-xs mt-1'>Supports: JPG, PNG, WEBP</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type='file'
                            accept="image/*"
                            onChange={handleImageChange}
                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                        />
                    </div>

                    {/* Right Side: Preview */}
                    <div className='w-2/3 h-full bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden flex justify-center items-center relative group'>
                        {previewUrl ? (
                            <>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className='w-full h-full object-contain bg-black/20'
                                />
                                <button
                                    onClick={handleRemoveImage}
                                    className='absolute top-3 right-3 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm'
                                    title="Remove image"
                                >
                                    <FaTimes />
                                </button>
                            </>
                        ) : (
                            <div className='flex flex-col items-center text-gray-600'>
                                <FaImage className='text-5xl mb-3 opacity-30' />
                                <span className='opacity-50'>Image Preview</span>
                            </div>
                        )}
                    </div>

                </div>

                {/* Bottom Bar: Action Buttons */}
                <div className='flex justify-end items-center border-t border-gray-800 pt-4'>
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedFile || isUploading}
                        className={`
                            flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all
                            ${!selectedFile || isUploading
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/20'}
                        `}
                    >
                        {isUploading ? (
                            <>Processing...</>
                        ) : (
                            <>
                                <FaCloudUploadAlt className='text-lg' />
                                Upload to Cloud
                            </>
                        )}
                    </button>
                </div>

            </div>
        </Layout>
    )
}

export default UploadMedia;