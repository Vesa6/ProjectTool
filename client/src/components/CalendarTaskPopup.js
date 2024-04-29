import React, { useState, useEffect } from "react";
import { format } from "date-fns";

//WIP
// Make calendar.js support updating.
//WIP

const CalendarTaskPopup = ({ event, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    start: "",
    end: "",
    participants: "",
    description: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        status: event.status || "",
        start: event.start ? format(new Date(event.start), "yyyy-MM-dd") : "",
        end: event.end ? format(new Date(event.end), "yyyy-MM-dd") : "",
        participants: event.participants ? event.participants.join(", ") : "",
        description: event.description || "",
      });
    }
  }, [event]);

  if (!event) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...event,
      ...formData,
      participants: formData.participants
        .split(",")
        .map((participant) => participant.trim()),
      description: formData.description,
    };
    //onUpdate(updatedEvent); //WIP
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-16 z-50">
      <form
        className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-lg">Edit task</h2>
        <label className="block text-sm font-medium text-black">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border-gray-300 text-black shadow-sm"
        />

        <label className="block text-sm font-medium text-black">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          maxLength="200"
          className="mt-1 p-2 w-full rounded-md border-gray-300 text-black shadow-sm"
          placeholder="Enter task description (max 200 characters)..."
        />

        <label className="block text-sm font-medium text-black">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border-gray-300 text-black shadow-sm"
        >
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label className="block text-sm font-medium text-black">
          Start Date
        </label>
        <input
          type="date"
          name="start"
          value={formData.start}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border-gray-300 text-black shadow-sm"
        />

        <label className="block text-sm font-medium text-black">
          End Date (optional)
        </label>
        <input
          type="date"
          name="end"
          value={formData.end}
          onChange={handleChange}
          className="mt-1 p-2 w-full rounded-md border-gray-300 text-black shadow-sm"
        />

        <label className="block text-sm font-medium text-gray-700">
          Participants
        </label>
        <input
          type="text"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
          className="mt-1 p-2 w-full text-black rounded-md border-gray-300 shadow-sm"
        />

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalendarTaskPopup;
