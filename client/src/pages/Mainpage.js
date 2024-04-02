import React, { useState } from "react";
import LogOutPopup from "../components/LogOutPopup";
import AddProjectPopup from "../components/AddProjectPopup";
import ProjectOverview from "../components/ProjectOverview";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Costs from "../components/Costs";
import Tasks from "../components/Tasks";
import Notifications from "../components/Notifications";
import Calendar from "../components/Calendar";
import TasksView from "../components/TasksView";
import "react-calendar/dist/Calendar.css";

const Mainpage = () => {
  const [showLogout, setShowLogout] = useState(false);
  const showLogoutPopup = () => setShowLogout(true);
  const hideLogoutPopup = () => setShowLogout(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const showAddProjectPopup = () => setShowAddProject(true);
  const hideAddProjectPopup = () => setShowAddProject(false);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeUser, setActiveUser] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTasksview, setShowTasksview] = useState(false);

  const handleToggleCalendarView = () => {
    setShowTasksview(false);
    setShowCalendar((prevState) => !prevState);
  };

  const handleToggleTasksView = () => {
    setShowCalendar(false);
    setShowTasksview((prevState) => !prevState);
  };

  const projects = [
    { id: 1, date: "21/07/2024" },
    { id: 2, date: "01/02/2024" },
    { id: 3, date: "02/09/2024" },
    { id: 4, date: "21/07/2024" },
  ];

  // Dummy data for notifications
  let notifications = [
    { id: 1, date: "21/07/2011" },
    { id: 2, date: "01/01/2011" },
    { id: 3, date: "02/03/2011" },
    { id: 4, date: "21/07/2011" },
  ];

  let users = [
    { id: 1, name: "Test Person", role: "Projektipäällikkö" },
    { id: 2, name: "Matti Meikäläinen", role: "Tyhjän toimittaja" },
    { id: 3, name: "Maija Meikäläinen", role: "En tiä" },
  ];

  const activeUserName =
    users.find((user) => user.id === activeUser)?.name || "???";

  function deleteNotification() {
    console.log("Notification deleted");
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar
        projects={projects}
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
        showAddProjectPopup={showAddProjectPopup}
        activeUserName={activeUserName}
      />
      <div className="flex-grow flex flex-col bg-gray-800">
        <div className="flex-grow p-4 overflow-y-auto">
          <Navbar
            toggleCalendarView={() => handleToggleCalendarView()}
            toggleTasksView={() => handleToggleTasksView()}
          />
          <div className="mt-4">
            {showCalendar ? (
              <Calendar />
            ) : showTasksview ? (
              <TasksView />
            ) : (
              <>
                {" "}
                {/* This is shorthand for fragment, means that everything is in one parent */}
                <div className="flex flex-col md:flex-row">
                  <ProjectOverview />
                  <div className="md:w-1/3 md:ml-4 mt-4 md:mt-0">
                    <Costs />
                    <Tasks />
                  </div>
                </div>
                <Notifications notifications={notifications} />
              </>
            )}
          </div>
        </div>
      </div>
      {showLogout && <LogOutPopup onClose={hideLogoutPopup} />}
      {showAddProject && <AddProjectPopup onClose={hideAddProjectPopup} />}
    </div>
  );
};

export default Mainpage;
