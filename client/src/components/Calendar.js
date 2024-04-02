import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format, parseISO } from "date-fns";

const events = [
  {
    // Mock data courtesy to chät gipiti
    title: "Team Meeting",
    start: "2024-03-25",
    id: "event-1",
  },
  {
    title: "Project Deadline",
    start: "2024-03-24",
    id: "event-2",
  },
  {
    title: "Company Workshop",
    start: "2024-03-21",
    id: "event-3",
  },
];

const CalendarView = () => {
  // State to track the currently selected date. Starts with today.
  const [highlightedDay, sethighlightedDay] = useState(new Date());
  // Events to show on the calendar/
  const [calendarEvents, setcalendarEvents] = useState([...events]);
  // New event description from input box
  const [newTask, setNewTask] = useState("");

  // Updates events when the highlighted day changes
  useEffect(() => {
    const highlighted = {
      title: "Selected Day", // Title for the event.
      start: format(highlightedDay, "yyyy-MM-dd"),
      color: "#378006",
      id: "selected-date", // If these have an ID, use it here.
    };

    setcalendarEvents((currentcalendarEvents) => {
      let updatedcalendarEvents = currentcalendarEvents.filter(
        (task) => task.id !== "selected-date"
      );
      updatedcalendarEvents.push(highlighted);
      return updatedcalendarEvents;
    });
  }, [highlightedDay]);

  const handleDateClick = (arg) => {
    sethighlightedDay(parseISO(arg.dateStr));
  };

  // Adds a new task to the calendar.
  const handleAddTask = () => {
    if (newTask.trim() && newTask.length <= 300) {
      const dateKey = format(highlightedDay, "yyyy-MM-dd");
      const newEvent = {
        title: newTask, // The title/content of the task.
        start: dateKey, // The start date, aligning with the selected date.
        color: "#007bff",
      };
      setcalendarEvents([...calendarEvents, newEvent]);
      setNewTask("");
    }
  };

  const renderEventContent = (eventInfo) => {
    let shortenedEvent;

    // Check if the title length exceeds 50 characters
    if (eventInfo.event.title.length > 50) {
      // If it does, make it cut off in calendar. Full still seen in deadline view
      shortenedEvent = `${eventInfo.event.title.substring(0, 50)}...`;
    } else {
      shortenedEvent = eventInfo.event.title;
    }

    return (
      <div style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
        <b>{eventInfo.timeText}</b>
        <br />
        <i>{shortenedEvent}</i>
      </div>
    );
  };

  // Function to return the current list of calendarEvents/events.
  const getEvents = () => calendarEvents;

  return (
    <div className="flex text-white h-screen">
      <div className="w-3/5">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={getEvents()}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          eventContent={renderEventContent} // Custom render function
          height="80%"
        />
      </div>
      <div className="w-2/5 bg-gray-800 p-4 overflow-y-auto">
        <div className="mb-4">
          <h1 className="text-xl font-bold mb-4">
            calendarEvents for {format(highlightedDay, "dd MMMM yyyy")}
          </h1>
          <textarea
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task (max 300 characters)"
            maxLength="300"
            className="text-black w-full p-2 mb-2 resize-none h-24"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 w-full text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
        <h3 className="text-xl mb-4">Task Deadlines</h3>
        {calendarEvents
          .filter((task) => task.id !== "selected-date") // Filters and sorts events for display
          .sort((a, b) => new Date(a.start) - new Date(b.start))
          .map((task, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-700 rounded-lg">
              <div className="font-bold">
                {format(parseISO(task.start), "dd MMM yyyy")}
              </div>
              <div style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                {task.title}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalendarView;
