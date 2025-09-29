import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import { useEventLogic } from "@/hooks/events/useEventLogic";
import { useAttendanceLogic } from "@/hooks/attendance/useAttendanceLogic";
import { useEventFilterLogic } from "@/hooks/events/useEventFilterLogic";
import { H3 } from "@/components/Atoms/Shared/headings";
import { getIcon } from "@/utils/helpers/iconsHelper";
import UserProfileDashboard from "@/components/Molecules/Home/UserProfileDashboard";

const UserUI = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { events } = useEventLogic();
  const { eventAttendees } = useAttendanceLogic();

  const {
    activeEvents: activeRegisteredEvents,
    passedEvents: passedRegisteredEvents,
  } = useEventFilterLogic(events, currentUser, "registered");

  const CalendarIcon = getIcon("calendar");
  const CheckIcon = getIcon("check");

  const userAttendedEvents = activeRegisteredEvents
    .concat(passedRegisteredEvents)
    .filter((event) => {
      const attendee = eventAttendees?.find(
        (att) => att.eventId === event.id && att.userId === currentUser?.id
      );
      return attendee?.isPresent || attendee?.attended;
    });

  const userUnattendedEvents = activeRegisteredEvents
    .concat(passedRegisteredEvents)
    .filter((event) => {
      const attendee = eventAttendees?.find(
        (att) => att.eventId === event.id && att.userId === currentUser?.id
      );
      return !(attendee?.isPresent || attendee?.attended);
    });

  const userStats = {
    registered: activeRegisteredEvents.length + passedRegisteredEvents.length,
    attended: userAttendedEvents.length,
    unattended: userUnattendedEvents.length,
  };

  const userTabs = [
    {
      tabName: "Registered",
      component: (
        <div className="space-y-4">
          {activeRegisteredEvents.length > 0 ? (
            <div className="space-y-3">
              {activeRegisteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1 mb-2 sm:mb-0">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} •{" "}
                      {event.location}
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
                No Active Registered Events
              </H3>
              <p className="text-gray-600">
                You don't have any upcoming events you've registered for.
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
          {passedRegisteredEvents.length > 0 ? (
            <div className="space-y-3">
              {passedRegisteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1 mb-2 sm:mb-0">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} •{" "}
                      {event.location}
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
              <p className="text-gray-600">
                You don't have any past events you've registered for.
              </p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <UserProfileDashboard
      role="user"
      stats={userStats}
      tabs={userTabs}
      userRoleLabel="User"
    />
  );
};

export default UserUI;
