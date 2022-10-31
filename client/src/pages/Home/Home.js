import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import { QuoteContext } from "../../service/QuoteContext";
import LocalStorage from "../../helpers/LocalStorage";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { Pagination } from "@mantine/core";
import "./Home.css";

function Home() {
  const {
    getQuotes,
    quoteList,
    tags,
    getTags,
    getTotalPages,
    totalPages,
    currentPage,
    sortBy,
    activePage,
    setPage,
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
    getQuotes(tags);
    getTags();
    getTotalPages();
    console.log(currentPage);
  }, [tags, activePage, sortBy]);

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
        {/* <div> */}
        <Pagination
          page={activePage}
          onChange={setPage}
          total={Math.ceil(totalPages / 5)}
          color="gray"
          radius="lg"
          mt={40}
          mb={30}
        />
        {/* </div> */}
      </div>
    </div>
  );
}

export default Home;
