import React, { useRef } from "react";
import { m as motion, useCycle } from "framer-motion";

import SidebarObjects, { SidebarObject } from "./SidebarObjects";
import Sidebar from "./Sidebar";
import SidebarToggle, { SidebarToggleEvents } from "./SidebarToggle";

import { useDimensions } from "../../utils/dimension";
import tw from "twin.macro";

const Nav = tw(motion.nav)`
  min-w-sidebar w-sidebar
  absolute top-0 left-0 bottom-0
`;

const NavAnimate = tw(motion.div)`
  absolute top-0 left-0 bottom-0 z-1
  min-w-sidebar w-sidebar bg-gray-200 shadow-xl
`;

interface SidebarContainerProperty {
  page: SidebarObject;
  pages: SidebarObjects<string>;
  updater: React.Dispatch<React.SetStateAction<SidebarObject>>;
}

const SidebarContainer = ({ page, pages, updater }: SidebarContainerProperty): JSX.Element => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <Nav initial={false} animate={isOpen ? "open" : "closed"} custom={height} ref={containerRef}>
      <NavAnimate variants={SidebarToggleEvents} />
      <SidebarToggle toggle={() => toggleOpen()} />

      <Sidebar page={page} pages={pages} updater={updater} isOpen={isOpen} close={() => toggleOpen()} />
    </Nav>
  );
};

export default SidebarContainer;
