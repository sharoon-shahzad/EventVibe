import React from "react";
import Button from "@/components/Atoms/Buttons/Button";

const AttendeeItem = ({
  attendee,
  isSelected,
  onSelect,
  onMarkAttendance,
  isMarkingAttendeePresent,
  showCheckbox = true,
  showMarkButton = false,
}) => {
  return (
    <div
      key={attendee.id}
      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
    >
      <div className="flex items-center gap-3">
        {showCheckbox && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(attendee.id)}
            className="h-4 w-4 text-blue-600 rounded"
          />
        )}
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {attendee.user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <p className="font-medium text-gray-900">
            {attendee.user?.name || `User ${attendee.user?.id}`}
          </p>
          <p className="text-sm text-gray-600">
            {attendee.user?.email || "No email"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            attendee.status === "present"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {attendee.status === "present" ? "Present" : "Absent"}
        </span>
        {showMarkButton && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onMarkAttendance(attendee.id)}
            disabled={isMarkingAttendeePresent}
          >
            Mark Present
          </Button>
        )}
      </div>
    </div>
  );
};

export default AttendeeItem;
