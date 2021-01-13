import React, { PropsWithChildren, useEffect } from "react";
import tw from "twin.macro";

import { MODIFY_DIRECTORY, OPEN_DIRECTORY } from "@common/constants/events";
import ProcessorType from "@common/constants/processor-type";

import { DirectoryObject } from "@common/models/directory";
import Logger from "@common/models/logger";
import EventObject from "@common/models/event";

import { Table, TableBody, TableBodyElementStyle, TableHeader } from "./table";
import { InfoBadge, WarnBadge } from "./Badge";

const logger = new Logger("component", "directories");

const Container = tw.div`
  my-2 align-middle inline-block
  shadow overflow-hidden border-b border-gray-200 sm:rounded-lg
`;

const TriggerButton = tw.button`
  text-right text-sm font-medium
  text-red-500 hover:text-red-800 hover:underline
`;

interface DirectoriesProperty {
  setAction: React.Dispatch<React.SetStateAction<DirectoryObject[]>>;
  list: DirectoryObject[];
}

const modifyDirectory = (d: DirectoryObject) => {
  return () => {
    window.postMessage(EventObject.createRenderer({ type: MODIFY_DIRECTORY, value: d }).toJSON(), "*");
  };
};

const openDirectory = (d: DirectoryObject) => {
  return () => {
    window.postMessage(EventObject.createRenderer({ type: OPEN_DIRECTORY, value: d }).toJSON(), "*");
  };
};

const Directories = ({ setAction, list }: PropsWithChildren<DirectoriesProperty>): JSX.Element => {
  useEffect(() => {
    window.addEventListener("message", event => {
      const data = EventObject.load<DirectoryObject>(event.data);

      if (data.is(ProcessorType.PRELOAD, MODIFY_DIRECTORY)) {
        data.log(logger);

        setAction(directories => {
          const value = data.value();
          const copied = [...directories];
          const index = copied.findIndex(d => d.id === value?.id ?? "");

          logger.debug(`update directories index: ${index}`);
          if (index >= 0) copied[index] = value;

          return copied;
        });
      }
    });
  }, []);

  const headers = [
    { name: "ID", size: 1, css: tw`w-1/4` },
    { name: "Name", size: 1, css: tw`w-1/2` },
    { name: "Status", size: 3, css: tw`w-1/5` },
  ];

  return (
    <Container>
      <Table>
        <TableHeader headers={headers} />
        <TableBody type={list.length < 1 ? "empty" : "exist"} size={headers.length}>
          {list.map(d => (
            <tr key={d.id}>
              <TableBodyElementStyle scope="col">{d.id}</TableBodyElementStyle>
              <TableBodyElementStyle scope="col">{d.name.shown}</TableBodyElementStyle>
              <TableBodyElementStyle scope="col">
                {d.isHidden ? <WarnBadge>Hidden</WarnBadge> : <InfoBadge>Shown</InfoBadge>}
              </TableBodyElementStyle>
              <TableBodyElementStyle scope="col">
                <TriggerButton onClick={modifyDirectory(d)}>Toggle</TriggerButton>
              </TableBodyElementStyle>
              <TableBodyElementStyle scope="col">
                <TriggerButton onClick={openDirectory(d)}>Open</TriggerButton>
              </TableBodyElementStyle>
            </tr>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Directories;
