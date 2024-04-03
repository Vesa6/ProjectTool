import { useState } from "react";

const EditTaskPopup = ({ onClose, taskToEdit }) => {
  const [assignee, setAssignee] = useState(taskToEdit.assignee);
  const [status, setStatus] = useState(taskToEdit.status);
  const [deadline, setDeadline] = useState(taskToEdit.deadline);

  const handleAssigneeChange = (e) => {
    setAssignee(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleEditTask = () => {
    // Add logic to handle editing the task
    // Reset task name input

    taskToEdit.assignee = assignee;
    taskToEdit.status = status;
    taskToEdit.deadline = deadline;
  };

  const handleSubmit = (e) => {
    // Add logic to handle submitting the task
    handleEditTask();
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
          {taskToEdit.name}
        </h2>
        <h3 className="text-center font-bold m-3 text-white">
          Part of project: {taskToEdit.project}
        </h3>
        <div className="flex flex-col space-y-2">
          <label className="text-white" htmlFor="assignee">
            Assignee:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            value={assignee}
            onChange={handleAssigneeChange}
          />
          <label className="text-white" htmlFor="status">
            Status:
          </label>
          <select
            className="bg-gray-200 text-black p-2 rounded"
            name="status"
            value={status}
            defaultValue={taskToEdit.status}
            onChange={handleStatusChange}
          >
            <option value="Not started">Not started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <label className="text-white" htmlFor="deadline">
            Deadline:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="date"
            value={deadline}
            onChange={handleDeadlineChange}
          ></input>
          <div className="h-5" />
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            type="submit"
            onClick={() => handleSubmit()}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditTaskPopup;