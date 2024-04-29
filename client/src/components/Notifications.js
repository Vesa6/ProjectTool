import React from "react";

const Notifications = ({ notifications, deleteNotification, activeProjectId }) => {
  return (
    <div className="bg-gray-700 text-white p-4 m-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {activeProjectId ? (
        <p>No new notifications.</p>
      ) : (
        notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-2 mb-2 rounded bg-gray-800 flex justify-between items-center"
            >
              <div className="flex items-center">
                <span className="bg-purple-600 h-3 w-3 rounded-full mr-2"></span>
                <p className="text-xl">{notification.message}</p>
              </div>
              <div className="flex items-center">
                <p className="text-lg mr-4">{notification.date}</p>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="bg-red-600 text-white text-lg px-2 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No new notifications.</p>
        )
      )}
    </div>
  );
};

export default Notifications;
