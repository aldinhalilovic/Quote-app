import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import { QuoteContext } from "../../service/QuoteContext";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import "./Home.css";
import { Navbar } from "../../components/Navbar/Navbar";

function Home() {
  const {
    getQuotes,
    quoteList,
    getQuotesTag,
    setTags,
    tags,
    getTags,
    dataTags,
  } = useContext(QuoteContext);
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
    getTags();
  }, []);

  useEffect(() => {
    getQuotesTag(tags);
  }, [tags]);

  const helpFunction = (e) =>
    setTags((prev) => {
      if (prev.find((el) => el === e.target.value)) {
        return prev.filter((el) => el !== e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });

  return (
    <div>
      <Navbar />
      <div className="hero">
        <h1>HOMEPAGE</h1>
        <div className="container">
          {dataTags?.map((el) => (
            <div key={el}>
              <input
                type="checkbox"
                value={el}
                onClick={(e) => helpFunction(e)}
              />{" "}
              {el} <br />
            </div>
          ))}
          {/* <input
            type="checkbox"
            value="humor"
            onClick={(e) => setTags((prev) => [...prev, e.target.value])}
          />{" "}
          humor <br />
          <input
            type="checkbox"
            value={"life"}
            onClick={(e) => setTags((prev) => [...prev, e.target.value])}
          />{" "}
          life <br />
          <input type="checkbox" onClick={() => getQuotesTag("human")} /> human
          nature <br />
          <input type="checkbox" value="infinity" /> infinity <br />
          <input type="checkbox" value="philosophy" /> philosophy <br />
          <input type="checkbox" value="science" /> science <br />
          <input type="checkbox" value="stupidity" /> stupidity <br />
          <input type="checkbox" value="universe" /> universe <br />
          <input type="checkbox" value="be yourself" /> be yourself <br />
          <input type="checkbox" value="honesty" /> honesty <br />
          <input type="checkbox" value="inspirational" /> inspirational <br />
          <input type="checkbox" value="books" /> books <br />
          <input type="checkbox" value="simile" /> simile <br />
          <input type="checkbox" value="soul" /> soul <br />
          <input type="checkbox" /> action <br />
          <input type="checkbox" /> wish <br /> */}
        </div>
        {quoteList?.map((el) => (
          <div key={el.id}>
            <QuoteCard el={el} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
