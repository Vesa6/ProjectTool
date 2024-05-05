import Select from "react-select"
import { React, useEffect, useState } from "react";
import ProjectServices from "./apicomponents/Projectservices";


const SelectParticipantsPopup = (
    { onClose,
        users,
        project,
        fetchProjects, }) => {
    const [activeUsers, setActiveUsers] = useState([""]);
    const [projectParticipants, setProjectParticipants] = useState([""])

    useEffect(() => {
        if (users !== null) {
            try {
                let mappedUsers = users.map(user => ({
                    value: user._id,
                    label: user.name,
                    role: user.role
                }));
                setActiveUsers(mappedUsers)
                console.log(mappedUsers)
            } catch (e) {
                console.log(e)
            }

        }
    }, []);

    const customStyles = {
        option: (provided) => ({
            ...provided,
            color: 'black', // Change the font color of options to black
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'black', // Change the font color of multi-value labels to black
        }),
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        let newParticipants
        try {
            newParticipants = projectParticipants.map(({ label, role, value }) => ({
                name: label,
                role,
                id: value
            }));
        } catch (e) {
            console.log("no participants")
        }
        console.log(newParticipants)
        try {
            let data = {
                data: {
                    name: project.data.name,
                    description: project.data.description,
                    manager: project.data.manager,
                    budget: project.data.budget,
                    start: project.data.start,
                    end: project.data.end,
                },
                tasks: project.tasks,
                participants: newParticipants
            }
            let response = await ProjectServices.updateProject(data, project._id)
            console.log(response)
            fetchProjects()
            onClose()
            
        } catch (e) {
            console.log(e)
            console.log("updating failed")
            fetchProjects()
            onClose()
        }
    }

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center" style={{ padding: 200, zIndex: 10 }}
        >
            <form
                className="bg-slate-900 rounded-lg shadow-xl pt-16 px-16 pb-5 relative w-1/3 max-w-lg flex flex-col relative h-2/3 max-h-full overflow-y-auto"
                onSubmit={handleSubmit}
            >
                <p className="text-white text-1xl font-semibold">Select Users</p>
                <div>
                    <Select styles={customStyles} isMulti options={activeUsers} hideSelectedOptions={true} closeMenuOnSelect={false} onChange={(e) => setProjectParticipants(e)}>

                    </Select>

                </div>
                <div className="justify-center w-3/4 flex items-center" style={{ position: "absolute", bottom: 25 }}>
                    <button
                        className="bg-blue-500 relative w-2/3 text-white p-2 rounded hover:bg-blue-700 items-center"
                        type="submit"

                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SelectParticipantsPopup;