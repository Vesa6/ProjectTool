import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const CalendarTaskPopup = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    start: "",
    end: "",
    participants: "",
    description: "",
  });

  const [assignees] = useState([
    { id: 1, name: "Aada" },
    { id: 2, name: "Mikael" },
    { id: 3, name: "Asla" },
    { id: 4, name: "Jani" },
    { id: 5, name: "Vesa" },
    { id: 6, name: "Arttu" },
  ]);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        status: event.status || "",
        start: event.start ? format(new Date(event.start), "yyyy-MM-dd") : "",
        end: event.end ? format(new Date(event.end), "yyyy-MM-dd") : "",
        participants: event.participants ? event.participants : "",
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
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-16 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <div className="bg-yellow-200 p-3 rounded text-black text-sm mb-4">
          Updating through calendar is not supported yet. If you wish to update a task, do it through Task View.
        </div>
        <form onSubmit={handleSubmit}>
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
          <select
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            className="mt-1 p-2 w-full rounded-md border-gray-300 text-black shadow-sm"
          >
            <option value="">Select an assignee</option>
            {assignees.map(assignee => (
              <option key={assignee.id} value={assignee.name}>{assignee.name}</option>
            ))}
          </select>
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
              disabled={true}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 opacity-50 cursor-not-allowed"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalendarTaskPopup;