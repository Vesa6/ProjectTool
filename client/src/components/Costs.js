import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Costs = ({ activeProject, fetchProjects }) => {
  const [costsData, setCostsData] = useState([
    { category: "Actual", amount: activeProject?.actual || 0, color: "#76C043" },
    { category: "Planned", amount: activeProject?.planned || 0, color: "#1FD1FF" },
    { category: "Budget", amount: activeProject?.budget || 0, color: "#2D95EC" },
  ]);

  useEffect(() => {
    setCostsData([
      { category: "Actual", amount: activeProject?.actual || 0, color: "#76C043" },
      { category: "Planned", amount: activeProject?.planned || 0, color: "#1FD1FF" },
      { category: "Budget", amount: activeProject?.budget || 0, color: "#2D95EC" },
    ]);
  }, [activeProject]);

  async function updateProjectCosts(projectId, updatedCosts) {
    const url = `http://localhost:3001/api/projects/${projectId}/update-costs`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCosts),
      });
      if (!response.ok) {
        throw new Error("Failed to update project costs");
      }
      console.log("Project costs updated successfully");
      fetchProjects();
    } catch (error) {
      console.error("Error updating project costs:", error);
      fetchProjects(); // here just in case, should not be needed.
    }
  }

  const handleChange = (index, value) => {

    if (value < 0) {
      return;
    }

    const newData = costsData.map((item, idx) => {
      if (idx === index) {
        return { ...item, amount: Number(value) || 0 };
      }
      return item;
    });
    setCostsData(newData);

    const updatedCosts = {
      actual: newData.find((item) => item.category === "Actual")?.amount || 0,
      planned: newData.find((item) => item.category === "Planned")?.amount || 0,
      budget: newData.find((item) => item.category === "Budget")?.amount || 0,
    };
    updateProjectCosts(activeProject._id, updatedCosts);
  };

  return (
    <div className="bg-gray-700 p-4 rounded shadow-lg mb-4 mt-4">
      <h2 className="text-white text-2xl font-semibold mb-4">Costs (in thousands)</h2>
      <div className="flex justify-between mb-4">
        {costsData.map((cost, index) => (
          <div key={index} className="text-center flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: cost.color }}
            ></div>
            <div>
              <p className="text-white">{cost.category}</p>
              <input
                type="number"
                className="bg-gray-900 text-white p-1 rounded focus:outline-none focus:border-blue-500"
                value={cost.amount}
                onChange={(e) => handleChange(index, e.target.value)}
              />
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
          <Bar dataKey="amount" fill="#8884d8" barSize={120}>
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
