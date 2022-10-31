import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import LocalStorage from "../helpers/LocalStorage";
import { LoginContext } from "./LoginContext";
import { Pagination } from "@mantine/core";

const QuoteContext = createContext();

function QuoteContextProvider({ children }) {
  const localToken = LocalStorage.getLocalStorage("token");
  const [lclToken, setLclToken] = useState(localToken);
  const { token } = useContext(LoginContext);
  const [quoteList, setQuoteList] = useState([]);
  const [dataTags, setDataTags] = useState();
  const [tags, setTags] = useState([]);
  const [currentVote, setCurrentVote] = useState("");
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState([]);
  const [activePage, setPage] = useState(1);

  const getQuotes = (tags) => {
    axios
      .get(
        `http://localhost:8000/quotes?tags=${tags}&pageSize=5&page=${activePage}&sortBy=${sortBy}`,
        {
          headers: { Authorization: "Bearer " + (token || lclToken) },
        }
      )
      .then(
        (res) => (console.log(res.data.quotes), setQuoteList(res.data.quotes))
      );
  };

  const getTags = () => {
    axios
      .get("http://localhost:8000/tags", {
        headers: { Authorization: "Bearer " + (token || lclToken) },
      })
      .then((res) => setDataTags(res.data));
  };

  const upVote = (el) => {
    axios
      .post(`http://localhost:8000/quotes/${el.id}/upvote`, null, {
        headers: { Authorization: "Bearer " + (token || lclToken) },
      })
      .then(
        (res) => (
          console.log(res.data.givenVote),
          setCurrentVote(res.data.givenVote),
          LocalStorage.setLocalStorage(
            `${el.id} currentvote`,
            res.data.givenVote
          )
        )
      );
  };
  const downVote = (el) => {
    axios
      .post(`http://localhost:8000/quotes/${el.id}/downvote`, null, {
        headers: { Authorization: "Bearer " + (token || lclToken) },
      })
      .then(
        (res) => (
          // console.log(res.data.givenVote),
          setCurrentVote(res.data.givenVote),
          LocalStorage.setLocalStorage(
            `${el.id} currentvote`,
            res.data.givenVote
          )
        )
      );
  };

  const deleteUpVote = (el) => {
    axios
      .delete(`http://localhost:8000/quotes/${el.id}/upvote`, {
        headers: { Authorization: "Bearer " + (token || lclToken) },
      })
      .then(
        (res) => (
          // console.log(res.data.givenVote),
          setCurrentVote(res.data.givenVote),
          LocalStorage.setLocalStorage(
            `${el.id} currentvote`,
            res.data.givenVote
          )
        )
      );
  };

  const deleteDownVote = (el) => {
    axios
      .delete(`http://localhost:8000/quotes/${el.id}/downvote`, {
        headers: { Authorization: "Bearer " + (token || lclToken) },
      })
      .then(
        (res) => (
          console.log(res.data.givenVote),
          setCurrentVote(res.data.givenVote),
          LocalStorage.setLocalStorage(
            `${el.id} currentvote`,
            res.data.givenVote
          )
        )
      );
  };

  const getTotalPages = () => {
    axios
      .get(`http://localhost:8000/quotes`, {
        headers: { Authorization: "Bearer " + (token || lclToken) },
      })
      .then((res) => setTotalPages(res.data.quotes.length));
  };

  const values = {
    getQuotes,
    quoteList,
    upVote,
    downVote,
    deleteDownVote,
    deleteUpVote,
    setTags,
    tags,
    getTags,
    dataTags,
    getTotalPages,
    totalPages,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    activePage,
    setPage,
  };
  return (
    <QuoteContext.Provider value={values}>{children}</QuoteContext.Provider>
  );
}

export { QuoteContext, QuoteContextProvider };
