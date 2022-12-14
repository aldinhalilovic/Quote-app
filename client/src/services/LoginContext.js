import React, { createContext, useState } from "react";
import axios from "axios";

const LoginContext = createContext();

function LoginContextProvider({ children }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [token, setToken] = useState(null);

  const URL = process.env.REACT_APP_BASE_URL;

  const getToken = () => {
    axios
      .post(`${URL}/sessions`, {
        username: loginUsername,
        password: loginPassword,
      })
      .then((response) => {
        setToken(response.data.accessToken);
      });
  };

  const values = {
    setLoginUsername,
    setLoginPassword,
    getToken,
    setToken,
    token,
    rememberMe,
    setRememberMe,
  };

  return (
    <LoginContext.Provider value={values}>{children}</LoginContext.Provider>
  );
}

export { LoginContext, LoginContextProvider };
