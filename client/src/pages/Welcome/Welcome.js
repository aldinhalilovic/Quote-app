import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome</h1>
      <br />
      <br />
      <br />
      <br />
      <br />

      <button onClick={() => navigate("/login")}>Go to login</button>
    </div>
  );
}

export default Welcome;
