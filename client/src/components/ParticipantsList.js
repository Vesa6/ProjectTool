import React from "react";

// If projects get thei own participants, pass them here as prop.
const ParticipantsList = ({ activeProject }) => {
  if (!activeProject) {
    return null;
  }

  const participants = activeProject.participants || [];

  return (
    <div className="bg-gray-700 text-white p-4 m-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Participants</h2>
      {participants.length > 0 ? (
        <ul>
          {participants.map((participant) => (
            <li key={participant.id} className="mb-2">
              {participant.name} - {participant.role}
            </li>
          ))}
        </ul>
      ) : (
        <p>No participants found.</p>
      )}
    </div>
  );
};

export default ParticipantsList;