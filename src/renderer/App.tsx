import React from "react";
import ReactDOM from "react-dom";

import { GlobalStyles } from "twin.macro";

import IndexPage from "./pages/Index";
import Main from "./Main";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <GlobalStyles />
      <Main />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();
