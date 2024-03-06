import React, { useState } from "react";
import axios from "axios";
import { MdArrowBackIos } from "react-icons/md";

const LogOutPopup = ({ onClose }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    //TODO: Add logout logic here
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-900 w-fit h-fit text-white absolute top-1/2 left-1/2 flex-col p-8 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-1/2 max-w-md max-h-md"
      >
        <MdArrowBackIos
          className=" h-5 w-5 text-white mb-5 cursor-pointer"
          onClick={onClose}
        />

        <h1 className="text-white text-2xl pt-3 pb-5">Log out</h1>
        <p className=" text-sm mb-3">Are you sure you want to log out?</p>
        <div className=" flex flex-row-reverse w-full">
          <button
            type="submit"
            className=" bg-rose-800 px-4 py-2 rounded hover:bg-rose-700 w-fit"
          >
            Logout
          </button>
          <button className="mr-3" onClick={onClose}>
            Cancel
          </button>
        </div>
        <div className="flex flex-col text-center text-customButton hover:text-bg-customButtonHover text-sm mt-3"></div>
      </form>
    </div>
  );
};

export default LogOutPopup;
