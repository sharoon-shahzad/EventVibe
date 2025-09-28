import { api_routes } from "../api_constant";
import apiSlice from "../apiSlice";

const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all events
    getEvents: builder.query({
      query: () => ({
        url: `${api_routes.events}`,
      }),
      providesTags: ["Events"],
    }),

    // Get single event by ID
    getEventById: builder.query({
      query: (id) => ({
        url: `${api_routes.events}/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    // Create new event (admin only)
    createEvent: builder.mutation({
      query: ({ payload }) => ({
        url: `${api_routes.events}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Events"],
    }),

    // Register user for event
    registerForEvent: builder.mutation({
      query: ({ eventId, userId }) => ({
        url: `${api_routes.events}/${eventId}/register`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Event", id: eventId },
        "Events",
      ],
    }),

    // Get feedback for an event
    getEventFeedback: builder.query({
      query: (eventId) => ({
        url: `${api_routes.events}/${eventId}/feedback`,
      }),
      providesTags: (result, error, eventId) => [
        { type: "Feedback", id: eventId },
      ],
    }),

    // Submit feedback for an event
    submitEventFeedback: builder.mutation({
      query: ({ eventId, payload }) => ({
        url: `${api_routes.events}/${eventId}/feedback`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Feedback", id: eventId },
      ],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useRegisterForEventMutation,
  useGetEventFeedbackQuery,
  useSubmitEventFeedbackMutation,
} = eventApiSlice;

export default eventApiSlice;
