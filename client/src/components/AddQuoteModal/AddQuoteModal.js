import { Button, Group, Modal } from "@mantine/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LocalStorage from "../../helpers/LocalStorage";
import { LoginContext } from "../../service/LoginContext";

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
  const [axiosTags, setAxiosTags] = useState([]);

  const [trigger, setTrigger] = useState(false);

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

  //   useEffect(() => {
  //     addQuote();
  //   }, []);

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
            onSubmit={() => (addQuote(), setOpened(false))}
          >
            <input
              type={"text"}
              placeholder="Add content"
              required
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
              style={{
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                textAlign: "center",
                height: "200px",
                width: "400px",
              }}
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
                style={{
                  marginLeft: "40px",
                  height: "30px",
                  width: "280px",
                  textAlign: "center",
                }}
              />
              <input
                type={"text"}
                placeholder="Tags"
                required
                value={tagsValue}
                onChange={(e) => setTagsValue(e.target.value)}
                style={{
                  marginTop: "20px",
                  marginLeft: "40px",
                  height: "30px",
                  width: "280px",
                  textAlign: "center",
                }}
              />
              <button
                style={{
                  marginTop: " 20px",
                  marginLeft: "40px",
                  width: "280px",
                  height: "20px",
                }}
                type="submit"
                onClick={() => (
                  setAxiosContent(contentValue),
                  setAxiosAuthor(authorValue),
                  setAxiosTags((prev) => [...prev, tagsValue])
                )}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)} variant={"transparent"}>
          Open Modal
        </Button>
      </Group>
    </>
  );
}

export default AddQuoteModal;
