import React from "react";

const SelectComponent = ({
  label,
  name,
  value,
  onChange,
  required,
  children,
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-1">
          {label} {required && "*"}
        </label>
      )}

      <div
        className={`relative flex items-center rounded-xl shadow-sm border transition-all focus-within:ring-2 bg-transparent ${className}`}
        style={{ borderColor: "#9ca3af" }}
      >
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full py-3 px-4 text-sm rounded-md focus:outline-none bg-transparent transition-all pl-4 pr-4 appearance-none"
          style={{ borderColor: "#9ca3af" }}
        >
          {children}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute right-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectComponent;
