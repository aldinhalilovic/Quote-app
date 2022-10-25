import React, { useContext, useState } from "react";
import { QuoteContext } from "../../service/QuoteContext";
import "./QuoteCard.css";

function QuoteCard({ el }) {
  const { upVote, downVote, deleteUpVote, deleteDownVote } =
    useContext(QuoteContext);

  const [currentUpVote, setCurrentUpVote] = useState(el.givenVote);
  const [currentDownVote, setCurrentDownVote] = useState(el.givenVote);
  const [votePercent, setVotePercent] = useState(
    (100 / (el.upvotesCount + el.downvotesCount)) * el.upvotesCount
  );

  const upFunction = (el) => {
    if (currentUpVote === "upvote") {
      deleteUpVote(el);
      //   setCurrentUpVote("none");
    } else if (currentUpVote === "none") {
      upVote(el);
      //   setCurrentUpVote("upvote");
    }
  };

  const downFunction = (el) => {
    if (currentDownVote === "downvote") {
      deleteDownVote(el);
    } else if (currentDownVote === "none") {
      downVote(el);
    }
  };

  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "spaceBetween",
        alignItems: "center",
      }}
    >
      <h1>{el.content}</h1>
      <p>{el.author}</p>
      <p>{el.upvotesCount}</p>
      <p>{el.downvotesCount}</p>
      <button
        className={currentUpVote === "upvote" ? "activeUp" : ""}
        onClick={() => upFunction(el)}
      >
        Give up
      </button>
      <button
        className={currentDownVote === "downvote" ? "activeUp" : ""}
        onClick={() => downFunction(el)}
      >
        Give down
      </button>
      {el.givenVote}
      <p>{votePercent.toFixed()}%</p>
      <br></br>
    </div>
  );
}

export default QuoteCard;
