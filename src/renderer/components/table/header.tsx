import React from "react";
import tw from "twin.macro";
import { Interpolation } from "@emotion/serialize";

const HeaderStyle = tw.thead`
  bg-gray-50
`;

const HeaderElementStyle = tw.th`
  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
`;

type HeaderOption<T = unknown> = {
  name: string;
  size: number;
  css: Interpolation<T>;
};

type HeaderProperty = { headers: HeaderOption[] };

const Header = ({ headers }: HeaderProperty): JSX.Element => {
  return (
    <HeaderStyle>
      <tr>
        {headers.map(h => (
          <HeaderElementStyle scope="col" colSpan={h.size} css={h.css}>
            {h.name}
          </HeaderElementStyle>
        ))}
      </tr>
    </HeaderStyle>
  );
};

export default Header;
export { HeaderStyle, HeaderElementStyle };
