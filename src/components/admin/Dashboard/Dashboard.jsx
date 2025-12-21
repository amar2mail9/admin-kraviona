import React, { useState } from "react"
import Layout from "../Layout/Layout"
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Legend, CartesianGrid
} from "recharts"
import {
    FaUsers, FaBlog, FaLaptopCode, FaMobileAlt, FaChartLine, FaWallet
} from "react-icons/fa"

// ===== MOCK DATA (Backend Ready Structure) =====
const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"]

const analyticsData = {
    daily: {
        users: [
            { name: "Mon", visitors: 120, newSignups: 10 },
            { name: "Tue", visitors: 150, newSignups: 15 },
            { name: "Wed", visitors: 180, newSignups: 12 },
            { name: "Thu", visitors: 170, newSignups: 18 },
            { name: "Fri", visitors: 220, newSignups: 25 },
        ],
        devices: [
            { name: "Mobile", value: 60 },
            { name: "Desktop", value: 30 },
            { name: "Tablet", value: 10 },
        ],
        blogs: [
            { name: "Mon", views: 400, likes: 45 },
            { name: "Tue", views: 300, likes: 30 },
            { name: "Wed", views: 550, likes: 80 },
            { name: "Thu", views: 450, likes: 50 },
            { name: "Fri", views: 700, likes: 100 },
        ],
        categories: [
            { name: "Tech", value: 50 },
            { name: "Design", value: 30 },
            { name: "Tutorials", value: 20 },
        ],
        services: [
            { name: "Mon", revenue: 1000, projects: 1 },
            { name: "Tue", revenue: 1500, projects: 2 },
            { name: "Wed", revenue: 800, projects: 1 },
            { name: "Thu", revenue: 2000, projects: 3 },
            { name: "Fri", revenue: 2500, projects: 2 },
        ],
    },
    weekly: {
        users: [
            { name: "Week 1", visitors: 800, newSignups: 90 },
            { name: "Week 2", visitors: 1200, newSignups: 140 },
            { name: "Week 3", visitors: 1500, newSignups: 200 },
            { name: "Week 4", visitors: 1800, newSignups: 250 },
        ],
        devices: [
            { name: "Mobile", value: 55 },
            { name: "Desktop", value: 40 },
            { name: "Tablet", value: 5 },
        ],
        blogs: [
            { name: "Week 1", views: 2000, likes: 300 },
            { name: "Week 2", views: 3500, likes: 450 },
            { name: "Week 3", views: 4200, likes: 600 },
            { name: "Week 4", views: 5000, likes: 800 },
        ],
        categories: [
            { name: "Tech", value: 60 },
            { name: "Design", value: 25 },
            { name: "Tutorials", value: 15 },
        ],
        services: [
            { name: "Week 1", revenue: 5000, projects: 4 },
            { name: "Week 2", revenue: 7500, projects: 6 },
            { name: "Week 3", revenue: 12000, projects: 8 },
            { name: "Week 4", revenue: 15000, projects: 10 },
        ],
    },
    monthly: {
        users: [
            { name: "Jan", visitors: 3000, newSignups: 400 },
            { name: "Feb", visitors: 4500, newSignups: 550 },
            { name: "Mar", visitors: 5000, newSignups: 700 },
            { name: "Apr", visitors: 6500, newSignups: 900 },
        ],
        devices: [
            { name: "Mobile", value: 50 },
            { name: "Desktop", value: 45 },
            { name: "Tablet", value: 5 },
        ],
        blogs: [
            { name: "Jan", views: 12000, likes: 1500 },
            { name: "Feb", views: 18000, likes: 2200 },
            { name: "Mar", views: 25000, likes: 3000 },
            { name: "Apr", views: 30000, likes: 4500 },
        ],
        categories: [
            { name: "Tech", value: 40 },
            { name: "Design", value: 40 },
            { name: "Tutorials", value: 20 },
        ],
        services: [
            { name: "Jan", revenue: 20000, projects: 12 },
            { name: "Feb", revenue: 35000, projects: 18 },
            { name: "Mar", revenue: 42000, projects: 22 },
            { name: "Apr", revenue: 55000, projects: 30 },
        ],
    },
}

