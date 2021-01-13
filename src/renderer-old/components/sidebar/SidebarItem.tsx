import * as React from "react";
import { m as motion } from "framer-motion";
import tw from "twin.macro";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const SidebarItemStyle = tw(motion.li)`
  flex items-center list-none
  mb-4
`;

const TextContainer = tw.div`
  flex flex-1 rounded-lg w-sidebar-items h-sidebar-items
  items-center
`;

const Text = tw.span`
  font-bold
`;

interface SidebarItemProperty {
  name: string;
  isOpen: boolean;

  onClick: () => void;
}

const SidebarItem = ({ name, isOpen, onClick }: SidebarItemProperty): JSX.Element => {
  return (
    <SidebarItemStyle
      style={{ cursor: isOpen ? "pointer" : "default" }}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <TextContainer onClick={() => isOpen && onClick()}>
        <Text>{name}</Text>
      </TextContainer>
    </SidebarItemStyle>
  );
};

export default SidebarItem;
