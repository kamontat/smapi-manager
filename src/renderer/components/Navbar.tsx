import React from "react";
import tw from "twin.macro";

interface NavBarObject {
  key: string;
  name: string;
  element: JSX.Element;
}
interface NavBarProperty {
  data: NavBarObject[];
  updater: React.Dispatch<React.SetStateAction<NavBarObject>>;
}

const NavbarStyle = tw.div`
  w-0 md:w-1/3 overflow-hidden bg-gray-500 md:px-4 md:py-3
`;

const Navbar = ({ data, updater }: NavBarProperty): JSX.Element => {
  const selectPage = (i: number) => {
    return () => updater(data[i]);
  };

  return (
    <NavbarStyle>
      {data.map((d, i) => {
        return (
          <div key={d.key}>
            <button onClick={selectPage(i)}>{d.name}</button>
          </div>
        );
      })}
    </NavbarStyle>
  );
};

export default Navbar;
