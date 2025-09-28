import React, { useState } from "react";
import { getIcon } from "@/utils/helpers/iconsHelper";

const FallbackImage = ({
  src,
  alt,
  className = "",
  fallbackText = "No image available",
  fallbackIcon = "broken",
  fallbackIconSize = 48,
  fallbackIconWeight = "light",
}) => {
  const [imageError, setImageError] = useState(false);
  const FallbackIcon = getIcon(fallbackIcon);

  return (
    <div className={`relative ${className}`}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            setImageError(true);
          }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
          <FallbackIcon
            size={fallbackIconSize}
            weight={fallbackIconWeight}
            className="mb-2"
          />
          <span className="text-sm">{fallbackText}</span>
        </div>
      )}
    </div>
  );
};

export default FallbackImage;
