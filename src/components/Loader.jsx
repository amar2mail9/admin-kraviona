import React from "react";

const Loader = ({
    size = "md",          // sm | md | lg
    color = "emerald",    // emerald | white | gray | black
    fullScreen = false,   // true => full page loader
    text = "",            // optional text
}) => {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-4",
        lg: "w-14 h-14 border-4",
    };

    const colorClasses = {
        emerald: "border-emerald-500 border-t-transparent",
        white: "border-white border-t-transparent",
        gray: "border-gray-400 border-t-transparent",
        black: "border-black border-t-transparent",
    };

    const spinner = (
        <div className="flex flex-col items-center gap-2">
            <div
                className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
            />
            {text && <span className="text-sm text-gray-400">{text}</span>}
        </div>
    );

    // Full screen loader
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default Loader;
