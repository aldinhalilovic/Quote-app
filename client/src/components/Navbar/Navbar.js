import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import React, { useContext } from "react";
import { LoginContext } from "../../service/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export function Navbar() {
  const { setToken } = useContext(LoginContext);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();

  const logout = () => {
    setToken(null);
    LocalStorage.removeAllLocalStorage();
  };

  return (
    <Box
      pb={120}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: "2",
      }}
    >
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <h2>Quote's Library</h2>
          <Button
            className={classes.hiddenMobile}
            mb={10}
            type="submit"
            onClick={logout}
          >
            Log Out
          </Button>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button type="submit" onClick={logout}>
              Log Out
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
