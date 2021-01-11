import React from "react";
import ReactDOM from "react-dom";

import { MotionConfig, AnimationFeature } from "framer-motion";
import { GlobalStyles } from "twin.macro";

import IndexPage from "./pages/Index";
import Main from "./Main";

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
