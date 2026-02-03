import React, { useEffect, useState } from "react";
import { ChevronDown, FolderOpen, Plus } from "lucide-react";

const CategoryDropdown = ({ categoryValue, setCategoryValue }) => {
    const [open, setOpen] = useState(false);

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                console.log("category Loading....");
                
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/public-categories`
                    // {
                    //     headers: {
                    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
                    //     },
                    // }
                );
                const data = await res.json();
                console.log("category", data);
                 console.log("category Loaded");

                if (res.ok) setCategories(data?.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-gray-900/60 rounded-2xl">
            {/* Label */}
            <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                Category
            </label>

            <div className="relative">
                {/* Trigger */}
                <button
                    onClick={() => setOpen(!open)}
                    className={`
            w-full flex items-center justify-between px-4 py-3
            bg-gray-900 border border-gray-700 rounded-xl
            text-sm font-medium transition-all
            hover:border-emerald-500
            focus:outline-none focus:ring-2 focus:ring-emerald-500/50
            ${open ? "border-emerald-500 ring-2 ring-emerald-500/50" : ""}
          `}
                >
                    <span className={categoryValue ? "text-white" : "text-gray-500"}>
                        {categoryValue || "Select Category"}
                    </span>

                    <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300
              ${open ? "rotate-180 text-emerald-500" : "text-gray-500"}
            `}
                    />
                </button>

                {/* Dropdown */}
                {open && (
                    <div className="absolute z-50 mt-2 w-full bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {categories.length === 0 ? (
                            /* Empty State */
                            <div className="flex flex-col items-center p-6 text-center">
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mb-3">
                                    <FolderOpen size={20} className="text-gray-500" />
                                </div>
                                <p className="text-gray-400 text-sm mb-3">
                                    No categories found
                                </p>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-3 py-1.5
                  bg-emerald-500/10 text-emerald-500
                  hover:bg-emerald-500 hover:text-white
                  rounded-lg text-xs font-semibold transition"
                                >
                                    <Plus size={14} />
                                    Add New
                                </button>
                            </div>
                        ) : (
                            /* List */
                            <div className="max-h-60 overflow-y-auto py-1">
                                {categories.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setCategoryValue(item?.name)

                                            setOpen(false);
                                        }}
                                        className={`
                      w-full px-4 py-3 text-sm
                      flex items-center justify-between
                      transition-colors
                      ${categoryValue === item.name
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                            }
                    `}
                                    >
                                        {item.name}
                                        {categoryValue === item.name && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDropdown;
