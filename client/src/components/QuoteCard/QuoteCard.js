import React, { useContext } from "react";
import { QuoteContext } from "../../services/QuoteContext";
import { Text, Paper } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./QuoteCard.css";

function QuoteCard({ el }) {
  const { upVote, downVote, deleteUpVote, deleteDownVote } =
    useContext(QuoteContext);

  const voteUp = (el) => {
    if (el.givenVote === "upvote") {
      deleteUpVote(el);
    } else {
      upVote(el);
    }
  };

  const voteDown = (el) => {
    if (el.givenVote === "downvote") {
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
      <div className="voting">
        <div className="flex">
          <p className={el.givenVote === "downvote" ? "votescounted" : ""}>
            {el.downvotesCount}
          </p>
          <button className="voteButton" onClick={() => voteDown(el)}>
            {el.givenVote === "downvote" ? (
              <FontAwesomeIcon
                icon={faCaretDown}
                size={"2xl"}
                style={{
                  color: "rgb(196, 67, 67)",
                }}
              />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} size={"xl"} />
            )}
          </button>
        </div>
        <div
          className={
            el.givenVote === "upvote"
              ? "votescount"
              : "" || el.givenVote === "downvote"
              ? "votescounted"
              : ""
          }
        >
          {el.upvotesCount === 0 && el.downvotesCount === 0 ? (
            <p>Vote</p>
          ) : (
            <p>
              {(
                (100 / (el.upvotesCount + el.downvotesCount)) *
                el.upvotesCount
              ).toFixed()}
              %
            </p>
          )}
        </div>
        <div className="flex">
          <button className="voteButton" onClick={() => voteUp(el)}>
            {el.givenVote === "upvote" ? (
              <FontAwesomeIcon
                icon={faCaretUp}
                size={"2xl"}
                style={{ color: "green" }}
              />
            ) : (
              <FontAwesomeIcon icon={faCaretUp} size={"xl"} />
            )}
          </button>
          <p className={el.givenVote === "upvote" ? "votescount" : ""}>
            {el.upvotesCount}
          </p>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default QuoteCard;
