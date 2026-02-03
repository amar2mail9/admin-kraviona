import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const StatusDropDown = ({ statusValue, setStatusValue }) => {
  const [open, setOpen] = useState(false);

  const statuses = [
    { name: "Published" },
    { name: "Draft" },
    { name: "Private" },
    { name: "Archived" },
  ];

  return (
    <div className="w-full max-w-md p-4 bg-gray-900/60 rounded-2xl">
      {/* Label */}
      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
        Status
      </label>

      <div className="relative">
        {/* Trigger */}
        <button
          type="button"
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
          <span className={statusValue ? "text-white" : "text-gray-500"}>
            {statusValue || "Select Status"}
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
            <div className="py-1">
              {statuses.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setStatusValue(item.name);
                    setOpen(false);
                  }}
                  className={`
                    w-full px-4 py-3 text-sm
                    flex items-center justify-between
                    transition-colors
                    ${
                      statusValue === item.name
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                >
                  {item.name}
                  {statusValue === item.name && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusDropDown;
