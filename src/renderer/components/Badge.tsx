import { Interpolation, Theme } from "@emotion/react";
import React, { PropsWithChildren } from "react";
import tw from "twin.macro";

const BadgeContainer = tw.div`
  flex space-x-3 mt-3 mb-2
`;

interface BadgeProperty {
  type: "red" | "green" | "blue" | "purple" | "yellow" | "gray" | "indigo" | "pink";
  onClick?: () => void;
}

const Badge = ({ type, onClick, children }: PropsWithChildren<BadgeProperty>): JSX.Element => {
  const base: Interpolation<Theme> = [tw`text-xs leading-5 rounded-full cursor-default`, tw`px-2 md:px-4 py-1`];
  switch (type) {
    case "green":
      base.push(tw`bg-green-200 text-green-800`);
      break;
    case "blue":
      base.push(tw`bg-blue-200 text-blue-800`);
      break;
    case "yellow":
      base.push(tw`bg-yellow-200 text-yellow-800`);
      break;
    case "red":
      base.push(tw`bg-red-200 text-red-800`);
      break;
    case "purple":
      base.push(tw`bg-purple-200 text-purple-800`);
      break;
    case "gray":
      base.push(tw`bg-gray-200 text-gray-800`);
      break;
    case "indigo":
      base.push(tw`bg-indigo-200 text-indigo-800`);
      break;
    case "pink":
      base.push(tw`bg-pink-200 text-pink-800`);
      break;
    default:
      break;
  }

  if (onClick) {
    base.push(tw`hover:underline cursor-pointer`);
  }

  return (
    <span css={base} onClick={onClick}>
      {children}
    </span>
  );
};

export default BadgeContainer;
export { Badge };
