import React from "react";
import ReactDOM from "react-dom";

import IndexPage from "./pages/Index";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <IndexPage></IndexPage>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();
