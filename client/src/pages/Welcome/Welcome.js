import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <div className="welcome-right">
        <h1>Welcome</h1>
        <button onClick={() => navigate("/login")}>Go to login</button>
      </div>
    </div>
  );
}

export default Welcome;
