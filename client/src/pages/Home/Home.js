import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import { QuoteContext } from "../../service/QuoteContext";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import "./Home.css";

function Home() {
  const { getQuotes, quoteList, getQuotesTag } = useContext(QuoteContext);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>HOMEPAGE</h1>
      <div className="container">
        <input type="checkbox" onClick={() => getQuotesTag("humor")} /> humor{" "}
        <br />
        <input type="checkbox" /> life <br />
        <input type="checkbox" /> human nature <br />
        <input type="checkbox" /> infinity <br />
        <input type="checkbox" /> philosophy <br />
        <input type="checkbox" /> science <br />
        <input type="checkbox" /> stupidity <br />
        <input type="checkbox" /> universe <br />
        <input type="checkbox" /> be yourself <br />
        <input type="checkbox" /> honesty <br />
        <input type="checkbox" /> inspirational <br />
        <input type="checkbox" /> books <br />
        <input type="checkbox" /> simile <br />
        <input type="checkbox" /> soul <br />
        <input type="checkbox" /> action <br />
        <input type="checkbox" /> wish <br />
      </div>
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
