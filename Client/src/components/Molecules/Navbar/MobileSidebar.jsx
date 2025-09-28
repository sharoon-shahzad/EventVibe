import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { User, SignOut, CalendarDots } from "@phosphor-icons/react";
import Button from "@/components/Atoms/Buttons/Button";

const MobileSidebar = ({ isOpen, onClose }) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  // Placeholder stats — replace with real data later
  const registeredEvents = 3;
  const attendedEvents = 2;

  if (!currentUser) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center text-xl font-bold text-indigo-700">
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{currentUser.name}</h3>
          <p className="text-xs text-gray-500">Welcome back!</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 p-4">
        <div className="bg-blue-50 p-2 rounded-md text-center">
          <span className="block text-sm font-medium text-blue-700">
            {registeredEvents}
          </span>
          <span className="text-xs text-blue-500">Registered</span>
        </div>
        <div className="bg-green-50 p-2 rounded-md text-center">
          <span className="block text-sm font-medium text-green-700">
            {attendedEvents}
          </span>
          <span className="text-xs text-green-500">Attended</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2"
          onClick={() => handleNavigate("/profile")}
        >
          <User size={18} className="mr-2" />
          View Profile
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2"
          onClick={() => handleNavigate("/my-events")}
        >
          <CalendarDots size={18} className="mr-2" />
          My Events
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2"
          onClick={() => handleNavigate("/my-registrations")}
        >
          <CalendarDots size={18} className="mr-2" />
          My Registrations
        </Button>

        <hr className="my-2 border-gray-200" />

        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2 text-red-600"
          onClick={() => {
            // Clear auth and redirect to login
            localStorage.removeItem("auth");
            window.location.href = "/auth"; // or use navigate after dispatching clearAuth
          }}
        >
          <SignOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>

      {/* Close Button */}
      <div className="absolute top-4 right-4">
        <Button variant="ghost" onClick={onClose}>
          ×
        </Button>
      </div>
    </div>
  );
};

export default MobileSidebar;
