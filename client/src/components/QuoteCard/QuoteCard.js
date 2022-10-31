import React, { useContext, useState } from "react";
import { QuoteContext } from "../../service/QuoteContext";
import LocalStorage from "../../helpers/LocalStorage";
import "./QuoteCard.css";
import { Text, Paper } from "@mantine/core";

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
    } else {
      upVote(el);
    }
  };

  const downFunction = (el) => {
    if (localVote === "downvote" || el.givenVote === "downvote") {
      deleteDownVote(el);
    } else {
      downVote(el);
    }
  };

  return (
    <div className="card-section">
      <Paper shadow="md" radius="md" p="xl" className="paperclass">
        <Text className="main-content">{el.content}</Text>
        <Text className="main-author">{el.author}</Text>
      </Paper>
      {/* <p>{el.upvotesCount}</p>
      <p>{el.downvotesCount}</p>
      <button
        className={
          localVote === "upvote" || el.givenVote === "upvote" ? "activeUp" : ""
        }
        onClick={() => upFunction(el)}
      >
        Give up
      </button>
      <button
        className={
          localVote === "downvote" || el.givenVote === "downvote"
            ? "activeUp"
            : ""
        }
        onClick={() => downFunction(el)}
      >
        Give down
      </button>
      {el.givenVote}
      <p>{votePercent.toFixed()}%</p>
      <br></br> */}
    </div>
  );
}

export default QuoteCard;
