import React, { useContext, useState } from "react";
import { QuoteContext } from "../../service/QuoteContext";
import "./QuoteCard.css";
import { Text, Paper } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faSolid,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

function QuoteCard({ el }) {
  const { upVote, downVote, deleteUpVote, deleteDownVote } =
    useContext(QuoteContext);

  const [votePercent, setVotePercent] = useState(
    (100 / (el.upvotesCount + el.downvotesCount)) * el.upvotesCount
  );

  //upvote da bude nazim
  const upFunction = (el) => {
    if (el.givenVote === "upvote") {
      deleteUpVote(el);
    } else {
      upVote(el);
    }
  };

  const downFunction = (el) => {
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
      <div
        style={{
          height: "50px",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="flex">
          <p>{el.downvotesCount}</p>
          <button
            className={el.givenVote === "downvote" ? "activeUp" : "noneActive"}
            onClick={() => downFunction(el)}
          >
            <FontAwesomeIcon icon={faCaretDown} size={"xl"} />
          </button>
        </div>
        <p>
          {(
            (100 / (el.upvotesCount + el.downvotesCount)) *
            el.upvotesCount
          ).toFixed()}
          %
        </p>
        <div className="flex">
          <button
            className={el.givenVote === "upvote" ? "activeUp" : "noneActive"}
            onClick={() => upFunction(el)}
          >
            <FontAwesomeIcon icon={faCaretUp} size="xl" />
          </button>
          <p>{el.upvotesCount}</p>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default QuoteCard;
