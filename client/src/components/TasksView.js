import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddTaskPopup from "./tasksviewcomponents/AddTaskPopup";
import { Tooltip } from "react-tooltip";
import EditTaskPopup from "./tasksviewcomponents/EditTaskPopup";
import { toast, ToastContainer } from "react-toastify";

function applyFilter() {
  const filter = document.getElementById("filter").value;
  const rows = document.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    if (filter === "All") {
      rows[i].style.display = "";
    } else {
      if (cells[3].innerText !== filter) {
        rows[i].style.display = "none";
      } else {
        rows[i].style.display = "";
      }
    }
  }
}

const TasksView = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const showAddTaskPopup = () => setShowAddTask(true);
  const hideAddTaskPopup = () => setShowAddTask(false);

  const [taskToEdit, setTaskToEdit] = useState({});
  const hideEditTaskPopup = () => setTaskToEdit({});

  const findTask = (taskId) => {
    setTaskToEdit(tasks.find((task) => task.id === taskId));
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      project: "Project 1",
      name: "login page",
      description: "Description 1",
      assignee: "Ismo",
      deadline: "2024-01-01",
      status: "Not started",
    },
    {
      id: 2,
      project: "Project 2",
      name: "login backend",
      description: "Description 2",
      assignee: "Teppo",
      deadline: "2024-01-01",
      status: "Completed",
    },
    {
      id: 3,
      project: "Project 3",
      name: "main backend",
      description: "Description 3",
      assignee: "Matti",
      deadline: "2024-01-01",
      status: "In Progress",
    },
    {
      id: 4,
      project: "Project 4",
      name: "main page",
      description: "Description 4",
      assignee: "Maija",
      deadline: "2024-01-01",
      status: "Completed",
    },
    {
      id: 5,
      project: "Project 5",
      name: "login page",
      description: "Description 5",
      assignee: "Ismo",
      deadline: "2024-01-01",
      status: "Not started",
    },
    {
      id: 6,
      project: "Project 6",
      name: "login backend",
      description: "Description 6",
      assignee: "Teppo",
      deadline: "2024-01-01",
      status: "Completed",
    },
    {
      id: 7,
      project: "Project 7",
      name: "main backend",
      description: "Description 7",
      assignee: "Matti",
      deadline: "2024-01-01",
      status: "In Progress",
    },
    {
      id: 8,
      project: "Project 8",
      name: "main page",
      description: "Description 8",
      assignee: "Maija",
      deadline: "2024-01-01",
      status: "Completed",
    },
  ]);

  const deleteTask = (taskId) => {
    console.log("Deleting task with ID:", taskId);
    setTasks((currentTasks) => {
      const filteredTasks = currentTasks.filter((task) => task.id !== taskId);
      console.log("Remaining tasks after deletion:", filteredTasks);
      toast.success("Task deleted!", {
        position: "top-center",
        theme: "dark",
      });
      return filteredTasks;
    });
  };

  const changeToCompleted = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id === taskId) {
          task.status = "Completed";
          toast.success("Task marked as completed", {
            position: "top-center",
            theme: "dark",
          });
        }
        return task;
      })
    );
  };
  const successfulEditNotify = () => {
    console.log("in success notify");
    toast.success("Task edited successfully", {
      position: "top-center",
      theme: "dark",
    });
    /*     alert("Task edited successfully"); */
  };
  const successfulAddNotify = () => {
    toast.success("Task added successfully", {
      position: "top-center",
      theme: "dark",
    });
  };

  const checkFieldsNotify = () => {
    toast.error("Please fill in all fields", {
      position: "top-center",
      theme: "dark",
    });
  };

  const TaskTooltip = ({ taskId, onDelete, onComplete }) => (
    <Tooltip id={`options-${taskId}`} clickable>
      <div className="p-2 rounded text-sm flex flex-col w-20">
        <button
          className="text-white hover:text-slate-300"
          onClick={() => findTask(taskId)}
        >
          Edit
        </button>
        <button
          className="text-white hover:text-slate-300"
          onClick={() => onDelete(taskId)}
        >
          Delete
        </button>
        <button
          className="text-white hover:text-slate-300"
          onClick={() => onComplete(taskId)}
        >
          Mark as completed
        </button>
      </div>
    </Tooltip>
  );

  return (
    <div className="h-screen">
      <ToastContainer />
      <div className="flex">
        <h1 className="text-white text-3xl">Tasks</h1>
        <select
          name="Filter by"
          id="filter"
          className="rounded ml-auto"
          onChange={applyFilter}
          defaultValue={""}
        >
          <option value="" disabled>
            Filter by:
          </option>
          <option value="All">All</option>
          <option value="Not started">Not started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          className="bg-customButton rounded ml-3 p-3 hover:bg-customButtonHover"
          onClick={showAddTaskPopup}
        >
          + Add Task
        </button>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="text-slate-500">
            <th className="">Project</th>
            <th className="">Task name</th>
            <th className="">Deadline</th>
            <th className="">Status</th>
            <th className="">Assignee</th>
            <th className="">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {tasks.map((task) => (
            <tr key={task.id} className="mt-10">
              <td className="text-white">{task.project}</td>
              <td className="text-white">{task.name}</td>
              <td className="text-white">{task.deadline}</td>
              <td className="text-white">{task.status}</td>
              <td className="text-white">{task.assignee}</td>
              <td className="text-slate-500 text-4xl flex justify-center items-center mt-3">
                <div className="flex justify-center items-center">
                  <a
                    data-tooltip-id={`options-${task.id}`}
                    data-tooltip-place="left"
                  >
                    <BsThreeDotsVertical />
                  </a>
                  <TaskTooltip
                    taskId={task.id}
                    onDelete={deleteTask}
                    onComplete={changeToCompleted}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddTask && (
        <AddTaskPopup
          onClose={hideAddTaskPopup}
          setTasks={setTasks}
          tasks={tasks}
          checkFieldsNotify={checkFieldsNotify}
          successNotify={successfulAddNotify}
        />
      )}
      {taskToEdit.id && (
        <EditTaskPopup
          onClose={hideEditTaskPopup}
          setTasks={setTasks}
          taskToEdit={taskToEdit}
          checkFieldsNotify={checkFieldsNotify}
          successNotify={successfulEditNotify}
        />
      )}
    </div>
  );
};

export default TasksView;
