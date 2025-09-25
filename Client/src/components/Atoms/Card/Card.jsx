import React from "react";

const Card = ({ children, heightAndWidth, rounded = "rounded-2xl" }) => {
  return (
    <div
      className={`
        h-auto 
        p-3 sm:p-4 lg:p-6 
        px-4 sm:px-6 lg:px-10 
        ${rounded} 
        ${heightAndWidth} 
        shadow-2xl 
        drop-shadow-[0_4px_10px_rgba(255,255,255,0.2)]
      `}
    >
      {children}
    </div>
  );
};

export default Card;
