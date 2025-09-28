import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { H2 } from "@/components/Atoms/Shared/headings";
import { useEventLogic } from "@/hooks/events/useEventLogic";
import Button from "@/components/Atoms/Buttons/Button";
import InputComponent from "@/components/Atoms/Shared/Input";
import Textarea from "@/components/Atoms/Shared/Textarea";
import SelectComponent from "@/components/Atoms/SelectComponent/SelectComponent";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";

const CreateEvent = () => {
  const { handleCreateEvent, isCreatingEvent } = useEventLogic();
  const [poster, setPoster] = useState(null);
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    location: "", // Added location
    category: "",
    description: "",
    time: "", // Added time
    capacity: "", // Added capacity
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      ...formData,
      capacity: parseInt(formData.capacity),
      posterUrl: poster ? URL.createObjectURL(poster) : null,
      registeredUsers: [],
      createdBy: currentUser?.id,
    };

    try {
      await handleCreateEvent(eventData);
      navigate("/"); // Redirect after successful creation
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <H2>Create New Event</H2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <InputComponent
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <InputComponent
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <InputComponent
          label="Time"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <InputComponent
          label="Venue"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          required
        />

        <InputComponent
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <InputComponent
          label="Capacity"
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />

        <SelectComponent
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
          <option value="technology">Technology</option>
          <option value="art">Art</option>
          <option value="business">Business</option>
          <option value="wellness">Wellness</option>
        </SelectComponent>

        <InputComponent
          label="Event Poster"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Event description..."
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isCreatingEvent}
          className="w-full"
        >
          {isCreatingEvent ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
};

export default CreateEvent;
