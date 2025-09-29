import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import { useEventLogic } from "@/hooks/events/useEventLogic";
import { useEventFilterLogic } from "@/hooks/events/useEventFilterLogic";
import { H1, H2 } from "@/components/Atoms/Shared/headings";
import EventCard from "@/components/Molecules/events/EventCard";
import Card from "@/components/Atoms/Card/Card";
import LoadingOverlay from "@/components/Atoms/Loader/LoadingOverlay";
import { getIcon } from "@/utils/helpers/iconsHelper";
import Tabs from "@/components/Atoms/Shared/Tabs";

const MyEvents = () => {
  const currentUser = useSelector(selectCurrentUser);
  const {
    events,
    isEventsLoading,
    isUserRegistered,
    handleRegisterForEvent,
    isRegistering,
  } = useEventLogic();

  // Use the same hook for both admin and user
  const { activeEvents, passedEvents } = useEventFilterLogic(
    events,
    currentUser,
    currentUser?.role === "admin" ? "created" : "registered"
  );

  const CalendarIcon = getIcon("calendar");

  // Determine tab names based on user role
  const tabNames =
    currentUser?.role === "admin"
      ? { active: "Active", passed: "Passed" }
      : { active: "Registered", passed: "Passed" };

  const eventTabs = [
    {
      tabName: tabNames.active,
      component: (
        <div className="space-y-6">
          {activeEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isRegistered={isUserRegistered(event)}
                  onRegister={handleRegisterForEvent}
                  isRegistering={isRegistering}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <CalendarIcon weight="fill" />
              </div>
              <H2 className="text-2xl font-semibold text-gray-900 mb-2">
                {currentUser?.role === "admin"
                  ? "No Active Events"
                  : "No Registered Events"}
              </H2>
              <p className="text-gray-600 mb-6">
                {currentUser?.role === "admin"
                  ? "You don't have any upcoming events."
                  : "You don't have any upcoming events you've registered for."}
              </p>
            </Card>
          )}
        </div>
      ),
    },
    {
      tabName: tabNames.passed,
      component: (
        <div className="space-y-6">
          {passedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {passedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isRegistered={isUserRegistered(event)}
                  onRegister={handleRegisterForEvent}
                  isRegistering={isRegistering}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <CalendarIcon weight="fill" />
              </div>
              <H2 className="text-2xl font-semibold text-gray-900 mb-2">
                No Passed Events
              </H2>
              <p className="text-gray-600 mb-6">
                {currentUser?.role === "admin"
                  ? "You don't have any past events."
                  : "You don't have any past events you've registered for."}
              </p>
            </Card>
          )}
        </div>
      ),
    },
  ];

  return (
    <Card>
      <H1 className="text-3xl font-bold text-gray-900 mb-8">
        {currentUser?.role === "admin" ? "My Events" : "My Events"}
      </H1>
      <LoadingOverlay isLoading={isEventsLoading}>
        <Tabs tabs={eventTabs} />
      </LoadingOverlay>
    </Card>
  );
};

export default MyEvents;
