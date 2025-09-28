import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCategory,
  setSelectedLocation,
  clearFilters,
} from "@/store/slice/eventSlice";
import SideBar from "@/components/Molecules/Navbar/SideBar";
import { useEventLogic } from "@/hooks/events/useEventLogic";
import LoadingOverlay from "@/components/Atoms/Loader/LoadingOverlay";
import { H1, H2, H3, SubHeading } from "@/components/Atoms/Shared/headings";
import EventCard from "@/components/Molecules/events/EventCard";
import SelectComponent from "@/components/Atoms/SelectComponent/SelectComponent";
import Card from "@/components/Atoms/Card/Card";
import { getIcon } from "@/utils/helpers/iconsHelper";

const Home = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.event.selectedCategory);
  const selectedLocation = useSelector((state) => state.event.selectedLocation);

  const {
    events, //  searched events
    allEvents, // Original events for filters
    isEventsLoading,
    eventsError,
    isUserRegistered,
    handleRegisterForEvent,
    isRegistering,
  } = useEventLogic();

  const CalendarDotsIcon = getIcon("calendar");

  // Extract unique categories and locations from allEvents (original)
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

  // Filter events based on selected filters (this will filter the searched events)
  const filteredEvents = useMemo(() => {
    if (!events) return [];

    return events.filter((event) => {
      const matchesCategory =
        !selectedCategory || event.category === selectedCategory;
      const matchesLocation =
        !selectedLocation || event.location === selectedLocation;
      return matchesCategory && matchesLocation;
    });
  }, [events, selectedCategory, selectedLocation]);

  const sortedEvents = useMemo(() => {
    if (!filteredEvents) return [];

    return [...filteredEvents].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  }, [filteredEvents]);

  const clearFiltersHandler = () => {
    dispatch(clearFilters());
  };

  if (isEventsLoading) {
    return (
      <div className="flex min-h-screen">
        {/* Fixed Sidebar */}
        <div className="w-72 hidden lg:block fixed h-screen bg-gray-50 border-r border-gray-200 z-10 overflow-hidden">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="lg:ml-72 flex-1 flex items-center justify-center p-8">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-blue-500 border-l-blue-500 border-b-blue-500 border-r-white"></div>
        </div>
      </div>
    );
  }

  if (eventsError) {
    return (
      <div className="flex min-h-screen">
        {/* Fixed Sidebar */}
        <div className="w-72 hidden lg:block fixed h-screen bg-gray-50 border-r border-gray-200 z-10 overflow-hidden">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="lg:ml-72 flex-1 flex items-center justify-center p-8">
          <div className="text-red-500 text-center">
            <H2>Error Loading Events</H2>
            <p className="mt-2">{eventsError.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="w-72 hidden lg:block fixed h-screen bg-white border-r border-gray-200 z-10 shadow-sm overflow-hidden">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="lg:ml-72 flex-1 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header with Filters */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <H1 className="text-3xl font-bold text-gray-900">Events</H1>
                <p className="text-gray-600 mt-1">
                  {sortedEvents.length} event
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
                  <button
                    onClick={clearFiltersHandler}
                    className="self-end px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors border border-gray-300"
                  >
                    Clear Filters
                  </button>
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
                    onRegister={handleRegisterForEvent}
                    isRegistering={isRegistering}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 w-full">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <CalendarDotsIcon weight="fill" />
                </div>
                <H2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No events found
                </H2>
                <p className="text-gray-600 mb-6">
                  {selectedCategory || selectedLocation
                    ? "No events match your selected filters. Try clearing the filters."
                    : "Check back later for new events!"}
                </p>
                {(selectedCategory || selectedLocation) && (
                  <button
                    onClick={clearFiltersHandler}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </LoadingOverlay>
        </div>
      </div>
    </div>
  );
};

export default Home;
