import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import LoginCard from "../../components/LoginCard/LoginCard";
import "./Login.css";
function Login() {
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
      <LoginCard />
    </div>
  );
}

export default Login;
