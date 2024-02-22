import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import LoginPage from "./pages/LoginPage"; // Assuming you have a LoginPage component
import "./main.css";

// Client entrypoint.
const app = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default app;
