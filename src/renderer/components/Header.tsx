import React, { PropsWithChildren } from "react";
import tw from "twin.macro";

import { Back, BackText } from "./Link";

const Container = tw.div`
  flex items-center
  mx-5 my-4
`;

const LeftContainer = tw.div`
  flex flex-grow justify-end space-x-6
`;

interface HeaderProperty {
  name: string;
}

const Header = ({ children }: PropsWithChildren<HeaderProperty>): JSX.Element => {
  return (
    <Container>
      <Back>
        <BackText />
      </Back>
      <LeftContainer>{children}</LeftContainer>
    </Container>
  );
};

export default Header;
