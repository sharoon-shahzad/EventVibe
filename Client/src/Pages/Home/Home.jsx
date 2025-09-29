import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCategory,
  setSelectedLocation,
  clearFilters,
} from "@/store/slice/eventSlice";
import { useEventLogic } from "@/hooks/events/useEventLogic";
import LoadingOverlay from "@/components/Atoms/Loader/LoadingOverlay";
import { H1, H2, H3, SubHeading } from "@/components/Atoms/Shared/headings";
import EventCard from "@/components/Molecules/events/EventCard";
import SelectComponent from "@/components/Atoms/SelectComponent/SelectComponent";
import Card from "@/components/Atoms/Card/Card";
import { getIcon } from "@/utils/helpers/iconsHelper";
import Button from "@/components/Atoms/Buttons/Button";

const Home = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.event.selectedCategory);
  const selectedLocation = useSelector((state) => state.event.selectedLocation);

  const {
    events,
    allEvents,
    isEventsLoading,
    eventsError,
    isUserRegistered,
    handleRegisterForEvent,
    isRegistering: globalIsRegistering,
  } = useEventLogic();

  const [registeringEventId, setRegisteringEventId] = useState(null);

  const CalendarDotsIcon = getIcon("calendar");

  const categories = useMemo(() => {
    if (!allEvents) return [];
    const uniqueCategories = [
      ...new Set(allEvents.map((event) => event.category)),
    ];
    return uniqueCategories.filter((cat) => cat && cat.trim() !== "");
  }, [allEvents]);

  const locations = useMemo(() => {
    if (!allEvents) return [];
    const uniqueLocations = [
      ...new Set(allEvents.map((event) => event.location)),
    ];
    return uniqueLocations.filter((loc) => loc && loc.trim() !== "");
  }, [allEvents]);

  // Filter for upcoming events by default
  const upcomingEvents = useMemo(() => {
    if (!events) return [];

    const today = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= today;
    });
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (!upcomingEvents) return [];

    return upcomingEvents.filter((event) => {
      const matchesCategory =
        !selectedCategory || event.category === selectedCategory;
      const matchesLocation =
        !selectedLocation || event.location === selectedLocation;
      return matchesCategory && matchesLocation;
    });
  }, [upcomingEvents, selectedCategory, selectedLocation]);

  const sortedEvents = useMemo(() => {
    if (!filteredEvents) return [];

    return [...filteredEvents].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  }, [filteredEvents]);

  const handleRegisterForEventWithTracking = async (eventId) => {
    setRegisteringEventId(eventId);
    try {
      await handleRegisterForEvent(eventId);
    } finally {
      if (registeringEventId === eventId) {
        setRegisteringEventId(null);
      }
    }
  };

  const clearFiltersHandler = () => {
    dispatch(clearFilters());
  };

  if (isEventsLoading) {
    return (
      <div className="flex min-h-screen">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-blue-500 border-l-blue-500 border-b-blue-500 border-r-white"></div>
        </div>
      </div>
    );
  }

  if (eventsError) {
    return (
      <div className="flex min-h-screen">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-red-500 text-center">
            <H2>Error Loading Events</H2>
            <p className="mt-2">{eventsError.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      {/* Main Content */}
      <div className="min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header with Filters */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <H1>Upcoming Events</H1>
                <p className="text-gray-600 mt-1">
                  {sortedEvents.length} upcoming event
                  {sortedEvents.length !== 1 ? "s" : ""} available
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="flex-1 min-w-0">
                  <SelectComponent
                    label="Category"
                    value={selectedCategory}
                    onChange={(e) =>
                      dispatch(setSelectedCategory(e.target.value))
                    }
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </SelectComponent>
                </div>

                <div className="flex-1 min-w-0">
                  <SelectComponent
                    label="Location"
                    value={selectedLocation}
                    onChange={(e) =>
                      dispatch(setSelectedLocation(e.target.value))
                    }
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </SelectComponent>
                </div>

                {(selectedCategory || selectedLocation) && (
                  <Button
                    onClick={clearFiltersHandler}
                    variant="ghost"
                    size="sm"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>

          <LoadingOverlay isLoading={isEventsLoading}>
            {sortedEvents?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {sortedEvents?.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isRegistered={isUserRegistered(event)}
                    onRegister={handleRegisterForEventWithTracking}
                    isRegistering={registeringEventId === event.id} // Pass individual event loading state
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 w-full">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <CalendarDotsIcon weight="fill" />
                </div>
                <H2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No upcoming events found
                </H2>
                <p className="text-gray-600 mb-6">
                  {selectedCategory || selectedLocation
                    ? "No upcoming events match your selected filters. Try clearing the filters."
                    : "Check back later for new events!"}
                </p>
                {(selectedCategory || selectedLocation) && (
                  <Button onClick={clearFiltersHandler} variant="ghost">
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </LoadingOverlay>
        </div>
      </div>
    </Card>
  );
};

export default Home;
