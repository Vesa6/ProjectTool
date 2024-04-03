import React, { useState, useEffect } from "react";
import LogOutPopup from "../components/LogOutPopup";
import AddProjectPopup from "../components/AddProjectPopup";
import ProjectOverview from "../components/ProjectOverview";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Costs from "../components/Costs";
import Tasks from "../components/Tasks";
import Notifications from "../components/Notifications";
import Calendar from "../components/Calendar";
import "react-calendar/dist/Calendar.css";
import TaskTable from "../components/TaskList";
import { set } from "mongoose";

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
  const [projects, setProjects] = useState([{ id: 1, date: "21/07/2024" },
  { id: 2, date: "01/02/2024" },
  { id: 3, date: "02/09/2024" },
  { id: 4, date: "21/07/2024" },]);

  const handleToggleCalendarView = () => {
    setShowCalendar((prevState) => !prevState);
  };

  const [notifications, setNotifications] = useState([
    { id: 1, date: "21/07/2011" },
    { id: 2, date: "01/01/2011" },
    { id: 3, date: "02/03/2011" },
    { id: 4, date: "21/07/2011" },
  ]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/projects');
        if (!response.ok) throw new Error('Error in response (check path)');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  let users = [
    { id: 1, name: "Test Person", role: "Projektipäällikkö" },
    { id: 2, name: "Matti Meikäläinen", role: "Tyhjän toimittaja" },
    { id: 3, name: "Maija Meikäläinen", role: "En tiä" },
  ];

  
  const activeUserName = users.find((user) => user.id === activeUser)?.name || "???";
  const activeProject = projects.find(project => project._id === activeProjectId);

  const tasks = activeProject?.tasks;

  const deleteNotification = (notificationId) => {
    setNotifications(currentNotifications => 
        currentNotifications.filter(notification => notification.id !== notificationId));
  };

  return (

    <div className="flex h-screen bg-gray-900">
      {console.log("Active project:", activeProject)}
      <Sidebar
        projects={projects}
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
        showAddProjectPopup={showAddProjectPopup}
        activeUserName={activeUserName}
        activeProject={activeProject}
      />
      {/*<TaskTable />*/}
      <div className="flex-grow flex flex-col bg-gray-800">
        <div className="flex-grow p-4 overflow-y-auto">
          <Navbar toggleCalendarView={() => handleToggleCalendarView()}/>
          <div className="mt-4">
            {showCalendar ? (
              <Calendar />
            ) : (
              <> {/* This is shorthand for fragment, means that everything is in one parent */}
                <div className="flex flex-col md:flex-row">
                  <ProjectOverview tasks={tasks} />
                  <div className="md:w-1/3 md:ml-4 mt-4 md:mt-0">
                    <Costs />
                    <Tasks />
                  </div>
                </div>
                <Notifications
                  notifications={notifications}
                  deleteNotification={deleteNotification}/>
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