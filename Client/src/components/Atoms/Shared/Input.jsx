import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getIcon } from "@/utils/helpers/iconsHelper";

const InputComponent = ({
  type = "text",
  icon: iconName,
  className = "",
  label,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = iconName ? getIcon(iconName) : null;

  const inputType = type === "password" && showPassword ? "text" : type;

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
        {Icon && (
          <div className="absolute left-3 text-gray-500 hover:text-gray-700 transition-colors">
            <Icon size={20} />
          </div>
        )}

        <input
          type={inputType}
          className={`w-full py-3 px-4 text-sm rounded-md focus:outline-none bg-transparent transition-all ${
            Icon ? "pl-10" : "pl-4"
          } ${type === "password" ? "pr-12" : "pr-4"}`}
          style={{ borderColor: "#9ca3af" }}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-50 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
