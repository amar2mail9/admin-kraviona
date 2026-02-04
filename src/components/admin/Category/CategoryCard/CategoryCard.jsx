import React from "react";
import {
  Folder,
  FileText,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  Clock,
} from "lucide-react";

const CategoryCard = ({
  name = "Category Name",
  description = "Short description of the category goes here.",
  count = 10,
  image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiCTCRF8VMxR63s2WjdXsdLipybRtkfjKTeA&s",
  slug,
  status = "Published",
}) => {
  const isPublished = status === "Published";

  return (
    <div
      className="
        group relative
        w-[300px] h-[200px]
        rounded-xl overflow-hidden
        shadow-xl
        cursor-pointer
        bg-gray-900
      "
    >
      {/* Background Image */}
      <img
        src={image}
        alt={name}
        className="
          w-full h-full object-cover
          transition-transform duration-500
          group-hover:scale-110
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />

      {/* Status Badge */}
      <div
        className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium
        bg-gray-900/80 backdrop-blur
        text-emerald-400
      "
      >
        {isPublished ? <CheckCircle size={12} /> : <Clock size={12} />}
        {status}
      </div>

      {/* Action Icons (Admin) */}
      <div
        className="
        absolute top-3 right-3
        flex gap-2
        opacity-0 group-hover:opacity-100
        transition
      "
      >
        <button className="p-1.5 rounded-md bg-gray-900/80 hover:bg-emerald-500/20 text-emerald-400">
          <Eye size={14} />
        </button>
        <button className="p-1.5 rounded-md bg-gray-900/80 hover:bg-blue-500/20 text-blue-400">
          <Edit3 size={14} />
        </button>
        <button className="p-1.5 rounded-md bg-gray-900/80 hover:bg-red-500/20 text-red-400">
          <Trash2 size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 p-4 space-y-1">
        <div className="flex items-center gap-2">
          <Folder className="text-emerald-400" size={16} />
          <h3 className="text-white text-lg font-semibold leading-tight">
            {name}
          </h3>
        </div>

        <p className="text-gray-300 text-xs line-clamp-2 flex gap-1 items-start">
          <FileText size={12} className="mt-0.5 text-gray-400" />
          {description}
        </p>

        <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-medium text-emerald-400">
          {count} posts
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
