import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import LoginCard from "../../components/LoginCard/LoginCard";
import "./Login.css";
function Login() {
  const [localUsername, setLocalUsername] = useState("");
  const [localPassword, setLocalPassword] = useState("");

  const {
    setLoginPassword,
    setLoginUsername,
    getToken,
    token,
    rememberMe,
    setRememberMe,
  } = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token && rememberMe) {
      LocalStorage.setLocalStorage("token", token);
      navigate("/homepage");
    } else if (token) {
      navigate("/homepage");
    }
  }, [token]);

  return (
    <div className="login">
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
        {rememberMe ? (
          <input type="checkbox" onClick={() => setRememberMe(false)} />
        ) : (
          <input type="checkbox" onClick={() => setRememberMe(true)} />
        )}
      </form>

      <LoginCard />
    </div>
  );
}

export default Login;
