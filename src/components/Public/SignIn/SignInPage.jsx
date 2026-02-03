import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md"; // Lock icon password ke liye zyada natural lagta hai
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state add ki hai
    const navigate = useNavigate();
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    const loginSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.error("Email and Password are required");
        }

        setLoading(true);
        try {
            const { data } = await axios.post(
                `${VITE_API_URL}/login-with-password`,
                { email, password },
                { withCredentials: true }
            );

            toast.success(data.message || "Login successful");
            localStorage.setItem("token", data?.token)
            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        // Background ko thoda depth dene ke liye gradient add kiya hai
        <div className="w-full min-h-screen flex items-center justify-center bg-[#0f172a] text-gray-100 px-4">
            {/* Card width aur shadow ko improve kiya */}
            <div className="w-full max-w-md rounded-2xl p-8 bg-gray-900/50 border border-gray-800 shadow-2xl backdrop-blur-sm">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
                    <p className="text-gray-400 mt-2 text-sm">Please enter your details to sign in</p>
                </div>

                <form onSubmit={loginSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                        <div className="group w-full h-12 border flex items-center px-4 rounded-xl border-gray-700 bg-gray-800/50 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200 gap-3">
                            <MdEmail className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-500" />
                            <input
                                type="email"
                                className="w-full h-full bg-transparent outline-none text-sm placeholder:text-gray-500"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <Link
                                to="/forgot-password"
                                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className="group w-full h-12 border flex items-center px-4 rounded-xl border-gray-700 bg-gray-800/50 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200 gap-3">
                            <MdLock className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-500" />
                            <input
                                type="password"
                                className="w-full h-full bg-transparent outline-none text-sm placeholder:text-gray-500"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 mt-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>


            </div>
        </div>
    );
};

export default SignInPage;