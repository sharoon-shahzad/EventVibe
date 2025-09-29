import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import { useEventLogic } from "@/hooks/events/useEventLogic";
import { useAttendanceLogic } from "@/hooks/attendance/useAttendanceLogic";
import { getIcon } from "@/utils/helpers/iconsHelper";
import { LAYOUT_DASHBOARD, urls } from "@/utils/routes/route-paths";
import { UserRole } from "@/utils/enums/useRole";

const SideBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { events } = useEventLogic();
  const { eventAttendees } = useAttendanceLogic();
  const isAdmin = currentUser?.role === UserRole.admin;

  // Get icons
  const HomeIcon = getIcon("home");
  const CalendarIcon = getIcon("calendar");
  const UsersIcon = getIcon("profile");
  const PlusIcon = getIcon("plus");
  // Fallback if no user data
  const firstName = currentUser?.name?.split(" ")[0] || "User";

  // Calculate real-time stats based on role
  const getStats = () => {
    if (isAdmin) {
      // Admin stats
      const adminEvents =
        events?.filter((event) => event.createdBy === currentUser.id) || [];
      const totalAttendees = adminEvents.reduce(
        (total, event) => total + (event.registeredUsers?.length || 0),
        0
      );

      return {
        firstStat: adminEvents.length,
        firstLabel: "Events",
        secondStat: totalAttendees,
        secondLabel: "Attendees",
      };
    } else {
      // User stats
      const userRegisteredEvents =
        events?.filter((event) =>
          event.registeredUsers?.includes(currentUser.id)
        ) || [];

      const userAttendedEvents =
        eventAttendees?.filter(
          (attendee) =>
            attendee.userId === currentUser.id &&
            (attendee.isPresent || attendee.attended)
        ) || [];

      return {
        firstStat: userRegisteredEvents.length,
        firstLabel: "Registered",
        secondStat: userAttendedEvents.length,
        secondLabel: "Attended",
      };
    }
  };

  const { firstStat, firstLabel, secondStat, secondLabel } = getStats();

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

        {/* Real-time Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <span className="block text-sm font-semibold text-blue-700">
              {firstStat}
            </span>
            <span className="text-xs text-blue-600">{firstLabel}</span>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <span className="block text-sm font-semibold text-green-700">
              {secondStat}
            </span>
            <span className="text-xs text-green-600">{secondLabel}</span>
          </div>
        </div>

        {/* View Profile Button */}
        <Link
          to={`${LAYOUT_DASHBOARD}/${urls.Profile}`}
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
              <HomeIcon weight="fill" className="w-5 h-5 text-gray-500" />
              All Events
            </Link>
          </li>

          <li>
            <Link
              to={`${LAYOUT_DASHBOARD}/${urls.MyEvents}`}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <CalendarIcon weight="fill" className="w-5 h-5 text-gray-500" />
              My Events
            </Link>
          </li>

          {currentUser?.role === UserRole.admin && (
            <li>
              <Link
                to={`${LAYOUT_DASHBOARD}/${urls.CreateEvent}`}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <PlusIcon weight="fill" className="w-5 h-5 text-gray-500" />
                Create Event
              </Link>
            </li>
          )}
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
