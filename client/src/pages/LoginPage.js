import React, { useState } from "react";
import taskmaster from "../taskmaster_logo.png";
import { IoMdPizza } from "react-icons/io";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
  };

  return (
    <div className="bg-gray-700 w-screen h-screen relative">
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-900 w-fit h-fit text-white absolute top-1/2 left-1/2 flex-col p-8 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-1/2 max-w-md max-h-md"
      >
        <img src={taskmaster} alt="TaskMaster logo" className=" w-30 m-0 p-0" />
        <p className="font-semibold text-center text-2xl">TaskMaster </p>

        <div className="flex-col">
          <p className="mb-1 font-semibold"> Email:</p>

          <input type="text" className="w-full text-black max-w-50 h-7" />
        </div>
        <br />
        <p className="mb-1 font-semibold"> Password:</p>
        <input type="password" className="w-full mb-4 text-black h-7" />

        <br />
        <button
          type="submit"
          className="bg-customButton px-4 py-2 rounded hover:bg-customButtonHover w-full"
        >
          Login
        </button>
        <div className="flex flex-col text-center mt-3">
          <Link to="/register">
            <button
              type="submit"
              className="hover:bg-customButton px-4 py-2 rounded bg-customButtonHover w-full text-white"
            >
              Register
            </button>
          </Link>

          <Link
            to="/pswdreq"
            className="text-sm text-customButton mt-2 hover:text-customButtonHover"
          >
            Forgot Your password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
