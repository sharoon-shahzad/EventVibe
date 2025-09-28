import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, clearAuth } from "@/store/slice/authSlice";
import { setSearchTerm } from "@/store/slice/eventSlice";
import { useNavigate } from "react-router-dom";
import { SignOutIcon } from "@phosphor-icons/react";
import InputComponent from "@/components/Atoms/Shared/Input";
import {
  LAYOUT_AUTH,
  LAYOUT_DASHBOARD,
  urls,
} from "@/utils/routes/route-paths";
import Button from "@/components/Atoms/Buttons/Button";
import MobileSidebar from "./MobileSidebar";
import { getIcon } from "@/utils/helpers/iconsHelper";

const TopNavBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentSearchTerm = useSelector((state) => state.event.searchTerm);
  const dispatch = useDispatch();

  const useRole = currentUser?.role;
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // icons
  const PlusIcon = getIcon("plus");
  const CalendarDotsIcon = getIcon("calendar");
  const UserIcon = getIcon("profile");

  // handler
  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("auth");
    navigate(LAYOUT_AUTH);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Left: Logo (desktop only) */}
        <div
          className="hidden lg:flex text-xl font-bold items-center gap-2 text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <CalendarDotsIcon weight="fill" size={24} />
          <span>Eventify</span>
        </div>

        {/* Mobile User Avatar */}
        <div className="lg:hidden">
          {currentUser ? (
            <button
              className="w-9 h-9 rounded-full bg-indigo-200 flex items-center justify-center font-semibold text-indigo-700"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              {currentUser?.name?.charAt(0).toUpperCase()}
            </button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(`${LAYOUT_AUTH}`)}
            >
              Login
            </Button>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-2">
          <InputComponent
            icon="search"
            type="text"
            placeholder="Search events..."
            className="w-full border-gray-300"
            value={currentSearchTerm} // Get value from Redux
            onChange={(e) => dispatch(setSearchTerm(e.target.value))} // Update Redux
          />
        </div>

        {/* Desktop User Dropdown */}
        <div className="relative hidden lg:block">
          {currentUser && (
            <>
              <button
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center font-semibold text-indigo-700 text-sm">
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
                <span>{currentUser?.name?.split(" ")[0]}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                  <ul className="text-sm text-gray-700">
                    <li
                      onClick={() => {
                        navigate("/profile");
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                      <UserIcon size={16} />
                      View Profile
                    </li>
                    <li
                      onClick={() => {
                        navigate("/my-events");
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      My Events
                    </li>
                    <li
                      onClick={() => {
                        navigate("/my-registrations");
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      My Registrations
                    </li>
                    <hr className="my-1" />
                    <li
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                      <SignOutIcon size={16} />
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Create Event */}
        {useRole === "admin" && (
          <Button
            className="flex gap-1"
            onClick={() => navigate(`${LAYOUT_DASHBOARD}/${urls.CreateEvent}`)}
            size={"md"}
          >
            <PlusIcon size={18} />
            <span className="hidden lg:flex">Create Event</span>
          </Button>
        )}
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </nav>
  );
};

export default TopNavBar;
