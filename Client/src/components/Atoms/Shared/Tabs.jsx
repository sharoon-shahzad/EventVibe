import React, { useState } from "react";
import Button from "../Buttons/Button";

const Tabs = ({ tabs, className = "" }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div className="flex justify-evenly items-center border-b border-gray-200 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative px-6 py-3 font-medium text-sm transition-all duration-200 ${
              activeTab === index
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.tabName}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-opacity duration-300">
        {tabs[activeTab]?.component}
      </div>
    </div>
  );
};

export default Tabs;
