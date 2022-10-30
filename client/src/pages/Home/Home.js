import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import { QuoteContext } from "../../service/QuoteContext";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import {
  ActionIcon,
  Button,
  Collapse,
  ScrollArea,
  Modal,
  Group,
  Drawer,
} from "@mantine/core";
import AddQuoteModal from "../../components/AddQuoteModal/AddQuoteModal";

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

  // const helpFunction = (e) =>
  //   setTags((prev) => {
  //     if (prev.find((el) => el === e.target.value)) {
  //       return prev.filter((el) => el !== e.target.value);
  //     } else {
  //       return [...prev, e.target.value];
  //     }
  //   });

  // const [opened, setOpened] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#ccc",
      }}
    >
      <Navbar />

      <div className="hero">
        <div className="quote-list">
          {quoteList?.map((el) => (
            <div key={el.id}>
              <QuoteCard el={el} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
