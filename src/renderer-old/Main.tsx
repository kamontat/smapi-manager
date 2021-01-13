import React, { useState } from "react";
import tw from "twin.macro";

import ModManager from "./pages/ModManager";

import SidebarContainer from "./components/sidebar/SidebarContainer";
import Contentbar from "./components/contentbar/Contentbar";

import { build } from "./components/sidebar/SidebarObjects";
import Header from "./components/Header";

const sidebar = build({
  modManager: {
    key: "mod-manager",
    name: "Mod Manager",
    element: <ModManager />,
  },
  first: {
    key: "first",
    name: "First",
    element: <span tw="text-right">first page</span>,
  },
  second: {
    key: "second",
    name: "Second",
    element: <span tw="text-right">second page</span>,
  },
  third: {
    key: "third",
    name: "Third",
    element: <span tw="text-right">third page</span>,
  },
  fourth: {
    key: "fourth",
    name: "Fourth",
    element: <span tw="text-right">fourth page</span>,
  },
  fifth: {
    key: "fifth",
    name: "Fifth",
    element: <span tw="text-right">fifth page</span>,
  },
  sixth: {
    key: "sixth",
    name: "Sixth",
    element: <span tw="text-right">sixth page</span>,
  },
});

const Container = tw.div`
  min-h-screen h-full w-full overflow-hidden
  flex
`;

const Main = (): JSX.Element => {
  const [page, setPage] = useState(sidebar["first"]);

  return (
    <Container>
      <SidebarContainer page={page} pages={sidebar} updater={setPage} />
      <Contentbar>
        <Header name={page.name}></Header>
        {page.element}
      </Contentbar>
    </Container>
  );
};

export default Main;
