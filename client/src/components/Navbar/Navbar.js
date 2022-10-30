import React, { useContext, useState } from "react";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import { Button, Collapse, Drawer, Menu, ScrollArea } from "@mantine/core";
import AddQuoteModal from "../AddQuoteModal/AddQuoteModal";
import { QuoteContext } from "../../service/QuoteContext";
import "./Navbar.css";

function Navbar() {
  const [opened, setOpened] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const { setToken } = useContext(LoginContext);
  const logout = () => {
    setToken(null);
    LocalStorage.removeAllLocalStorage();
  };

  const { setTags, dataTags } = useContext(QuoteContext);

  const helpFunction = (e) =>
    setTags((prev) => {
      if (prev.find((el) => el === e.target.value)) {
        return prev.filter((el) => el !== e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "6vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
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
              <AddQuoteModal />{" "}
              <Menu width={400}>
                <Menu.Target>
                  <Button onClick={() => setCollapse((o) => !o)} color="gray">
                    Pick Tags
                  </Button>
                </Menu.Target>
                {/* <Collapse in={collapse}>
                  <ScrollArea
                    style={{
                      height: 150,
                      width: 450,
                      border: "2px solid black",
                      // borderRadius: "10px",
                      padding: "10px",
                    }}
                  > */}
                <Menu.Dropdown>
                  <Menu.Label>Tags</Menu.Label>
                  {dataTags?.map((el) => (
                    <Menu.Item>
                      <div key={el}>
                        <input
                          type="checkbox"
                          value={el}
                          onClick={(e) => helpFunction(e)}
                        />{" "}
                        {el} <br />
                      </div>
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
                {/* </ScrollArea>
                </Collapse> */}
              </Menu>
            </Button.Group>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button color="dark">LOGOUT</Button>
          </div>
        </Drawer>
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "none",
            border: "none",
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            marginTop: "8px",
            marginLeft: "1200px",
          }}
          onClick={() => setOpened(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
              fill="currentColor"
            />
            <path
              d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z"
              fill="currentColor"
            />
            <path
              d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
