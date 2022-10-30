import React, { useContext, useState } from "react";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";
import { Button, Collapse, Drawer, ScrollArea } from "@mantine/core";
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
              <AddQuoteModal />{" "}
              <Button onClick={() => setCollapse((o) => !o)} color="gray">
                Pick Tags
              </Button>
              <Collapse in={collapse}>
                <ScrollArea className="scrollarea">
                  {dataTags?.map((el) => (
                    <div
                      key={el}
                      style={{
                        fontSize: "14px",
                        marginTop: "15px",
                      }}
                    >
                      <input
                        type="checkbox"
                        value={el}
                        onClick={(e) => helpFunction(e)}
                      />
                      {el} <br />
                    </div>
                  ))}
                </ScrollArea>
              </Collapse>
            </Button.Group>
          </div>
          <div className="flex">
            <Button color="dark" onClick={logout}>
              LOGOUT
            </Button>
          </div>
        </Drawer>
        <button className=" flex button" onClick={() => setOpened(true)}>
          <i className="gg-menu"></i>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
