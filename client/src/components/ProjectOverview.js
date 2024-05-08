import React from "react";

const ProjectOverview = ({ project }) => {
  const tasks = project?.tasks || [];
  let completedTasks = 0;
  let inProgressTasks = 0;

  for (let task of tasks) {
    if (task.status === "Completed") {
      completedTasks++;
    } else {
      inProgressTasks++;
    }
  }

  const completionPercentage =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;


  const actual = project?.actual || 0;
  const budget = project?.budget || 0;
  const planned = project?.planned || 0;
  const costPercentage =
    budget !== 0 ? Math.round(((actual - budget) / budget) * 100) : 0;
  const plannedPercentage =
    budget !== 0 ? Math.round((planned / budget) * 100) : 0;

  return (
    <div className="w-2/3 bg-gray-700 p-4 rounded shadow-lg">
      <h2 className="text-white text-2xl font-semibold mb-4">Overall</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Tasks</p>
          <p className="text-white">{inProgressTasks} tasks to be completed</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Progress</p>
          <p className="text-white">{completionPercentage}% of tasks complete</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Cost</p>
          <p className="text-white">
            {costPercentage >= 0
              ? `${costPercentage}% over budget`
              : `${Math.abs(costPercentage)}% under budget`}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Planned Budget</p>
          <p className="text-white">{plannedPercentage}% of budget planned</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
