import {React, useState, useEffect} from "react";
import addCircle from "../add-circle.svg";
import SelectParticipantsPopup from "./SelectParticipantsPopup";

// If projects get thei own participants, pass them here as prop.
const ParticipantsList = ({ activeProject, users, fetchProjects}) => {
  const [activeParticipants, setActiveParticipants] = useState("")
  const [selectParticipantsPopup, setSelectParticipantsPopup] = useState(false);
  const showSelectParticipantsPopup = () => setSelectParticipantsPopup(true);
  const hideSelectParticipantsPopup = () => setSelectParticipantsPopup(false);
  useEffect(() => {
    try{
      setActiveParticipants(activeProject.participants);
    } catch(e){
      console.log(e)
    }
  }, [activeProject]);
  if (!activeProject) {
    return null;
  }

  const participants = activeParticipants || [];
  console.log(participants)
  return (
    <div className="bg-gray-700 text-white p-4 m-4 rounded-lg" style={{position:"relative", top:0, right:0, zIndex: 0}}>
      <img src={addCircle} alt="circle add" className="bg-gray-1000 text-white p-4 m-4 rounded-lg" 
          style={{heigth: 70, width: 70, position:"absolute", top:0, right:0}}
          onClick={showSelectParticipantsPopup}>
      </img>
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
        <p>No participants found.
        </p>
      )}
      { selectParticipantsPopup && (
        <SelectParticipantsPopup
          onClose={hideSelectParticipantsPopup}
          users={users}
          project={activeProject}
          fetchProjects={fetchProjects}
        />
      )}
    </div>
  );
};

export default ParticipantsList;