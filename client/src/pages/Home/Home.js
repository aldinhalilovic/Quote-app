import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../service/LoginContext";
import { QuoteContext } from "../../service/QuoteContext";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import Navbar from "../../components/Navbar/Navbar";
import LocalStorage from "../../helpers/LocalStorage";
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
    sortBy,
    activePage,
    setPage,
    setDirection,
    direction,
  } = useContext(QuoteContext);
  const { token, setToken, rememberMe } = useContext(LoginContext);
  const navigate = useNavigate();

  const sorting = () => {
    if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection("desc");
    }
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
    getQuotes(tags);
    getTags();
    getTotalPages();
  }, [tags, activePage, sortBy, direction]);

  return (
    <div
      style={{
        backgroundColor: "#ccc",
        scrollBehavior: "smooth",
        width: "100%",
      }}
    >
      <Navbar />
      <button onClick={sorting} className="buttonSorting">
        {direction === "desc" ? "asc" : "desc"}
      </button>
      <div className="hero">
        <div className="quote-list">
          {quoteList?.map((el) => (
            <div key={el.id}>
              <QuoteCard el={el} />
            </div>
          ))}
        </div>
        <Pagination
          page={activePage}
          onChange={setPage}
          onClick={() =>
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
          total={Math.ceil(totalPages / 5)}
          color="gray"
          radius="lg"
          mt={40}
          mb={30}
        />
      </div>
    </div>
  );
}

export default Home;
