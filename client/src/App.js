import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Welcome from "./pages/Welcome/Welcome";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
