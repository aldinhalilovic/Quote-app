import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import { QuoteContext } from "../../service/QuoteContext";

function Home() {
  const { getQuotes } = useContext(QuoteContext);
  const { token, setToken, rememberMe } = useContext(LoginContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    LocalStorage.removeAllLocalStorage();
  };

  useEffect(() => {
    if (token === null && !rememberMe) {
      let tkn = LocalStorage.getLocalStorage("token");
      if (!tkn) {
        navigate("/");
      }
      setToken(tkn);
    } else if (token === null) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div>
      <h1>HOMEPAGE</h1>
      <button type="submit" onClick={logout}>
        {" "}
        LOGOUT
      </button>
    </div>
  );
}

export default Home;
