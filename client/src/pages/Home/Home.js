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
  // const [localVote, setLocalVote] = useState();

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
