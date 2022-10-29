import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import { QuoteContext } from "../../service/QuoteContext";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import "./Home.css";
import { Navbar } from "../../components/Navbar/Navbar";
import {
  ActionIcon,
  Button,
  Collapse,
  ScrollArea,
  Modal,
  Group,
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

  // const [opened, setOpened] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#ccc",
      }}
    >
      <Navbar />
      <div className="hero">
        <AddQuoteModal />
        {/* <Button
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-settings"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
              <circle cx={12} cy={12} r={3}></circle>
            </svg>
          }
          variant={"outline"}
          type="submit"
          onSubmit={() => console.log("okinuo")}
        >
          {/* <ActionIcon > */}
        {/* </ActionIcon> */}
        {/* </Button> */}
        {/* <div className="scroll-tags">
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
          </Collapse>
        </div> */}
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
