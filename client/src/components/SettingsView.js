import React, { useState } from "react";

const SettingsView = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [badgeNotifications, setBadgeNotifications] = useState(false);

  const placeholderUser = {
    username: "John Doe",
    email: "asdasd@asdasd.asd",
    phone: "123-456-7890",
    title: "Project manager",
    password: "password",
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    // center the form on the page
    <div className="bg-navBarPadding max-w-2xl flex flex-col justify-center m-auto top-1/2 h-fit">
      <h1 className="w-full text-xl text-white bg-[#BB98B8] shadow-lg p-2">
        Profile
      </h1>
      <div className="flex text-white mt-3">
        <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mb-4  ml-5">
          {/* Placeholder for profile picture */}
        </div>
        <p className="top-1/2 justify-center mt-6 ml-3">
          {placeholderUser.username} <br />
          {placeholderUser.title} <br />
        </p>
      </div>
      <div className=" bg-slate-800 w-5/6 ml-8 mb-8">
        <div className="flex text-gray-300 p-3 justify-between">
          <p className="text-slate-100">
            Name:
            <br />
            <p className="text-slate-500">{placeholderUser.username}</p>
          </p>
          <button className="ml-2 bg-navBarPadding px-5 py-2 rounded-sm hover:bg-navBarButtonHover w-[64px]">
            Edit
          </button>
        </div>
        <div className="flex text-gray-300 p-3 justify-between">
          <p className="text-slate-100">
            Email:
            <br />
            <p className="text-slate-500">{placeholderUser.email}</p>
          </p>
          <button className="ml-2 bg-navBarPadding px-5 py-2 rounded-sm hover:bg-navBarButtonHover w-[64px]">
            Edit
          </button>
        </div>
        <div className="flex text-gray-300 p-3 justify-between">
          <p className="text-slate-100">
            Phone number:
            <br />
            <p className="text-slate-500">{placeholderUser.phone}</p>
          </p>
          <button className="ml-2 bg-navBarPadding px-5 py-2 rounded-sm hover:bg-navBarButtonHover w-[64px]">
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
    </div>
  );
};

export default SettingsView;
