import React, { useState } from "react";

const AddTaskPopup = ({
  onClose,
  checkFieldsNotify,
  addTaskToProject,
  projects,
}) => {
  const [taskName, setTaskName] = useState("");
  const [projectId, setProjectId] = useState();
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("Not started");
  const [deadline, setDeadline] = useState("");

  const [newTask, setNewTask] = useState({
    title: "",
    status: "",
    start: " ",
    end: "",
    participants: "",
    description: "",
  });

  // parse projects to get the project names as optons for the select.
  const projectOptions = projects.map((project) => (
    <option value={project.id} className="text-white ">
      {project.project}
    </option>
  ));

  const handleAddTask = () => {
    // Add logic to handle adding the task

    // check that all the fields are filled
    if (!taskName || !projectId || !assignee || !deadline) {
      checkFieldsNotify();
      return;
    }

    setNewTask({
      title: taskName,
      status: status,
      start: " ",
      end: deadline,
      participants: assignee,
      description: "",
    });
    console.log("New task:", newTask);
    console.log("Project ID:", projectId);
    addTaskToProject(projectId, newTask);
    // Reset task name input
    setTaskName("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle submitting the task
    handleAddTask();
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
          Create Task:
        </h2>
        <div className="flex flex-col space-y-2">
          <label className="text-white" htmlFor="projectName">
            Project Name:
          </label>
          <select
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            {projectOptions}
          </select>

          <label className="text-white" htmlFor="taskName">
            Task Name:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <label className="text-white" htmlFor="projectDescription">
            Assignee:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
          <label className="text-white" htmlFor="status">
            Status:
          </label>
          <select className="bg-gray-200 text-black p-2 rounded" name="status">
            <option value="Not started">Not started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            onChange={(e) => setStatus(e.target.value)}
          </select>
          <label className="text-white" htmlFor="deadline">
            Deadline:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          ></input>
          <div className="h-5" />
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            type="submit"
            onSubmit={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskPopup;
