import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdEmail, MdShieldMoon } from 'react-icons/md'
import { RiAdminFill } from 'react-icons/ri'

export const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState('')

    return (
        <div className="w-full h-screen flex items-center justify-center flex-col bg-gray-900">

            {/* Brand Header */}
            <div className="mb-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center">
                    <img
                        src="/favicon.ico"
                        alt="Kraviona logo"
                        className="w-10 h-10"
                    />
                </div>

                <div className="leading-tight">
                    <p className="text-xl font-semibold text-white">
                        Kraviona
                    </p>
                    <small className="text-gray-400">
                        Web Developer
                    </small>
                </div>
            </div>

            {/* Login Card */}
            <div className="max-w-md w-full bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">

                {/* Card Header */}
                <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-700 flex items-center justify-center mb-3">
                        <RiAdminFill className="w-10 h-10 text-gray-300" />
                    </div>
                    <h1 className="text-2xl font-semibold text-white">
                        Admin Login
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Sign in to access your dashboard
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5">

                    {/* Email */}
                    <div className="flex items-center h-12 bg-gray-900 border border-gray-600 rounded-md px-3 focus-within:border-emerald-500 transition-colors duration-200">
                        <MdEmail className="text-gray-400 text-xl" />
                        <input
                            type="email"
                            aria-label="Email address"
                            placeholder="example@gmail.com"
                            className="w-full bg-transparent outline-none px-3 text-gray-200 placeholder-gray-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative flex items-center h-12 bg-gray-900 border border-gray-600 rounded-md px-3 focus-within:border-emerald-500 transition-colors duration-200">
                        <MdShieldMoon className="text-gray-400 text-xl" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            aria-label="Password"
                            placeholder="••••••••••"
                            className="w-full bg-transparent outline-none px-3 text-gray-200 placeholder-gray-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 text-xl"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? (
                                <FaEye className="text-rose-400" />
                            ) : (
                                <FaEyeSlash className="text-emerald-400" />
                            )}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="
              w-full h-12 bg-emerald-600
              hover:bg-emerald-700
              active:scale-[0.98]
              transition-all duration-150
              rounded-md font-medium text-white
            "
                    >
                        Sign In
                    </button>

                </form>
            </div>
        </div>
    )
}
