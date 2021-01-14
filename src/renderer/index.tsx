import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";

import { GlobalStyles } from "twin.macro";
import App from "./src/App";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
