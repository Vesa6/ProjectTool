import React from "react";

const Notifications = ({ notifications, deleteNotification }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-lg">
      <h2 className="text-white text-2xl font-semibold mb-4">Notifications</h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-gray-700 p-4 rounded mb-2 flex justify-between items-center"
        >
          <div className="flex items-center">
            <span className="bg-purple-600 h-3 w-3 rounded-full mr-2"></span>
            <p className="text-white text-2xl">{notification.message}</p>
          </div>
          <div className="flex items-center">
            <p className="text-white text-xl mr-4">{notification.date}</p>
            <button
              onClick={() => deleteNotification(notification.id)}
              className="bg-red-600 text-white text-xl px-2 py-1 rounded hover:bg-red-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Notifications;