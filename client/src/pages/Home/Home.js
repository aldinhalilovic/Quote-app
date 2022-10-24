import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import { QuoteContext } from "../../service/QuoteContext";
import QuoteCard from "../../components/QuoteCard/QuoteCard";

function Home() {
  const { getQuotes, quoteList } = useContext(QuoteContext);
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
    console.log(quoteList);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>HOMEPAGE</h1>
      {quoteList?.map((el) => (
        <div key={el.id}>
          <QuoteCard el={el} />
        </div>
      ))}
      <button type="submit" onClick={logout}>
        {" "}
        LOGOUT
      </button>
    </div>
  );
}

export default Home;
