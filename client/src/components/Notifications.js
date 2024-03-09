import React from "react";

const Notifications = ({ notifications, deleteNotification }) => {
  return (
    <div className="mt-4 bg-gray-700 p-4 rounded shadow-lg">
      <h2 className="text-white text-2xl font-semibold mb-4">NEW</h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-gray-800 p-4 rounded mb-2 flex justify-between items-center"
        >
          <p className="text-white">Notification {notification.id}</p>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => deleteNotification(notification.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;