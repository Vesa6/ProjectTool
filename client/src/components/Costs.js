import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Cell } from "recharts";

const Costs = () => {
  const costsData = [
    { category: "Actual", amount: 300, color: "#76C043" },
    { category: "Planned", amount: 225, color: "#1FD1FF" },
    { category: "Budget", amount: 150, color: "#2D95EC" },
  ];

  return (
    <div className="bg-gray-700 p-4 rounded shadow-lg mb-4">
      <h2 className="text-white text-xl font-semibold mb-4">COSTS (in thousands)</h2>
      <div className="flex justify-between mb-4">
        {costsData.map((cost, index) => (
          <div key={index} className="text-center flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: cost.color }}
            ></div>
            <div>
              <p className="text-white">{cost.category}</p>
              <p className="text-white">{cost.amount.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={costsData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }} />
          <Bar dataKey="amount" fill="#8884d8">
            {costsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Costs;