const Dashboard = () => {
    const [filter, setFilter] = useState("weekly")
    const data = analyticsData[filter]

    return (
        <Layout>
            <div className="max-w-7xl mx-auto pb-10">

                {/* ===== Header & Filter ===== */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-wide">
                            <span className="text-emerald-400">Kraviona</span> Analytics
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Comprehensive tracking for Users, Blogs, and Services.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-1.5 rounded-xl flex gap-1 shadow-lg">
                        {["daily", "weekly", "monthly"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300
                                ${filter === type
                                        ? "bg-emerald-500 text-black shadow-md"
                                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ===== KPI Overview Cards ===== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <KpiCard icon={<FaUsers />} title="Active Users" value="2,450" sub="+12% vs last period" color="text-emerald-400" />
                    <KpiCard icon={<FaBlog />} title="Blog Views" value="45.2K" sub="+8% vs last period" color="text-blue-400" />
                    <KpiCard icon={<FaChartLine />} title="Total Revenue" value="$12,500" sub="+24% vs last period" color="text-purple-400" />
                    <KpiCard icon={<FaLaptopCode />} title="Active Projects" value="14" sub="3 delivered this week" color="text-orange-400" />
                </div>

                {/* ========================================= */}
                {/* SECTION 1: USER ANALYTICS */}
                {/* ========================================= */}
                <h3 className="text-xl font-bold text-gray-200 mb-4 border-l-4 border-emerald-500 pl-3">
                    User Analytics
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

                    {/* CHART: User Traffic & Signups */}
                    <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700/50">
                        <h2 className="text-gray-100 font-semibold mb-6 flex items-center gap-2">
                            <FaUsers className="text-emerald-400" /> User Traffic Flow
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={data.users}>
                                <defs>
                                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#34D399" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis dataKey="name" stroke="#9CA3AF" axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#9CA3AF" axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px", color: "#fff" }} />
                                <Area type="monotone" dataKey="visitors" stroke="#34D399" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                                <Area type="monotone" dataKey="newSignups" stroke="#60A5FA" strokeWidth={3} fillOpacity={0} />
                                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* CHART: Device Distribution */}
                    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700/50">
                        <h2 className="text-gray-100 font-semibold mb-6 flex items-center gap-2">
                            <FaMobileAlt className="text-orange-400" /> Device Usage
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data.devices}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.devices.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px" }} />
                                <Legend wrapperStyle={{ paddingTop: "10px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                {/* ========================================= */}
                {/* SECTION 2: BLOG & CONTENT ANALYTICS */}
                {/* ========================================= */}
                <h3 className="text-xl font-bold text-gray-200 mb-4 border-l-4 border-blue-500 pl-3">
                    Content Intelligence
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

                    {/* CHART: Blog Engagement */}
                    <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700/50">
                        <h2 className="text-gray-100 font-semibold mb-6 flex items-center gap-2">
                            <FaBlog className="text-blue-400" /> Views vs. Likes
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.blogs}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis dataKey="name" stroke="#9CA3AF" axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#9CA3AF" axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#374151', opacity: 0.4 }} contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px" }} />
                                <Bar dataKey="views" fill="#60A5FA" radius={[4, 4, 0, 0]} barSize={40} />
                                <Bar dataKey="likes" fill="#A78BFA" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* CHART: Top Categories */}
                    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700/50">
                        <h2 className="text-gray-100 font-semibold mb-6">Popular Categories</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data.categories}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    labelLine={false}
                                >
                                    {data.categories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none" }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                {/* ========================================= */}
                {/* SECTION 3: SERVICES & REVENUE */}
                {/* ========================================= */}
                <h3 className="text-xl font-bold text-gray-200 mb-4 border-l-4 border-purple-500 pl-3">
                    Services & Revenue
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* CHART: Revenue Trend */}
                    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700/50">
                        <h2 className="text-gray-100 font-semibold mb-6 flex items-center gap-2">
                            <FaWallet className="text-purple-400" /> Revenue Growth ($)
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.services}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis dataKey="name" stroke="#9CA3AF" axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#9CA3AF" axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px" }} />
                                <Line type="monotone" dataKey="revenue" stroke="#A78BFA" strokeWidth={4} dot={{ r: 4, fill: '#A78BFA' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* CHART: Project Completions */}
                    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700/50">
                        <h2 className="text-gray-100 font-semibold mb-6 flex items-center gap-2">
                            <FaLaptopCode className="text-pink-400" /> Projects Delivered
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.services} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                                <XAxis type="number" stroke="#9CA3AF" hide />
                                <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={60} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: "#1F2937", border: "none" }} />
                                <Bar dataKey="projects" fill="#F472B6" radius={[0, 4, 4, 0]} barSize={30}>
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default Dashboard

/* ===== Reusable KPI Card Component ===== */
const KpiCard = ({ icon, title, value, sub, color }) => {
    return (
        <div className="bg-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-gray-700/30 hover:border-gray-600 transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-400 text-sm font-medium">{title}</p>
                    <h2 className="text-3xl font-bold text-white mt-2">{value}</h2>
                </div>
                <div className={`p-3 rounded-lg bg-gray-700/50 text-2xl ${color}`}>
                    {icon}
                </div>
            </div>
            {sub && <p className="text-gray-500 text-xs mt-4 border-t border-gray-700 pt-3">{sub}</p>}
        </div>
    )
}