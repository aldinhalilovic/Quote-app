import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoginContextProvider } from "./service/LoginContext";
import { QuoteContextProvider } from "./service/QuoteContext";
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
