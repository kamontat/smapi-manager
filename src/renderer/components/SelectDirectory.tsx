import React, { PropsWithChildren } from "react";
import tw from "twin.macro";

import { FIND_DIRECTORY } from "@common/constants/events";
import EventObject from "@common/models/event";

const SelectDirectoryStyle = tw.button`
  whitespace-nowrap text-base font-medium text-blue-500 hover:text-blue-800
  mx-2
`;

interface SelectDirectoryProps {
  name: string;
}

const SelectDirectory = ({ name, children }: PropsWithChildren<SelectDirectoryProps>): JSX.Element => {
  return (
    <SelectDirectoryStyle
      onClick={() =>
        window.postMessage(EventObject.createRenderer({ type: FIND_DIRECTORY, subtype: name }).toJSON(), "*")
      }
    >
      {children}
    </SelectDirectoryStyle>
  );
};

export default SelectDirectory;
