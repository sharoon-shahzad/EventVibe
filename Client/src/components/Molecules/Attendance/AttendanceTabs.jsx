import React, { useState } from "react";
import Tabs from "@/components/Atoms/Shared/Tabs";
import AttendeeItem from "./AttendeeItem";

const AttendanceTabs = ({
  attendees,
  onMarkAttendance,
  onMarkMultipleAttendance,
  isMarkingAttendeePresent,
  selectedAttendees,
  setSelectedAttendees,
}) => {
  // Filter attendees by status
  const presentAttendees =
    attendees?.filter((attendee) => attendee.status === "present") || [];
  const absentAttendees =
    attendees?.filter((attendee) => attendee.status !== "present") || [];

  const handleSelectAttendee = (attendeeId) => {
    setSelectedAttendees((prev) =>
      prev.includes(attendeeId)
        ? prev.filter((id) => id !== attendeeId)
        : [...prev, attendeeId]
    );
  };

  const attendanceTabs = [
    {
      tabName: "Registered Users",
      component: (
        <div className="space-y-2">
          <div className="text-lg font-medium">All Registered Attendees</div>
          {absentAttendees.length > 0 ? (
            <div className="space-y-2">
              {absentAttendees.map((attendee) => (
                <AttendeeItem
                  key={attendee.id}
                  attendee={attendee}
                  isSelected={selectedAttendees.includes(attendee.id)}
                  onSelect={handleSelectAttendee}
                  onMarkAttendance={onMarkAttendance}
                  isMarkingAttendeePresent={isMarkingAttendeePresent}
                  showCheckbox={true}
                  showMarkButton={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No registered attendees who haven't been marked as present.
            </p>
          )}
        </div>
      ),
    },
    {
      tabName: "Present Users",
      component: (
        <div className="space-y-2">
          <div className="text-lg font-medium">Present Attendees</div>
          {presentAttendees.length > 0 ? (
            <div className="space-y-2">
              {presentAttendees.map((attendee) => (
                <AttendeeItem
                  key={attendee.id}
                  attendee={attendee}
                  isSelected={selectedAttendees.includes(attendee.id)}
                  onSelect={handleSelectAttendee}
                  onMarkAttendance={onMarkAttendance}
                  isMarkingAttendeePresent={isMarkingAttendeePresent}
                  showCheckbox={false} // Don't show checkbox for present users
                  showMarkButton={false} // Don't show mark button for present users
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No attendees have been marked as present yet.
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="text-xl font-semibold mb-4">Attendance Management</div>
      <div className="space-y-4">
        {/* Bulk Mark Attendance */}
        {selectedAttendees.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={() => onMarkMultipleAttendance(selectedAttendees)}
              disabled={isMarkingAttendeePresent}
            >
              Mark {selectedAttendees.length} as Present
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSelectedAttendees([])}
            >
              Clear Selection
            </Button>
          </div>
        )}

        {/* Tabs for Registered vs Present Users */}
        <Tabs tabs={attendanceTabs} />
      </div>
    </div>
  );
};

export default AttendanceTabs;
