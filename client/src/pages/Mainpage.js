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
import SettingsView from "../components/SettingsView.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ParticipantsList from "../components/ParticipantsList";
import ExtLinks from "../components/ExtLinks.js";

const Mainpage = () => {
  const [showLogout, setShowLogout] = useState(false);
  const showLogoutPopup = () => setShowLogout(true);
  const hideLogoutPopup = () => setShowLogout(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const showAddProjectPopup = () => setShowAddProject(true);
  const hideAddProjectPopup = () => setShowAddProject(false);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [users, setUsers] = useState([{id: 1, name: "testuser", role: "test"}]);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeUser, setActiveUser] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [showTasksview, setShowTasksview] = useState(false);
  const [showSettingsView, setShowSettingsView] = useState(false);
  const [user, SetUser] = useState("");
  const navigate = useNavigate();

  function checkLogin() {
    let user = window.localStorage.getItem("loggedUser");
    if (user) {
      let jsonedUser = JSON.parse(user);
      SetUser(jsonedUser.name);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    checkLogin();
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [reloadTrigger]);

  const handleToggleOverview = () => {
    setShowTasksview(false);
    setShowCalendar(false);
    setShowSettingsView(false);
  };

  const handleToggleCalendarView = () => {
    setShowTasksview(false);
    setShowSettingsView(false);
    setShowCalendar((prevState) => !prevState);
  };
  const handleToggleSettingsView = () => {
    setShowTasksview(false);
    setShowCalendar(false);
    setShowSettingsView((prevState) => !prevState);
  };
  const handleToggleTasksView = () => {
    setShowCalendar(false);
    setShowSettingsView(false);
    setShowTasksview((prevState) => !prevState);
  };
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New person added to Project Z", date: "02/04/2024" },
    { id: 2, message: "New person added to Project Y", date: "03/04/2024" },
    { id: 3, message: "Project X has 7 days left", date: "04/04/2024" },
  ]);

  const fetchProjects = () => {
    setIsLoading(true);
    fetch("http://localhost:3001/api/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  const fetchUsers = () => {
    setIsLoading(true);
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  function parseAllTasks(projects) {
    const allTasks = projects.flatMap((project) => project.tasks);
    return allTasks;
  }
    const activeUserName =
    user
  const activeProject = projects.find(
    (project) => project._id === activeProjectId
  );
  const tasks = activeProject?.tasks;

  const deleteNotification = (notificationId) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  if (user === "") {
    checkLogin();
    return <Navigate to="/login"></Navigate>;
  }

  if (isLoading) {
    // Show loading spinner or something ? Simply rendering div causes screen flashing upon some updates...
    // Too intrusive, making it look janky.
  }
  function successNotify(message) {
    toast.success(message, {
      position: "top-center",
      theme: "dark",
      containerId: "B",
    });
  }
  function errorNotify(message) {
    toast.error(message, {
      position: "top-center",
      theme: "dark",
      containerId: "B",
    });
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <ToastContainer containerId="B" />
      <Sidebar
        projects={projects}
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
        showAddProjectPopup={showAddProjectPopup}
        activeUserName={activeUserName}
        activeProject={activeProject}
        fetchProjects={fetchProjects}
        fetchUsers={fetchUsers}
      />
      <div className="flex-grow flex flex-col bg-gray-800">
        <div className="flex-grow p-4 overflow-y-auto">
          <Navbar
            toggleCalendarView={handleToggleCalendarView}
            toggleTasksView={handleToggleTasksView}
            toggleSettingsView={handleToggleSettingsView}
            toggleOverview={handleToggleOverview}
          />
          {showCalendar ? (
            <Calendar
              activeProject={activeProject}
              allProjects={projects}
              activeProjectId={activeProjectId}
              fetchProjects={fetchProjects}
            />
          ) : showTasksview ? (
            <TasksView allProjects={projects} fetchProjects={fetchProjects} />
          ) : showSettingsView ? (
            <SettingsView />
          ) : (
            <>
              {activeProjectId ? (
                <div className="bg-gray-700 text-white p-4 m-4 rounded-lg">
                  <h2 className="text-xl font-bold">{activeProject?.project}</h2>
                  <p>{activeProject?.description}</p>
                  <ProjectOverview project={activeProject} />
                </div>
              ) : null}
              <div className="mt-4 flex flex-col md:flex-row">
                <div className="md:w-1/2 md:pr-4">
                  <ParticipantsList activeProject={activeProject} fetchUsers={fetchUsers} users={users} fetchProjects={fetchProjects}/>
                  <Notifications
                    notifications={notifications}
                    deleteNotification={deleteNotification}
                    activeProjectId={activeProjectId}
                  />
                  <ExtLinks
                    deleteNotification={deleteNotification}
                    activeProjectId={activeProjectId}
                  />
                </div>
                <div className="md:w-1/2">
                  <Tasks tasks={activeProjectId ? activeProject?.tasks : parseAllTasks(projects)} />
                  {activeProjectId ? (
                  <Costs activeProject={activeProject} fetchProjects={fetchProjects} />
                  ) : null}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {showLogout && <LogOutPopup onClose={hideLogoutPopup} />}
      {showAddProject && (
        <AddProjectPopup
          onClose={hideAddProjectPopup}
          reloadTrigger={reloadTrigger}
          setReloadTrigger={setReloadTrigger}
          successNotify={successNotify}
          errorNotify={errorNotify}
        />
      )}
    </div>
  );
};


export default Mainpage;
