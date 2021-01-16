import React, { useEffect, useState } from "react";
import tw from "twin.macro";

import { MODIFY_DIRECTORY_V2, OPEN_DIRECTORY_V2, READ_MOD_CONFIG_V2, FIND_MODS } from "@common/constants/events";
import ProcessorType from "@common/constants/processor-type";
import { Message } from "@common/message";
import { Logger } from "@common/logger";
import { ModData, ModCollection } from "@common/mod";
import { getWindowName } from "@common/utils/window";

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

const Button = tw.a`
  cursor-pointer select-none
  text-right text-sm
  text-red-500 hover:text-red-800 hover:underline
`;

const headers = [
  { name: "Name", size: 1 },
  { name: "Status", size: 1 },
  { name: "Action", size: 2 },
];

const logger = new Logger(ProcessorType.RENDERER, "mod-manager");
const message = new Message(ProcessorType.RENDERER);
const modifyDirectory = (d: ModData) => {
  return () => {
    message.sent({ type: MODIFY_DIRECTORY_V2, value: d });
  };
};

const openDirectory = (d: ModData) => {
  return () => {
    message.sent({ type: OPEN_DIRECTORY_V2, value: d });
  };
};

const ModManager = ({ name }: ModManagerProperty): JSX.Element => {
  const [directoryName, setDirectoryName] = useState("");
  const [mods, setMods] = useState<ModData[]>([]);

  useEffect(() => {
    document.title = getWindowName(name);
    message.sent({ type: READ_MOD_CONFIG_V2 });

    message.receive<ModCollection>({
      type: [FIND_MODS, READ_MOD_CONFIG_V2],
      callback: data => {
        data.log(logger);
        if (data.value) {
          setDirectoryName(data.value.path);
          setMods(data.value.mods);
        }
      },
    });

    message.receive<ModData>({
      type: [MODIFY_DIRECTORY_V2],
      callback: data => {
        data.log(logger);
        const value = data.value;
        setMods(mods => {
          const copied = [...mods];
          const index = copied.findIndex(d => d.id === value.id);
          if (index >= 0) copied[index] = value;
          return copied;
        });
      },
    });

    return message.cleanup();
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
              <TableRow key={mod.id}>
                <TableBodyElement>{mod.manifest.name}</TableBodyElement>
                <TableBodyElement>
                  {mod.status.isHidden ? <WarnBadge>Hidden</WarnBadge> : <InfoBadge>Shown</InfoBadge>}
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
