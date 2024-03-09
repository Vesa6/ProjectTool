import React, { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here
    console.log("Registration submitted");
  };

  return (
    <div className="bg-gray-700 w-screen h-screen relative">
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-900 w-fit h-fit text-white absolute top-1/2 left-1/2 flex-col p-8 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-1/2 max-w-md max-h-md"
      >
        <Link to="/login">
          <MdArrowBackIos className="h-5 w-5 text-white mb-5" />
        </Link>
        <h1 className="text-white text-2xl font-semibold pb-5">
          Create new account
        </h1>

        <div className="flex-col">
          <p className="mb-1 font-semibold"> Name:</p>
          <input type="text" className="w-full text-black max-w-50 h-7 mb-4" />
          <p className="mb-1 font-semibold"> Email:</p>
          <input type="email" className="w-full text-black max-w-50 h-7 mb-4" />
        </div>
        <p className="mb-1 font-semibold"> Password:</p>
        <input type="password" className="w-full mb-4 text-black h-7" />
        <p className="mb-1 font-semibold"> Repeat password:</p>
        <input type="password" className="w-full mb-4 text-black h-7" />
        <br />
        <button
          type="submit"
          className="bg-customButton px-4 py-2 rounded hover:bg-customButtonHover w-full"
        >
          Register
        </button>
        <div className="flex flex-col text-center text-customButton hover:text-bg-customButtonHover text-sm mt-3"></div>
      </form>
    </div>
  );
};

export default RegistrationPage;
