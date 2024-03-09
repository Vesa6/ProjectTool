import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Tasks = () => {
  const tasksData = [
    { name: "Not started", value: 4, color: "#3B82F6" },
    { name: "Completed", value: 7, color: "#10B981" },
    { name: "In Progress", value: 7, color: "#EF4444" },
  ];

  return (
    <div className="bg-gray-700 p-4 rounded shadow-lg">
      <h2 className="text-white text-xl font-semibold mb-4">TASKS</h2>
      <div className="flex flex-col items-center">
        <PieChart width={200} height={200}>
          <Pie
            data={tasksData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {tasksData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="flex justify-center mt-4 space-x-4">
          {tasksData.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></div>
              <p className="text-white">{entry.name} ({entry.value})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;