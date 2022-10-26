import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <div className="welcome-right">
        <h1>Welcome</h1>
        {/* <p>please go to login page</p> */}
        <button onClick={() => navigate("/login")}>Go to login</button>
      </div>
    </div>
  );
}

export default Welcome;
