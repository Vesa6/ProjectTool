import React, { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import RegServices from "../components/apicomponents/Registerationservices"
import { useNavigate } from 'react-router-dom'


const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("")
  const navigate = useNavigate()

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = ""
    // Perform registration logic here
    if (repeatPassword !== password) {
      alert("Passwords don't match")
      return
    }
    if (email.length === 0 || password.length === 0 || name.length === 0) {
      alert("All fields are required")
      return
    }
    let newUser = {
      name: name,
      email: email,
      password: password
    }
    response = await RegServices.register(newUser)
    console.log(response)
    if (response.status === 201) {
      alert("Registration succesful");
      navigate("/login")
    } else {
      alert("Registration failed")
      console.log(response)
    }


  };

  return (
    <div className="bg-gray-700 w-screen h-screen relative">
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-900 w-fit h-fit text-white absolute top-1/2 left-1/2 flex-col p-8 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-1/2 max-w-md max-h-md"
      >
        <Link to="/login">
          <MdArrowBackIos className="h-5 w-5 text-white mb-5" />
        </Link>
        <h1 className="text-white text-2xl font-semibold pb-5">
          Create new account
        </h1>

        <div className="flex-col">
          <p className="mb-1 font-semibold"> Name:</p>
          <input type="text" className="w-full text-black max-w-50 h-7 mb-4" onChange={handleName} />
          <p className="mb-1 font-semibold"> Email:</p>
          <input type="email" className="w-full text-black max-w-50 h-7 mb-4" onChange={handleEmail} />
        </div>
        <p className="mb-1 font-semibold"> Password:</p>
        <input type="password" className="w-full mb-4 text-black h-7" onChange={handlePassword} />
        <p className="mb-1 font-semibold"> Repeat Password:</p>
        <input type="password" className="w-full mb-4 text-black h-7" onChange={handleRepeatPassword} />
        <br />
        <button
          type="submit"
          className="bg-customButton px-4 py-2 rounded hover:bg-customButtonHover w-full"
        >
          Register
        </button>
        <div className="flex flex-col text-center text-customButton hover:text-bg-customButtonHover text-sm mt-3"></div>
      </form>
    </div>
  );
};

export default RegistrationPage;
