import React, { useState } from "react";

const AddProjectPopup = ({ onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!projectName || !projectDescription) {
      alert("Please fill in all fields");
      return;
    }
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 rounded-lg shadow-xl pt-16 px-16 pb-5 relative w-1/3 max-w-lg"
      >
        <button
          className="absolute text-3xl top-0 right-0 p-3 m2 mr-2 hover:text-slate-300 text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className=" text-2xl font-bold text-center m-3 text-white">
          Create Project:
        </h2>
        <div className="flex flex-col space-y-2">
          <label className="text-white" htmlFor="projectName">
            Project Name:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <label className="text-white" htmlFor="projectDescription">
            Project Description:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <label className="text-white" htmlFor="projectManager">
            Project Manager:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
          ></input>
          <label className="text-white" htmlFor="projectBudget">
            Budgeted hours:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="number"
          ></input>
          <label className="text-white" htmlFor="startDate">
            Begins on:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="date"
          ></input>
          <label className="text-white" htmlFor="deadline">
            Deadline:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="date"
          ></input>
          <div className="h-5" />
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectPopup;
