import React from "react";

const Card = ({
  children,
  heightAndWidth,
  rounded = "rounded-2xl",
  className = "",
  ...props
}) => {
  return (
    <div
      className={` 
        ${className}
        h-auto 
        p-3 sm:p-4 lg:p-6 
        px-4 sm:px-6 lg:px-10 
        bg-[#ffffff]
        ${rounded} 
        ${heightAndWidth} 
        shadow-2xl 
        drop-shadow-[0_4px_10px_rgba(255,255,255,0.2)]
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
