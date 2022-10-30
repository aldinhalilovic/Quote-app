import { Button, Group, Modal } from "@mantine/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LocalStorage from "../../helpers/LocalStorage";
import { LoginContext } from "../../service/LoginContext";
import "./AddQuoteModal.css";

function AddQuoteModal() {
  const localToken = LocalStorage.getLocalStorage("token");
  const [lclToken, setLclToken] = useState(localToken);
  const { token } = useContext(LoginContext);
  const [opened, setOpened] = useState(false);
  const [contentValue, setContentValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [tagsValue, setTagsValue] = useState("");
  const [axiosAuthor, setAxiosAuthor] = useState();
  const [axiosContent, setAxiosContent] = useState();
  const [axiosTags, setAxiosTags] = useState();

  const addQuote = () => {
    axios
      .post(
        "http://localhost:8000/quotes",
        {
          content: axiosContent,
          author: axiosAuthor,
          tags: axiosTags,
        },
        {
          headers: { Authorization: "Bearer " + (token || lclToken) },
        }
      )
      .then((res) => console.log(res));
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add your quote"
        size={"xl"}
      >
        <div>
          <form
            height={300}
            style={{
              display: "flex",
            }}
            onSubmit={addQuote}
          >
            <input
              type={"text"}
              placeholder="Add content"
              required
              className="inputstyle"
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                type={"text"}
                placeholder="Author"
                required
                value={authorValue}
                onChange={(e) => setAuthorValue(e.target.value)}
                className="inputposition"
              />
              <input
                type={"text"}
                placeholder="Tags"
                required
                value={tagsValue}
                onChange={(e) => setTagsValue(e.target.value)}
                className="inputposition marginS"
              />
              <button
                className="inputposition marginL"
                type="submit"
                onClick={() => (
                  setAxiosContent(contentValue),
                  setAxiosAuthor(authorValue),
                  setAxiosTags(tagsValue.split(","))
                )}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Button
        onClick={() => setOpened(true)}
        variant={"transparent"}
        color="gray"
      >
        Add Quote
      </Button>
    </>
  );
}

export default AddQuoteModal;
