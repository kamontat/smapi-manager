import React from "react";
import tw from "twin.macro";

import { Back } from "./Link";

const Container = tw.div`
  flex justify-between
  mx-3
`;

interface HeaderProperty {
  name: string;
}

const Header = ({ name }: HeaderProperty): JSX.Element => {
  return (
    <Container>
      <div>
        <Back>{name}</Back>
      </div>
      <div>B</div>
    </Container>
  );
};

export default Header;
