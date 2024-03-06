import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PswdRequest from "./pages/PswdRequest";
import "./main.css";

// Client entrypoint.
const app = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/pswdreq" element={<PswdRequest />} />
        </Routes>
      </div>
    </Router>
  );
};

export default app;
