import React, { useEffect, useState } from "react";
import tw from "twin.macro";

import { FIND_DIRECTORY } from "@common/constants/events";

import Logger from "@common/models/logger";
import { Directory, DirectoryObject } from "@common/models/directory";

import Header from "../components/Header";
import SelectDirectory from "../components/SelectDirectory";
import Body from "../components/Body";
import Directories from "../components/Directories";
import ProcessorType from "@common/constants/processor-type";
import EventObject from "@common/models/event";

const Container = tw.div`flex flex-col`;

const logger = new Logger("page", "index");

const IndexPage = (): JSX.Element => {
  const [directory, setDirectory] = useState("");
  const [directories, setDirectories] = useState<DirectoryObject[]>([]);

  useEffect(() => {
    window.addEventListener("message", event => {
      const data = EventObject.load<Directory>(event.data);
      if (data.is(ProcessorType.PRELOAD, FIND_DIRECTORY)) {
        data.log(logger);

        const value = data.value();
        setDirectory(value.name);
        setDirectories(value.subdirectories);
      }
    });
  }, []);

  return (
    <Container>
      <Header>
        <SelectDirectory name="steam">Steam</SelectDirectory>
        <SelectDirectory name="gog">GOG</SelectDirectory>
        <SelectDirectory name="custom">Custom</SelectDirectory>
      </Header>
      <Body>
        <span>{directory}</span>
        <Directories setAction={setDirectories} list={directories} />
      </Body>
    </Container>
  );
};

export default IndexPage;
