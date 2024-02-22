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

  // Dummy data for projects. New box appears in side if you make new project.
  // Date is for sorting projects by date.
  const projects = [
    { id: 1, date: "21/07/2011" },
    { id: 2, date: "01/01/2011" },
    { id: 3, date: "02/03/2011" },
    { id: 4, date: "21/07/2011" },
  ];
  // dummy data for notifications
  var notificatons = [
    { id: 1, date: "21/07/2011" },
    { id: 2, date: "01/01/2011" },
    { id: 3, date: "02/03/2011" },
    { id: 4, date: "21/07/2011" },
  ];

  // fucntion that deletes notification from the list
  function deleteNotification() {
    console.log("Notification deleted");
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-50 flex flex-col bg-gray-900 min-h-screen text-center">
        {/* Sidebar top text */}
        <div className="text-white p-4">
          <h2 className="text-xl font-semibold">PROJEKTIT</h2>
        </div>

        {/* Project boxes, "icons" */}
        <div className="flex-grow p-4 overflow-y-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-icon w-40 h-20 bg-blue-500 rounded-xl mb-4 hover:rounded-2xl transition-all duration-300 ease-in-out"
              title={`Project ${project.id}`}
            ></div>
          ))}
          <button
            className="w-40 h-20 bg-white place-items-end rounded-xl hover:rounded-2xl transition-all duration-300 ease-in-out flex items-center justify-center "
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
          <h2 className="text-xl font-semibold">Project Management</h2>
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
          <h2 className="text-white text-2xl font-semibold">Tapahtumat</h2>
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
