import React, { PropsWithChildren } from "react";
import tw from "twin.macro";

const BodyStyle = tw.tbody`bg-white divide-y divide-gray-200`;

const BodyElementStyle = tw.td`px-6 py-4 whitespace-nowrap`;

const EmptyBodyElementStyle = tw(BodyElementStyle)`text-center`;

type BodyProperty = { type: "empty" | "exist"; size: number };
const Body = ({ type, size, children }: PropsWithChildren<BodyProperty>): JSX.Element => {
  return (
    <BodyStyle>
      {type === "empty" ? (
        <tr>
          <EmptyBodyElementStyle colSpan={size}>Empty</EmptyBodyElementStyle>
        </tr>
      ) : (
        children
      )}
    </BodyStyle>
  );
};

export default Body;
export { BodyStyle, BodyElementStyle, EmptyBodyElementStyle };
