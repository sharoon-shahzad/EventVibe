import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useRegisterForEventMutation,
  useSubmitEventFeedbackMutation,
} from "@/store/api/events/eventApiSlice";
import { setSearchTerm } from "@/store/slice/eventSlice";

export const useEventLogic = () => {
  const currentUser = useSelector(selectCurrentUser);
  const searchTerm = useSelector((state) => state.event.searchTerm);
  const dispatch = useDispatch();

  // Queries
  const {
    data: events,
    isLoading: isEventsLoading,
    error: eventsError,
  } = useGetEventsQuery();

  // Mutations
  const [createEvent, { isLoading: isCreatingEvent, error: createEventError }] =
    useCreateEventMutation();
  const [registerForEvent, { isLoading: isRegistering, error: registerError }] =
    useRegisterForEventMutation();
  const [
    submitFeedback,
    { isLoading: isSubmittingFeedback, error: feedbackError },
  ] = useSubmitEventFeedbackMutation();

  // Search and filter logic with null checks
  const searchedEvents = useMemo(() => {
    if (!events || !searchTerm) return events || [];

    return events.filter((event) => {
      const title = event.title?.toLowerCase() || "";
      const description = event.description?.toLowerCase() || "";
      const category = event.category?.toLowerCase() || "";
      const location = event.location?.toLowerCase() || "";
      const searchTermLower = searchTerm.toLowerCase();

      return (
        title.includes(searchTermLower) ||
        description.includes(searchTermLower) ||
        category.includes(searchTermLower) ||
        location.includes(searchTermLower)
      );
    });
  }, [events, searchTerm]);

  // Function to get single event
  const useGetSingleEvent = (eventId) => {
    return useGetEventByIdQuery(eventId, {
      skip: !eventId,
    });
  };

  // Create new event
  const handleCreateEvent = async (eventData) => {
    try {
      const payload = {
        ...eventData,
        createdBy: currentUser?.id,
        registeredUsers: [],
      };
      const res = await createEvent({ payload }).unwrap();
      return res;
    } catch (err) {
      console.error("Failed to create event:", err);
      throw err;
    }
  };

  // Register for event
  const handleRegisterForEvent = async (eventId) => {
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    try {
      const res = await registerForEvent({
        eventId,
        userId: currentUser.id,
      }).unwrap();
      return res;
    } catch (err) {
      console.error("Failed to register for event:", err);
      throw err;
    }
  };

  // Check if user is registered for an event
  const isUserRegistered = (event, userId = currentUser?.id) => {
    if (!userId || !event?.registeredUsers) return false;
    return event.registeredUsers.includes(userId);
  };

  // Submit feedback for event
  const handleSubmitFeedback = async (eventId, feedbackData) => {
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    try {
      const payload = {
        ...feedbackData,
        userId: currentUser.id,
        userName: currentUser.name,
      };
      const res = await submitFeedback({ eventId, payload }).unwrap();
      return res;
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      throw err;
    }
  };

  // Get user's registration status for multiple events
  const getUserRegistrationStatus = (eventsList, userId = currentUser?.id) => {
    if (!userId || !eventsList) return {};

    const status = {};
    eventsList.forEach((event) => {
      status[event.id] = isUserRegistered(event, userId);
    });
    return status;
  };

  return {
    // Data
    events: searchedEvents, // Return searched events
    allEvents: events, // Original events for filters

    // Loading states
    isEventsLoading,
    isCreatingEvent,
    isRegistering,
    isSubmittingFeedback,

    // Errors
    eventsError,
    createEventError,
    registerError,
    feedbackError,

    // Functions
    useGetSingleEvent,
    handleCreateEvent,
    handleRegisterForEvent,
    handleSubmitFeedback,
    isUserRegistered,
    getUserRegistrationStatus,
    setSearchTerm: (term) => dispatch(setSearchTerm(term)),
  };
};
