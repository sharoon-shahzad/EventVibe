import React from "react";
import Card from "@/components/Atoms/Card/Card";
import Button from "@/components/Atoms/Buttons/Button";
import { H3, SubHeading } from "@/components/Atoms/Shared/headings";
import { getIcon } from "@/utils/helpers/iconsHelper";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import { UserRole } from "@/utils/enums/useRole";
import { useNavigate } from "react-router-dom";
import { LAYOUT_DASHBOARD, urls } from "@/utils/routes/route-paths";
import FallbackImage from "@/components/Atoms/Shared/FallbackImage";

const EventCard = ({ event, isRegistered, onRegister, isRegistering }) => {
  const userRole = useSelector(selectCurrentUser)?.role;
  const navigate = useNavigate();

  const handleRegister = () => {
    onRegister(event.id);
  };

  const handleCardClick = () => {
    navigate(
      `${LAYOUT_DASHBOARD}/${urls.EventDetail.replace(":id", event.id)}`
    );
  };

  // Format date
  const formattedDate = new Date(event.date).toLocaleDateString();

  return (
    <Card
      heightAndWidth="h-auto"
      className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="space-y-4 p-2">
        {/* Event Image */}
        <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative">
          <FallbackImage
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-full"
            fallbackText="No image available"
            fallbackIconSize={48}
            fallbackIconWeight="light"
          />
        </div>

        {/* Event Title */}
        <H3 className="!mb-2">{event.title}</H3>

        {/* Event Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {event.description || "No description available."}
        </p>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <SubHeading>Date:</SubHeading>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <SubHeading>Time:</SubHeading>
            <span>{event.time || "TBD"}</span>
          </div>
          <div className="flex items-center gap-2">
            <SubHeading>Location:</SubHeading>
            <span>{event.location || "Not specified"}</span>
          </div>
          <div className="flex items-center gap-2">
            <SubHeading>Capacity:</SubHeading>
            <span>{event.capacity || "Unlimited"}</span>
          </div>
          <div className="flex items-center gap-2">
            <SubHeading>Category:</SubHeading>
            <span>{event.category || "General"}</span>
          </div>
        </div>

        {/* Register Button */}
        {userRole !== UserRole.admin && (
          <div className="pt-3">
            <Button
              variant={isRegistered ? "secondary" : "primary"}
              disabled={isRegistered || isRegistering}
              onClick={(e) => {
                e.stopPropagation();
                handleRegister();
              }}
              className="w-full"
            >
              {isRegistered
                ? "Registered"
                : isRegistering
                ? "Registering..."
                : "Register Now"}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EventCard;
