import React, { useContext, useState } from "react";
import axios from "axios";
import LocalStorage from "../../helpers/LocalStorage";
import { LoginContext } from "../../services/LoginContext";
import { QuoteContext } from "../../services/QuoteContext";
import { Button, Modal } from "@mantine/core";
import "./AddQuoteModal.css";

function AddQuoteModal() {
  const localToken = LocalStorage.getLocalStorage("token");
  const [lclToken] = useState(localToken);
  const { token } = useContext(LoginContext);
  const { setQuoteList } = useContext(QuoteContext);
  const [opened, setOpened] = useState(false);
  const [contentValue, setContentValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [tagsValue, setTagsValue] = useState("");
  const [axiosAuthor, setAxiosAuthor] = useState();
  const [axiosContent, setAxiosContent] = useState();
  const [axiosTags, setAxiosTags] = useState();
  const URL = process.env.REACT_APP_BASE_URL;

  const addQuote = (e) => {
    e.preventDefault();
    setOpened(false);
    axios
      .post(
        `${URL}/quotes`,
        {
          content: axiosContent,
          author: axiosAuthor,
          tags: axiosTags,
        },
        {
          headers: { Authorization: "Bearer " + (token || lclToken) },
        }
      )
      .then((res) => setQuoteList((prev) => [res.data, ...prev]));
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
            width={"60%"}
            style={{
              display: "flex",
            }}
            onSubmit={(e) => addQuote(e)}
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
        variant={!opened ? "transparent" : ""}
        color="gray"
        className="header bottom-border"
      >
        Add Quote
      </Button>
    </>
  );
}

export default AddQuoteModal;
