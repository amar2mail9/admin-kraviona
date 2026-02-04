import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import required for navigation
import { toast } from "react-hot-toast"; // Ensure you have this installed
import { Save, ImagePlus, Loader2, ArrowLeft } from "lucide-react";
import Layout from "../../Layout/Layout";

const CreateCategory = () => {
  const navigate = useNavigate(); // Initialize hook
  const [isLoading, setIsLoading] = useState(false); // Loading state for better UX

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Published",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      toast.error("Category name and description are required");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // NOTE: Append the specific endpoint to your Base URL
      const res = await fetch(`${import.meta.env.VITE_API_URL}/new-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          featuredImage: formData.image, // Ensure backend expects 'featuredImage'
          status: formData.status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create category");
      }

      toast.success("Category created successfully 🚀");

      // Reset form
      setFormData({
        name: "",
        description: "",
        status: "Published",
        image: "",
      });

      // Redirect to category list
      navigate("/category"); // Make sure this route exists
    } catch (error) {
      console.error("Create category error:", error);
      toast.error(error.message || "Server error. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-screen py-10 px-4">
        {/* Back Button */}
        <div className="max-w-2xl mx-auto mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-emerald-400 transition-colors text-sm"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Categories
          </button>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-900/70 border border-gray-800 rounded-xl p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-800 pb-4">
            Create New Category
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category Name */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Web Development"
                className="
                  w-full px-4 py-2.5 rounded-lg
                  bg-gray-950/70 border border-gray-700
                  text-gray-200 text-sm
                  outline-none
                  focus:border-emerald-500
                  focus:ring-2 focus:ring-emerald-500/20
                  transition-all
                "
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Short description about this category..."
                className="
                  w-full px-4 py-2.5 rounded-lg
                  bg-gray-950/70 border border-gray-700
                  text-gray-200 text-sm
                  outline-none resize-none
                  focus:border-emerald-500
                  focus:ring-2 focus:ring-emerald-500/20
                  transition-all
                "
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Category Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="
                    flex-1 px-4 py-2.5 rounded-lg
                    bg-gray-950/70 border border-gray-700
                    text-gray-200 text-sm
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2 focus:ring-emerald-500/20
                    transition-all
                  "
                />
                <div className="px-3 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-400">
                  <ImagePlus size={20} />
                </div>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="mt-3 relative group">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-40 w-full object-cover rounded-lg border border-gray-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="
                  w-full px-4 py-2.5 rounded-lg
                  bg-gray-950/70 border border-gray-700
                  text-gray-200 text-sm
                  outline-none
                  focus:border-emerald-500
                  focus:ring-2 focus:ring-emerald-500/20
                  cursor-pointer
                "
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full mt-6
                bg-emerald-600 hover:bg-emerald-500
                disabled:bg-emerald-600/50 disabled:cursor-not-allowed
                text-white font-medium
                py-2.5 rounded-lg
                flex items-center justify-center gap-2
                transition-all shadow-lg shadow-emerald-900/20
              "
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Create Category
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
