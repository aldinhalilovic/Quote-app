import React, { useContext, useState, version } from "react";
import { QuoteContext } from "../../service/QuoteContext";
import LocalStorage from "../../helpers/LocalStorage";
import "./QuoteCard.css";

function QuoteCard({ el }) {
  const { upVote, downVote, deleteUpVote, deleteDownVote } =
    useContext(QuoteContext);

  const [votePercent, setVotePercent] = useState(
    (100 / (el.upvotesCount + el.downvotesCount)) * el.upvotesCount
  );

  const localVote = LocalStorage.getLocalStorage(`${el.id} currentvote`);

  const upFunction = (el) => {
    if (localVote === "upvote" || el.givenVote === "upvote") {
      deleteUpVote(el);
      // console.log(localVote, "deleteup");
    } else {
      upVote(el);
      // console.log(localVote, "upvote");
    }
  };

  const downFunction = (el) => {
    if (localVote === "downvote" || el.givenVote === "downvote") {
      deleteDownVote(el);
      // console.log(localVote, "deleteDownvote");
    } else {
      downVote(el);
      // console.log(localVote, "downVote");
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
      {/* <button
        className={
          localVote === "upvote" || el.givenVote === "upvote" ? "activeUp" : ""
        }
        onClick={() => upFunction(el)}
      >
        Give up
      </button> */}
      {/* <button
        className={
          localVote === "downvote" || el.givenVote === "downvote"
            ? "activeUp"
            : ""
        }
        onClick={() => downFunction(el)}
      >
        Give down
      </button> */}
      {el.givenVote}
      <p>{votePercent.toFixed()}%</p>
      <br></br>
    </div>
  );
}

export default QuoteCard;
