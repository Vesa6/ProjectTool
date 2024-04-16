import { useState } from "react";

const EditProfilePopup = ({
  onClose,
  profileToEdit,
  checkFieldsNotify,
  successNotify,
}) => {
  const [name, setName] = useState(profileToEdit.name);
  const [email, setEmail] = useState(profileToEdit.email);
  const [phoneNumber, setPhoneNumber] = useState(profileToEdit.phone);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEditTask = () => {
    // Add logic to handle editing the task
    // Reset task name input
    // check that all the fields are filled
    if (name === "" || email === "" || phoneNumber === "") {
      checkFieldsNotify();
      return;
    }

    profileToEdit.name = name;
    profileToEdit.email = email;
    profileToEdit.phone = phoneNumber;
    successNotify();
    // add api logic here

    console.log("Profile edited:", profileToEdit);

    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleEditTask();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 rounded-lg shadow-xl pt-16 px-16 pb-5 relative w-1/3 max-w-lg"
      >
        <button
          className="absolute text-3xl top-0 right-0 p-3 m2 mr-2 hover:text-slate-300 text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className=" text-2xl font-bold text-center m-3 text-white">
          Edit Profile
        </h2>
        <div className="flex flex-col space-y-2">
          <label className="text-white" htmlFor="assignee">
            Name:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          <label className="text-white" htmlFor="status">
            email:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <label className="text-white" htmlFor="deadline">
            Phone:
          </label>
          <input
            className="bg-gray-200 text-black p-2 rounded"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
          ></input>
          <div className="h-5" />
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditProfilePopup;
