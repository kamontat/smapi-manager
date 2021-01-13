import React from "react";
import ReactDOM from "react-dom";

import { MotionConfig, AnimationFeature } from "framer-motion";
import { GlobalStyles } from "twin.macro";

import IndexPage from "./pages/Index"; // v1
import Main from "./Main"; //v2

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <MotionConfig features={[AnimationFeature]}>
        <GlobalStyles />
        <Main />
      </MotionConfig>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();
