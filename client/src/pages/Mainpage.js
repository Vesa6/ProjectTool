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
import TasksView from "../components/TasksView";
import "react-calendar/dist/Calendar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [showTasksview, setShowTasksview] = useState(false);
  const [user, SetUser] = useState("");
  const navigate = useNavigate();

  function checkLogin() {
    let user = window.localStorage.getItem("loggedUser");
    if (user) {
      let jsonedUser = JSON.parse(user);
      SetUser(jsonedUser.name);
    }
  };

  const handleLogout = () => {
    window.localStorage.setItem("loggedUser", "");
    navigate("/login");
  };

  const handleToggleCalendarView = () => {
    setShowTasksview(false);
    setShowCalendar((prevState) => !prevState);
  };

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New person added to Project Z", date: "02/04/2024" },
    { id: 2, message: "New person added to Project Y", date: "03/04/2024" },
    { id: 3, message: "Project X has 7 days left", date: "04/04/2024" },
  ]);

  const handleToggleTasksView = () => {
    setShowCalendar(false);
    setShowTasksview((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(projects);
    fetch('http://localhost:3001/api/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  function parseAllTasks(projects) {
    const allTasks = projects.flatMap(project => project.tasks);
    return allTasks;
  }

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

  if (user === "") {
    checkLogin();
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar
        projects={projects}
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
        showAddProjectPopup={showAddProjectPopup}
        activeUserName={activeUserName}
        activeProject={activeProject}
      />
      <div className="flex-grow flex flex-col bg-gray-800">
        <div className="flex-grow p-4 overflow-y-auto">
          <Navbar
            toggleCalendarView={handleToggleCalendarView}
            toggleTasksView={handleToggleTasksView}
          />
          {showCalendar ? (
            <Calendar activeProject={activeProject} />
          ) : showTasksview ? (
            <TasksView />
          ) : activeProjectId ? (
            <div className="bg-gray-700 text-white p-4 m-4 rounded-lg">
              <h2 className="text-xl font-bold">{activeProject?.project}</h2>
              <p>{activeProject?.description}</p>
              <ProjectOverview project={activeProject} />
            </div>
          ) : (
            <div className="mt-4">
              <div className="flex flex-col md:flex-row">
                <div className="md:flex-grow">
                  <Notifications
                    notifications={notifications}
                    deleteNotification={deleteNotification}
                  />
                </div>
                <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0">
                  <Tasks projects={parseAllTasks(projects)} />
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          className="bg-navBarButton mt-2 mb-6 w-20 h-10 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded center"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {showLogout && <LogOutPopup onClose={hideLogoutPopup} />}
      {showAddProject && <AddProjectPopup onClose={hideAddProjectPopup} />}
    </div>
  );
};

export default Mainpage;
