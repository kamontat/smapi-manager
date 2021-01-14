import React, { PropsWithChildren } from "react";
import tw from "twin.macro";

import { FIND_DIRECTORY } from "@common/constants/events";
import ProcessorType from "@common/constants/processor-type";
import Message from "@common/models/message";

interface FindDirectory {
  name: string;
}

const Text = tw.a`
  whitespace-nowrap text-blue-600 hover:text-blue-900 cursor-pointer
`;

const FindDirectory = ({ children, name }: PropsWithChildren<FindDirectory>): JSX.Element => {
  const message = new Message(window, ProcessorType.RENDERER);
  return (
    <Text
      onClick={() => {
        message.sent({ type: FIND_DIRECTORY, subtype: name });
      }}
    >
      {children}
    </Text>
  );
};

export default FindDirectory;
