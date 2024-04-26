import React, { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import moment from "moment";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditProjectPopup from "../components/EditProjectPopup";
import { useState } from "react";

const Sidebar = ({
  projects,
  activeProject,
  activeProjectId,
  setActiveProjectId,
  showAddProjectPopup,
  activeUserName,
  fetchProjects,
}) => {
  const calculateDaysLeft = (ends) => {
    console.log(ends);
    const currentDate = moment();
    const targetDate = moment(ends, "DD/MM/YYYY");

    //  console.log('Current Date:', currentDate.format("DD/MM/YYYY"));
    //  console.log('Target Date:', targetDate.format("DD/MM/YYYY"));
    //  console.log('Days Left:', targetDate.diff(currentDate, "days"));

    return targetDate.diff(currentDate, "days");
  };
  const [projectToEdit, setProjectToEdit] = useState({});
  const hideEditProjectPopup = () => {
    setProjectToEdit({});
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const findProjectToEdit = (projectId) => {
    const project = projects.find((project) => project._id === projectId);
    setProjectToEdit(project);
    console.log(project);
  };

  const editProject = async (project) => {
    const url = `http://localhost:3001/api/projects/${projectToEdit._id}/update-project`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        throw new Error("Failed to edit project");
      }
      // notify for successful edit here
      fetchProjects();
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    window.localStorage.setItem("loggedUser", "");
    navigate("/login");
  };

  const ProjectTooltip = ({ projectId }) => (
    <Tooltip
      id={`options-${projectId}`}
      clickable
      onClick={(e) => {
        e.stopPropagation();
        console.log("demo");
      }}
    >
      <div className="p-2 rounded text-sm flex flex-col w-20">
        <button
          className="text-white hover:text-slate-300"
          onClick={() => findProjectToEdit(projectId)}
        >
          Edit
        </button>
        <button className="text-white hover:text-slate-300">Delete</button>
      </div>
    </Tooltip>
  );

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
        <button
          className="bg-navBarButton mt-2 mb-6 w-20 h-10 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded"
          onClick={() => handleLogout()}
        >
          Logout
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
            key={project._id}
            className={`flex items-center justify-between px-4 py-3 mb-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out ${
              project._id === activeProjectId ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-blue-600`}
            onClick={() =>
              setActiveProjectId(
                activeProjectId === project._id ? undefined : project._id
              )
            }
          >
            <div>
              <p className="text-white font-semibold">{project.data.name}</p>
              {/* Other project details */}
            </div>
            <div
              className="flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                data-tooltip-id={`options-${project._id}`}
                data-tooltip-place="right"
              >
                <BsThreeDotsVertical />
              </a>
              <ProjectTooltip projectId={project._id} />
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
      {projectToEdit._id && (
        <EditProjectPopup
          project={projectToEdit}
          fetchProjects={fetchProjects}
          onClose={hideEditProjectPopup}
          editProject={editProject}
        />
      )}
    </div>
  );
};

export default Sidebar;
