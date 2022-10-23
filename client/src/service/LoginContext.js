import React, { createContext, useState } from "react";
import axios from "axios";

const LoginContext = createContext();

function LoginContextProvider({ children }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [token, setToken] = useState(null);

  const getToken = () => {
    axios
      .post("http://localhost:8000/sessions", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((response) => setToken(response.data))
      .then(() => console.log(token));
  };

  const values = {
    setLoginUsername,
    setLoginPassword,
    getToken,
    token,
  };

  return (
    <LoginContext.Provider value={values}>{children}</LoginContext.Provider>
  );
}

export { LoginContext, LoginContextProvider };
