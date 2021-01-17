import React, { useEffect, useState } from "react";
import tw from "twin.macro";

import { MODIFY_DIRECTORY_V2, OPEN_DIRECTORY_V2, READ_MOD_CONFIG_V2, FIND_MODS } from "@common/event/constants";
import ProcessorType from "@common/constants/processor-type";
import { Message } from "@common/event";
import { Logger } from "@common/logger";
import { ModData, ModCollection } from "@common/mod";

import Header from "@components/Header";
import FindDirectory from "@components/FindDirectory";
import Table, { TableRow, TableHeader, TableHeaderElement, TableBody, TableBodyElement } from "@components/table";
import { ListingContainer, ListingRow } from "@components/listing";
import BadgeContainer, { InfoBadge, WarnBadge, MessageBadge } from "@components/Badge";

interface ModManagerProperty {
  name: string;
}

const RootContainer = tw.div`
  flex flex-col h-full min-h-full
  bg-gradient-to-tr from-purple-600 via-pink-500 to-red-300
`;

const Container = tw.div`
  flex flex-col mx-4 my-2 overflow-y-auto overflow-x-hidden
`;

const TableContainer = tw.div`
  mx-4 my-2 align-middle inline-block
  shadow overflow-x-hidden overflow-y-auto border-b border-gray-200 sm:rounded-lg
`;

const Button = tw.a`
  cursor-pointer select-none
  text-right text-sm
  text-red-500 hover:text-red-800 hover:underline
`;

const headers = [
  { name: "Name", size: 1 },
  { name: "Version", size: 1 },
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
    <RootContainer>
      <Header name={name}>
        <FindDirectory name="steam">Steam</FindDirectory>
        <FindDirectory name="gog">GOG</FindDirectory>
        <FindDirectory name="custom">Custom</FindDirectory>
      </Header>
      <Container>
        <ListingContainer>
          {mods.map(mod => {
            return (
              <ListingRow key={mod.id}>
                <div tw="col-span-9 col-end-10">
                  <div tw="flex flex-col">
                    <small tw="mr-2 text-gray-600 flex justify-between items-center">{mod.id}</small>
                    <div tw="mt-2">
                      <h2 tw="text-gray-700 font-bold text-lg hover:underline">
                        {mod.manifest.name} ({mod.manifest.version})
                      </h2>
                      <p>{mod.manifest.description}</p>
                      <BadgeContainer>
                        <MessageBadge>{mod.manifest.category}</MessageBadge>
                        {mod.status.isHidden ? <WarnBadge>Hidden</WarnBadge> : <InfoBadge>Shown</InfoBadge>}
                      </BadgeContainer>
                    </div>
                  </div>
                </div>
                <div tw="col-start-11 col-span-3">
                  <p>hello, world</p>
                </div>
              </ListingRow>
            );
          })}
        </ListingContainer>
      </Container>

      <TableContainer tw="invisible hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map(h => (
                <TableHeaderElement key={h.name} colSpan={h.size}>
                  {h.name}
                </TableHeaderElement>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody type={mods.length > 0 ? "exist" : "empty"} size={headers.reduce((o, h) => o + h.size, 0)}>
            {mods.map(mod => (
              <TableRow key={mod.id}>
                <TableBodyElement>{mod.manifest.name}</TableBodyElement>
                <TableBodyElement>{mod.manifest.version}</TableBodyElement>
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
    </RootContainer>
  );
};

export default ModManager;
