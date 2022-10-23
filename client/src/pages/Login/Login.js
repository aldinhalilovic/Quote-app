import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import axios from "axios";

function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [localUsername, setLocalUsername] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [token, setToken] = useState(null);

  const getToken = () => {
    axios
      .post("http://localhost:8000/sessions", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((response) => setToken(response.data))
      .then(() => (token !== null ? navigate("/homepage") : ""));
  };
  //   const { setLoginPassword, setLoginUsername, getToken, token } =
  //     useContext(LoginContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {};

  return (
    <div>
      <form onSubmit={(e) => (e.preventDefault(), getToken())}>
        <input
          type="text"
          placeholder="Username"
          value={localUsername}
          onChange={(e) => setLocalUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          //   value={localPassword}
          onChange={(e) => setLocalPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => (
            setLoginUsername(localUsername), setLoginPassword(localPassword)
          )}
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default Login;
