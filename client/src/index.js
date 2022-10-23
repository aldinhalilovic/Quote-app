import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoginContextProvider } from "./service/LoginContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LoginContextProvider>
      <App />
    </LoginContextProvider>
  </BrowserRouter>
);
