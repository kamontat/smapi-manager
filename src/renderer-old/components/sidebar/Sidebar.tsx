import React from "react";
import tw from "twin.macro";
import { m as motion } from "framer-motion";

import SidebarItem from "./SidebarItem";
import SidebarObjects, { SidebarObject } from "./SidebarObjects";

const SidebarItems = tw(motion.ul)`
  relative flex flex-col justify-center items-center
  px-sidebar py-4 z-2
`;

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

interface SidebarProperty {
  page: SidebarObject;
  pages: SidebarObjects<string>;
  updater: React.Dispatch<React.SetStateAction<SidebarObject>>;

  isOpen: boolean;
  close: () => void;
}

const Sidebar = ({ pages, updater, isOpen, close }: SidebarProperty): JSX.Element => {
  return (
    <SidebarItems variants={variants}>
      {Object.keys(pages).map(key => (
        <SidebarItem
          key={key}
          name={pages[key].name}
          isOpen={isOpen}
          onClick={() => {
            updater(pages[key]);
            close();
          }}
        />
      ))}
    </SidebarItems>
  );
};

export default Sidebar;
