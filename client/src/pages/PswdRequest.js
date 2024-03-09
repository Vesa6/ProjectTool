import React, { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform password adding logic here
    console.log("Request submitted");
  };

  return (
    <div className="bg-gray-700 w-screen h-screen relative">
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-900 w-fit h-fit text-white absolute top-1/2 left-1/2 flex-col p-8 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-1/2 max-w-md max-h-md"
      >
        <Link to="/login">
          <MdArrowBackIos className=" h-5 w-5 text-white mb-5" />
        </Link>
        <h1 className="text-white text-2xl pt-3 pb-5">Forgot your password</h1>
        <p className=" text-sm mb-3">
          Please enter the email address, you’d like your password reset
          information sent to.
        </p>
        <div className="flex-col">
          <p className="mb-1 font-semibold"> Email:</p>
          <input type="email" className="w-full text-black max-w-50 h-7 mb-4" />
        </div>
        <button
          type="submit"
          className="bg-customButton px-4 py-2 rounded hover:bg-customButtonHover w-full"
        >
          Request reset link
        </button>
        <div className="flex flex-col text-center text-customButton hover:text-bg-customButtonHover text-sm mt-3"></div>
      </form>
    </div>
  );
};

export default RegistrationPage;
