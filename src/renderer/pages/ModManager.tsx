import React, { useEffect, useState } from "react";
import tw from "twin.macro";

import Header from "@components/Header";
import FindDirectory from "@components/FindDirectory";
import Table, {
  TableRow,
  TableHeader,
  TableHeaderElement,
  TableBody,
  TableBodyElement,
  TableCaption,
} from "@components/table";

import ProcessorType from "@common/constants/processor-type";
import { FIND_DIRECTORY, MODIFY_DIRECTORY, OPEN_DIRECTORY } from "@common/constants/events";
import { getWindowName } from "@common/constants/name";
import Message from "@common/models/message";
import { Directory, DirectoryObject } from "@common/models/directory";
import { InfoBadge, WarnBadge } from "@components/Badge";

interface ModManagerProperty {
  name: string;
}

const Container = tw.div`
  flex flex-col h-full
  bg-gradient-to-tr from-purple-600 via-pink-500 to-red-300
`;

const TableContainer = tw.div`
  mx-4 my-2 align-middle inline-block
  shadow overflow-hidden border-b border-gray-200 sm:rounded-lg
`;

const Button = tw.button`
  text-right text-sm
  text-red-500 hover:text-red-800 hover:underline
`;

const headers = [
  { name: "Name", size: 1 },
  { name: "Status", size: 1 },
  { name: "Action", size: 2 },
];

const message = new Message(window, ProcessorType.RENDERER);
const modifyDirectory = (d: DirectoryObject) => {
  return () => {
    message.sent({ type: MODIFY_DIRECTORY, value: d });
  };
};

const openDirectory = (d: DirectoryObject) => {
  return () => {
    message.sent({ type: OPEN_DIRECTORY, value: d });
  };
};

const ModManager = ({ name }: ModManagerProperty): JSX.Element => {
  const [directoryName, setDirectoryName] = useState("");
  const [mods, setMods] = useState<DirectoryObject[]>([]);

  useEffect(() => {
    document.title = getWindowName(name);
    message.receive<Directory>(ProcessorType.PRELOAD, data => {
      if (data.isType(FIND_DIRECTORY)) {
        const value = data.value();
        setDirectoryName(value.name);
        setMods(value.subdirectories);
      }
    });
    message.receive<DirectoryObject>(ProcessorType.PRELOAD, data => {
      if (data.isType(MODIFY_DIRECTORY)) {
        const value = data.value();
        setMods(mods => {
          const copied = [...mods];
          const index = copied.findIndex(d => d.id === value.id);
          if (index >= 0) copied[index] = value;
          return copied;
        });
      }
    });
  }, []);

  return (
    <Container>
      <Header name={name}>
        <FindDirectory name="steam">Steam</FindDirectory>
        <FindDirectory name="gog">GOG</FindDirectory>
        <FindDirectory name="custom">Custom</FindDirectory>
      </Header>
      <TableContainer>
        <Table>
          <TableCaption>{directoryName}</TableCaption>
          <TableHeader>
            <TableRow>
              {headers.map(h => (
                <TableHeaderElement key={h.name} colSpan={h.size}>
                  {h.name}
                </TableHeaderElement>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody type={mods.length > 0 ? "exist" : "empty"} size={4}>
            {mods.map(mod => (
              <TableRow key={mod.name.shown}>
                <TableBodyElement>{mod.name.shown}</TableBodyElement>
                <TableBodyElement>
                  {mod.isHidden ? <WarnBadge>Hidden</WarnBadge> : <InfoBadge>Shown</InfoBadge>}
                </TableBodyElement>
                <TableBodyElement>
                  <Button onClick={modifyDirectory(mod)}>Toggle</Button>
                </TableBodyElement>
                <TableBodyElement>
                  <Button onClick={openDirectory(mod)}>Open</Button>
                </TableBodyElement>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ModManager;
