import React, { PropsWithChildren } from "react";
import tw from "twin.macro";

import { OPEN_DIRECTORY } from "@common/constants/events";
import { createRendererEvent } from "@common/utils/event";

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
      onClick={() => window.postMessage(createRendererEvent({ type: OPEN_DIRECTORY, subtype: name }), "*")}
    >
      {children}
    </SelectDirectoryStyle>
  );
};

export default SelectDirectory;
