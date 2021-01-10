import React from "react";
import ReactDOM from "react-dom";

import { GlobalStyles } from "twin.macro";
import IndexPage from "./pages/Index";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <GlobalStyles />
      <IndexPage></IndexPage>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();
