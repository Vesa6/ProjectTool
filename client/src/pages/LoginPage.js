import React, { useState } from "react";
import taskmaster from "../taskmaster_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import LoginServices from "../components/apicomponents/Loginservices";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = "";
    let user = {
      email: email,
      password: password,
    };
    // Perform login logic here
    try {
      response = await LoginServices.login(user);
      if (response.status === 200) {
        toast.success("Login successful!", {
          position: "top-center",
          theme: "dark",
        });
        setTimeout(() => {
          //
          navigate("/");
        }, 1000);
        window.localStorage.setItem(
          "loggedUser",
          JSON.stringify(response.data)
        );
      } else {
        toast.error(" Login unsuccessful, please try again!", {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (e) {
      console.log(response);
      toast.error(" Login unsuccessful, please try again!", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <div className="bg-gray-700 w-screen h-screen relative">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-900 w-fit h-fit text-white absolute top-1/2 left-1/2 flex-col p-8 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-1/2 max-w-md max-h-md"
      >
        <Link to="/">
          <MdArrowBackIos className="h-5 w-5 text-white mb-5" />
        </Link>

        <img src={taskmaster} alt="TaskMaster logo" className=" w-30 m-0 p-0" />
        <p className="font-semibold text-center text-2xl">TaskMaster </p>

        <div className="flex-col">
          <p className="mb-1 font-semibold"> Email:</p>

          <input
            type="text"
            className="w-full text-black max-w-50 h-7"
            onChange={handleEmail}
          />
        </div>
        <br />
        <p className="mb-1 font-semibold"> Password:</p>
        <input
          type="password"
          className="w-full mb-4 text-black h-7"
          onChange={handlePassword}
        />

        <br />
        <button
          type="submit"
          className="bg-customButton px-4 py-2 rounded hover:bg-customButtonHover w-full"
        >
          Login
        </button>
        <div className="flex flex-col text-center mt-3">
          <Link to="/register">
            <button
              type="submit"
              className="hover:bg-customButtonHover px-4 py-2 rounded bg-blue-500 w-full text-white"
            >
              Sign up
            </button>
          </Link>

          <Link
            to="/pswdreq"
            className="text-sm text-customButton mt-2 hover:text-customButtonHover"
          >
            Forgot Your password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
