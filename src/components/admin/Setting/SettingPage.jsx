import React, { useState } from "react";
import Layout from "../Layout/Layout";
// import Layout from "../Layout/Layout";

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        siteName: "Polytechub",
        adminEmail: "admin@polytechub.com",
        commentsEnabled: true,
        maintenanceMode: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSave = () => {
        alert("Settings saved successfully!");
        // Later: API call here
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-800 p-6">
                {/* Header */}
                <h1 className="text-2xl font-semibold text-gray-100 mb-6">
                    Settings
                </h1>

                {/* Settings Card */}
                <div className="max-w-3xl bg-gray-900 rounded-xl shadow-lg p-6 space-y-6">

                    {/* Site Settings */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-200 mb-4">
                            General Settings
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                    Site Name
                                </label>
                                <input
                                    type="text"
                                    name="siteName"
                                    value={settings.siteName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    name="adminEmail"
                                    value={settings.adminEmail}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Toggle Settings */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-200 mb-4">
                            Preferences
                        </h2>

                        <div className="space-y-4">
                            {/* Comments Toggle */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-300 font-medium">
                                        Enable Comments
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Allow users to comment on blogs
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    name="commentsEnabled"
                                    checked={settings.commentsEnabled}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-blue-600"
                                />
                            </div>

                            {/* Maintenance Mode */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-300 font-medium">
                                        Maintenance Mode
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Temporarily disable the website
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    name="maintenanceMode"
                                    checked={settings.maintenanceMode}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-red-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                        <button className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition">
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
