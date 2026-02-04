import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import JoditEditor from "jodit-react";
import {
  Image as ImageIcon,
  Save,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";

import CategoryDropdown from "./CategoryDropDown";
import StatusDropDown from "./StatusDropDown";
import Loader from "../../../Loader.jsx";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // ✅ description
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [loading, setLoading] = useState(false);

  const editorConfig = {
    readonly: false,
    height: 600,
    placeholder: "Start typing your article here...",
    toolbarSticky: false,

  };

  const submitBlog = async () => {
    // ✅ validation updated
    if (!title || !description || !content || !categoryValue || !statusValue) {
      toast.error("All required fields must be filled");
      return;
    }

    try {
      setLoading(true);

      // ✅ payload updated
      const payload = {
        title,
        description: description,
        content,
        category: categoryValue,
        status: statusValue,
        thumbnail,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/new-blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data);

        throw new Error(data.message || "Failed to create blog");
      }

      toast.success("Blog created successfully!");

      // ✅ reset
      setTitle("");
      setDescription("");
      setContent("");
      setThumbnail("");
      setCategoryValue("");
      setStatusValue("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Loader fullScreen text="Publishing..." />}

      <div className="max-w-7xl mx-auto pb-10">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Create Post</h1>
            <p className="text-gray-400 text-sm">Compose a new article</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={submitBlog}
              disabled={loading}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg flex items-center gap-2"
            >
              <Save size={18} />
              Save Draft
            </button>

            <button
              onClick={submitBlog}
              disabled={loading}
              className="px-4 py-2 bg-emerald-500 text-black rounded-lg flex items-center gap-2"
            >
              <Send size={18} />
              Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <input
              type="text"
              placeholder="Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 p-6 
                         text-3xl font-bold text-white rounded-2xl outline-none"
            />

            {/* ✅ Description */}
            <textarea
              placeholder="Short description (SEO & preview)…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-gray-900 border border-gray-700 p-4 
                         text-white rounded-2xl outline-none resize-none
                         placeholder-gray-400"
            />

            {/* Editor */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <JoditEditor
                value={content}
                config={editorConfig}
                onBlur={(v) => setContent(v)}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Thumbnail */}
            <div className="bg-gray-800 p-5 rounded-2xl space-y-3">
              <input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="Thumbnail Image URL"
                className="w-full bg-gray-900 p-3 rounded-xl text-white"
              />

              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Preview"
                  className="rounded-xl"
                  onError={() => setThumbnail("")}
                />
              )}
            </div>

            {/* Settings */}
            <div className="bg-gray-800 p-5 rounded-2xl space-y-3">
              <CategoryDropdown
                categoryValue={categoryValue}
                setCategoryValue={setCategoryValue}
              />

              <StatusDropDown
                statusValue={statusValue}
                setStatusValue={setStatusValue}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
