import React from "react";

const ProjectOverview = () => {
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
          <p className="text-white">11 tasks to be completed</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Workload</p>
          <p className="text-white">2 tasks overdue</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-white">Progress</p>
          <p className="text-white">59% complete</p>
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