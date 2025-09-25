import React from "react";

const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  maxLength, // char count => parent can send it
  ...props
}) => {
  const charCount = value?.length || 0;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-1">
          {label} {required && "*"}
        </label>
      )}

      <div
        className={`relative flex flex-col rounded-xl shadow-sm border transition-all focus-within:ring-2 bg-transparent ${className}`}
        style={{ borderColor: "#9ca3af" }}
      >
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full py-3 px-4 text-sm rounded-md focus:outline-none bg-transparent transition-all"
          rows={4}
          maxLength={maxLength}
          {...props}
        />

        {/* Always show counter */}
        <div className="flex justify-end px-2 pb-1 text-xs text-gray-400">
          {charCount}
          {maxLength ? ` / ${maxLength}` : ""}
        </div>
      </div>
    </div>
  );
};

export default Textarea;
