import React from "react";
import { getIcon } from "@/utils/helpers/iconsHelper";

const IconContainer = ({
  icon,
  size = 12,
  className = "text-blue-600",
  containerSize = "w-6 h-6",
  containerClassName = "bg-blue-100 rounded-full",
}) => {
  const IconComponent = getIcon(icon);

  return (
    <div
      className={`${containerSize} ${containerClassName} flex items-center justify-center flex-shrink-0`}
    >
      <IconComponent size={size} className={className} />
    </div>
  );
};

export default IconContainer;
