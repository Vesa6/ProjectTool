import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ProjectServices from "./apicomponents/Projectservices";
const AddProjectPopup = ({ onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectStart, setProjectStart] = useState("");
  const [projectEnd, setProjectEnd] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !projectName ||
      !projectDescription ||
      !projectStart ||
      !projectEnd ||
      !projectBudget ||
      !projectManager
    ) {
      toast.error("Please fill all the fields", {
        position: "top-center",
        theme: "dark",
      });
    }

    let project = {
      name: projectName,
      description: projectDescription,
      manager: projectManager,
      budget: projectBudget,
      start: projectStart,
      end: projectEnd,
    };

    try {
      let response = await ProjectServices.postProjects(project);
      console.log(response);
      if (response.status === 200) {
        toast.success("Project added successfully!", {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (e) {
      toast.error("Failed to send", {
        position: "top-center",
        theme: "dark",
      });
    }
    setTimeout(() => {
      //
      onClose();
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center overflow-hidden">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 rounded-lg shadow-xl pt-16 px-16 pb-5 relative w-1/3 max-w-lg max-h-full overflow-y-auto"
      >
        <button
          className="absolute text-3xl top-0 right-0 p-3 m2 mr-2  text-slate-300 hover:text-gray-500"
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
            value={projectManager}
            onChange={(e) => setProjectManager(e.target.value)}
          ></input>
          <label className="text-white" htmlFor="projectBudget">
            Budgeted hours:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="number"
            value={projectBudget}
            onChange={(e) => setProjectBudget(e.target.value)}
          ></input>
          <label className="text-white" htmlFor="startDate">
            Begins on:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="date"
            value={projectStart}
            onChange={(e) => setProjectStart(e.target.value)}
          ></input>
          <label className="text-white" htmlFor="deadline">
            Ends on:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="date"
            value={projectEnd}
            onChange={(e) => setProjectEnd(e.target.value)}
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
