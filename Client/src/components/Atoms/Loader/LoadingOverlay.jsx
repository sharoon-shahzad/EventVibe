import React from "react";

const LoadingOverlay = ({ isLoading, children }) => {
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex items-center justify-center rounded-lg">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-blue-500 border-l-blue-500 border-b-blue-500 border-r-white"></div>
        </div>
      )}
      <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
        {children}
      </div>
    </div>
  );
};

export default LoadingOverlay;
