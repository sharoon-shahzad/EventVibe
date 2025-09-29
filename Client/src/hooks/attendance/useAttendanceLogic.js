import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import {
  useGetEventAttendeesQuery,
  useGetAdminEventAttendeesQuery,
  useMarkAttendeePresentMutation,
  useMarkMultipleAttendeesPresentMutation,
} from "@/store/api/eventAttendance/attendanceApiSlice";

export const useAttendanceLogic = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // Queries
  const {
    data: eventAttendees,
    isLoading: isEventAttendeesLoading,
    error: eventAttendeesError,
    refetch: refetchEventAttendees,
  } = useGetEventAttendeesQuery();

  const {
    data: adminEventAttendees,
    isLoading: isAdminEventAttendeesLoading,
    error: adminEventAttendeesError,
    refetch: refetchAdminEventAttendees,
  } = useGetAdminEventAttendeesQuery();

  // Mutations
  const [
    markAttendeePresent,
    { isLoading: isMarkingAttendeePresent, error: markAttendeeError },
  ] = useMarkAttendeePresentMutation();

  const [
    markMultipleAttendeesPresent,
    { isLoading: isMarkingMultipleAttendees, error: markMultipleError },
  ] = useMarkMultipleAttendeesPresentMutation();

  // Function to get attendees for specific event
  const useGetEventAttendees = (eventId) => {
    return useGetEventAttendeesQuery(eventId, {
      skip: !eventId,
    });
  };

  // Function to get admin attendees for specific event
  const useGetAdminEventAttendees = (eventId) => {
    return useGetAdminEventAttendeesQuery(eventId, {
      skip: !eventId,
    });
  };

  // Mark single attendee as present
  const handleMarkAttendeePresent = async (attendeeId) => {
    try {
      const res = await markAttendeePresent(attendeeId).unwrap();
      return res;
    } catch (err) {
      console.error("Failed to mark attendee as present:", err);
      throw err;
    }
  };

  // Mark multiple attendees as present
  const handleMarkMultipleAttendeesPresent = async (attendeeIds) => {
    try {
      const payload = {
        attendeeIds,
        markedBy: currentUser?.id,
        markedAt: new Date().toISOString(),
      };
      const res = await markMultipleAttendeesPresent({ payload }).unwrap();
      return res;
    } catch (err) {
      console.error("Failed to mark multiple attendees as present:", err);
      throw err;
    }
  };

  // Check if user is marked as present for an event
  const isUserAttended = (attendees, userId = currentUser?.id) => {
    if (!userId || !attendees) return false;

    const attendee = attendees.find(
      (attendee) => attendee.userId === userId || attendee.id === userId
    );
    return attendee?.isPresent || attendee?.attended || false;
  };

  // Get attendance status for multiple users
  const getAttendeesStatus = (attendeesList) => {
    if (!attendeesList) return [];

    return attendeesList.map((attendee) => ({
      ...attendee,
      isPresent: attendee.isPresent || attendee.attended || false,
      attendanceTime: attendee.attendanceTime || attendee.markedAt,
    }));
  };

  // Get attendance statistics for an event
  const getAttendanceStats = (attendeesList) => {
    if (!attendeesList)
      return { total: 0, present: 0, absent: 0, percentage: 0 };

    const total = attendeesList.length;
    const present = attendeesList.filter(
      (attendee) => attendee.isPresent || attendee.attended
    ).length;
    const absent = total - present;
    const percentage = total > 0 ? (present / total) * 100 : 0;

    return {
      total,
      present,
      absent,
      percentage: Math.round(percentage * 100) / 100, // Round to 2 decimal places
    };
  };

  // Filter attendees by status
  const filterAttendeesByStatus = (attendeesList, status = "all") => {
    if (!attendeesList) return [];

    switch (status.toLowerCase()) {
      case "present":
        return attendeesList.filter(
          (attendee) => attendee.isPresent || attendee.attended
        );
      case "absent":
        return attendeesList.filter(
          (attendee) => !(attendee.isPresent || attendee.attended)
        );
      default:
        return attendeesList;
    }
  };

  // Get user's attendance history
  const getUserAttendanceHistory = (
    attendeesList,
    userId = currentUser?.id
  ) => {
    if (!userId || !attendeesList) return [];

    return attendeesList.filter(
      (attendee) => attendee.userId === userId || attendee.id === userId
    );
  };

  return {
    // Data
    eventAttendees,
    adminEventAttendees,

    // Loading states
    isEventAttendeesLoading,
    isAdminEventAttendeesLoading,
    isMarkingAttendeePresent,
    isMarkingMultipleAttendees,

    // Errors
    eventAttendeesError,
    adminEventAttendeesError,
    markAttendeeError,
    markMultipleError,

    // Functions
    useGetEventAttendees,
    useGetAdminEventAttendees,
    handleMarkAttendeePresent,
    handleMarkMultipleAttendeesPresent,
    isUserAttended,
    getAttendeesStatus,
    getAttendanceStats,
    filterAttendeesByStatus,
    getUserAttendanceHistory,
    refetchEventAttendees,
    refetchAdminEventAttendees,
  };
};
