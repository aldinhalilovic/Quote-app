import React, { useContext, useState } from "react";
import { QuoteContext } from "../../service/QuoteContext";
import { LoginContext } from "../../service/LoginContext";
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

  const { setTags, dataTags, setSortBy } = useContext(QuoteContext);

  const helpTagFunction = (e) =>
    setTags((prev) => {
      if (prev.find((el) => el === e.target.value)) {
        return prev.filter((el) => el !== e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });

  const helpSortFunction = (e) =>
    setSortBy((prev) => {
      if (prev.find((el) => el === e.target.value)) {
        return prev.filter((el) => el !== e.target.value);
      } else {
        return [e.target.value];
      }
    });

  return (
    <div className="navbar">
      <div>
        <h1>Quote APP</h1>
      </div>
      <div>
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
            <Button.Group orientation="vertical">
              <AddQuoteModal />
              <Button onClick={() => setCollapse((o) => !o)} color="gray">
                Pick Tags
              </Button>
              <Collapse in={collapse}>
                <ScrollArea className="scrollarea">
                  {dataTags?.map((el) => (
                    <div key={el} className="inputsize">
                      <input
                        type="checkbox"
                        value={el}
                        onClick={(e) => helpTagFunction(e)}
                      />
                      {el} <br />
                    </div>
                  ))}
                </ScrollArea>
              </Collapse>
              <Button
                onClick={() => setSortCollapes((o) => !o)}
                variant="transparent"
                color="gray"
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
                  <input
                    type="checkbox"
                    value="createdAt"
                    className="inputsize"
                    onClick={(e) => helpSortFunction(e)}
                  />
                  createdAt <br />
                  <input
                    type="checkbox"
                    value="author"
                    className="inputsize"
                    onClick={(e) => helpSortFunction(e)}
                  />
                  author <br />
                  <input
                    type="checkbox"
                    value="upvotesCount"
                    className="inputsize"
                    onClick={(e) => helpSortFunction(e)}
                  />
                  upvotesCount <br />
                </div>
              </Collapse>
            </Button.Group>
          </div>
          <div className="flex">
            <Button color="dark" onClick={logout}>
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
