import React, { useState } from "react";
import Button from "@/components/Atoms/Buttons/Button";
import { H3, SubHeading } from "@/components/Atoms/Shared/headings";
import { UserRole } from "@/utils/enums/useRole";
import Textarea from "@/components/Atoms/Shared/Textarea";

const FeedbackSection = ({
  event,
  currentUser,
  handleSubmitFeedback,
  isSubmittingFeedback,
  id,
}) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const isEventPassed = event && new Date(event.date) < new Date();

  const isUserAttended = (event, userId = currentUser?.id) => {
    if (!userId || !event?.attendees) return false;
    return event.attendees?.some(
      (attendee) => attendee.userId === userId && attendee.status === "present"
    );
  };

  // Use event.feedback instead of separate feedback prop
  const userAlreadySubmitted = event.feedback?.some(
    (f) => f.userId === currentUser?.id
  );

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText || rating === 0) return;

    try {
      await handleSubmitFeedback(parseInt(id), {
        rating,
        comment: feedbackText,
        userId: currentUser?.id,
        userName: currentUser?.name,
      });
      setFeedbackText("");
      setRating(0);
      setShowFeedbackForm(false);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  if (!isEventPassed) return null;

  const userRegistered = event.registeredUsers?.includes(currentUser?.id);
  const userAttended = isUserAttended(event);

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <H3>Event Feedback</H3>

      {userAttended && !userAlreadySubmitted && (
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => setShowFeedbackForm(!showFeedbackForm)}
            className="mb-4"
          >
            {showFeedbackForm ? "Cancel Feedback" : "Leave Feedback"}
          </Button>

          {showFeedbackForm && (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Textarea
                  label="Your Feedback"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your experience about this event..."
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmittingFeedback || !feedbackText || rating === 0}
              >
                {isSubmittingFeedback ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          )}
        </div>
      )}

      {currentUser?.role !== UserRole.admin &&
        userRegistered &&
        !userAttended && (
          <p className="text-gray-600 mb-4">
            Only attendees who were marked as "present" can submit feedback for
            this event.
          </p>
        )}

      {currentUser?.role !== UserRole.admin && !userRegistered && (
        <p className="text-gray-600 mb-4">
          Only registered attendees can submit feedback for this event.
        </p>
      )}

      {event.feedback && event.feedback.length > 0 ? (
        <div className="space-y-4">
          <H3 className="!text-lg">Recent Feedback</H3>
          {event.feedback.map((fb, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{fb.userName}</span>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="font-medium">{fb.rating}</span>
                </div>
              </div>
              <p className="text-gray-700">{fb.comment}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(fb.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No feedback yet for this event.</p>
      )}
    </div>
  );
};

export default FeedbackSection;
