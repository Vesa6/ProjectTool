import React from "react";
import { IoSettingsSharp } from "react-icons/io5";

const Navbar = ({
  toggleCalendarView,
  toggleTasksView,
  toggleSettingsView,
  toggleOverview,
}) => {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="p-4 bg-navBarPadding rounded m-2 text-xl">
        <button className="bg-navBarButton mt-2 w-60 h-20 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded"
          onClick={toggleOverview}
        >
          Main
        </button>
      </div>
      <div className="p-4 bg-navBarPadding rounded m-2 text-xl">
        <button className="bg-navBarButton mt-2 w-60 h-20 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded">
          Progress
        </button>
      </div>
      <div className="p-4 bg-navBarPadding rounded m-2 text-xl">
        <button
          className="bg-navBarButton mt-2 w-60 h-20 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded"
          onClick={toggleTasksView}
        >
          Tasks
        </button>
      </div>
      <div className="p-4 bg-navBarPadding rounded m-2 text-xl">
        <button
          className="bg-navBarButton mt-2 w-60 h-20 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded"
          onClick={toggleCalendarView}
        >
          Calendar
        </button>
      </div>
      <IoSettingsSharp
        className="text-4xl text-white m-2 hover:text-slate-300"
        onClick={toggleSettingsView}
      />
    </div>
  );
};

export default Navbar;
