import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import LocalStorage from "../helpers/LocalStorage";
import { LoginContext } from "./LoginContext";

const QuoteContext = createContext();

function QuoteContextProvider({ children }) {
  const localToken = LocalStorage.getLocalStorage("token");
  const [lclToken, setLclToken] = useState(localToken);
  const { token } = useContext(LoginContext);
  const [quoteList, setQuoteList] = useState();

  const getQuotes = () => {
    axios
      .get("http://localhost:8000/quotes?pageSize=10", {
        headers: { Authorization: "Bearer " + (token || lclToken) },
      })
      .then(
        (res) => (console.log(res.data.quotes), setQuoteList(res.data.quotes))
      );
  };

  const upVote = (el) => {
    axios
      .post(
        `http://localhost:8000/quotes/${el.id}/upvote`,
        { el },
        {
          headers: { Authorization: "Bearer " + (token || lclToken) },
        }
      )
      .then((res) => console.log(res));
  };
  const downVote = (el) => {
    axios
      .post(
        `http://localhost:8000/quotes/${el.id}/downvote`,
        { el },
        {
          headers: { Authorization: "Bearer " + (token || lclToken) },
        }
      )
      .then((res) => console.log(res));
  };

  const deleteUpVote = (el) => {
    axios
      .delete(`http://localhost:8000/quotes/${el.id}/upvote`, {
        headers: { Authorization: "Bearer " + (token || lclToken) },
      })
      .then((res) => console.log(res));
  };

  const deleteDownVote = (el) => {
    axios
      .delete(`http://localhost:8000/quotes/${el.id}/downvote`, {
        headers: { Authorization: "Bearer " + (token || lclToken) },
      })
      .then((res) => console.log(res));
  };

  const values = {
    getQuotes,
    quoteList,
    upVote,
    downVote,
    deleteDownVote,
    deleteUpVote,
  };
  return (
    <QuoteContext.Provider value={values}>{children}</QuoteContext.Provider>
  );
}

export { QuoteContext, QuoteContextProvider };
