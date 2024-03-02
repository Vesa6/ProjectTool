import React, { useState } from "react";

const AddProjectPopup = ({ onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl relative"
        style={{ minWidth: "300px", maxWidth: "500px" }}
      >
        <button
          className="absolute top-0 right-0 mt-2 mr-2 bg-gray-200 p-2 rounded hover:bg-slate-300 text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-black text-3xl font-bold text-center mb-2">
          Uusi projekti
        </h2>
        <div className="flex flex-col space-y-2">
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            placeholder="Projektin nimi"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            placeholder="Projektin kuvaus"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            placeholder="Projektipäällikkö"
          ></input>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="number"
            placeholder="Budjetodut tunnit"
          ></input>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            placeholder="Aloitus päivämäärä"
          ></input>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            placeholder="Deadline"
          ></input>
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Luo uusi projekti
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectPopup;
