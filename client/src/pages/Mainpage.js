import React, { useState } from "react";
import LoginPopup from "../components/LoginPopup";
import AddProjectPopup from "../components/AddProjectPopup";
import { IoMdAdd } from "react-icons/io";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const Mainpage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const showLoginPopup = () => setShowLogin(true);
  const hideLoginPopup = () => setShowLogin(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const showAddProjectPopup = () => setShowAddProject(true);
  const hideAddProjectPopup = () => setShowAddProject(false);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeUser, setActiveUser] = useState(1);

  const projects = [
    { id: 1, date: "21/07/2011" },
    { id: 2, date: "01/01/2011" },
    { id: 3, date: "02/03/2011" },
    { id: 4, date: "21/07/2011" },
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

  const activeUserName = users.find((user) => user.id === activeUser)?.name || "???";

  function deleteNotification() {
    console.log("Notification deleted");
  }

  // Dummy data for bar chart
  const barChartData = [
    { name: "Actual", value: 300 },
    { name: "Planned", value: 225 },
    { name: "Budget", value: 150 },
  ];

  // Dummy data for pie chart
  const pieChartData = [
    { name: "Not started", value: 4 },
    { name: "Completed", value: 7 },
    { name: "In Progress", value: 7 },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#EF4444"];


  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-50 flex flex-col bg-sideBarBg text-center">
        {/* User profile */}
        <div className="text-white p-4 flex flex-col items-center">
          <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center">
            {/* Placeholder for profile picture */}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col w-40 h-20 bg-gray-800 p-2 rounded-md items-center">
            <p className="text-lg text-white font-semibold mt-2">{activeUserName}</p>
            <p className="text-sm text-white">{"Projektipäällikkö"}</p>
          </div>
        </div>
        {/* Sidebar top text */}
        <div className="text-white p-4">
          <h2 className="text-xl font-semibold">PROJEKTIT</h2>
        </div>
        {/* Project boxes, "icons" */}
        <div className="flex-grow p-4 overflow-y-auto flex flex-col">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`
                w-40 h-20 rounded-xl mb-4
                transition-all duration-300 ease-in-out
                focus:outline-none
                ${project.id === activeProjectId ? "bg-blue-700" : "bg-blue-500"}
                hover:bg-blue-700
              `}
              onClick={() => setActiveProjectId(project.id)}
            ></button>
          ))}
          <button
            className="w-40 h-20 bg-white place-items-end rounded-xl hover:rounded-2xl transition-all duration-300 ease-in-out flex items-center justify-center"
            title="Lisää uusi projekti"
            onClick={showAddProjectPopup}
          >
            <IoMdAdd className="w-10 h-10" />
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow flex flex-col">
        {/* Wide top bar with logout button */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <div className="p-4 bg-navBarPadding rounded m-2 text-xl">
            <button className="bg-navBarButton mt-2 w-60 h-20 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded">
              CALENDAR
            </button>
          </div>
          <div className="p-4 bg-navBarPadding rounded m-2 text-xl">
            <button className="bg-navBarButton mt-2 w-60 h-20 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded">
              PROGRESS
            </button>
          </div>
          <div className="p-4 bg-navBarPadding rounded m-2 text-xl">
            <button className="bg-navBarButton mt-2 w-60 h-20 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded">
              WORKLOAD
            </button>
          </div>
          <div className="p-4 bg-navBarPadding rounded m-2 text-xl">
            <button className="bg-navBarButton mt-2 w-60 h-20 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded">
              EDIT VIEW
            </button>
          </div>
          <button
            className="bg-customButton hover:bg-customButtonHover text-white px-4 py-2 rounded"
            onClick={showLoginPopup}
          >
            Login
          </button>
        </div>

        {/* Main content */}
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="flex">
            {/* Project overview */}
            <div className="w-2/3 bg-gray-700 p-4 rounded shadow-lg">
              <h2 className="text-white text-2xl font-semibold mb-4">OVERALL</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded">
                  <p className="text-white">Time</p>
                  <p className="text-white">33% ahead of schedule</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <p className="text-white">Tasks</p>
                  <p className="text-white">11 tasks to be completed</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <p className="text-white">Workload</p>
                  <p className="text-white">2 tasks overdue</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <p className="text-white">Progress</p>
                  <p className="text-white">59% complete</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <p className="text-white">Cost</p>
                  <p className="text-white">27% under budget</p>
                </div>
              </div>
            </div>

            {/* Costs and Tasks */}
            <div className="w-1/3 ml-4">
              {/* Costs */}
              <div className="bg-gray-700 p-4 rounded shadow-lg mb-4">
                <h2 className="text-white text-xl font-semibold mb-4">COSTS</h2>
                <div className="flex justify-between">
                  <div>
                    <p className="text-white">Actual</p>
                    <p className="text-white">300K</p>
                  </div>
                  <div>
                    <p className="text-white">Planned</p>
                    <p className="text-white">225K</p>
                  </div>
                  <div>
                    <p className="text-white">Budget</p>
                    <p className="text-white">150K</p>
                  </div>
                </div>
                {/* Dummy bar chart */}
                <div className="mt-4">
                   <BarChart width={300} height={200} data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </div>
              </div>

              {/* Tasks */}
              <div className="bg-gray-700 p-4 rounded shadow-lg">
                <h2 className="text-white text-xl font-semibold mb-4">TASKS</h2>
                {/* Dummy pie chart */}
                <div className="flex justify-center">
                <PieChart width={200} height={200}>
                    <Pie
                      data={pieChartData}
                      cx={100}
                      cy={100}
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <p className="text-white">Not started (4)</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-white">Completed (7)</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    <p className="text-white">In Progress (7)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications panel */}
          <div className="mt-4 bg-gray-700 p-4 rounded shadow-lg">
            <h2 className="text-white text-2xl font-semibold mb-4">NEW</h2>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-gray-800 p-4 rounded mb-2 flex justify-between items-center"
              >
                <p className="text-white">Notification {notification.id}</p>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={deleteNotification}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLogin && <LoginPopup onClose={hideLoginPopup} />}
      {showAddProject && <AddProjectPopup onClose={hideAddProjectPopup} />}
    </div>
  );
};

export default Mainpage;