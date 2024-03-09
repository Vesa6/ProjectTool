import React from "react";

const ProjectBox = ({ project, activeProjectId, setActiveProjectId }) => {
  return (
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
  );
};

export default ProjectBox;