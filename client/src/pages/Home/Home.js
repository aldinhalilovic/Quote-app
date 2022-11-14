import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../services/LoginContext";
import { QuoteContext } from "../../services/QuoteContext";
import LocalStorage from "../../helpers/LocalStorage";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Pagination } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
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
    } // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    getQuotes(tags);
    getTags();
    getTotalPages(); // eslint-disable-next-line
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
        {direction === "desc" ? (
          <>
            <p>asc</p>
            <p>
              <FontAwesomeIcon icon={faCaretUp} size={"xl"} />
            </p>
          </>
        ) : (
          <>
            <p>desc</p>
            <p>
              <FontAwesomeIcon icon={faCaretDown} size={"xl"} />
            </p>
          </>
        )}
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
          onClick={() => window.scroll(0, 0)}
          total={Math.ceil(totalPages / 5)}
          color="gray"
          radius="lg"
          mt={40}
          mb={30}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
