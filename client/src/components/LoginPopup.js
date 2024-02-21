import React, { useState } from "react";
import axios from "axios";

const LoginPopup = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      console.log(response.data.message);
      onClose(); // Close the popup
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl relative"
        style={{ minWidth: "300px", maxWidth: "500px" }}
      >
        <button
          className="absolute top-0 right-0 mt-2 mr-2 bg-gray-200 p-2 rounded text-black hover:bg-slate-300"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-black text-3xl font-bold text-center mb-2">
          Login
        </h2>
        <div className="flex flex-col space-y-2">
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
