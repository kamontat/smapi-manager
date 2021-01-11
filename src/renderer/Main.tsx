import React, { useState } from "react";
import { m as motion } from "framer-motion";
import tw, { styled } from "twin.macro";

import Content from "./components/Content";
import Navbar from "./components/Navbar";

const Container = tw.div`
  flex h-full min-h-screen
`;

const Test = styled(motion.div)([tw`bg-white`, `border-radius: 30px;`, `width: 150px;`, `height: 150px;`]);

const Main = (): JSX.Element => {
  const navbar = [
    {
      key: "first",
      name: "First",
      element: (
        <Test
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            loop: Infinity,
            repeatDelay: 1,
          }}
        />
      ),
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
