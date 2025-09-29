import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import { useEventLogic } from "@/hooks/events/useEventLogic";
import { useAttendanceLogic } from "@/hooks/attendance/useAttendanceLogic";
import { useEventFilterLogic } from "@/hooks/events/useEventFilterLogic";
import { H3 } from "@/components/Atoms/Shared/headings";
import { getIcon } from "@/utils/helpers/iconsHelper";
import { useNavigate } from "react-router-dom";
import { LAYOUT_DASHBOARD, urls } from "@/utils/routes/route-paths";
import UserProfileDashboard from "@/components/Molecules/Home/UserProfileDashboard";

const AdminUI = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { events } = useEventLogic();
  const { eventAttendees } = useAttendanceLogic();
  const navigate = useNavigate();

  const {
    filteredEvents: userCreatedEvents,
    activeEvents,
    passedEvents,
  } = useEventFilterLogic(events, currentUser, "created");

  const CalendarIcon = getIcon("calendar");
  const CheckIcon = getIcon("check");
  const UsersIcon = getIcon("users");
  const UserIcon = getIcon("profile");

  const adminStats = {
    created: userCreatedEvents.length,
    active: activeEvents.length,
    passed: passedEvents.length,
    totalAttendees: userCreatedEvents.reduce(
      (total, event) => total + (event.registeredUsers?.length || 0),
      0
    ),
  };

  const handleEventClick = (eventId) => {
    navigate(`${LAYOUT_DASHBOARD}/${urls.EventDetail.replace(":id", eventId)}`);
  };

  const adminTabs = [
    {
      tabName: "Active",
      component: (
        <div className="space-y-4">
          {activeEvents.length > 0 ? (
            <div className="space-y-3">
              {activeEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleEventClick(event.id)}
                >
                  <div className="flex-1 mb-2 sm:mb-0">
                    <h4 className="font-medium text-gray-900 hover:text-blue-600">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} •{" "}
                      {event.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      {event.registeredUsers?.length || 0} registered
                    </p>
                  </div>
                  <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon weight="fill" />
              </div>
              <H3 className="text-lg font-semibold text-gray-900 mb-2">
                No Active Events
              </H3>
              <p className="text-gray-600">
                You don't have any upcoming events.
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      tabName: "Passed",
      component: (
        <div className="space-y-4">
          {passedEvents.length > 0 ? (
            <div className="space-y-3">
              {passedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleEventClick(event.id)}
                >
                  <div className="flex-1 mb-2 sm:mb-0">
                    <h4 className="font-medium text-gray-900 hover:text-blue-600">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} •{" "}
                      {event.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      {event.registeredUsers?.length || 0} registered
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full">
                    Passed
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <CheckIcon weight="fill" />
              </div>
              <H3 className="text-lg font-semibold text-gray-900 mb-2">
                No Passed Events
              </H3>
              <p className="text-gray-600">You don't have any past events.</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  const quickActions = [
    {
      text: "Create New Event",
      variant: "primary",
      onClick: () => navigate(`${LAYOUT_DASHBOARD}/${urls.CreateEvent}`),
    },
    {
      text: "Manage Events",
      variant: "secondary",
      onClick: () => navigate(`${LAYOUT_DASHBOARD}/${urls.MyEvents}`),
    },
  ];

  return (
    <UserProfileDashboard
      role="admin"
      stats={adminStats}
      tabs={adminTabs}
      quickActions={quickActions}
      userRoleLabel="Admin"
    />
  );
};

export default AdminUI;
