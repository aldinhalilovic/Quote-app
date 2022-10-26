import React from "react";
import Login from "./pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Welcome from "./pages/Welcome/Welcome";

function App() {
  return (
    <div
      style={{
        margin: "0",
        padding: "0",
      }}
    >
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
