import React from "react";
import { IoMdAdd } from "react-icons/io";
import moment from "moment";

const Sidebar = ({ projects, activeProjectId, setActiveProjectId, showAddProjectPopup, activeUserName, showLoginPopup }) => {
  const calculateDaysLeft = (projectDate) => {
    const currentDate = moment();
    const targetDate = moment(projectDate, "DD/MM/YYYY");
  
    // console.log('Current Date:', currentDate.format("DD/MM/YYYY"));
    // console.log('Target Date:', targetDate.format("DD/MM/YYYY"));
    // console.log('Days Left:', targetDate.diff(currentDate, "days"));
  
    return targetDate.diff(currentDate, "days");
  };
  

  return (
    <div className="w-64 flex flex-col bg-gray-800 min-h-screen">
      {/* User profile */}
      <div className="p-8 flex flex-col items-center">
        <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mb-4">
          {/* Placeholder for profile picture */}
        </div>
        <p className="text-white text-xl font-semibold">{activeUserName}</p>
        <p className="text-gray-400">Project Manager</p>
      </div>
      <div className="flex flex-col items-center">
        <button className="bg-navBarButton mt-2 mb-6 w-20 h-10 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded"
          onClick={showLoginPopup}>
          Login
        </button>
      </div>

      {/* Search Projects */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Projects..."
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none"
        />
      </div>

      {/* Project boxes */}
      <div className="flex-grow p-4 overflow-y-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`
              flex items-center justify-between
              px-4 py-3 mb-2 rounded-md cursor-pointer
              transition-all duration-300 ease-in-out
              ${project.id === activeProjectId ? "bg-blue-600" : "bg-gray-700"}
              hover:bg-blue-600
            `}
            onClick={() => setActiveProjectId(project.id)}
          >
            <div>
              <p className="text-white font-semibold">Project {project.id}</p>
              <p className="text-gray-400 text-sm">DAYS LEFT: {calculateDaysLeft(project.date)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Projects button */}
      <div className="p-4">
        <button
          className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300 ease-in-out flex items-center justify-center"
          onClick={showAddProjectPopup}
        >
          <IoMdAdd className="mr-2" />
          Add Projects
        </button>
      </div>
    </div>
  );
};

export default Sidebar;