import React, { PropsWithChildren } from "react";
import tw from "twin.macro";

import ProcessorType from "@common/constants/processor-type";
import { Message, FIND_MODS } from "@common/event";

interface FindDirectory {
  name: string;
}

const Text = tw.a`
  whitespace-nowrap text-blue-600 hover:text-blue-900 cursor-pointer
`;

const FindDirectory = ({ children, name }: PropsWithChildren<FindDirectory>): JSX.Element => {
  const message = new Message(ProcessorType.RENDERER);
  return (
    <Text
      onClick={() => {
        message.sent({ type: FIND_MODS, subtype: name });
      }}
    >
      {children}
    </Text>
  );
};

export default FindDirectory;
