// src/components/Molecules/SideBar/SideBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";

const SideBar = () => {
  const currentUser = useSelector(selectCurrentUser);

  // Fallback if no user data
  const firstName = currentUser?.name?.split(" ")[0] || "User";
  const registeredEvents = 3; // Placeholder
  const attendedEvents = 2; // Placeholder

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 shadow-sm overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{firstName}</h3>
            <p className="text-xs text-gray-500">Welcome back!</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <span className="block text-sm font-semibold text-blue-700">
              {registeredEvents}
            </span>
            <span className="text-xs text-blue-600">Registered</span>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <span className="block text-sm font-semibold text-green-700">
              {attendedEvents}
            </span>
            <span className="text-xs text-green-600">Attended</span>
          </div>
        </div>

        {/* View Profile Button */}
        <Link
          to="/profile"
          className="block w-full text-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors border border-gray-300"
        >
          View Profile
        </Link>
      </div>

      {/* Navigation Items - This will scroll if content overflows */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                />
              </svg>
              All Events
            </Link>
          </li>
          <li>
            <Link
              to="/my-events"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              My Events
            </Link>
          </li>
          <li>
            <Link
              to="/create-event"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Event
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
          Settings
        </button>
      </div>
    </div>
  );
};

export default SideBar;
