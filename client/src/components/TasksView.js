import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddTaskPopup from "./tasksviewcomponents/AddTaskPopup";
import { Tooltip } from "react-tooltip";
import EditTaskPopup from "./tasksviewcomponents/EditTaskPopup";
import { toast, ToastContainer } from "react-toastify";
import EditProjectPopup from "../components/EditProjectPopup";

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

const TasksView = ({ allProjects, fetchProjects }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const showAddTaskPopup = () => setShowAddTask(true);
  const hideAddTaskPopup = () => setShowAddTask(false);

  const [taskToEdit, setTaskToEdit] = useState({});
  const hideEditTaskPopup = () => setTaskToEdit({});

  const findTask = (taskId) => {
    console.log("Finding task with ID:", taskId);
    setTaskToEdit(tasks.find((task) => task._id === taskId));
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

  //useEffect for listening to changes in tasks

  async function addTaskToProject(projectId, newTask) {
    const url = `http://localhost:3001/api/projects/${projectId}/add-task`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      console.log("Task added successfully");
      successfulAddNotify();
      fetchProjects();
    } catch (error) {
      console.error("Error adding task:", error);
      fetchProjects(); // here just in case, should not be needed.
    }
  }

  async function editTask(projectId, updatedTask) {
    const url = `http://localhost:3001/api/projects/${projectId}/update-task`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error("Failed to edit task");
      }
      console.log("Task edited successfully");
      successfulEditNotify();
      fetchProjects();
    } catch (error) {
      console.error("Error editing task:", error);
      fetchProjects(); // here just in case, should not be needed.
    }
  }

  function parseAllTasks(projects) {
    console.log("Parsing all tasks");
    console.log("Projects:", projects);
    // Flatten all tasks from all projects into a single array and add projetct name to each task
    let allTasks = [];
    try {
      allTasks = projects.flatMap((project) =>
        project.tasks.map((task) => {
          task.project = project.data.name;
          task.projectId = project._id;
          return task;
        })
      );
    } catch (error) {
      console.error("Error parsing all tasks:", error);
      return [];
    }

    console.log("All tasks:", allTasks);
    return allTasks;
  }

  useEffect(() => {
    fetchProjects();
    setTasks(parseAllTasks(allProjects));
  }, []);

  useEffect(() => {
    setTasks(parseAllTasks(allProjects));
  }, [allProjects]);

  const deleteTask = (taskId) => {
    const tasktoDelete = tasks.find((task) => task._id === taskId);
    const projectId = tasktoDelete.projectId;
    const url = `http://localhost:3001/api/projects/${projectId}/delete-task/${taskId}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        console.log("Task deleted successfully");
        fetchProjects();
        toast.success("Task deleted successfully", {
          position: "top-center",
          theme: "dark",
        });
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task, please try again", {
          position: "top-center",
          theme: "dark",
        });
        fetchProjects(); // here just in case, should not be needed.
      });
  };

  const changeToCompleted = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task._id === taskId) {
          task.status = "Completed";
          editTask(task.projectId, task);
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
    <div className="max-h-full">
      <ToastContainer />
      <div className="flex mt-3">
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
            <th className="">Start</th>
            <th className="">Deadline</th>
            <th className="">Status</th>
            <th className="">Assignee</th>
            <th className="">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {tasks.map((task) => (
            <tr key={task._id} className="mt-10">
              <td className="text-white">{task.project}</td>
              <td className="text-white">{task.title}</td>
              <td className="text-white">{task.start}</td>
              <td className="text-white">{task.end}</td>
              <td className="text-white">{task.status}</td>
              <td className="text-white">{task.participants}</td>
              <td className="text-slate-500 text-4xl flex justify-center items-center mt-3">
                <div className="flex justify-center items-center">
                  <a
                    data-tooltip-id={`options-${task._id}`}
                    data-tooltip-place="left"
                  >
                    <BsThreeDotsVertical />
                  </a>
                  <TaskTooltip
                    taskId={task._id}
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
          addTaskToProject={addTaskToProject}
          projects={allProjects}
        />
      )}
      {taskToEdit._id && (
        <EditTaskPopup
          onClose={hideEditTaskPopup}
          setTasks={setTasks}
          taskToEdit={taskToEdit}
          checkFieldsNotify={checkFieldsNotify}
          successNotify={successfulEditNotify}
          editTask={editTask}
        />
      )}
    </div>
  );
};

export default TasksView;
