import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../services/LoginContext";
import LocalStorage from "../../helpers/LocalStorage";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";

function LoginCard() {
  const {
    setLoginPassword,
    setLoginUsername,
    getToken,
    token,
    rememberMe,
    setRememberMe,
  } = useContext(LoginContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (token && rememberMe) {
      LocalStorage.setLocalStorage("token", token);
      navigate("/homepage");
    } else if (token) {
      navigate("/homepage");
    } // eslint-disable-next-line
  }, [token]);

  const [localUsername, setLocalUsername] = useState("");
  const [localPassword, setLocalPassword] = useState("");

  return (
    <div>
      {/*  eslint-disable-next-line */}
      <form onSubmit={(e) => (e.preventDefault(), getToken())}>
        <Container size={420} mb={90}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Welcome
          </Title>
          <Text color="white" size="sm" align="center" mt={5}>
            Want to log in ?
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Username"
              placeholder="username"
              required
              value={localUsername}
              onChange={(e) => setLocalUsername(e.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              onChange={(e) => setLocalPassword(e.target.value)}
            />
            <Group position="apart" mt="md">
              {rememberMe ? (
                <Checkbox
                  label="Remember me"
                  onClick={() => setRememberMe(false)}
                />
              ) : (
                <Checkbox
                  label="Remember me"
                  onClick={() => setRememberMe(true)}
                />
              )}
            </Group>
            <Button
              type="submit"
              fullWidth
              mt="xl"
              onClick={() => (
                // eslint-disable-next-line
                setLoginUsername(localUsername), setLoginPassword(localPassword)
              )}
            >
              Sign in
            </Button>
          </Paper>
        </Container>
      </form>
    </div>
  );
}

export default LoginCard;
