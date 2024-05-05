import React, { useEffect, useState } from "react";
import EditProfilePopup from "./EditProfilePopup";
import { toast, ToastContainer } from "react-toastify";

const SettingsView = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [badgeNotifications, setBadgeNotifications] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const showEditProfilePopup = () => setShowEditProfile(true);
  const hideEditProfilePopup = () => setShowEditProfile(false);

  const [userToedit, setUserToEdit] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
  });

  const checkFieldsNotify = () => {
    toast.error("Please fill all the fields", {
      position: "top-center",
      theme: "dark",
      id: 3,
    });
  };

  const errorNotify = (message) => {
    toast.error(message, {
      position: "top-center",
      theme: "dark",
      id: 3,
    });
  };
  const successNotify = (message) => {
    toast.success(message, {
      position: "top-center",
      theme: "dark",
      id: 3,
    });
  };

  const printUser = () => {
    console.log(localStorage.getItem("loggedUser"));
  };

  const getUser = async () => {
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    let response = null;
    try {
      const url = `http://localhost:3001/login/${user.id}`;
      response = await fetch(url);
    } catch (e) {
      console.log(e);
    }
    const data = await response.json();
    console.log(data);

    setUserToEdit({
      name: data[0].name,
      email: data[0].email,
      phone: data[0].phone,
      title: data[0].title,
    });


  };

  const editUser = async (user) => {
    let response = null;
    try {
      const url = `http://localhost:3001/login/${user.id}`;
      response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    } catch (e) {
      console.log(e);
      errorNotify("Failed to send, please try again");
    }
    const data = await response.json();
    console.log(data);
    successNotify("Profile edited successfully");
  };



  useEffect(() => {
    printUser();
    getUser();
  }, []);

  return (
    // center the form on the page
    <div className="bg-navBarPadding max-w-2xl flex flex-col justify-center m-auto top-1/2 h-fit">
      <ToastContainer containerId={3} />
      <h1 className="w-full text-xl text-white bg-[#BB98B8] shadow-lg p-2">
        Profile
      </h1>
      <div className="flex text-white mt-3">
        <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mb-4  ml-5">
          {/* Placeholder for profile picture */}
        </div>
        <p className="top-1/2 justify-center mt-6 ml-3">
          {userToedit.name} <br />
          {userToedit.title} <br />
        </p>
      </div>
      <div className=" bg-slate-800 w-5/6 ml-8 mb-8">
        <div className="flex text-gray-300 p-3 justify-between">
          <p className="text-slate-100">
            Name:
            <br />
            <p className="text-slate-500">{userToedit.name}</p>
          </p>
          <button
            className="ml-2 bg-navBarPadding px-5 py-2 rounded-sm hover:bg-navBarButtonHover w-[64px]"
            onClick={() => showEditProfilePopup()}
          >
            Edit
          </button>
        </div>
        <div className="flex text-gray-300 p-3 justify-between">
          <p className="text-slate-100">
            Email:
            <br />
            <p className="text-slate-500">{userToedit.email}</p>
          </p>
          <button
            className="ml-2 bg-navBarPadding px-5 py-2 rounded-sm hover:bg-navBarButtonHover w-[64px]"
            onClick={() => showEditProfilePopup()}
          >
            Edit
          </button>
        </div>
        <div className="flex text-gray-300 p-3 justify-between">
          <p className="text-slate-100">
            Phone number:
            <br />
            <p className="text-slate-500">{userToedit.phone}</p>
          </p>
          <button
            className="ml-2 bg-navBarPadding px-5 py-2 rounded-sm hover:bg-navBarButtonHover w-[64px]"
            onClick={() => showEditProfilePopup()}
          >
            Edit
          </button>
        </div>
      </div>
      <h1 className="w-full text-xl text-white bg-slate-500 shadow-lg p-2">
        Notifications
      </h1>
      <div className=" bg-slate-800 w-5/6 ml-8 mb-8 mt-3">
        <div className="flex text-gray-300 p-3 justify-between">
          <p className="text-slate-100">
            Enable Email Notifications:
            <br />
            <p className="text-slate-500 text-sm">
              Sends a message each time a new event happens on the platform.
            </p>
          </p>
          <button
            className="ml-2 bg-navBarPadding px-5 py-2 rounded-sm hover:bg-navBarButtonHover w-[64px] "
            onClick={() => setEmailNotifications(!emailNotifications)}
          >
            {emailNotifications ? "On" : "Off"}
          </button>
        </div>
        <div className="flex text-gray-300 p-3 justify-between">
          <p className="text-slate-100">
            Enable unread message badge:
            <br />
            <p className="text-slate-500 text-sm">
              Shows a red badge on top of the app icon when you have unread
              messages.
            </p>
          </p>
          <button
            className="ml-2 bg-navBarPadding px-5 py-2 rounded-sm hover:bg-navBarButtonHover w-[64px] h-[44px]"
            onClick={() => setBadgeNotifications(!badgeNotifications)}
          >
            {badgeNotifications ? "On" : "Off"}
          </button>
        </div>
      </div>
      {showEditProfile && (
        <EditProfilePopup
          onClose={hideEditProfilePopup}
          profileToEdit={userToedit}
          checkFieldsNotify={checkFieldsNotify}
          successNotify={successNotify}
          editProfile={editUser}
        />
      )}
    </div>
  );
};

export default SettingsView;
