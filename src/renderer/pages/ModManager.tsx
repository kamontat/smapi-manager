import React, { useEffect, useState } from "react";
import tw from "twin.macro";

import {
  MODIFY_DIRECTORY_V2,
  OPEN_DIRECTORY_V2,
  READ_MOD_CONFIG_V2,
  FIND_MODS,
  OPEN_EXTERNAL_LINK,
  READ_CONFIG,
  QUERY_NEXUS_METADATA,
} from "@common/event/constants";
import ProcessorType from "@common/constants/processor-type";
import { Message } from "@common/event";
import { Logger } from "@common/logger";
import { ModData, ModCollection } from "@common/mod";

import Header from "@components/Header";
import { ListingContainer, ListingRow } from "@components/listing";
import BadgeContainer, { Badge } from "@components/Badge";
import LeftContainer from "@components/container/LeftContainer";
import TextWithTooltip from "@components/TextWithTooltip";
import Button from "@components/Button";

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
  const [debugMode, setDebug] = useState(false);
  const [tutorialMode, setTutorial] = useState(false);
  const [betaMode, setBeta] = useState(false);

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

    message.receive<ModData[]>({
      type: [QUERY_NEXUS_METADATA],
      callback: data => {
        setMods(data.value);
      },
    });

    message.readConfig("debugMode");
    message.readConfig("tutorialMode");
    message.readConfig("betaMode");
    message.receive<boolean>({
      type: [READ_CONFIG],
      subtype: ["debugMode", "tutorialMode", "betaMode"],
      callback: data => {
        if (data.isSubtype("debugMode")) setDebug(data.value);
        else if (data.isSubtype("tutorialMode")) setTutorial(data.value);
        else if (data.isSubtype("betaMode")) setBeta(data.value);
      },
    });

    return message.cleanup();
  }, []);

  return (
    <RootContainer>
      <Header name={name}>
        {betaMode && (
          <Button tw="text-white" onClick={() => message.sent({ type: QUERY_NEXUS_METADATA, value: mods })}>
            Update
          </Button>
        )}
      </Header>
      <Container>
        {debugMode && <p>{directoryName}</p>}
        <ListingContainer>
          {mods.map(mod => {
            return (
              <ListingRow key={mod.id}>
                <div tw="flex justify-between mt-2 mx-3">
                  <small tw="mr-4 text-gray-600 flex">{debugMode && mod.id}</small>
                  {!mod.status.isLatest && <small tw="mr-4 text-gray-600 flex">{mod.server?.version} (latest)</small>}
                </div>
                <LeftContainer tw="mt-2 mx-3">
                  <TextWithTooltip
                    text={`${mod.manifest.name} (${mod.manifest.version})`}
                    tooltip={tutorialMode && "click to open directory"}
                    onClick={openDirectory(mod)}
                  />
                  <p>{mod.manifest.description}</p>
                  <BadgeContainer>
                    <Badge type="pink">{mod.manifest.category}</Badge>
                    {mod.manifest.updater.map(({ id, key, url }) => (
                      <Badge
                        key={id}
                        type="blue"
                        onClick={() => message.sent({ type: OPEN_EXTERNAL_LINK, value: url })}
                      >
                        {key}
                      </Badge>
                    ))}
                    <Badge type={mod.status.isHidden ? "yellow" : "green"} onClick={modifyDirectory(mod)}>
                      {mod.status.isHidden ? "Hidden" : "Shown"}
                    </Badge>
                  </BadgeContainer>
                </LeftContainer>
              </ListingRow>
            );
          })}
        </ListingContainer>
      </Container>
    </RootContainer>
  );
};

export default ModManager;
