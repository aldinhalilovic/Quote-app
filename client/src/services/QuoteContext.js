import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import LocalStorage from "../helpers/LocalStorage";
import { LoginContext } from "./LoginContext";

const QuoteContext = createContext();

function QuoteContextProvider({ children }) {
  const localToken = LocalStorage.getLocalStorage("token");
  const [lclToken] = useState(localToken);
  const { token } = useContext(LoginContext);
  const [quoteList, setQuoteList] = useState([]);
  const [dataTags, setDataTags] = useState();
  const [tags, setTags] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState([]);
  const [activePage, setPage] = useState(1);
  const [direction, setDirection] = useState("desc");

  const URL = process.env.REACT_APP_BASE_URL;

  const api = axios.create({
    headers: { Authorization: "Bearer " + (token || lclToken) },
  });

  const updateQuotes = (updatedItem) => {
    setQuoteList((oldQuotes) =>
      oldQuotes.map((quote) => {
        if (quote.id === updatedItem.id) {
          return updatedItem;
        }
        return quote;
      })
    );
  };

  const getQuotes = () => {
    api
      .get(
        `${URL}/quotes?tags=${tags}&pageSize=5&page=${activePage}&sortBy=${sortBy}&sortDirection=${direction}`
      )
      .then((res) => setQuoteList(res.data.quotes));
  };

  const getTags = () => {
    api.get(`${URL}/tags`).then((res) => setDataTags(res.data));
  };

  const upVote = (el) => {
    api
      .post(`${URL}/quotes/${el.id}/upvote`, null)
      .then((res) => updateQuotes(res.data));
  };
  const downVote = (el) => {
    api
      .post(`${URL}/quotes/${el.id}/downvote`, null)
      .then((res) => updateQuotes(res.data));
  };

  const deleteUpVote = (el) => {
    api
      .delete(`${URL}/quotes/${el.id}/upvote`)
      .then((res) => updateQuotes(res.data));
  };

  const deleteDownVote = (el) => {
    api
      .delete(`${URL}/quotes/${el.id}/downvote`)
      .then((res) => updateQuotes(res.data));
  };

  const getTotalPages = () => {
    api
      .get(`${URL}/quotes`)
      .then((res) => setTotalPages(res.data.quotes.length));
  };

  const values = {
    getQuotes,
    quoteList,
    setQuoteList,
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
    setDirection,
    direction,
  };
  return (
    <QuoteContext.Provider value={values}>{children}</QuoteContext.Provider>
  );
}

export { QuoteContext, QuoteContextProvider };
