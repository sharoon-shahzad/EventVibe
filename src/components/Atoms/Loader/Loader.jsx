import React from "react";

const Loader = ({ isLoading = true }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
        style={{ width: "40px", height: "40px" }}
      ></div>
    </div>
  );
};

export default Loader;
