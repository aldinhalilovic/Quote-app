import React, { useContext, useState } from "react";
import { QuoteContext } from "../../services/QuoteContext";
import { LoginContext } from "../../services/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import AddQuoteModal from "../AddQuoteModal/AddQuoteModal";
import { Button, Collapse, Drawer, ScrollArea } from "@mantine/core";
import "./Navbar.css";

function Navbar() {
  const [opened, setOpened] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [sortCollapse, setSortCollapes] = useState(false);
  const { setToken } = useContext(LoginContext);
  const logout = () => {
    setToken(null);
    LocalStorage.removeAllLocalStorage();
  };

  const { setTags, dataTags, setSortBy, setPage } = useContext(QuoteContext);

  const helpTagFunction = (e) => {
    setPage(1);
    setTags((prev) => {
      if (prev.find((el) => el === e.target.value)) {
        return prev.filter((el) => el !== e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });
  };

  const helpSortFunction = (e) => {
    setPage(1);
    setSortBy((prev) => {
      if (prev.find((el) => el === e.target.value)) {
        return prev.filter((el) => el !== e.target.value);
      } else {
        return [e.target.value];
      }
    });
  };

  return (
    <div className="navbar">
      <div className="header">
        <h1>Quote APP</h1>
      </div>
      <div className="header">
        <Drawer
          position="right"
          opened={opened}
          onClose={() => setOpened(false)}
          title="Settings"
          padding="xl"
          size="xl"
          overlayOpacity={0.4}
          overlayBlur={1}
        >
          <div className="drawer">
            <Button.Group orientation="vertical" className="border">
              <AddQuoteModal />
              <Button
                onClick={() => setCollapse((o) => !o)}
                variant={!collapse ? "transparent" : ""}
                color="gray"
                className="header bottom-border"
              >
                Pick Tags
              </Button>
              <Collapse in={collapse}>
                <ScrollArea className="scrollarea">
                  <ul>
                    {dataTags?.map((el) => (
                      <li>
                        <>
                          <input
                            type="checkbox"
                            value={el}
                            id={el}
                            onClick={(e) => helpTagFunction(e)}
                          />
                          <label for={el}>{el}</label>
                        </>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </Collapse>
              <Button
                onClick={() => setSortCollapes((o) => !o)}
                variant={!sortCollapse ? "transparent" : ""}
                color="gray"
                className="header"
              >
                Sort by
              </Button>
              <Collapse in={sortCollapse}>
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "15px",
                  }}
                >
                  <ul>
                    <li>
                      <input
                        type="checkbox"
                        value="createdAt"
                        id="createdAt"
                        className="inputsize"
                        onClick={(e) => helpSortFunction(e)}
                      />
                      <label for="createdAt">createdAt</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        value="author"
                        id="author"
                        className="inputsize"
                        onClick={(e) => helpSortFunction(e)}
                      />
                      <label for="author">author</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        value="upvotesCount"
                        id="upvotesCount"
                        className="inputsize"
                        onClick={(e) => helpSortFunction(e)}
                      />
                      <label for="upvotesCount">upvotesCount</label>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </Button.Group>
          </div>
          <div className="flex">
            <Button color="dark" onClick={logout} className="header">
              LOGOUT
            </Button>
          </div>
        </Drawer>
        <button className="flex button" onClick={() => setOpened(true)}>
          <i className="gg-menu"></i>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
