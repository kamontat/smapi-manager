import React from "react";
import { m as motion, SVGMotionProps, Variants } from "framer-motion";
import tw from "twin.macro";

const buttonSize = `25px`;
const buttonMargin = `40px`;
const events: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at ${buttonMargin} ${buttonMargin})`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: `circle(${buttonSize} at ${buttonMargin} ${buttonMargin})`,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <motion.path fill="transparent" strokeWidth="3" stroke="hsl(0, 0%, 18%)" strokeLinecap="round" {...(props as any)} />
);

const Toggle = tw.button`
  mt-sidebar ml-sidebar relative focus:outline-none z-2
`;

interface SidebarToggleProperty {
  toggle: () => void;
}
const SidebarToggle = ({ toggle }: SidebarToggleProperty): JSX.Element => {
  return (
    <Toggle onClick={toggle}>
      <svg width="25" height="25" viewBox="0 0 25 25">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </Toggle>
  );
};

export default SidebarToggle;
export { events as SidebarToggleEvents };
