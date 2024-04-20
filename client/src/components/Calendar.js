import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format, parseISO } from "date-fns";
import CalendarTaskPopup from "./CalendarTaskPopup";

/*
/ event == task. This component is a calendar view for tasks.
/ Didn't want to rename all this stuff, so it's still called "event".
*/

const FullCalendarComponent = ({ setHighlightedDay, eventsCalendar }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = ({ event }) => {
    console.log(event);
    setSelectedEvent({
      title: event.title,
      start: event.start,
      status: event.extendedProps.status,
      end: event.end,
      participants: event.extendedProps.participants,
      description: event.extendedProps.description
    });
  };

  const handleDateClick = (arg) => {
    setHighlightedDay(format(arg.date, "yyyy-MM-dd"));
  };

  const closeDialog = () => setSelectedEvent(null);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventsCalendar}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
        height="80%"
      />
      <CalendarTaskPopup event={selectedEvent} onClose={closeDialog} />
    </>
  );
};

//activeProjectId is currently passed down to disable "add task" dynamically.

//TODO: Cleanup and refactor this component

const CalendarView = ({ activeProject, allProjects, activeProjectId, fetchProjects }) => {
  const [highlightedDay, setHighlightedDay] = useState(format(new Date(), "yyyy-MM-dd"));

  // This weird syntax is the "nullish coalescing operator", basically just makes sure we don't acess nulls.
  const [eventsCalendar, seteventsCalendar] = useState([...activeProject?.data.tasks ?? allProjects.flatMap(project => project.data.tasks)]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    status: 'Not started',
    start: highlightedDay,
    end: '',
    participants: [],
    description: '',
  });

  const [isPopupscreenOpen, setIsPopupscreenOpen] = useState(false);

  // All the possible options for participants.
  // This could be fetched from the server, but for now it's hardcoded.
  const [participants] = useState([
    { id: 1, name: 'Aada' },
    { id: 2, name: 'Mikael' },
    { id: 3, name: 'Asla' },
    { id: 4, name: 'Jani' },
    { id: 5, name: 'Vesa' },
    { id: 6, name: 'Arttu' },
  ]);

  useEffect(() => {
    const highlighted = {
      title: 'Selected Day',
      start: highlightedDay,
      color: '#378006',
      id: 'selected-date',
    };

    seteventsCalendar(currentEvents => {
      // This is a bit of mess, but practically adds the highlighted day to the calendar.
      // Don't ask.
      return currentEvents.filter(event => event.id !== 'selected-date').concat(highlighted);
    });
  }, [highlightedDay]);

  // This watches for if the active project changes -> changes stuff in calendar to match project
  // If none selected, then it just shows all tasks from all projects and does some ugly mapping to add the project name to the task
  useEffect(() => {
    seteventsCalendar([
      ...activeProject?.data.tasks ?? allProjects.flatMap(project =>
        project.data.tasks.map(task => ({
          ...task,
          title: `${project.data.name}: ${task.title}`,
          participants: task.participants,
          status: task.status
        }))
      )
    ]);
  }, [activeProject]);

  // This hacky use effect ensures that dates default to the current day if none chosen
  useEffect(() => {
    setNewEvent(current => ({
      ...current,
      start: highlightedDay
    }));
  }, [highlightedDay]);

  async function addTaskToProject(projectId, newTask) {
    const url = `http://localhost:3001/api/projects/${projectId}/add-task`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      console.log('Task added successfully');
      fetchProjects();
    } catch (error) {
      console.error('Error adding task:', error);
      fetchProjects(); // here just in case, should not be needed.
    }

  }

  const resetFormFields = () => {
    setNewEvent({
      title: '',
      status: 'Not started',
      start: highlightedDay,
      end: '',
      participants: [],
      description: '',
    });
    setIsPopupscreenOpen(false);
  };

  const handleAddTask = () => {
    console.log(activeProject)
    addTaskToProject(activeProject._id, newEvent);
    resetFormFields();
  };

  // Specific time functionality from previous version removed to keep it simple


  //TODO: Refactor return to use components.
  return (
    <div className="relative flex h-screen text-white">
      <div className="w-4/5">
        <FullCalendarComponent
          highlightedDay={highlightedDay}
          setHighlightedDay={setHighlightedDay}
          eventsCalendar={eventsCalendar}
        />
      </div>
      <div className="bg-gray-800 overflow-y-auto p-4 w-1/5">
        {activeProjectId ? (
          <button
            onClick={() => setIsPopupscreenOpen(true)}
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
          >
            Add Task
          </button>
        ) : (
          <button
            disabled
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded opacity-50 cursor-not-allowed"
          >
            Select a project to add a task...
          </button>
        )}
        {isPopupscreenOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg text-white">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">New Task</h2>
                <button onClick={() => setIsPopupscreenOpen(false)}>✖️</button>
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">Title:</label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-2 text-white bg-gray-800 rounded"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">Description:</label>
                <textarea
                  id="description"
                  className="w-full p-2 text-white bg-gray-800 rounded"
                  rows="3"
                  maxLength="200"
                  placeholder="Enter task description (max 200 characters)..."
                  value={newEvent.description}
                  onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="date" className="block mb-2">Task date:</label>
                  <input
                    type="date"
                    id="start"
                    className="w-full p-2 text-white bg-gray-800 rounded"
                    value={newEvent.start}
                    onChange={e => setNewEvent({ ...newEvent, start: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="status" className="block mb-2">Status:</label>
                  <select
                    id="status"
                    className="w-full p-2 text-white bg-gray-800 rounded"
                    value={newEvent.status}
                    onChange={e => setNewEvent({ ...newEvent, status: e.target.value })}
                  >
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="participants" className="block mb-2 text-sm">Select Participants:</label>
                <select
                  multiple
                  id="participants"
                  className="w-full p-2 text-white bg-gray-800 rounded"
                  onChange={e => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    setNewEvent({ ...newEvent, participants: values });
                  }}
                >
                  {participants.map(participant => (
                    <option key={participant.id} value={participant.name}>{participant.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <button onClick={resetFormFields} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 focus:outline-none">Cancel</button>
                <button onClick={handleAddTask} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 focus:outline-none">Add</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;

