import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventLogic } from "@/hooks/events/useEventLogic";
import { useAttendanceLogic } from "@/hooks/attendance/useAttendanceLogic";
import Card from "@/components/Atoms/Card/Card";
import Button from "@/components/Atoms/Buttons/Button";
import { H1, H2, H3, SubHeading } from "@/components/Atoms/Shared/headings";
import IconContainer from "@/components/Atoms/Shared/IconContainer";
import AttendanceTabs from "@/components/Molecules/Attendance/AttendanceTabs";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import { UserRole } from "@/utils/enums/useRole";
import FallbackImage from "@/components/Atoms/Shared/FallbackImage";
import FeedbackSection from "./FeedbackSection";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const {
    useGetSingleEvent,
    handleRegisterForEvent,
    isRegistering,
    isUserRegistered,
    handleSubmitFeedback,
    isSubmittingFeedback,
    feedback,
  } = useEventLogic();
  const {
    handleMarkAttendeePresent,
    handleMarkMultipleAttendeesPresent,
    isMarkingAttendeePresent,
  } = useAttendanceLogic();

  const {
    data: event,
    isLoading: isEventLoading,
    error: eventError,
  } = useGetSingleEvent(id);

  const [selectedAttendees, setSelectedAttendees] = useState([]);

  const handleRegister = () => handleRegisterForEvent(parseInt(id));
  const handleBack = () => navigate(-1);

  const isEventPassed = event && new Date(event.date) < new Date();

  const handleMarkAttendance = async (attendeeId) => {
    try {
      await handleMarkAttendeePresent(attendeeId);
    } catch (error) {
      console.error("Failed to mark attendance:", error);
    }
  };

  const handleMarkMultipleAttendance = async (attendeeIds) => {
    try {
      await handleMarkMultipleAttendeesPresent(attendeeIds);
      setSelectedAttendees([]);
    } catch (error) {
      console.error("Failed to mark multiple attendance:", error);
    }
  };

  if (isEventLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-blue-500 border-l-blue-500 border-b-blue-500 border-r-white"></div>
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <H2 className="text-2xl font-semibold text-gray-900 mb-2">
            Event Not Found
          </H2>
          <p className="text-gray-600 mb-6">
            The event you're looking for doesn't exist or failed to load.
          </p>
          <Button onClick={handleBack} variant="secondary">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const eventInfoItems = [
    { icon: "calendar", label: "Date", value: formattedDate },
    { icon: "clock", label: "Time", value: event.time || "TBD" },
    {
      icon: "location",
      label: "Location",
      value: event.location || "Not specified",
    },
    { icon: "user", label: "Venue", value: event.venue || "Not specified" },
  ];

  const additionalInfoItems = [
    {
      label: "Registered Users",
      value: `${event.registeredUsers?.length || 0} people`,
    },
    { label: "Category", value: event.category || "General" },
  ];

  const renderEventInfo = () => (
    <div className="space-y-3 text-gray-700">
      {eventInfoItems.map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          <IconContainer
            icon={item.icon}
            size={12}
            className="text-blue-600"
            containerSize="w-6 h-6"
            containerClassName="bg-blue-100 rounded-full flex-shrink-0 mt-0.5"
          />
          <div>
            <SubHeading>{item.label}</SubHeading>
            <p className="text-gray-600">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAdditionalInfo = () => (
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
      {additionalInfoItems.map((item, index) => (
        <div key={index}>
          <SubHeading>{item.label}</SubHeading>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );

  const renderRegistrationSection = () => (
    <div className="space-y-3 text-gray-700">
      <div className="bg-gray-50 p-4 rounded-lg">
        <SubHeading>Capacity</SubHeading>
        <p className="text-gray-600">
          {event.capacity
            ? `${event.capacity} total spots`
            : "Unlimited capacity"}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {event.registeredUsers?.length || 0} registered
        </p>
      </div>

      <div className="space-y-3">
        <Button
          variant={isUserRegistered(event) ? "secondary" : "primary"}
          disabled={isUserRegistered(event) || isRegistering}
          onClick={handleRegister}
          className="w-full"
        >
          {isUserRegistered(event)
            ? "Registered"
            : isRegistering
            ? "Registering..."
            : "Register Now"}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          {isUserRegistered(event)
            ? "You're registered for this event"
            : "Register to secure your spot"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Button
            onClick={handleBack}
            variant="secondary"
            className="flex items-center gap-2"
          >
            ← Back to Events
          </Button>
        </div>

        <Card>
          <div className="space-y-6 p-2">
            <div className="w-full h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden relative">
              <FallbackImage
                src={event.posterUrl}
                alt={event.title}
                className="w-full h-full"
                fallbackText="No image available"
              />
            </div>

            <div>
              <H1 className="!mb-2">{event.title}</H1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  {event.category}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                  {event.capacity
                    ? `${event.capacity} spots`
                    : "Unlimited capacity"}
                </span>
                {isEventPassed && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                    Passed
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <H3>Event Information</H3>
                {renderEventInfo()}
              </div>

              <div className="space-y-4">
                <H3>Registration</H3>
                {currentUser?.role !== UserRole.admin ? (
                  renderRegistrationSection()
                ) : (
                  <div className="space-y-3 text-gray-700">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <SubHeading>Capacity</SubHeading>
                      <p className="text-gray-600">
                        {event.capacity
                          ? `${event.capacity} total spots`
                          : "Unlimited capacity"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {event.registeredUsers?.length || 0} registered
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {currentUser?.role === UserRole.admin && isEventPassed && (
              <AttendanceTabs
                attendees={event.attendees}
                onMarkAttendance={handleMarkAttendance}
                onMarkMultipleAttendance={handleMarkMultipleAttendance}
                isMarkingAttendeePresent={isMarkingAttendeePresent}
                selectedAttendees={selectedAttendees}
                setSelectedAttendees={setSelectedAttendees}
              />
            )}

            <div>
              <H3>Description</H3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {event.description || "No description available."}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              {renderAdditionalInfo()}
            </div>

            <FeedbackSection
              event={event}
              currentUser={currentUser}
              feedback={feedback}
              handleSubmitFeedback={handleSubmitFeedback}
              isSubmittingFeedback={isSubmittingFeedback}
              id={id}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EventDetail;
