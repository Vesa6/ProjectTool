import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format, parseISO } from "date-fns";

// const events = [
//   {
//     title: 'Team Meeting',
//     start: '2024-03-25',
//     id: 'event-1'
//   },
//   {
//     title: 'Project Deadline',
//     start: '2024-03-24',
//     id: 'event-2'
//   },
//   {
//     title: 'Company Workshop',
//     start: '2024-03-21',
//     id: 'event-3'
//   }
// ];

const FullCalendarComponent = ({ setHighlightedDay, highlightedDay, eventsCalendar: eventsInCalendar }) => (
  <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    dateClick={(arg) => {
      setHighlightedDay(format(parseISO(arg.dateStr), "yyyy-MM-dd")); //fix later, not sure why it only works w this
    }}
    events={eventsInCalendar}
    headerToolbar={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek',
    }}
    height="80%"
  />
);

//activeProjectId is currently passed down to disable "add task" dynamically.
//TODO: Cleanup and refactor this component
const CalendarView = ({ activeProject, allProjects, activeProjectId }) => {
  const [highlightedDay, setHighlightedDay] = useState(format(new Date(), "yyyy-MM-dd"));
  // This weird syntax is the "nullish coalescing operator", basically just makes sure we don't acess nulls.
  const [eventsCalendar, seteventsCalendar] = useState([...activeProject?.tasks ?? allProjects.flatMap(project => project.tasks)]);
  const [newEvent, setNewEvent] = useState({
    title: 'YARE YARE DAZE',
    status: 'In progress',
    start: highlightedDay,
    end: '',
    participants: [],
  });
  const [isPopupscreenOpen, setIsPopupscreenOpen] = useState(false);

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
    seteventsCalendar([...activeProject?.tasks ?? allProjects.flatMap(project =>
      project.tasks.map(task =>
        ({ ...task, title: `${project.project}: ${task.title}` })))]);
  }, [activeProject]);

  // This hacky use effect ensures that dates work even if user does not change it.
  useEffect(() => {
    setNewEvent(current => ({
      ...current,
      start: highlightedDay
    }));
  }, [highlightedDay]);
  

  /*
  * Add begin
  *
  * */

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
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

  const handleAddTask = () => {
    console.log(activeProject)
    addTaskToProject(activeProject._id, newEvent);
    setIsPopupscreenOpen(false);
  };

  /*
 * Add end
 *
 * */

  // if (title.trim() && date) {
  //   const dateTime = allDay ? date : `${date}T${time}`; // If it's not an allday event then get date and time

  //   const newCalendarEvent = {
  //     id: `event-${eventsCalendar.length + 1}`,
  //     title,
  //     start: dateTime,
  //     allDay,
  //     color: important ? '#ff0000' : '#007bff', //red if important, blue if not
  //     extendedProps: { location, participants },
  //   };

  //   //TODO: add db post here and remove this
  //   seteventsCalendar(currentEvents => [...currentEvents, newCalendarEvent]);
  //   setIsPopupscreenOpen(false);
  //   setNewEvent({ title: '', date: '', time: '', location: '', participants: [], important: false, allDay: false });
  // }

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
                <h2 className="text-xl font-semibold">New Event</h2>
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
                <button onClick={() => setIsPopupscreenOpen(false)} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 focus:outline-none">Cancel</button>
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
