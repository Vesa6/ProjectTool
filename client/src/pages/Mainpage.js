import React, { useState } from "react";
import LoginPopup from "../components/LoginPopup";
import AddProjectPopup from "../components/AddProjectPopup";
import { IoMdAdd } from "react-icons/io";

const Mainpage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const showLoginPopup = () => setShowLogin(true);
  const hideLoginPopup = () => setShowLogin(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const showAddProjectPopup = () => setShowAddProject(true);
  const hideAddProjectPopup = () => setShowAddProject(false);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeUser, setActiveUser] = useState(1);

  // Dummy data for projects. New box appears in side if you make new project.
  // Date is for sorting projects by date.
  const projects = [
    { id: 1, date: "21/07/2011" },
    { id: 2, date: "01/01/2011" },
    { id: 3, date: "02/03/2011" },
    { id: 4, date: "21/07/2011" },
  ];
  // dummy data for notifications
  let notificatons = [
    { id: 1, date: "21/07/2011" },
    { id: 2, date: "01/01/2011" },
    { id: 3, date: "02/03/2011" },
    { id: 4, date: "21/07/2011" },
  ];
  let users = [
    { id: 1, name: "Test Person", role: "Projektipäällikkö" },
    { id: 2, name: "Matti Meikäläinen", role: "Tyhjän toimittaja"},
    { id: 3, name: "Maija Meikäläinen", role: "En tiä"},
  ];

  // Remove unknown user after auth is done */
  const activeUserName = users.find(user => user.id === activeUser)?.name || "???";

  function deleteNotification() {
    console.log("Notification deleted");
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-50 flex flex-col bg-sideBarBg min-h-screen text-center">
        {/* User profile */}
        <div className="text-white p-4 flex flex-col items-center">
          <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center">
          {/* Placeholder for profile picture */}
          </div>
          {/*<img src={""} alt="ProfileInfo" className="w-full h-full object-cover"></img>*/}
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
              ${project.id === activeProjectId ? 'bg-blue-700' : 'bg-blue-500'} 
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
            <IoMdAdd className=" w-10 h-10" />
          </button>
        </div>
      </div>

      {/* Wide top bar with logout button */}
      <div className="flex-grow flex flex-col bg-gray-800">
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
          {/* Main Content Area */}
        </div>
        {/* Main content in this div!! */}
        {/*Notifications panel*/}
        <div className=" flex-col items w-fit ml-10 mt-5 mb-5 bg-gray-700 shadow-lg p-9 rounded overflow-auto relative h-fit">
          <h2 className="text-white text-2xl font-semibold">NEW</h2>
          {notificatons.map((notification) => (
            <div
              key={notification.id}
              className="w-80 h-16 bg-gray-900 mt-4 ml-4 transition-all duration-300 ease-in-out shadow rounded-bl-lg rounded-br-lg p-4 text-white relative"
              title={`Notification ${notification.id}`}
            >
              <a href="/projekti">Asia x tapahtui projektissa y</a>
              <button
                className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0 m-1"
                onClick={() => deleteNotification()}
              ></button>
            </div>
          ))}
        </div>
      </div>

      {showLogin && <LoginPopup onClose={hideLoginPopup} />}
      {showAddProject && <AddProjectPopup onClose={hideAddProjectPopup} />}
    </div>
  );
};

export default Mainpage;
