import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import { QuoteContext } from "../../service/QuoteContext";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import "./Home.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Button, Collapse, ScrollArea } from "@mantine/core";

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
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    LocalStorage.removeLocalStorage("token");
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
        <Button onClick={() => setOpened((o) => !o)}>Pick Tags</Button>
        <Collapse in={opened}>
          <ScrollArea
            style={{
              height: 150,
              width: 250,
              border: "2px solid black",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
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
          </ScrollArea>
          {/* <div className="container">
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
          </div> */}
        </Collapse>

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
