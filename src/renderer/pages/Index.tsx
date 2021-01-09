import React, { useEffect, useState } from "react";

import { MODIFY_DIRECTORY, OPEN_DIRECTORY } from "@common/constants/events";
import { createRendererEvent } from "@common/utils/event";
import EventObject, { Origin } from "@common/models/event";
import Logger, { color } from "@common/models/logger";
import { PRELOAD } from "@common/constants/process-type";
import { Directory, DirectoryObject } from "@common/models/directory";

const logger = new Logger(color.lightRed, "page", "index");

const IndexPage = (): JSX.Element => {
  const [directory, setDirectory] = useState("");
  const [directories, setDirectories] = useState<DirectoryObject[]>([]);

  const getDirectory = (subtype: string) => {
    return () => {
      window.postMessage(createRendererEvent({ type: OPEN_DIRECTORY, subtype }), "*");
    };
  };

  const modifyDirectory = (d: DirectoryObject) => {
    return () => {
      window.postMessage(createRendererEvent({ type: MODIFY_DIRECTORY, value: d }), "*");
    };
  };

  useEffect(() => {
    window.addEventListener("message", event => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: EventObject<any> = event.data;
      if (data.origin === Origin.PRELOAD) {
        logger.event(PRELOAD, `${data.type} (${data.subtype})`);
        if (data.type === OPEN_DIRECTORY) {
          const value: Directory = data.value;

          setDirectory(value.name);
          setDirectories(value.subdirectories);
        } else if (data.type === MODIFY_DIRECTORY) {
          const value: DirectoryObject = data.value;

          setDirectories(directories => {
            const copied = [...directories];
            const index = copied.findIndex(d => d.id === value.id);

            logger.debug(`update directories index: ${index}`);
            if (index >= 0) copied[index] = value;

            return copied;
          });
        }
      }
    });
  });

  return (
    <div>
      <button onClick={getDirectory("steam")}>Steam</button>
      <button onClick={getDirectory("gog")}>GOG</button>
      <button onClick={getDirectory("custom")}>Custom</button>
      <div>
        <h1>{directory}</h1>
        <ul>
          {directories.map(d => (
            <li key={d.name.original}>
              {d.name.shown} <button onClick={modifyDirectory(d)}>{d.isHidden ? "Hidden" : "Shown"}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
