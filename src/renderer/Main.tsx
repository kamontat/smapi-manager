import React, { useState } from "react";
import tw from "twin.macro";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

const Container = tw.div`
  flex h-full min-h-screen
`;

const Main = (): JSX.Element => {
  const navbar = [
    {
      key: "first",
      name: "First",
      element: <span>First page</span>,
    },
    {
      key: "second",
      name: "Second",
      element: <span>Second page</span>,
    },
  ];

  const [content, setContent] = useState(navbar[0]);

  return (
    <Container>
      <Navbar data={navbar} updater={setContent} />
      <Content>{content.element}</Content>
    </Container>
  );
};

export default Main;
