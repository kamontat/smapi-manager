import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";

import { GlobalStyles } from "twin.macro";

import { DEBUG, Global, WARN } from "@common/logger";
import { isDevelopment } from "@common/utils/env";

import App from "./src/App";

Global.setLevel(isDevelopment() ? DEBUG : WARN);
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
