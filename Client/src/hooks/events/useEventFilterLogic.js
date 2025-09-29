import { useMemo } from "react";

export const useEventFilterLogic = (
  events,
  currentUser,
  filterType = "created"
) => {
  const filteredEvents = useMemo(() => {
    if (!events || !currentUser) return [];

    switch (filterType) {
      case "created": // For admin - events they created
        return events.filter((event) => event.createdBy === currentUser?.id);
      case "registered": // For user - events they registered for
        return events.filter((event) =>
          event.registeredUsers?.includes(currentUser?.id)
        );
      default:
        return [];
    }
  }, [events, currentUser, filterType]);

  const { activeEvents, passedEvents } = useMemo(() => {
    if (!filteredEvents) return { activeEvents: [], passedEvents: [] };

    const today = new Date();
    const activeEvents = filteredEvents.filter(
      (event) => new Date(event.date) >= today
    );
    const passedEvents = filteredEvents.filter(
      (event) => new Date(event.date) < today
    );

    return { activeEvents, passedEvents };
  }, [filteredEvents]);

  return {
    filteredEvents,
    activeEvents,
    passedEvents,
  };
};
