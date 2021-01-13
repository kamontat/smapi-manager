import React, { PropsWithChildren } from "react";
import tw from "twin.macro";

const HeaderStyle = tw.div`
  flex justify-between items-center w-full
  h-sidebar-full mt-2 ml-16
`;

const Text = tw.span``;

interface HeaderProperty {
  name: string;
}

const Header = ({ name, children }: PropsWithChildren<HeaderProperty>): JSX.Element => {
  return (
    <HeaderStyle>
      <Text>{name}</Text>
      {children ?? <Text></Text>}
    </HeaderStyle>
  );
};

export default Header;
