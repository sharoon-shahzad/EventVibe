import React, { useState, useEffect } from "react";
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
import SideBar from "./SideBar";
import { getIcon } from "@/utils/helpers/iconsHelper";

const TopNavBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentSearchTerm = useSelector((state) => state.event.searchTerm);
  const dispatch = useDispatch();

  const useRole = currentUser?.role;
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // handle body scroll when sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileSidebarOpen]);

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
        {/* Logo (desktop only) */}
        <div
          className="hidden lg:flex text-xl font-bold items-center gap-2 text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <CalendarDotsIcon weight="fill" size={24} />
          <span>Eventify</span>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="w-9 h-9 rounded-full bg-indigo-200 flex items-center justify-center font-semibold text-indigo-700"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-2">
          <InputComponent
            icon="search"
            type="text"
            placeholder="Search events..."
            className="w-full border-gray-300"
            value={currentSearchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
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
                        navigate(`${LAYOUT_DASHBOARD}/${urls.Profile}`);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                      <UserIcon size={16} />
                      View Profile
                    </li>
                    {useRole === "admin" && (
                      <li
                        onClick={() => {
                          navigate("/my-events");
                          setDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      >
                        <CalendarDotsIcon size={16} />
                        My Events
                      </li>
                    )}

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

      {/* Desktop Sidebar as Mobile Overlay with Slide Animation */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop with reduced opacity */}
          <div
            className="absolute inset-0 bg-[#00000094] transition-opacity duration-300 ease-in-out"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Sidebar with slide animation */}
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl z-10 transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <SideBar />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNavBar;
