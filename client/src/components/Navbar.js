import React from "react";

const Navbar = ({ toggleCalendarView, toggleTasksView }) => {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="p-4 bg-navBarPadding rounded m-2 text-xl">
        <button className="bg-navBarButton mt-2 w-60 h-20 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded">
          Main
        </button>
      </div>
      <div className="p-4 bg-navBarPadding rounded m-2 text-xl">
        <button className="bg-navBarButton mt-2 w-60 h-20 transition-colors duration-300 hover:bg-navBarButtonHover text-white px-4 py-2 rounded">
          PROGRESS
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
    </div>
  );
};

export default Navbar;
