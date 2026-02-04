import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { PlusCircleIcon, Search } from "lucide-react";
import CategoryCard from "./CategoryCard/CategoryCard";
import Loader from "../../Loader";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/private-categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const data = await res.json();

        if (res.ok) {
          setCategories(data.data || []);
        }
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* Search Filter */
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()),
  );

  /* Loader */
  if (loading) {
    return (
      <Layout>
        <div className="w-full h-full flex items-center justify-center bg-gray-950/50">
          <Loader />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 w-[90%] mx-auto h-full">
        {/* --- Top Section --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div
            className="
            w-full max-w-md
            bg-gray-950/60
            border border-gray-700
            rounded-lg px-4 py-2.5
            flex items-center gap-3
            transition
            focus-within:border-emerald-500
            focus-within:ring-2 focus-within:ring-emerald-500/20
          "
          >
            <Search className="text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                flex-1 bg-transparent
                text-gray-200
                placeholder-gray-500
                outline-none text-sm
              "
            />
          </div>

          {/* Add Category */}
          <Link
            to="add"
            className="
              bg-emerald-600 hover:bg-emerald-700
              text-white font-medium
              flex items-center gap-2
              px-6 py-2.5 rounded-lg
              transition shadow-md
            "
          >
            <PlusCircleIcon size={20} />
            <span>Add Category</span>
          </Link>
        </div>

        {/* --- Category Grid --- */}
        {filteredCategories.length === 0 ? (
          <p className="text-gray-400 text-center mt-20">No categories found</p>
        ) : (
          <div
            className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3
            gap-6
          "
          >
            {filteredCategories.map((cat) => (
              <CategoryCard
                key={cat._id}
                name={cat.name}
                description={cat.description}
                count={cat.blogs.length || 0}
                image={cat.image}
                slug={cat.slug}
                status={cat.status}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
