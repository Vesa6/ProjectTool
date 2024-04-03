import React from "react";

// defaults to empty array to avoid problems
const ProjectOverview = ({tasks = [] }) => {

  let completedTasks = 0;
  let inProgressTasks = 0;

  for (let task of tasks) {
    if (task.status === "Completed") {
      completedTasks++;
    } else {
      inProgressTasks++;
    }
  }

  const completionPercentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;


  return (
    <div className="w-2/3 bg-gray-700 p-4 rounded shadow-lg">
      <h2 className="text-white text-2xl font-semibold mb-4">OVERALL</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Time</p>
          <p className="text-white">33% ahead of schedule</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Tasks</p>
          <p className="text-white">{inProgressTasks} tasks to be completed</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Workload</p>
          <p className="text-white">2 tasks overdue</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Progress</p>
          <p className="text-white">{completionPercentage}% complete</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Cost</p>
          <p className="text-white">27% under budget</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;