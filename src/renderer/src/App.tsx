import React from "react";
import tw from "twin.macro";
import { Route, Switch } from "react-router";

import pages from "./pages";

const Container = tw.div`
  min-w-full min-h-full
  w-screen h-screen
  font-mono text-base font-normal leading-tight text-justify
`;

const App = (): JSX.Element => {
  return (
    <Container>
      <Switch>
        {pages.map(p => {
          const Element = p.element;
          return (
            <Route key={p.key} exact={p.path === "/"} path={p.path}>
              <Element name={p.name}></Element>
            </Route>
          );
        })}
      </Switch>
    </Container>
  );
};

export default App;
