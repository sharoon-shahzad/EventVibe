import { api_routes } from "../api_constant";
import apiSlice from "../apiSlice";

const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get attendees for a specific event
    getEventAttendees: builder.query({
      query: (id) => ({
        url: api_routes.eventAttendees(id),
      }),
      providesTags: (result, error, id) => [
        { type: "Attendance", id: `event_${id}` },
      ],
    }),

    // Get admin event attendees with event details
    getAdminEventAttendees: builder.query({
      query: (id) => ({
        url: api_routes.adminEventAttendees(id),
      }),
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    // Mark single attendee as present
    markAttendeePresent: builder.mutation({
      query: (id) => ({
        url: api_routes.markAttendancePresent(id),
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Attendance", id },
        { type: "Attendance", id: `event_${result?.eventId}` },
        { type: "Event", id: result?.eventId },
      ],
    }),

    // Mark multiple attendees as present
    markMultipleAttendeesPresent: builder.mutation({
      query: ({ payload }) => ({
        url: api_routes.attendancePresent,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetEventAttendeesQuery,
  useGetAdminEventAttendeesQuery,
  useMarkAttendeePresentMutation,
  useMarkMultipleAttendeesPresentMutation,
} = attendanceApiSlice;

export default attendanceApiSlice;
