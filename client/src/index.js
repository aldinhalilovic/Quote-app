import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoginContextProvider } from "./services/LoginContext";
import { QuoteContextProvider } from "./services/QuoteContext";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <LoginContextProvider>
      <QuoteContextProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </QuoteContextProvider>
    </LoginContextProvider>
  </BrowserRouter>
);
