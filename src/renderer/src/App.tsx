import React from "react";
import tw from "twin.macro";
import { Route, Switch } from "react-router";

import pages from "./pages";
import Message from "@common/models/message";
import ProcessorType from "@common/constants/processor-type";
import { READ_CONFIG } from "@common/constants/events";

const Container = tw.div`
  min-w-full min-h-full
  w-screen h-screen
  font-mono text-base font-normal leading-tight text-justify
`;

const App = (): JSX.Element => {
  return (
    <Container>
      <Switch>
        {Object.keys(pages).map(key => {
          const page = pages[key as keyof typeof pages];
          const Element = page.element;
          return (
            <Route key={key} exact path={page.path}>
              <Element name={page.name}></Element>
            </Route>
          );
        })}
      </Switch>
    </Container>
  );
};

export default App;
