import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Tasks = ({ tasks }) => {
  let taskStatus = [
    { name: "Not started", value: 0 },
    { name: "Completed", value: 0 },
    { name: "In Progress", value: 0 },
  ];

  if (tasks) {
    tasks.forEach(task => {
      if (task.status === "Not started") taskStatus[0].value += 1;
      else if (task.status === "Completed") taskStatus[1].value += 1;
      else if (task.status === "In progress") taskStatus[2].value += 1;
    });
  }

  const colors = {
    "Not started": "#3B82F6",
    "Completed": "#10B981",
    "In Progress": "#EF4444",
  };

  return (
    <div className="bg-gray-700 p-4 rounded shadow-lg mt-4">
      <h2 className="text-white text-xl font-semibold mb-4">Task status</h2>
      <div className="flex justify-center items-center">
        <PieChart width={200} height={200}>
          <Pie
            data={taskStatus}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
          >
            {taskStatus.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        {taskStatus.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: colors[entry.name] }}
            ></div>
            <p className="text-white">{entry.name} ({entry.value})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
