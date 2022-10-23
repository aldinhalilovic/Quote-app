import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import LocalStorage from "../helpers/LocalStorage";
import { LoginContext } from "./LoginContext";

const QuoteContext = createContext();

function QuoteContextProvider({ children }) {
  const localToken = LocalStorage.getLocalStorage("token");
  const [lclToken, setLclToken] = useState(localToken);
  const { token } = useContext(LoginContext);

  const getQuotes = () => {
    axios
      .get("http://localhost:8000/quotes", {
        headers: { Authorization: "Bearer " + (token || lclToken) },
      })
      .then((res) => console.log(res.data.quotes));
  };

  const values = {
    getQuotes,
  };
  return (
    <QuoteContext.Provider value={values}>{children}</QuoteContext.Provider>
  );
}

export { QuoteContext, QuoteContextProvider };
