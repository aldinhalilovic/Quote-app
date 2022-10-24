import React, { useContext } from "react";
import { QuoteContext } from "../../service/QuoteContext";

function QuoteCard({ el }) {
  const { upVote, downVote, deleteUpVote, deleteDownVote } =
    useContext(QuoteContext);

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
      <p>{el.content}</p>
      <p>{el.author}</p>
      <p>{el.upvotesCount}</p>
      <p>{el.downvotesCount}</p>
      <p>{el.givenVote}</p>

      {/* treba dodati funkcije za upvote,downtvote,deleteUpVote,deleteDownVote, */}

      <hr />
      <hr />
      <hr />
      <hr />
    </div>
  );
}

export default QuoteCard;
