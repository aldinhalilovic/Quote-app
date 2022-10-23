import React from "react";
import Login from "./pages/Login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<h1>something</h1>} />
      </Routes>
    </div>
  );
}

export default App;
